'use client'

import { useMemo, useEffect, useState } from 'react'
import { WebAudioEngine } from '@brassio/metronome-audio-web'
import { useMetronome } from '@brassio/metronome-ui'

export function ClassicMetronome() {
  const audioEngine = useMemo(() => new WebAudioEngine(), [])
  const metronome = useMetronome(audioEngine)

  const [pendulumAngle, setPendulumAngle] = useState(0)
  const [swingDirection, setSwingDirection] = useState(1)

  // Calculate swing duration based on BPM
  const swingDuration = 60000 / metronome.bpm // ms per beat

  useEffect(() => {
    if (!metronome.isPlaying) {
      setPendulumAngle(0)
      return
    }

    let animationId: number
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      // Calculate angle based on elapsed time
      const progress = (elapsed % swingDuration) / swingDuration
      const angle = Math.sin(progress * Math.PI) * 30 * swingDirection

      setPendulumAngle(angle)

      // Switch direction at the end of each swing
      if (progress > 0.95 && elapsed > 50) {
        setSwingDirection(prev => -prev)
        startTime = timestamp
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [metronome.isPlaying, swingDuration, swingDirection])

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Metronome Body */}
      <div className="relative w-48 h-72 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-lg shadow-2xl">
        {/* Scale markings */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-40 h-32">
          {[-30, -20, -10, 0, 10, 20, 30].map((angle) => (
            <div
              key={angle}
              className="absolute bottom-0 left-1/2 w-0.5 h-6 bg-amber-200/60 origin-bottom"
              style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
            />
          ))}
        </div>

        {/* Pendulum */}
        <div
          className="absolute bottom-8 left-1/2 origin-bottom transition-transform"
          style={{
            transform: `translateX(-50%) rotate(${pendulumAngle}deg)`,
            transitionDuration: metronome.isPlaying ? '0ms' : '300ms',
          }}
        >
          {/* Pendulum arm */}
          <div className="w-1 h-48 bg-gradient-to-b from-zinc-300 to-zinc-500 mx-auto" />

          {/* Pendulum weight */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-zinc-400 to-zinc-600 rounded-sm shadow-lg" />

          {/* Pivot point */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-zinc-800 rounded-full" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center space-y-4">
        {/* BPM Display */}
        <div className="text-center">
          <span className="text-4xl font-bold">{metronome.bpm}</span>
          <span className="ml-2 text-lg opacity-60">BPM</span>
        </div>

        {/* BPM Slider */}
        <input
          type="range"
          min={30}
          max={300}
          value={metronome.bpm}
          onChange={(e) => metronome.setBpm(parseInt(e.target.value, 10))}
          className="w-48 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer"
        />

        {/* Play/Stop Button */}
        <button
          onClick={metronome.toggle}
          className={`px-8 py-3 rounded-lg font-bold text-lg ${
            metronome.isPlaying
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-amber-500 text-black hover:bg-amber-400'
          }`}
        >
          {metronome.isPlaying ? '■ STOP' : '▶ START'}
        </button>
      </div>
    </div>
  )
}
