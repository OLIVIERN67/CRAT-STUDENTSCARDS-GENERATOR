export const SCHOOL_MARKS = {
  cbg: { initials: 'CBG', pattern: 'arcs' },
  'shwemu-tss-b': { initials: 'SH', pattern: 'diagonal' },
  'gs-gacuba-ii': { initials: 'G2', pattern: 'dots' },
  busasamana: { initials: 'BA', pattern: 'leaves' },
  'bumba-tvet': { initials: 'BU', pattern: 'hexagons' },
  'gs-busigari': { initials: 'GB', pattern: 'ripples' },
  trinite: { initials: 'TR', pattern: 'shield' },
}

export function getSchoolKey(school) {
  if (school.institute.includes('College Baptiste')) return 'cbg'
  if (school.institute === 'SHWEMU TSS B') return 'shwemu-tss-b'
  if (school.institute === 'GS GACUBA II') return 'gs-gacuba-ii'
  if (school.institute === 'BUSASAMANA') return 'busasamana'
  if (school.institute === 'BUMBA TVET') return 'bumba-tvet'
  if (school.institute === 'GS BUSIGARI') return 'gs-busigari'
  return 'trinite'
}