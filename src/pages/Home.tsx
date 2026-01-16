
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole, AppRoute } from '../types';

const TAB_DATA = {
  'Expansión': {
    title: 'Expansión (Estaciones Propias)',
    description: 'Gestión de activos inmobiliarios y construcción de red propia.',
    metrics: [
      { label: 'Proyectos de Inversión', value: '12', sub: '+2 en curso', icon: 'construction' },
      { label: 'Estaciones Propias', value: '18', sub: 'Sincronizado', icon: 'ev_station' },
      { label: 'Capex de Infraestructura', value: '$4.25M', sub: 'ROI Proyectado', icon: 'payments', isHighlight: true }
    ]
  },
  'Crecimiento': {
    title: 'Crecimiento de Mercado',
    description: 'Análisis de participación y nuevos contratos comerciales.',
    metrics: [
      { label: 'Market Share', value: '8.4%', sub: '+1.2% Q2', icon: 'trending_up' },
      { label: 'Nuevos Contratos', value: '45', sub: 'Activos', icon: 'assignment_turned_in' },
      { label: 'Facturación Mensual', value: '$1.8M', sub: 'Meta: $2M', icon: 'request_quote', isHighlight: true }
    ]
  },
  'Red': {
    title: 'Cobertura de Red Nacional',
    description: 'Distribución geográfica y terminales de despacho activo.',
    metrics: [
      { label: 'Puntos de Venta', value: '120', sub: 'Cobertura 85%', icon: 'hub' },
      { label: 'Terminales Activas', value: '4', sub: 'Operativas', icon: 'lan' },
      { label: 'Valor de Red', value: '$12.4M', sub: 'Valuación Actual', icon: 'account_balance', isHighlight: true }
    ]
  }
};

const Home: React.FC<{ role: UserRole }> = ({ role }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<keyof typeof TAB_DATA>('Expansión');
  const currentData = TAB_DATA[activeTab];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <div className="size-20 bg-primary rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-primary/40 border-t border-white/20">
             <span className="material-symbols-outlined text-4xl text-white italic">dashboard</span>
          </div>
          <div>
            <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white leading-none">Mando Central</h2>
            <p className="text-primary text-[11px] font-black uppercase tracking-[0.4em] mt-3 italic">Panel Ejecutivo Francisco Anduaga</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-emerald-500/10 px-6 py-3 rounded-2xl border border-emerald-500/20">
           <span className="material-symbols-outlined text-emerald-500 text-xl animate-pulse">eco</span>
           <div>
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest leading-none italic italic">Operación $0</p>
              <p className="text-white/40 text-[8px] font-black uppercase mt-1 tracking-widest">Soberanía de Datos</p>
           </div>
        </div>
      </header>

      <div className="flex flex-wrap gap-4 p-2 bg-[#161b26] rounded-3xl border border-white/5 w-fit shadow-2xl">
        {(Object.keys(TAB_DATA) as Array<keyof typeof TAB_DATA>).map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all italic ${activeTab === tab ? 'bg-primary text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[#161b26] p-12 rounded-[4rem] border border-white/5 shadow-2xl space-y-14 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover:opacity-10 transition-all duration-1000">
           <span className="material-symbols-outlined text-[160px] text-primary italic">rocket_launch</span>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none">{currentData.title}</h3>
          <p className="text-slate-500 text-[11px] font-bold italic mt-3 uppercase tracking-widest">{currentData.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
           {currentData.metrics.map((m, idx) => (
             <div 
               key={idx} 
               className={`${m.isHighlight ? 'bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30' : 'bg-[#0a0f18] border-white/5'} p-10 rounded-[3rem] border hover:border-primary/40 transition-all shadow-xl`}
             >
                <div className="flex items-center gap-4 mb-8">
                   <div className={`size-12 rounded-2xl ${m.isHighlight ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'} flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-2xl italic">{m.icon}</span>
                   </div>
                   <span className={`${m.isHighlight ? 'text-primary bg-primary/10 border-primary/20' : 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'} text-[9px] font-black px-3 py-1 rounded-full border uppercase tracking-widest italic`}>
                     {m.sub}
                   </span>
                </div>
                <p className={`${m.isHighlight ? 'text-primary' : 'text-slate-500'} text-[11px] font-black uppercase tracking-[0.3em] mb-1 italic`}>{m.label}</p>
                <p className={`${m.isHighlight ? 'text-primary' : 'text-white'} text-6xl font-black italic tracking-tighter leading-none`}>{m.value}</p>
                
                {m.isHighlight && (
                  <button 
                    onClick={() => navigate(AppRoute.KPIS)}
                    className="mt-8 flex items-center gap-3 bg-primary text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/80 transition-all italic w-full"
                  >
                     <span className="material-symbols-outlined text-sm">analytics</span>
                     Panel ROI
                  </button>
                )}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
