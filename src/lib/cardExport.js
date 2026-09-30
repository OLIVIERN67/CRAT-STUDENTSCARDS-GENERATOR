export async function exportCard(format, side, frontElement, data) {
  const element = side === 'back' ? document.getElementById('cardBack') : frontElement
  if (!element) return
  const html2canvas = (await import('html2canvas-pro')).default
  await document.fonts.ready
  const wrapper = element.closest('.scale-wrap')
  const previous = { transform: wrapper.style.transform, display: wrapper.style.display }
  try {
    wrapper.style.transform = 'none'
    wrapper.style.display = 'block'
    await new Promise(resolve => setTimeout(resolve, 80))
    const canvas = await html2canvas(element, { scale: 4, backgroundColor: '#fff', useCORS: true })
    const filename = (data.school.institute || 'card').replace(/\s+/g, '_')
    if (format === 'png') return savePNG(canvas, `${filename}_${side}.png`)
    const { jsPDF } = await import('jspdf')
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [85.6, 53.98] })
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 85.6, 53.98)
    pdf.save(`${filename}_${side}.pdf`)
  } finally {
    wrapper.style.transform = previous.transform
    wrapper.style.display = previous.display
  }
}

function savePNG(canvas, filename) {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}