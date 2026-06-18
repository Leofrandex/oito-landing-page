'use client';
import Threads from './Threads';

export default function ThreadsBackground() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <Threads amplitude={1} distance={0} enableMouseInteraction={false} isLoaded={true} />
    </div>
  );
}
