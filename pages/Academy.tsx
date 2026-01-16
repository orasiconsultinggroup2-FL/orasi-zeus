
import React, { useState } from 'react';
import { BeltLevel, UserRole } from '../types';
import { getAIInsights } from '../services/geminiService';

const ACADEMY_DATA: BeltLevel[] = [
  {
    level: 'Blanco',
    color: 'bg-slate-100 text-slate-900',
    modules: [
      { id: 'w1', title: 'Fundamentos Zeus v4.2', description: 'Navegación base y ética del protocolo MIMP.', completed: false },
      { id: 'w2', title: 'Captura Territorial Proporcional', description: 'Uso correcto del Radar 1km vs 25km.', completed: false },
      { id: 'w3', title: 'Registro de Leads B2B', description: 'Gestión de flotas en el Pipeline Corporativo.', completed: false },
      { id: 'w4', title: 'Compliance Hidrocarburos', description: 'Límites legales y operativos de bandera.', completed: false }
    ],
    achievement: 'Nivel Iniciado',
    opportunity: 'Complete el primer caso práctico para generar diagnóstico.'
  }
];

const Academy: React.FC = () => {
  const [activeBelt, setActiveBelt] = useState<number>(0);
  const [showEval, setShowEval] = useState<string | null>(null);
  const [evalResult, setEvalResult] = useState<string | null>(null);
  const [loadingEval, setLoadingEval] = useState(false);

  const belt = ACADEMY_DATA[activeBelt];

  const runEvaluation = async (moduleTitle: string) => {
    setLoadingEval(true);
    setEvalResult(null);
    try {
      const res = await getAIInsights(`Módulo "${moduleTitle}". Perfil FFVV. Escenario: Prospección en zona industrial de alta densidad.`);
      setEvalResult(res);
    } finally {
      setLoadingEval(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div>
          <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white leading-none">Academia Zeus</h2>
          <p className="text-primary text-[11px] font-black uppercase tracking-[0.4em] mt-4 italic">Especialización Estratégica v4.2</p>
        </div>
        
        <div className="flex bg-[#161b26] p-1.5 rounded-[2rem] border border-white/5">
           {['Blanco', 'Amarillo', 'Verde', 'Negro'].map((lvl, idx) => (
             <button 
               key={lvl}
               onClick={() => setActiveBelt(idx)}
               className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeBelt === idx ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-white'}`}
             >
               {lvl}
             </button>
           ))}
        </div>
      </header>

      {belt ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {belt.modules.map(m => (
                  <div key={m.id} className="bg-[#161b26] p-10 rounded-[3.5rem] border border-white/5 group relative overflow-hidden shadow-xl">
                      <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter mb-2">{m.title}</h3>
                      <p className="text-slate-500 text-[11px] font-bold italic mb-8">{m.description}</p>
                      <button 
                        onClick={() => { setShowEval(m.title); runEvaluation(m.title); }}
                        className="w-full bg-primary text-white py-5 rounded-2xl font-black text-[10px] uppercase shadow-lg shadow-primary/20 italic"
                      >
                        Iniciar Simulación
                      </button>
                  </div>
                ))}
              </div>
          </div>

          <div className="space-y-8">
              <div className="bg-[#161b26] p-10 rounded-[3.5rem] border border-white/5 shadow-2xl">
                <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 italic">Diagnóstico de Maestría</p>
                <h4 className="text-4xl font-black italic uppercase text-white mb-6">Nivel {belt.level}</h4>
                <div className="p-6 bg-[#0a0f18] rounded-2xl border border-white/5 space-y-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">ESTATUS</p>
                    <p className="text-xs italic text-slate-400 font-bold leading-relaxed">{belt.opportunity}</p>
                </div>
              </div>

              {showEval && (
                <div className="bg-primary/10 border border-primary/20 p-10 rounded-[3rem] relative animate-in slide-in-from-bottom-4 duration-500">
                  <button onClick={() => setShowEval(null)} className="absolute top-8 right-8 text-primary"><span className="material-symbols-outlined">close</span></button>
                  <h5 className="text-[10px] font-black uppercase text-primary mb-6 italic">Feedback AI: {showEval}</h5>
                  {loadingEval ? (
                    <div className="flex items-center gap-3">
                      <div className="size-4 bg-primary rounded-full animate-ping"></div>
                      <p className="text-[10px] font-black text-primary uppercase">Calculando Score Operativo...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                       <p className="text-white text-xs italic font-bold leading-relaxed">{evalResult}</p>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-3/4"></div>
                       </div>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
      ) : (
        <div className="bg-[#161b26] border border-white/5 p-20 rounded-[4rem] text-center">
           <h3 className="text-white font-black uppercase italic text-2xl">Módulo en Desarrollo</h3>
           <p className="text-slate-500 italic mt-2">Próximamente disponible para el perfil {UserRole.FFVV}</p>
        </div>
      )}
    </div>
  );
};

export default Academy;
