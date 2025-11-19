'use client'

interface PlaybackControlsProps {
  isPlaying: boolean
  onStart: () => void
  onStop: () => void
}

export function PlaybackControls({ isPlaying, onStart, onStop }: PlaybackControlsProps) {
  const handleClick = () => {
    if (isPlaying) {
      onStop()
    } else {
      onStart()
    }
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        className="rounded-xl bg-[#B8860B] px-10 py-4 text-xl font-bold text-black transition-colors hover:bg-[#9A7209] dark:bg-[#D4AF37] dark:hover:bg-[#C19E2D]"
      >
        {isPlaying ? '■ STOP' : '▶ START'}
      </button>
    </div>
  )
}
