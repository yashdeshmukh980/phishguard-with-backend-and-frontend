import { Fish, Bug, KeyRound, Globe, Lightbulb } from 'lucide-react'

const threats = [
  {
    icon: Fish,
    title: 'Phishing',
    color: 'text-red-400',
    text: 'Fake pages that copy a trusted brand to trick you into giving up passwords or card details.',
    tip: 'Read the domain name carefully. paypa1.com is not paypal.com.',
  },
  {
    icon: Bug,
    title: 'Malware',
    color: 'text-yellow-400',
    text: 'Links that download harmful software such as spyware or ransomware onto your device.',
    tip: 'Never open files from links you did not expect.',
  },
  {
    icon: Globe,
    title: 'Suspicious Domain',
    color: 'text-purple-400',
    text: 'Newly made or oddly named sites, often with long hyphenated names or strange endings.',
    tip: 'Be careful with words like "verify", "secure" and "update" inside a domain name.',
  },
  {
    icon: KeyRound,
    title: 'Credential Harvesting',
    color: 'text-sky-400',
    text: 'Login pages built only to capture your username and password.',
    tip: 'Type the website address yourself instead of clicking a link from an email.',
  },
]

const tips = [
  'Check the URL carefully and look for misspellings.',
  'Avoid clicking on unknown links or shortened URLs.',
  "Don't share your personal or login information.",
]

export default function ThreatIntelligence() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
      <h2 className="text-2xl font-bold mb-1">Threat Intelligence</h2>
      <p className="text-slate-400 mb-6">Learn how common link-based attacks work and how to spot them.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {threats.map(({ icon: Icon, title, color, text, tip }) => (
          <div key={title} className="bg-panel border border-line rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Icon className={color} size={26} />
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-slate-300 text-sm mb-3">{text}</p>
            <p className="text-sm text-brand">Tip: {tip}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-panel border border-line rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb className="text-brand" size={24} />
          <h3 className="text-lg font-semibold">Quick Tips</h3>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
          {tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}