
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell, AreaChart, Area } from 'recharts';
import { UserRole, AppRoute } from '../types';

const dataMonthlyExec = [
  { name: 'ENE', value: 400 }, { name: 'FEB', value: 600 }, { name: 'MAR', value: 850 },
  { name: 'ABR', value: 700 }, { name: 'MAY', value: 750 }, { name: 'JUN', value: 950 },
];
const dataMonthlyOps = [
  { name: 'ENE', value: 200 }, { name: 'FEB', value: 400 }, { name: 'MAR', value: 300 },
  { name: 'ABR', value: 500 }, { name: 'MAY', value: 600 }, { name: 'JUN', value: 450 },
];

const dataTrend = [
  { name: 'D1', val: 20 }, { name: 'D2', val: 40 }, { name: 'D3', val: 30 },
  { name: 'D4', val: 60 }, { name: 'D5', val: 50 }, { name: 'D6', val: 80 },
  { name: 'D7', val: 70 }, { name: 'D8', val: 90 },
];

const KPIs: React.FC<{ role: UserRole }> = ({ role }) => {
  const navigate = useNavigate();
  // Fix: UserRole.DIRECTIVO does not exist, using UserRole.VP as the executive role
  const [activeTier, setActiveTier] = useState<'exec' | 'ops'>(role === UserRole.VP ? 'exec' : 'ops');

  const currentData = activeTier === 'exec' ? dataMonthlyExec : dataMonthlyOps;

  return (
    <div className="min-h-screen pb-32 bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-white/5 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(AppRoute.HOME)} className="text-slate-900 dark:text-white size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-white/10 transition-colors"><span className="material-symbols-outlined">dashboard</span></button>
          <h2 className="text-slate-900 dark:text-white text-lg font-black tracking-tight uppercase">Métricas de Comando - {role}</h2>
        </div>
        <button className="size-10 flex items-center justify-center text-slate-500 relative hover:text-primary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-rose-500 rounded-full border-2 border-background-dark"></span>
        </button>
      </header>

      <main className="px-6 pt-6 space-y-6">
        <div className="flex h-12 w-full max-w-lg items-center justify-center rounded-2xl bg-slate-200 dark:bg-white/5 p-1.5 border border-slate-300 dark:border-white/5 shadow-inner">
          <button 
            onClick={() => setActiveTier('exec')}
            className={`flex h-full grow items-center justify-center rounded-xl px-2 transition-all text-xs font-black uppercase tracking-widest ${activeTier === 'exec' ? 'bg-white dark:bg-background-dark shadow-lg text-primary' : 'text-slate-500 hover:text-slate-300'}`}
          >
            VP / Ejecutivo
          </button>
          <button 
            onClick={() => setActiveTier('ops')}
            className={`flex h-full grow items-center justify-center rounded-xl px-2 transition-all text-xs font-black uppercase tracking-widest ${activeTier === 'ops' ? 'bg-white dark:bg-background-dark shadow-lg text-primary' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Operativo
          </button>
        </div>

        <div className="flex flex-col rounded-3xl bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/5 shadow-xl p-6 gap-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Tendencia 45 Días</p>
              <h4 className="text-slate-900 dark:text-white text-2xl font-black tracking-tighter">Crecimiento de Ingresos</h4>
            </div>
            <div className="text-emerald-400 flex items-center gap-1 font-black text-sm bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>+12.4%
            </div>
          </div>

          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={dataTrend}>
                 <defs>
                   <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#135bec" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#135bec" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <Area type="monotone" dataKey="val" stroke="#135bec" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
               </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 dark:border-white/5">
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Actual</p>
              <p className="text-base font-black text-slate-900 dark:text-white tabular-nums">$1.24M</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Base</p>
              <p className="text-base font-black text-slate-400 tabular-nums">$900k</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-primary font-black uppercase tracking-widest mb-1">Meta</p>
              <p className="text-base font-black text-primary tabular-nums">$1.5M</p>
            </div>
          </div>
          <button 
            onClick={() => navigate(AppRoute.GOVERNANCE)}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl font-black text-sm uppercase tracking-[0.15em] shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
          >
            Ir a Gobernanza
          </button>
        </div>

        <div className="rounded-3xl bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-white/5 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-slate-900 dark:text-white text-lg font-black tracking-tight">Velocidad de Pipeline</h5>
            <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
              Vista YTD
            </button>
          </div>
          <div className="h-48 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 800, fill: '#64748b'}} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {currentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === currentData.length - 1 ? '#135bec' : '#1e293b'} fillOpacity={index === currentData.length - 1 ? 1 : 0.4} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KPIs;
