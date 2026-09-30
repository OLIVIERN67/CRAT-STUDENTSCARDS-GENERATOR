import PanelInstitution from './PanelInstitution'
import PanelStudent from './PanelStudent'
import PanelTitle from './PanelTitle'
import PanelContact from './PanelContact'
import PanelTerms from './PanelTerms'
import PanelUploads from './PanelUploads'

const panelComponents = {
  inst: PanelInstitution, student: PanelStudent, titlewm: PanelTitle,
  contact: PanelContact, terms: PanelTerms, uploads: PanelUploads,
}

export default function EditorPanels({ panel, close, data }) {
  const Panel = panelComponents[panel]
  return Panel ? <Panel close={close} data={data} /> : null
}