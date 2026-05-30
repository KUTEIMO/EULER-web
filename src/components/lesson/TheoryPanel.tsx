interface TheoryPanelProps {
  title: string;
  theoryPlain: string;
}

export default function TheoryPanel({ title, theoryPlain }: TheoryPanelProps) {
  const paragraphs = theoryPlain.split('\n\n').filter(Boolean);

  return (
    <article className="euler-glass p-6 sm:p-8">
      <h2 className="font-display mb-4 text-2xl font-bold">{title}</h2>
      <div className="space-y-4 text-[var(--euler-muted)] leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
}
