/**
 * A tiny, dependency-free stand-in for a real test framework (Jest,
 * Vitest, Mocha + Chai, ...) so the "Fix the broken test" exercises can
 * run entirely in the browser with zero extra libraries. It supports
 * just enough of the familiar test()/expect() API - plus mock and spy
 * helpers - to make these exercises feel like real unit tests.
 *
 * This is intentionally NOT a real test runner: it exists to grade
 * learner-edited test code against a fixed "code under test", not to
 * replace Jest/Vitest in a real project.
 */

function stringify(value) {
  if (typeof value === "function") return value.name ? `[Function: ${value.name}]` : "[Function]";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (typeof a !== "object") return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((key) => deepEqual(a[key], b[key]));
}

function createExpect() {
  return function expect(actual) {
    const matchers = {
      toBe(expected) {
        if (!Object.is(actual, expected)) {
          throw new Error(`expected ${stringify(actual)} to be ${stringify(expected)}`);
        }
      },
      toEqual(expected) {
        if (!deepEqual(actual, expected)) {
          throw new Error(`expected ${stringify(actual)} to equal ${stringify(expected)}`);
        }
      },
      toBeTruthy() {
        if (!actual) throw new Error(`expected ${stringify(actual)} to be truthy`);
      },
      toBeFalsy() {
        if (actual) throw new Error(`expected ${stringify(actual)} to be falsy`);
      },
      toContain(item) {
        if (!actual || !actual.includes(item)) {
          throw new Error(`expected ${stringify(actual)} to contain ${stringify(item)}`);
        }
      },
      toHaveLength(length) {
        if (!actual || actual.length !== length) {
          throw new Error(`expected ${stringify(actual)} to have length ${length}`);
        }
      },
      toBeGreaterThan(n) {
        if (!(actual > n)) {
          throw new Error(`expected ${stringify(actual)} to be greater than ${n}`);
        }
      },
      toThrow() {
        if (typeof actual !== "function") {
          throw new Error("toThrow() needs a function to call, e.g. expect(() => fn()).toThrow()");
        }
        let threw = false;
        try {
          actual();
        } catch {
          threw = true;
        }
        if (!threw) throw new Error("expected function to throw, but it did not");
      },
      toHaveBeenCalled() {
        if (!actual?.mock || actual.mock.calls.length === 0) {
          throw new Error("expected mock function to have been called");
        }
      },
      toHaveBeenCalledTimes(times) {
        const count = actual?.mock?.calls.length ?? 0;
        if (count !== times) {
          throw new Error(`expected mock to have been called ${times} time(s), but it was called ${count} time(s)`);
        }
      },
      toHaveBeenCalledWith(...args) {
        const calls = actual?.mock?.calls ?? [];
        if (!calls.some((call) => deepEqual(call, args))) {
          throw new Error(`expected mock to have been called with ${stringify(args)}`);
        }
      },
    };
    return matchers;
  };
}

/** Wraps a function so every call is recorded on `.mock.calls`. */
export function createMock(implementation) {
  let impl = implementation;
  const mock = { calls: [] };
  const fn = (...args) => {
    mock.calls.push(args);
    return impl ? impl(...args) : undefined;
  };
  fn.mock = mock;
  fn.mockReturnValue = (value) => {
    impl = () => value;
    return fn;
  };
  return fn;
}

/** Wraps a real object method so it's still called (unlike createMock), while recording calls. */
export function createSpy(obj, methodName) {
  const original = obj[methodName].bind(obj);
  const spy = createMock(original);
  obj[methodName] = spy;
  return spy;
}

/**
 * Runs learner-supplied test source against a scope of globals (the code
 * under test, plus test helpers). Returns { syntaxError, results }.
 */
export async function runTests(source, scope = {}) {
  const registered = [];
  const test = (name, fn) => registered.push({ name, fn });
  test.skip = () => {};

  const scopeKeys = Object.keys(scope);
  const scopeValues = Object.values(scope);

  let compiled;
  try {
    // eslint-disable-next-line no-new-func
    compiled = new Function(
      "test",
      "it",
      "expect",
      ...scopeKeys,
      `"use strict";\n${source}`,
    );
  } catch (err) {
    return { syntaxError: err.message, results: [] };
  }

  try {
    compiled(test, test, createExpect(), ...scopeValues);
  } catch (err) {
    return { syntaxError: err.message, results: [] };
  }

  if (registered.length === 0) {
    return { syntaxError: "No test(...) calls found - write at least one test.", results: [] };
  }

  const results = [];
  for (const { name, fn } of registered) {
    try {
      await fn();
      results.push({ name, passed: true });
    } catch (err) {
      results.push({ name, passed: false, error: err.message });
    }
  }
  return { syntaxError: null, results };
}
