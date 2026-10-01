import { schedule, totalTime } from "./threadPoolSchedule";

const DURATIONS = [3, 2, 4, 1, 2, 3];

describe("schedule", () => {
  it.each([
    [1, 15],
    [2, 9],
    [3, 6],
    [4, 5],
    [5, 4],
    [6, 4],
  ])("a pool of %i workers finishes the six tasks in %i units", (pool, total) => {
    expect(totalTime(schedule(DURATIONS, pool))).toBe(total);
  });

  it("never runs two tasks on the same worker at the same time", () => {
    const tasks = schedule(DURATIONS, 3);
    for (const a of tasks) {
      for (const b of tasks) {
        if (a.index < b.index && a.worker === b.worker) {
          expect(a.end).toBeLessThanOrEqual(b.start);
        }
      }
    }
  });

  it("gives each task exactly its own duration", () => {
    for (const t of schedule(DURATIONS, 2)) {
      expect(t.end - t.start).toBe(DURATIONS[t.index]);
    }
  });
});
