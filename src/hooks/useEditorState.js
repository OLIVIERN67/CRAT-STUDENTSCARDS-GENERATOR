import { useLocalState } from './useLocalStorage'
import { normalizePhoto } from '../lib/image'

const studentDefault = { name: '', klass: '', sex: '', dob: '', year: '' }
const contactDefault = {
  location: 'Western Province, Rubavu District, Gisenyi Sector',
  email: 'collegebaptistegacuba2@gmail.com', pobox: '463 Gisenyi',
  phone: '+250 781 508 248', issue: '', expiry: '',
}
const termsDefault = 'This card is the property of [INSTITUTION NAME].\nThis card must be carried by the student at all times on campus.\nThis card is non-transferable.\nLoss of this card must be reported immediately to the school administration.\nWhoever uses this card contrary to the law will be punished.'

export function useEditorState(id, template) {
  const [savedSchool, setSchool] = useLocalState(`cms_school_${id}`, template)
  const [student, setStudent] = useLocalState(`cms_student_${id}`, studentDefault)
  const [contact, setContact] = useLocalState(`cms_contact_${id}`, contactDefault)
  const [title, setTitle] = useLocalState(`cms_title_${id}`, 'STUDENT CARD')
  const [leftLogo, setLeftLogo] = useLocalState(`cms_leftLogo_${id}`, id === 'cbg' ? '/leftlogo.png' : null)
  const [rightLogo, setRightLogo] = useLocalState(`cms_rightLogo_${id}`, id === 'cbg' ? '/rightlogo.jpg' : null)
  const [photo, setPhoto] = useLocalState(`cms_photo_${id}`, null)
  const [watermark, setWatermark] = useLocalState(`cms_watermark_${id}`, null)
  const [signature, setSignature] = useLocalState(`cms_signature_${id}`, null)
  const [wmSize, setWmSize] = useLocalState(`cms_wmSize_${id}`, 32)
  const [wmOp, setWmOp] = useLocalState(`cms_wmOp_${id}`, 30)
  const [terms, setTerms] = useLocalState(`cms_terms_${id}`, termsDefault)
  const school = { ...template, ...savedSchool }

  const onFile = (event, setter, crop = false) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async () => setter(crop ? await normalizePhoto(reader.result) : reader.result)
    reader.readAsDataURL(file)
  }
  const resetStudent = () => { setStudent(studentDefault); setPhoto(null) }
  return { school, setSchool, student, setStudent, contact, setContact, title, setTitle,
    leftLogo, setLeftLogo, rightLogo, setRightLogo, photo, setPhoto, watermark, setWatermark,
    signature, setSignature, wmSize, setWmSize, wmOp, setWmOp, terms, setTerms, onFile, resetStudent }
}