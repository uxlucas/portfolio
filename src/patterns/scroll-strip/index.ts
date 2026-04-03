import { lazy } from 'react'
import type { PatternDefinition } from '../types'
import code from './ScrollStrip.tsx?raw'

export const scrollStrip: PatternDefinition = {
  id: 'scroll-strip',
  name: 'Focus Strip',
  description: 'Compressed slices expand on hover to reveal content without committing.',
  component: lazy(() => import('./ScrollStrip')),
  code,
  hoverOnly: true,
}
