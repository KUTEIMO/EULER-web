export default function PageBackdrop() {
  return (
    <>
      <div className="euler-stars" aria-hidden />
      <div
        className="euler-orb -left-24 top-0 h-80 w-80"
        style={{ background: 'var(--euler-mint)' }}
        aria-hidden
      />
      <div
        className="euler-orb right-0 top-1/4 h-64 w-64"
        style={{ background: 'var(--euler-coral-soft)' }}
        aria-hidden
      />
      <div
        className="euler-orb bottom-0 left-1/3 h-56 w-56"
        style={{ background: 'var(--euler-gold)' }}
        aria-hidden
      />
    </>
  );
}
