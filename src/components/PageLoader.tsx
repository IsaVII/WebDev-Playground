/**
 * Suspense fallback for the lazy-loaded page routes in App.jsx. Two parts:
 * an indeterminate bar (loading-bar-* keyframes in motion.css) that reads
 * as "something is happening" without promising a specific duration, and
 * a pulsing label for anyone who can't see color/motion well. Kept
 * dependency-free since it only flashes briefly while a route's chunk
 * downloads (usually imperceptible on a warm cache). Reduced-motion users
 * get a static bar and a non-pulsing label - the loading state is still
 * communicated, just without the animation.
 */
function PageLoader() {
  return (
    <div role="status" aria-label="Loading page" className="py-24 px-4">
      <div className="loading-bar-track h-0.5 w-full max-w-xs mx-auto bg-line rounded-full">
        <div className="loading-bar-fill absolute inset-y-0 w-1/3 bg-accent rounded-full" />
      </div>
      <p className="loading-pulse text-center text-muted text-sm mt-4">
        Loading…
      </p>
    </div>
  );
}

export default PageLoader;
