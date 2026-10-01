import { SCHOOL_MARKS, getSchoolKey } from '../lib/schoolCardTheme'

export default function SchoolCardLayer({ school, schoolKey = getSchoolKey(school), logo, side }) {
  const { initials, pattern } = SCHOOL_MARKS[schoolKey]
  const primary = school.colors.primary
  const accent = school.colors.accent
  const patternId = `card-pattern-${schoolKey}-${side}`
  const isBack = side === 'back'
  const layerOpacity = isBack ? 0.04 : 0.07
  const patternOpacity = isBack ? 0.035 : 0.05

  return (
    <svg className="school-card-layer" viewBox="0 0 1080 681" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={patternId} width="64" height="64" patternUnits="userSpaceOnUse">
          {pattern === 'arcs' && <g fill="none" stroke={primary} strokeWidth="1.5" opacity={patternOpacity}>
            <path d="M-32 64 A48 48 0 0 1 64 -32"/><path d="M-16 64 A64 64 0 0 1 64 -16"/><path d="M0 64 A80 80 0 0 1 64 0"/>
          </g>}
          {pattern === 'diagonal' && <path d="M-16 64 64 -16 M8 80 80 8" fill="none" stroke={accent} strokeWidth="1.5" opacity={patternOpacity}/>}
          {pattern === 'dots' && <g fill={primary} opacity={patternOpacity}><circle cx="8" cy="8" r="2"/><circle cx="32" cy="8" r="2"/><circle cx="56" cy="8" r="2"/><circle cx="8" cy="32" r="2"/><circle cx="32" cy="32" r="2"/><circle cx="56" cy="32" r="2"/><circle cx="8" cy="56" r="2"/><circle cx="32" cy="56" r="2"/><circle cx="56" cy="56" r="2"/></g>}
          {pattern === 'leaves' && <g fill="none" stroke={accent} strokeWidth="1.5" opacity={patternOpacity}>
            <path d="M-8 50 Q20 8 70 14 M10 56 Q28 24 52 20"/><path d="M20 34 Q8 18 2 18 Q4 31 20 34 M38 23 Q33 8 38 3 Q49 13 38 23 M48 20 Q57 6 63 7 Q61 19 48 20"/>
          </g>}
          {pattern === 'hexagons' && <path d="M16 2 30 10 V26 L16 34 2 26 V10 Z M48 34 62 42 V58 L48 66 34 58 V42 Z" fill="none" stroke={primary} strokeWidth="1.5" opacity={patternOpacity}/>}
          {pattern === 'ripples' && <g fill="none" stroke={primary} strokeWidth="1.5" opacity={patternOpacity}>
            <path d="M-12 18 Q12 2 36 18 T84 18 M-12 34 Q12 18 36 34 T84 34 M-12 50 Q12 34 36 50 T84 50"/>
          </g>}
          {pattern === 'shield' && <path d="M32 6 50 13 V30 Q48 45 32 56 Q16 45 14 30 V13 Z M32 14 43 18 V30 Q42 39 32 47 Q22 39 21 30 V18 Z" fill="none" stroke={primary} strokeWidth="1.5" opacity={patternOpacity}/>}
        </pattern>
      </defs>
      <path d="M0 188 C205 132 318 213 520 178 C720 144 875 158 1080 104 L1080 230 C874 280 722 253 526 286 C326 320 190 249 0 306 Z" fill={accent} opacity={layerOpacity}/>
      <path d="M1080 346 C884 294 756 334 590 376 C400 423 192 381 0 438 L0 514 C204 452 375 493 566 454 C770 413 923 404 1080 456 Z" fill={primary} opacity={layerOpacity * 0.72}/>
      <path d="M0 548 C202 500 320 540 474 520 C692 492 862 518 1080 474 L1080 681 L0 681 Z" fill={`url(#${patternId})`}/>
      {logo ? <image href={logo} x="628" y="238" width="410" height="410" preserveAspectRatio="xMidYMid meet" opacity={layerOpacity}/> :
        <text x="852" y="470" textAnchor="middle" dominantBaseline="middle" fill={primary} opacity={layerOpacity} fontFamily="Inter, Arial, sans-serif" fontSize="580" fontWeight="700">{initials}</text>}
    </svg>
  )
}