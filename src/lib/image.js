export function normalizePhoto(dataUrl) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      try {
        const S = 3, FW = 232 * S, FH = 298 * S, target = FW / FH
        const iw = img.naturalWidth, ih = img.naturalHeight, r = iw / ih
        let sx, sy, sw, sh
        if (r > target) { sh = ih; sw = ih * target; sx = (iw - sw) / 2; sy = 0 }
        else { sw = iw; sh = iw / target; sx = 0; sy = (ih - sh) / 2 }
        const c = document.createElement('canvas'); c.width = FW; c.height = FH
        c.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, FW, FH)
        resolve(c.toDataURL('image/png'))
      } catch { resolve(dataUrl) }
    }
    img.onerror = () => resolve(dataUrl)
    img.src = dataUrl
  })
}

export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = e => resolve(e.target.result)
    fr.onerror = reject
    fr.readAsDataURL(file)
  })
}