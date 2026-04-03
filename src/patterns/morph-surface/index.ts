import { lazy } from 'react'
import type { PatternDefinition } from '../types'
import code from './MorphSurface.tsx?raw'

export const morphSurface: PatternDefinition = {
  id: 'morph-surface',
  name: 'Proximity Actions',
  description: 'Actions reveal as cursor approaches, reducing visual noise at rest.',
  component: lazy(() => import('./MorphSurface')),
  code,
  hoverOnly: true,
}
