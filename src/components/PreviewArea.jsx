import CardFront from './CardFront'
import CardBack from './CardBack'

export default function PreviewArea({ areaRef, frontRef, backRef, cardRef, data, t }) {
  return (
    <main className="max-w-[1500px] mx-auto px-5 py-6 md:pl-24 md:mr-[46%]">
      <section id="previewSection">
        <div className="preview-title print:hidden">Live Preview</div>
        <div id="previewArea" ref={areaRef} className="w-full">
          <div id="cardsRow">
            <div id="frontWrap" ref={frontRef} className="scale-wrap">
              <CardFront t={t} {...data} ref={cardRef} />
            </div>
            <div id="backWrap" ref={backRef} className="scale-wrap">
              <CardBack t={t} {...data} />
            </div>
          </div>
        </div>
        <p className="print:hidden text-center text-xs text-slate-400 mt-3">Card size: 85.6 × 54 mm (CR80).</p>
      </section>
    </main>
  )
}