import PanelShell from './PanelShell'

export default function PanelTitle({ close, data }) {
  return <PanelShell number="3" title="Title & watermark" close={close}>
    <input className="field" value={data.title} onChange={event => data.setTitle(event.target.value)} placeholder="Card title"/>
    <label className="text-xs font-bold">Watermark size</label>
    <input type="range" min="10" max="80" value={data.wmSize} onChange={event => data.setWmSize(+event.target.value)}/>
    <label className="text-xs font-bold">Watermark opacity</label>
    <input type="range" min="0" max="100" value={data.wmOp} onChange={event => data.setWmOp(+event.target.value)}/>
  </PanelShell>
}