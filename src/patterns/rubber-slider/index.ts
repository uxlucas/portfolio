import { lazy } from 'react'
import type { PatternDefinition } from '../types'
import code from './RubberSlider.tsx?raw'

export const rubberSlider: PatternDefinition = {
  id: 'rubber-slider',
  name: 'Rubber Slider',
  description: 'Drag or type a value. Resists at boundaries with elastic feedback.',
  component: lazy(() => import('./RubberSlider')),
  code,
}
