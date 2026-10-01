import PanelShell from './PanelShell'

const fields = [['location', 'Location'], ['email', 'Email'], ['pobox', 'P.O. Box'], ['phone', 'Phone'], ['issue', 'Date of issue'], ['expiry', 'Date of expiry']]

export default function PanelContact({ close, data }) {
  const update = field => event => data.setContact(contact => ({ ...contact, [field]: event.target.value }))
  return <PanelShell number="4" title="Contact" close={close}>
    {fields.map(([field, label]) => <input key={field} className="field" type={field === 'issue' || field === 'expiry' ? 'date' : 'text'}
      placeholder={label} aria-label={label} value={data.contact[field]} onChange={update(field)}/>)}
  </PanelShell>
}