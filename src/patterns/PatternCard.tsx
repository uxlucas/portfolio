import { Suspense } from 'react'
import type { PatternDefinition } from './types'

interface PatternCardProps {
  pattern: PatternDefinition
  index: number
}

export function PatternCard({ pattern, index }: PatternCardProps) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <div className="group flex flex-col">
      {/* Preview area */}
      <div className="aspect-[4/5] rounded-xl border border-gray-300 bg-gray-100 overflow-hidden transition-colors duration-200 group-hover:border-gray-400 flex flex-col relative">
        {/* Content */}
        <div className="flex-1 min-h-0">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                Loading…
              </div>
            }
          >
            <pattern.component />
          </Suspense>
        </div>

        {/* Mobile hover-only overlay */}
        {pattern.hoverOnly && (
          <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-gray-100/60 sm:hidden">
            <span className="text-gray-500 font-medium" style={{ fontSize: 11 }}>
              Best experienced on desktop
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col mt-3 px-0.5" style={{ gap: 2 }}>
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-gray-800">
            {pattern.name}
          </span>
          <span className="text-xs tabular-nums text-gray-500 font-medium">
            {number}
          </span>
        </div>
        <span className="text-gray-500" style={{ fontSize: 11, lineHeight: 1.4 }}>
          {pattern.description}
        </span>
      </div>
    </div>
  )
}
