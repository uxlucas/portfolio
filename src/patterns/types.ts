import type { LazyExoticComponent, ComponentType } from 'react'

export interface PatternDefinition {
  id: string
  name: string
  description: string
  component: LazyExoticComponent<ComponentType>
  code: string
  hoverOnly?: boolean
}
