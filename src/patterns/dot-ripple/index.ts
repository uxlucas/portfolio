import { lazy } from 'react'
import type { PatternDefinition } from '../types'
import code from './DotRipple.tsx?raw'

export const dotRipple: PatternDefinition = {
  id: 'dot-ripple',
  name: 'Dot Ripple',
  description: 'Click anywhere to send a ripple through a grid of dots.',
  component: lazy(() => import('./DotRipple')),
  code,
}
