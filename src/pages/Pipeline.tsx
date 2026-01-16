
import React, { useState } from 'react';
import { KanbanColumn, UserRole, PipelineCard } from '../types';

interface PipelineProps {
  data: KanbanColumn[];
  reserveLeads: PipelineCard[];
  role: UserRole;
}

const Pipeline: React.FC<PipelineProps> = ({ data, reserveLeads, role }) => {
  const [view, setView] = useState<'active' | 'reserve'>('active');

  return (
    <div className="flex flex-col h-screen overflow-hidden pb-24 font-display">
      <header className="flex items-center justify-between px-2 h-16 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex bg-[#161b26] p-1.5 rounded-2xl border border-white/5 shadow-xl">
             <button 
               onClick={() => setView('active')}
               className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'active' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
             >
               Pipeline Activo
             </button>
             <button 
               onClick={() => setView('reserve')}
               className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'reserve' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
             >
               Reserva Estratégica ({reserveLeads.length})
             </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Sistema Zeus v4.0</span>
           <div className="size-2 bg-emerald-500 rounded-full animate-pulse"></div>
        </div>
      </header>

      <div className="flex-1 overflow-x-auto pb-8 hide-scrollbar">
        {view === 'reserve' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
             <div className="mb-10 flex items-center justify-between">
                <div>
                  <h3 className="text-amber-500 text-2xl font-black uppercase tracking-tighter italic flex items-center gap-3">
                     <span className="material-symbols-outlined text-3xl">database</span> Base de Datos de Reserva
                  </h3>
                  <p className="text-slate-500 text-[11px] mt-1 font-black uppercase tracking-widest">Almacenamiento permanente bajo protocolo del sistema</p>
                </div>
                <div className="bg-amber-500/10 px-5 py-2.5 rounded-2xl border border-amber-500/20 flex items-center gap-2">
                   <span className="material-symbols-outlined text-[16px] text-amber-500 animate-pulse">lock</span>
                   <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">Depósito Seguro</p>
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reserveLeads.length > 0 ? reserveLeads.map(l => (
                  <div key={l.id} className="bg-[#161b26] p-8 rounded-[2.5rem] border border-amber-500/20 shadow-2xl relative overflow-hidden group hover:border-amber-500/60 transition-all">
                     <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                        <span className="material-symbols-outlined text-[100px] text-amber-500 italic">history_toggle_off</span>
                     </div>
                     <div className="flex items-center gap-2 mb-3">
                        <div className="size-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_#f59e0b]"></div>
                        <p className="text-amber-500 text-[9px] font-black uppercase tracking-widest italic">Trabajo a Futuro: {l.type}</p>
                     </div>
                     <h4 className="text-white font-black text-2xl mb-5 tracking-tighter uppercase italic">{l.title}</h4>
                     
                     <div className="bg-[#0a0f18] p-5 rounded-[1.5rem] border border-white/5 mb-8 shadow-inner">
                        <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-2">Criterio de Permanencia</p>
                        <p className="text-slate-300 text-[13px] italic font-medium leading-relaxed">{l.validationReason || 'Pendiente de re-validación técnica por vigencia de contrato.'}</p>
                     </div>
                     
                     <div className="flex justify-between items-center border-t border-white/5 pt-5">
                        <div className="text-left">
                           <p className="text-[9px] text-slate-500 font-black uppercase tracking-tighter">Valor Reservado</p>
                           <p className="text-white font-black text-lg tabular-nums">{l.value}</p>
                        </div>
                        <button className="bg-white/5 hover:bg-white/10 text-slate-300 p-3 rounded-xl border border-white/10 transition-all">
                           <span className="material-symbols-outlined text-xl italic">edit_note</span>
                        </button>
                     </div>
                  </div>
                )) : (
                  <div className="col-span-full py-40 flex flex-col items-center justify-center opacity-20">
                     <span className="material-symbols-outlined text-[120px] mb-6 text-slate-700 italic">storage</span>
                     <p className="text-white font-black uppercase tracking-[0.4em] text-lg italic">Base de Reserva Vacía</p>
                  </div>
                )}
             </div>
          </div>
        ) : (
          <div className="flex gap-8 h-full animate-in slide-in-from-left-4 duration-500 px-2">
            {data.map((col) => (
              <div key={col.id} className="min-w-[340px] flex flex-col gap-5">
                <div className="flex items-center justify-between px-4">
                  <h3 className="text-[11px] font-black text-slate-200 uppercase tracking-[0.2em] flex items-center gap-2.5 italic">
                     <span className={`size-3 rounded-full ${col.color} shadow-lg shadow-current`}></span> {col.name}
                  </h3>
                  <div className="bg-white/5 text-slate-400 text-[9px] px-3 py-1.5 rounded-xl border border-white/10 font-black tracking-widest">{col.cards.length} OBJ</div>
                </div>
                <div className="flex-1 space-y-5 overflow-y-auto hide-scrollbar pb-20">
                  {col.cards.map(card => (
                    <div key={card.id} className="bg-[#161b26] p-7 rounded-[2.5rem] border border-white/5 shadow-xl group hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing hover:translate-y-[-4px]">
                       <div className="flex justify-between items-start mb-3">
                          <h4 className="text-white font-black text-base tracking-tight uppercase italic">{card.title}</h4>
                          <div className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 shrink-0">
                             <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
                             <span className="text-primary text-[8px] font-black uppercase tracking-widest">{card.probability}</span>
                          </div>
                       </div>
                       <p className="text-slate-500 text-[10px] uppercase font-black tracking-wider mb-6 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[14px]">next_plan</span> {card.nextStep}
                       </p>
                       <div className="flex justify-between items-end border-t border-white/5 pt-5">
                          <div>
                             <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-0.5">Valor Pipeline</p>
                             <span className="text-white font-black text-xl tabular-nums italic">{card.value}</span>
                          </div>
                          <div className="text-right">
                             <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mb-0.5">Capturado en</p>
                             <span className="text-[10px] text-slate-400 font-black uppercase italic">{card.date}</span>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pipeline;
