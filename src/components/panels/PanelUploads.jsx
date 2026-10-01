import PanelShell from './PanelShell'

const assets = [['leftLogo', 'Left logo'], ['rightLogo', 'Right logo'], ['watermark', 'Watermark'], ['signature', 'Signature']]

export default function PanelUploads({ close, data }) {
  return <PanelShell number="6" title="Uploads" close={close}>
    {assets.map(([field, label]) => {
      const setter = data[`set${field[0].toUpperCase()}${field.slice(1)}`]
      return <div key={field}>
        <label className="text-xs font-bold">{label}</label>
        <input type="file" accept="image/*" onChange={event => data.onFile(event, setter)}/>
        {data[field] && <div className="flex items-center gap-2 mt-2">
          <img src={data[field]} alt={`${label} preview`} className="w-16 h-16 object-contain border rounded"/>
          <button className="text-xs text-red-600" onClick={() => setter(null)}>Remove</button>
        </div>}
      </div>
    })}
  </PanelShell>
}