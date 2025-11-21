'use client'

import { useState, useRef, useEffect } from 'react'
import { SubdivisionType } from '@/lib/metronome-core'

interface SubdivisionDropdownProps {
  value: SubdivisionType
  onChange: (value: SubdivisionType) => void
  beatNumber: number
}

const SUBDIVISION_OPTIONS = [
  { value: SubdivisionType.None, label: '1 (Viertel)', dots: [4] },
  { value: SubdivisionType.Eighth, label: '2 (Achtel)', dots: [0, 8] },
  { value: SubdivisionType.Triplet, label: '3 (Triolen)', dots: [0, 4, 8] },
  { value: SubdivisionType.Sixteenth, label: '4 (Sechzehntel)', dots: [0, 2, 6, 8] },
  { value: SubdivisionType.Quintuplet, label: '5 (Fünfer)', dots: [0, 2, 4, 6, 8] },
  { value: SubdivisionType.Sextuplet, label: '6 (Sechser)', dots: [0, 1, 3, 5, 7, 8] },
]

// Würfel-Layout: 3x3 Grid, Positionen 0-8
function DiceDots({ dots }: { dots: number[] }) {
  return (
    <div className="grid grid-cols-3 gap-1 w-12 h-12 p-1.5">
      {Array.from({ length: 9 }, (_, i) => (
        <div
          key={i}
          className={`rounded-full ${
            dots.includes(i)
              ? 'bg-zinc-700 dark:bg-zinc-300'
              : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  )
}

export function SubdivisionDropdown({ value, onChange, beatNumber }: SubdivisionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentOption = SUBDIVISION_OPTIONS.find(opt => opt.value === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label={`Subdivision für Schlag ${beatNumber}`}
      >
        <DiceDots dots={currentOption?.dots || [4]} />
        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {beatNumber}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-1 z-50 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 min-w-[180px]">
          {SUBDIVISION_OPTIONS.map((option) => {
            const isSelected = option.value === value
            return (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 text-left
                  hover:bg-zinc-100 dark:hover:bg-zinc-700
                  first:rounded-t-lg last:rounded-b-lg
                  transition-colors
                  ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                `}
              >
                <div className="flex-shrink-0">
                  <DiceDots dots={option.dots} />
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${isSelected ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                    {option.label}
                  </div>
                </div>
                {isSelected && (
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
