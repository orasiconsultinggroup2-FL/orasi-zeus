
import React, { useState } from 'react';
import { UserRole, PipelineCard } from '../types';

interface GovernanceProps {
  role: UserRole;
  pendingLeads: PipelineCard[];
  onValidate: (id: string, status: 'VALIDADO' | 'RESERVA', reason?: string) => void;
}

const Governance: React.FC<GovernanceProps> = ({ role, pendingLeads, onValidate }) => {
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [feedback, setFeedback] = useState<{ name: string, message: string } | null>(null);

  const selectedLead = pendingLeads.find(l => l.id === selectedLeadId);

  const runAnalysis = () => {
    if (!selectedLeadId || !selectedLead) return;
    setIsValidating(true);
    setFeedback(null);

    // Simulación de análisis AI basado en contrato
    setTimeout(() => {
      const termDate = new Date(selectedLead.contractTerm || '');
      const today = new Date();
      const diffMonths = (termDate.getFullYear() - today.getFullYear()) * 12 + (termDate.getMonth() - today.getMonth());

      let decision: 'VALIDADO' | 'RESERVA' = 'VALIDADO';
      let msg = '';

      if (diffMonths > 6) {
        decision = 'RESERVA';
        msg = `VIGENCIA EXTENSA: El contrato actual de "${selectedLead.title}" vence en ${diffMonths} meses. El activo se desplaza a RESERVA ESTRATÉGICA por baja urgencia operativa.`;
      } else {
        decision = 'VALIDADO';
        msg = `OPORTUNIDAD INMEDIATA: Vencimiento próximo para "${selectedLead.title}" (${diffMonths} meses). El activo se VALIDA para ejecución comercial inmediata en el Pipeline.`;
      }

      onValidate(selectedLeadId, decision, msg);
      setFeedback({ name: selectedLead.title, message: msg });
      setIsValidating(false);
      setSelectedLeadId('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="bg-[#161b26] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-6 mb-12">
          <div className="size-16 bg-primary rounded-3xl flex items-center justify-center text-white shadow-xl">
             <span className="material-symbols-outlined text-3xl">verified_user</span>
          </div>
          <div>
            <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter leading-none">Motor de Viabilidad Patrimonial</h2>
            <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mt-2 italic">IA Aplicada a la Selección de Activos Zeus</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0a0f18] p-8 rounded-3xl border border-white/5">
            <p className="text-primary text-[9px] font-black uppercase tracking-widest mb-3 italic">Seleccionar Objetivo Capturado</p>
            <select 
              value={selectedLeadId}
              onChange={(e) => setSelectedLeadId(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-lg font-black italic uppercase text-white focus:ring-0"
            >
              <option value="" className="bg-[#0a0f18]">--- Seleccionar de la Base de Radar ---</option>
              {pendingLeads.map(l => (
                <option key={l.id} value={l.id} className="bg-[#0a0f18]">{l.title} (Vence: {l.contractTerm})</option>
              ))}
            </select>
          </div>

          {selectedLead && (
            <div className="grid grid-cols-2 gap-6 animate-in slide-in-from-top-4">
              <div className="bg-[#0a0f18]/50 p-6 rounded-2xl border border-white/5">
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 italic">Tipo de Negocio</p>
                <p className="text-white font-black uppercase italic">{selectedLead.type}</p>
              </div>
              <div className="bg-[#0a0f18]/50 p-6 rounded-2xl border border-white/5">
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1 italic">Vencimiento de Contrato</p>
                <p className="text-white font-black uppercase italic">{selectedLead.contractTerm}</p>
              </div>
            </div>
          )}

          <div className="py-8 flex flex-col items-center justify-center opacity-30">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-slate-500 italic">Análisis Técnico de Vencimiento y ROI</p>
            <div className="h-[1px] w-20 bg-slate-500"></div>
          </div>

          <button 
            onClick={runAnalysis}
            disabled={!selectedLeadId || isValidating}
            className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-2xl font-black text-xs uppercase shadow-xl italic tracking-widest disabled:opacity-50 transition-all"
          >
            {isValidating ? 'Analizando Parámetros...' : 'Ejecutar Análisis AI de Viabilidad'}
          </button>
        </div>
      </div>

      {feedback && (
        <div className="bg-primary/10 border border-primary/20 p-10 rounded-[2.5rem] animate-in slide-in-from-bottom-6 duration-700">
          <div className="flex items-center gap-4 mb-4">
            <span className="material-symbols-outlined text-primary text-2xl animate-pulse">analytics</span>
            <div>
              <h4 className="text-primary text-[10px] font-black uppercase tracking-[0.4em] italic">Diagnóstico para:</h4>
              <p className="text-white font-black text-xl italic uppercase tracking-tighter">{feedback.name}</p>
            </div>
          </div>
          <div className="bg-[#0a0f18]/40 p-6 rounded-2xl border border-white/5 mb-6">
            <p className="text-slate-300 text-lg italic font-bold leading-relaxed">{feedback.message}</p>
          </div>
          <button 
            onClick={() => setFeedback(null)}
            className="bg-primary text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest italic transition-all hover:bg-primary/80"
          >
            Proceder con Despliegue
          </button>
        </div>
      )}
    </div>
  );
};

export default Governance;
