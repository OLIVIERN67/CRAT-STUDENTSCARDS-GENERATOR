const panels = [['inst', 'Institution'], ['student', 'Student'], ['titlewm', 'Title & WM'],
  ['contact', 'Contact'], ['terms', 'Terms'], ['uploads', 'Uploads']]

export default function EditorToolbar({ onPrint, onPNG, onPDF, onReset, onPanel, activePanel, view, setView }) {
  return <>
    <nav className="mrail print:hidden" aria-label="Card editor panels">{panels.map(([id, label]) =>
      <button key={id} className={`mrail-btn ${activePanel === id ? 'active' : ''}`}
        aria-pressed={activePanel === id} onClick={() => onPanel(id)}>{label}</button>)}</nav>
    <nav className="rail print:hidden" aria-label="Card editor panels">{panels.map(([id, label]) =>
      <button key={id} className={`rail-btn ${activePanel === id ? 'active' : ''}`}
        data-title={label} aria-label={label} aria-pressed={activePanel === id}
        onClick={() => onPanel(id)}>{label.slice(0, 2).toUpperCase()}</button>)}</nav>
    <section className="print:hidden flex flex-wrap gap-2 p-4">
      <button className="toolbar-btn btn-print" onClick={onPrint}>Print</button>
      <button className="toolbar-btn btn-png" onClick={onPNG}>Download PNG</button>
      <button className="toolbar-btn btn-pdf" onClick={onPDF}>Download PDF</button>
      <button className="toolbar-btn btn-ghost" onClick={onReset}>Reset Student</button>
      <div className="ml-auto flex gap-1">{['front', 'back', 'both'].map(side =>
        <button key={side} className={`seg-btn ${view === side ? 'active' : ''}`}
          onClick={() => setView(side)}>{side === 'both' ? 'FRONT & BACK' : side.toUpperCase()}</button>)}</div>
    </section>
  </>
}