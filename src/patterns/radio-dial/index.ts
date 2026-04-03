import { lazy } from 'react'
import type { PatternDefinition } from '../types'
import code from './RadioDial.tsx?raw'

export const radioDial: PatternDefinition = {
  id: 'calendar-flip',
  name: 'Calendar Flip',
  description: 'Slide through days with a page-flip calendar. Switch months with the arrows.',
  component: lazy(() => import('./RadioDial')),
  code,
}
