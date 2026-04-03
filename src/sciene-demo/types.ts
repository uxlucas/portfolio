export interface ActionItem {
  id: string
  text: string
}

export interface Participant {
  id: string
  initials: string
  name: string
  role: string
  color: string
}

export interface ClientInfo {
  name: string
  company: string
  role: string
  context: string
}

export interface MeetingDetails {
  title: string
  date: string
  duration: string
  client: ClientInfo
  participants: Participant[]
  actionItems: ActionItem[]
  notes: string[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export interface ModelOption {
  id: string
  label: string
}
