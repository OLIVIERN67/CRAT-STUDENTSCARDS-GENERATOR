export const TEMPLATES = {
  cbg: { name:'College Baptiste Gacuba II', institute:'College Baptiste Gacuba II TVET School', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#6484E7',accent:'#FFD600',label:'#1E40AF',school:'#1746D1'}, wave:false },
  'gs-gacuba-ii': { name:'GS GACUBA II', institute:'GS GACUBA II', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#1D4ED8',accent:'#FACC15',label:'#1E3A8A',school:'#1D4ED8'}, wave:false },
  'busasamana': { name:'BUSASAMANA', institute:'BUSASAMANA', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#0F766E',accent:'#A7F3D0',label:'#115E59',school:'#0F766E'}, wave:false },
  'bumba-tvet': { name:'BUMBA TVET', institute:'BUMBA TVET', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#292524',accent:'#F97316',label:'#7C2D12',school:'#292524'}, wave:false },
  'shwemu-tss-b': { name:'SHWEMU TSS B', institute:'SHWEMU TSS B', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#1E2A5E',accent:'#F59E0B',label:'#1E2A5E',school:'#1E2A5E'}, wave:true },
  'gs-busigari': { name:'GS BUSIGARI', institute:'GS BUSIGARI', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#065F46',accent:'#D6B45C',label:'#064E3B',school:'#065F46'}, wave:false },
  trinite: { name:'Groupe Scolaire de la Trinite', institute:'GROUPE SCOLAIRE DE LA TRINITE', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#7F1D3D',accent:'#F5E9D3',label:'#64152F',school:'#7F1D3D'}, wave:false },
}

// Home cards (presentation only — id must match TEMPLATES keys)
export const SCHOOL_CARDS = [
  { id:'cbg', name:'College Baptiste Gacuba II TVET School', short:'CBG', color:'#003B73', accent:'#FFD600', desc:'Full card editor — front & back, HD PNG & PDF, print.' },
  { id:'gs-gacuba-ii', name:'GS GACUBA II', short:'G2', color:'#0ea5e9', desc:'Standalone card editor for GS GACUBA II — isolated data.' },
  { id:'busasamana', name:'GS BUSASAMANA', short:'BA', color:'#10b981', desc:'Standalone card editor for BUSASAMANA.' },
  { id:'bumba-tvet', name:'BUMBA TVET', short:'BU', color:'#f59e0b', desc:'Standalone card editor for BUMBA TVET.' },
  { id:'shwemu-tss-b', name:'SHWEMU TSS B', short:'SH', color:'#1E2A5E', accent2:'#F59E0B', desc:'Modern wave design — standalone, isolated data.', wave:true },
  { id:'gs-busigari', name:'GS BUSIGARI', short:'GB', color:'#e11d48', desc:'Standalone card editor for GS BUSIGARI.' },
  { id:'trinite', name:'Groupe Scolaire de la Trinite', short:'TR', color:'#1d4ed8', desc:'Single-card editor — update details, upload photo, download or print.' },
]