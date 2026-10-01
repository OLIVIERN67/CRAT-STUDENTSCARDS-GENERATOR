import PanelShell from './PanelShell'

const fields = [['name', 'Name'], ['klass', 'Class'], ['sex', 'Sex'], ['dob', 'Date of birth'], ['year', 'Academic year']]

export default function PanelStudent({ close, data }) {
  const update = field => event => data.setStudent(student => ({ ...student, [field]: event.target.value }))
  return <PanelShell number="2" title="Student" close={close}>
    {fields.map(([field, label]) => <input key={field} className="field" placeholder={label}
      value={data.student[field]} onChange={update(field)}/>)}
    <label className="text-xs font-bold">Student photo</label>
    <input type="file" accept="image/*" onChange={event => data.onFile(event, data.setPhoto, true)}/>
    {data.photo && <img src={data.photo} alt="Student preview" className="w-24 h-32 object-cover rounded-lg border"/>}
  </PanelShell>
}