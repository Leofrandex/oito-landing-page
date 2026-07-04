'use client';
import Threads from './Threads';

/** Fixed, full-viewport animated threads behind all content.
 *  Dark forest-deep base; the threads canvas is transparent over it. */
export default function ThreadsBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: 'var(--forest-deep)',
      }}
    >
      <Threads amplitude={1} distance={0} enableMouseInteraction={false} isLoaded={true} />
    </div>
  );
}
