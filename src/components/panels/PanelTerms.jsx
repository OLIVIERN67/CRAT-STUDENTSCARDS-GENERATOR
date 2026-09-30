import PanelShell from './PanelShell'

export default function PanelTerms({ close, data }) {
  return <PanelShell number="5" title="Terms & conditions" close={close}>
    <textarea className="field" rows="8" value={data.terms} onChange={event => data.setTerms(event.target.value)}/>
  </PanelShell>
}