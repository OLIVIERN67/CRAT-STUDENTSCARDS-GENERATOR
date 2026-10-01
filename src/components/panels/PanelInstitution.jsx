import PanelShell from './PanelShell'

export default function PanelInstitution({ close, data }) {
  const update = field => event => data.setSchool(school => ({ ...school, [field]: event.target.value }))
  return <PanelShell number="1" title="Institution" close={close}>
    <input className="field" value={data.school.institute} onChange={update('institute')} placeholder="Institution"/>
    <input className="field" value={data.school.ministry} onChange={update('ministry')} placeholder="Ministry"/>
    <div className="grid grid-cols-2 gap-2">
      <input className="field" value={data.school.province} onChange={update('province')} placeholder="Province"/>
      <input className="field" value={data.school.district} onChange={update('district')} placeholder="District"/>
    </div>
  </PanelShell>
}