import { lazy } from 'react'
import type { PatternDefinition } from '../types'
import code from './AdaptiveToolbar.tsx?raw'

export const adaptiveToolbar: PatternDefinition = {
  id: 'adaptive-toolbar',
  name: 'Adaptive Toolbar',
  description: 'Icons compress when idle, labels reveal on engagement.',
  component: lazy(() => import('./AdaptiveToolbar')),
  code,
}
