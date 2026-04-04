const CONTACT_ITEMS = [
  { emoji: '📱', label: 'Phone', value: '+65 8432 9134' },
  { emoji: '✉️', label: 'Email', value: 'libeiji990812@gmail.com' },
  { emoji: '💬', label: 'WhatsApp', value: '+65 8432 9134' },
  { emoji: '💼', label: 'LinkedIn', value: 'linkedin.com/in/beiji-li' },
] as const

const cardClass =
  'flex items-center justify-center gap-3 p-4 bg-[var(--card-background)] rounded-2xl border border-[var(--border)] hover:scale-105 transition-transform'

export function ContactSection() {
  return (
    <section id="contact-section" className="py-4 newsletter-section">
      <div className="apple-container text-center">
        <div className="relative">
          <div
            className="absolute -top-20 -left-20 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl floating"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-40 h-40 bg-[var(--accent)]/10 rounded-full blur-3xl floating"
            style={{ animationDelay: '3s' }}
          />
        </div>
        <h2 className="text-3xl font-semibold mb-12">Keep In Touch🥳</h2>

        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTACT_ITEMS.map(({ emoji, label, value }) => (
            <div key={label} className={cardClass}>
              <span className="text-2xl">{emoji}</span>
              <div className="text-left">
                <p className="text-sm text-[var(--secondary)]">{label}</p>
                <p className="font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
