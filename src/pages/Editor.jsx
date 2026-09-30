import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TEMPLATES } from '../data/schools'
import { useCardLayout } from '../hooks/useCardLayout'
import { useEditorState } from '../hooks/useEditorState'
import { exportCard } from '../lib/cardExport'
import EditorToolbar from '../components/EditorToolbar'
import EditorPanels from '../components/panels/EditorPanels'
import PreviewArea from '../components/PreviewArea'

export default function Editor() {
  const { schoolId = 'cbg' } = useParams()
  return <EditorWorkspace key={schoolId} schoolId={schoolId} />
}

function EditorWorkspace({ schoolId }) {
  const t = TEMPLATES[schoolId] || TEMPLATES.cbg
  const data = useEditorState(schoolId, t)
  const [panel, setPanel] = useState(null)
  const [view, setView] = useState('front')
  const areaRef = useRef(null)
  const frontRef = useRef(null)
  const backRef = useRef(null)
  const cardRef = useRef(null)
  useCardLayout({ areaRef, frontRef, backRef, view })
  useEffect(() => {
    const style = document.documentElement.style
    style.setProperty('--c-primary', t.colors.primary)
    style.setProperty('--c-accent', t.colors.accent)
    style.setProperty('--c-label', t.colors.label)
    style.setProperty('--c-school', t.colors.school)
  }, [t])

  const openPanel = name => setPanel(current => current === name ? null : name)
  const download = format => exportCard(format, view === 'back' ? 'back' : 'front', cardRef.current, data)
  const handleReset = () => {
    if (window.confirm('Reset this school?')) data.resetStudent()
  }
  return (
    <div className="bg-paper text-slate-700 font-sans min-h-screen">
      <header className="print:hidden bg-gradient-to-r from-darknavy via-navy to-royal text-white shadow-lg px-5 py-5 flex items-center gap-4">
        <Link to="/" className="text-sm bg-white/15 px-4 py-2 rounded-lg">Back to schools</Link>
        <div><h1 className="text-xl font-extrabold">Student ID Card Generator</h1>
          <p className="text-blue-100/80 text-sm">Editing: <b>{data.school.institute}</b></p></div>
      </header>
      <EditorToolbar onPrint={() => window.print()} onPNG={() => download('png')}
        onPDF={() => download('pdf')} onReset={handleReset} onPanel={openPanel}
        activePanel={panel} view={view} setView={setView} />
      <PreviewArea areaRef={areaRef} frontRef={frontRef} backRef={backRef}
        cardRef={cardRef} data={data} t={t} />
      <EditorPanels panel={panel} close={() => setPanel(null)} data={data} />
    </div>
  )
}