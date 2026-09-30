import { useLayoutEffect, useCallback } from 'react'

const CARD_W = 1080, CARD_H = 681, GAP = 28

export function useCardLayout({ areaRef, frontRef, backRef, view }) {
  const layout = useCallback(() => {
    const area = areaRef.current, fw = frontRef.current, bw = backRef.current
    if (!area || !fw || !bw) return
    const isFixed = window.matchMedia('(min-width: 768px)').matches
    const availW = area.clientWidth - 48
    const availH = area.clientHeight - 48
    let h = 0

    if (view === 'both') {
      const sideBySide = availW >= CARD_W * 2 + GAP
      const s = sideBySide
        ? Math.min((availW - GAP) / 2 / CARD_W, availH / CARD_H, 1)
        : Math.min(availW / CARD_W, availH / CARD_H, 1)
      fw.style.transform = `scale(${s})`; fw.style.transformOrigin = 'center center'
      bw.style.transform = `scale(${s})`; bw.style.transformOrigin = 'center center'
      h = CARD_H * s * (sideBySide ? 1 : 2) + (sideBySide ? 0 : GAP)
    } else {
      const s = Math.min(availW / CARD_W, availH / CARD_H, 1)
      const target = view === 'front' ? fw : bw
      const other = view === 'front' ? bw : fw
      target.style.transform = `scale(${s})`; target.style.transformOrigin = 'center center'
      other.style.transform = 'scale(1)'
      h = CARD_H * s
    }
    fw.style.display = view === 'back' ? 'none' : 'block'
    bw.style.display = view === 'front' ? 'none' : 'block'
    area.style.height = isFixed ? '' : `${Math.round(h + 56)}px`
  }, [areaRef, frontRef, backRef, view])

  useLayoutEffect(() => {
    layout()
    const ro = new ResizeObserver(layout)
    if (areaRef.current) ro.observe(areaRef.current)
    window.addEventListener('resize', layout)
    return () => { ro.disconnect(); window.removeEventListener('resize', layout) }
  }, [layout, areaRef])

  return layout
}