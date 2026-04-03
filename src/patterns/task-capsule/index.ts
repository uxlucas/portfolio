import { lazy } from 'react'
import type { PatternDefinition } from '../types'
import code from './TaskCapsule.tsx?raw'

export const taskCapsule: PatternDefinition = {
  id: 'task-capsule',
  name: 'Task Capsule',
  description: 'A floating pill that expands into a checklist and collapses on completion.',
  component: lazy(() => import('./TaskCapsule')),
  code,
}
