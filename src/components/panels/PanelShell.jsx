export default function PanelShell({ number, title, close, children }) {
  return <aside className="panel-pane open">
    <div className="panel-head"><span className="badge">{number}</span>
      <div className="fieldset-title">{title}</div>
      <button className="panel-close" onClick={close} aria-label="Close panel">×</button>
    </div>
    <div className="p-5 space-y-3">{children}</div>
  </aside>
}