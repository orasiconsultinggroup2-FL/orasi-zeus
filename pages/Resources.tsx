
import React, { useState } from 'react';

const SECTIONS = [
  { id: 'dossier', title: 'Dossier Estratégico', icon: 'description' },
  { id: 'manual', title: 'Guía de Usuario', icon: 'menu_book' },
  { id: 'specs', title: 'Especificaciones v4.6', icon: 'settings_suggest' },
  { id: 'costo', title: 'Costo Cero ($0)', icon: 'account_balance_wallet' },
];

const Resources: React.FC = () => {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  const activeSection = SECTIONS.find(s => s.id === activeId) || SECTIONS[0];

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col items-center text-center space-y-4 mb-16">
        <div className="size-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center border border-white/10 shadow-2xl">
           <span className="material-symbols-outlined text-4xl text-primary italic">library_books</span>
        </div>
        <div>
          <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white leading-none">Repositorio ZEUS</h2>
          <p className="text-primary text-[11px] font-black uppercase tracking-[0.4em] italic mt-4">Manual de Operaciones y Soberanía Tecnológica</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* MENÚ DE SECCIONES */}
        <div className="space-y-3">
          {SECTIONS.map(s => (
            <button 
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`w-full flex items-center justify-between px-8 py-6 rounded-[2rem] transition-all border italic ${activeId === s.id ? 'bg-primary border-primary shadow-xl text-white translate-x-2' : 'bg-[#161b26] border-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined">{s.icon}</span>
                <span className="text-[12px] font-black uppercase tracking-widest">{s.title}</span>
              </div>
              {activeId === s.id && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          <div className="bg-[#161b26] p-12 rounded-[4rem] border border-white/5 shadow-2xl relative min-h-[750px] flex flex-col overflow-hidden">
            
            {activeId === 'costo' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500 relative z-10">
                <div className="border-b border-white/10 pb-8">
                  <h3 className="text-5xl font-black italic uppercase text-white tracking-tighter">Protocolo de Sustentabilidad</h3>
                  <p className="text-emerald-500 text-[11px] font-black uppercase mt-2 italic tracking-widest">Configuración $0 Operativa</p>
                </div>
                <div className="grid grid-cols-1 gap-8">
                  <div className="bg-emerald-500/10 p-10 rounded-[3rem] border border-emerald-500/20 shadow-xl">
                    <h4 className="text-emerald-500 uppercase text-xs font-black mb-6 flex items-center gap-3 italic">
                      <span className="material-symbols-outlined text-lg">verified</span> Google AI Studio Free Tier
                    </h4>
                    <p className="text-white text-base italic font-medium leading-relaxed mb-6">
                      El sistema ZEUS CCE está optimizado para operar dentro de las cuotas gratuitas de Google. Esto permite hasta <strong>1,500 solicitudes diarias</strong> sin costo de infraestructura.
                    </p>
                    <ul className="space-y-3 text-[11px] font-black uppercase text-slate-400 italic">
                      <li className="flex items-center gap-2"><span className="size-1.5 bg-emerald-500 rounded-full"></span> Costo de Nube: $0.00 USD</li>
                      <li className="flex items-center gap-2"><span className="size-1.5 bg-emerald-500 rounded-full"></span> Licenciamiento IA: Incluido</li>
                      <li className="flex items-center gap-2"><span className="size-1.5 bg-emerald-500 rounded-full"></span> Mantenimiento: Local-First</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeId === 'dossier' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500 relative z-10">
                <div className="border-b border-white/10 pb-8">
                  <h3 className="text-5xl font-black italic uppercase text-white tracking-tighter">Dossier: Estrategia CCE</h3>
                  <p className="text-primary text-[11px] font-black uppercase mt-2 italic tracking-widest">Visión 2024 - Francisco Anduaga</p>
                </div>
                <div className="space-y-8">
                  <section className="bg-[#0a0f18] p-10 rounded-[3rem] border border-white/5">
                    <h4 className="text-white uppercase text-lg border-l-4 border-primary pl-6 mb-6 font-black italic">1. Objetivo de Negocio</h4>
                    <p className="text-slate-400 font-bold italic text-sm leading-relaxed">Incrementar la captura de activos estratégicos mediante inteligencia geográfica, reduciendo el ciclo de validación de 15 días a solo 120 segundos mediante el motor Zeus.</p>
                  </section>
                  <section className="bg-[#0a0f18] p-10 rounded-[3rem] border border-white/5">
                    <h4 className="text-white uppercase text-lg border-l-4 border-primary pl-6 mb-6 font-black italic">2. Pilar de Gobernanza</h4>
                    <p className="text-slate-400 font-bold italic text-sm leading-relaxed">Centralización de la toma de decisiones basada en el ROI proyectado y la vigencia contractual del competidor.</p>
                  </section>
                </div>
              </div>
            )}

            {activeId === 'manual' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500 relative z-10">
                <div className="border-b border-white/10 pb-8">
                  <h3 className="text-5xl font-black italic uppercase text-white tracking-tighter">Guía de Usuario</h3>
                  <p className="text-amber-500 text-[11px] font-black uppercase mt-2 italic tracking-widest">Manual de Uso por Módulo Zeus v4.6</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "MANDO CENTRAL", obj: "Control Estratégico", desc: "Panel ejecutivo para Francisco Anduaga. Visualiza métricas de Expansión (Infraestructura), Crecimiento (Mercado) y Red (Cobertura Nacional)." },
                    { title: "RADAR DE CAMPO", obj: "Inteligencia Territorial", desc: "Localización de activos en tiempo real. Use comandos de voz o GPS para capturar estaciones de la competencia, flotas B2B o terrenos de expansión." },
                    { title: "GOBERNANZA AI", obj: "Análisis de Viabilidad", desc: "Motor de decisión inteligente. Evalúa el ROI y los meses restantes de contrato para validar el paso al Pipeline o el envío a Reserva Estratégica." },
                    { title: "PIPELINE TÁCTICO", obj: "Gestión de Flujo", desc: "Seguimiento Kanban del proceso comercial. Permite gestionar el avance de los activos validados y consultar la base de datos de reserva." },
                    { title: "MÉTRICAS ROI", obj: "Diagnóstico de Performance", desc: "Dashboard de KPIs de alto nivel. Monitoreo de tendencias de ingresos, market share y metas mensuales de la operación." },
                    { title: "GESTIÓN DE OFERTAS", obj: "Cierre de Operaciones", desc: "Módulo para la formalización de propuestas. Registro de montos, tipos de servicio y estatus de negociación para clientes B2B." }
                  ].map((m, idx) => (
                    <div key={idx} className="bg-[#0a0f18] p-8 rounded-[2.5rem] border border-white/5 group hover:border-amber-500/30 transition-all">
                      <p className="text-amber-500 font-black text-[10px] mb-2 italic uppercase tracking-widest opacity-60">Módulo {idx + 1}</p>
                      <h5 className="text-white font-black text-lg uppercase mb-1 italic tracking-tight">{m.title}</h5>
                      <p className="text-primary text-[9px] font-black uppercase tracking-widest mb-4 italic">Objetivo: {m.obj}</p>
                      <p className="text-slate-500 text-[11px] italic leading-relaxed font-bold">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeId === 'specs' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-500 relative z-10">
                <div className="border-b border-white/10 pb-8">
                  <h3 className="text-5xl font-black italic uppercase text-white tracking-tighter">Especificaciones Técnicas</h3>
                  <p className="text-slate-500 text-[11px] font-black uppercase mt-2 italic tracking-widest">Motor Zeus v4.6 • Core Gemini</p>
                </div>
                <div className="bg-[#0a0f18] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                  <table className="w-full text-left text-[12px] font-bold italic text-slate-400">
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/[0.02] transition-colors"><td className="py-8 px-10 text-white uppercase tracking-widest">IA Engine</td><td className="py-8 px-10">Gemini-3-Flash-Preview (Multimodal)</td></tr>
                      <tr className="hover:bg-white/[0.02] transition-colors"><td className="py-8 px-10 text-white uppercase tracking-widest">Data Layer</td><td className="py-8 px-10">LocalStorage Persistent API v4</td></tr>
                      <tr className="hover:bg-white/[0.02] transition-colors"><td className="py-8 px-10 text-white uppercase tracking-widest">Voice Engine</td><td className="py-8 px-10">Web Speech API Híbrida</td></tr>
                      <tr className="hover:bg-white/[0.02] transition-colors"><td className="py-8 px-10 text-white uppercase tracking-widest">Security</td><td className="py-8 px-10">Zero-Server Sovereignty Protocol</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="absolute bottom-[-100px] right-[-100px] opacity-[0.03] pointer-events-none transition-all group-hover:scale-110 duration-1000">
              <span className="material-symbols-outlined text-[600px] text-primary italic leading-none">{activeSection.icon}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
