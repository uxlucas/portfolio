import type { MeetingDetails, ChatMessage, ModelOption } from './types'

export const meeting: MeetingDetails = {
  title: 'Q1 Strategy Review',
  date: 'Mar 18, 2026',
  duration: '47 min',
  client: {
    name: 'Phoenix Torres',
    company: 'Meridian Health Systems',
    role: 'VP of Operations',
    context: 'Enterprise plan · 14 months',
  },
  participants: [
    { id: 'julia', initials: 'JK', name: 'Julia Kim', role: 'CSM Lead', color: '#4A7BF7' },
    { id: 'sam', initials: 'SR', name: 'Sam Rivera', role: 'Solutions Architect', color: '#6C5CE7' },
    { id: 'maya', initials: 'MP', name: 'Maya Patel', role: 'Client VP Ops', color: '#00B894' },
  ],
  actionItems: [
    { id: 'a1', text: 'Send revised onboarding timeline' },
    { id: 'a2', text: 'Schedule follow-up with engineering' },
    { id: 'a3', text: 'Share ROI dashboard access' },
    { id: 'a4', text: 'Draft Q2 expansion proposal' },
  ],
  notes: [
    'Client expressed interest in expanding to 3 additional departments',
    'Current adoption rate at 84% across onboarded teams',
    'EHR integration timeline moved up to April',
    'Budget approval expected by end of Q1',
  ],
}

export const initialMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'What did Phoenix say about next steps?',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content:
      'Phoenix suggested three next steps: share the updated pricing tiers by Friday, schedule a technical deep dive with their engineering team, and provide access to the sandbox environment. They also mentioned looping in their procurement lead next week.',
  },
  {
    id: 'msg-3',
    role: 'user',
    content: 'Can you draft a follow-up email for me?',
  },
]

export const models: ModelOption[] = [
  { id: 'gemini-3-flash', label: 'Gemini 3 Flash' },
  { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6' },
  { id: 'gpt-5-mini', label: 'GPT-5 mini' },
  { id: 'llama-4-scout', label: 'Llama 4 Scout' },
]

export const demoResponses = [
  "Sorry, this is only a demo! But in the real product, I'd draft that email in seconds — personalized with context from this meeting.",
  "I appreciate the enthusiasm, but I'm just a preview. The full Meeting Hub would have your answer ready before you finish typing.",
  "Demo mode activated! In the real Sciene, I'd pull insights from all your past meetings with Meridian to give you a complete picture.",
  "If this weren't a demo, I'd already have a draft ready with action items, follow-ups, and the right tone for Phoenix. Maybe next time.",
  "Nice try! This is just a sandbox, but the real Meeting Hub handles requests like this across 50+ integrations.",
]
