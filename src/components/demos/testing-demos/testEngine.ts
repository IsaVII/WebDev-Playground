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

// Learner-written tests can pass literally anything to expect() and the
// mock helpers, so their values are `any` on purpose.

function errorMessage(err: unknown) {
  return err instanceof Error ? err.message : String(err);
}

function stringify(value: any): string | undefined {
  if (typeof value === "function") return value.name ? `[Function: ${value.name}]` : "[Function]";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function deepEqual(a: any, b: any): boolean {
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
  return function expect(actual: any) {
    const matchers = {
      toBe(expected: any) {
        if (!Object.is(actual, expected)) {
          throw new Error(`expected ${stringify(actual)} to be ${stringify(expected)}`);
        }
      },
      toEqual(expected: any) {
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
      toContain(item: any) {
        if (!actual || !actual.includes(item)) {
          throw new Error(`expected ${stringify(actual)} to contain ${stringify(item)}`);
        }
      },
      toHaveLength(length: number) {
        if (!actual || actual.length !== length) {
          throw new Error(`expected ${stringify(actual)} to have length ${length}`);
        }
      },
      toBeGreaterThan(n: number) {
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
      toHaveBeenCalledTimes(times: number) {
        const count = actual?.mock?.calls.length ?? 0;
        if (count !== times) {
          throw new Error(`expected mock to have been called ${times} time(s), but it was called ${count} time(s)`);
        }
      },
      toHaveBeenCalledWith(...args: any[]) {
        const calls = actual?.mock?.calls ?? [];
        if (!calls.some((call: any[]) => deepEqual(call, args))) {
          throw new Error(`expected mock to have been called with ${stringify(args)}`);
        }
      },
    };
    return matchers;
  };
}

/** Wraps a function so every call is recorded on `.mock.calls`. */
export interface MockFn {
  (...args: any[]): any;
  mock: { calls: any[][] };
  mockReturnValue: (value: any) => MockFn;
}

export function createMock(implementation?: (...args: any[]) => any): MockFn {
  let impl = implementation;
  const mock: { calls: any[][] } = { calls: [] };
  const fn = ((...args: any[]) => {
    mock.calls.push(args);
    return impl ? impl(...args) : undefined;
  }) as MockFn;
  fn.mock = mock;
  fn.mockReturnValue = (value: any) => {
    impl = () => value;
    return fn;
  };
  return fn;
}

/** Wraps a real object method so it's still called (unlike createMock), while recording calls. */
export function createSpy(obj: Record<string, any>, methodName: string) {
  const original = obj[methodName].bind(obj);
  const spy = createMock(original);
  obj[methodName] = spy;
  return spy;
}

/**
 * Runs learner-supplied test source against a scope of globals (the code
 * under test, plus test helpers). Returns { syntaxError, results }.
 */
export interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

export interface TestRun {
  syntaxError: string | null;
  results: TestResult[];
}

export async function runTests(
  source: string,
  scope: Record<string, any> = {},
): Promise<TestRun> {
  const registered: { name: string; fn: () => unknown }[] = [];
  const test = Object.assign(
    (name: string, fn: () => unknown) => registered.push({ name, fn }),
    { skip: () => {} },
  );

  const scopeKeys = Object.keys(scope);
  const scopeValues = Object.values(scope);

  let compiled: (...args: any[]) => unknown;
  try {
    // eslint-disable-next-line no-new-func
    compiled = new Function(
      "test",
      "it",
      "expect",
      ...scopeKeys,
      `"use strict";\n${source}`,
    ) as (...args: any[]) => unknown;
  } catch (err) {
    return { syntaxError: errorMessage(err), results: [] };
  }

  try {
    compiled(test, test, createExpect(), ...scopeValues);
  } catch (err) {
    return { syntaxError: errorMessage(err), results: [] };
  }

  if (registered.length === 0) {
    return { syntaxError: "No test(...) calls found - write at least one test.", results: [] };
  }

  const results: TestResult[] = [];
  for (const { name, fn } of registered) {
    try {
      await fn();
      results.push({ name, passed: true });
    } catch (err) {
      results.push({ name, passed: false, error: errorMessage(err) });
    }
  }
  return { syntaxError: null, results };
}
