export interface ScheduledTask {
  /** Index of the task in the input order. */
  index: number;
  worker: number;
  start: number;
  end: number;
}

/**
 * How a fixed thread pool runs `durations` (in input order): each task goes
 * to whichever worker becomes free first, ties broken by lowest worker
 * number - the same FIFO-queue behaviour as Executors.newFixedThreadPool.
 */
export function schedule(
  durations: number[],
  poolSize: number,
): ScheduledTask[] {
  const freeAt = new Array<number>(poolSize).fill(0);
  return durations.map((duration, index) => {
    let worker = 0;
    for (let w = 1; w < poolSize; w++) {
      if (freeAt[w] < freeAt[worker]) worker = w;
    }
    const start = freeAt[worker];
    const end = start + duration;
    freeAt[worker] = end;
    return { index, worker, start, end };
  });
}

export function totalTime(tasks: ScheduledTask[]): number {
  return tasks.reduce((max, t) => Math.max(max, t.end), 0);
}
