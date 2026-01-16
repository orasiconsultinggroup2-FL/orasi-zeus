
import React, { useState } from 'react';
import { UserRole, Offer } from '../types';

interface OffersProps {
  role: UserRole;
  offers: Offer[];
  onAddOffer: (offer: Offer) => void;
}

type OfferStep = 'LIST' | 'FORM' | 'PREVIEW';

const Offers: React.FC<OffersProps> = ({ role, offers, onAddOffer }) => {
  const [step, setStep] = useState<OfferStep>('LIST');
  const [newOffer, setNewOffer] = useState({ 
    client: '', 
    amount: '', 
    type: 'Suministro',
    recipient: '',
    recipientEmail: ''
  });

  const handleToPreview = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('PREVIEW');
  };

  const handleFinalSubmit = () => {
    onAddOffer({
      id: `OF-${Date.now()}`,
      client: newOffer.client,
      amount: `$${newOffer.amount}`,
      status: 'ENVIADA',
      date: new Date().toLocaleDateString(),
      type: newOffer.type,
      recipient: newOffer.recipient,
      recipientEmail: newOffer.recipientEmail
    });
    setStep('LIST');
    setNewOffer({ client: '', amount: '', type: 'Suministro', recipient: '', recipientEmail: '' });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">Gestión de Ofertas</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">Protocolo Corporativo FFVV</p>
        </div>
        {step === 'LIST' && (
          <button 
            onClick={() => setStep('FORM')}
            className="bg-primary text-white px-10 py-4 rounded-xl font-black text-[11px] uppercase shadow-lg shadow-primary/20 italic hover:scale-105 transition-all"
          >
            Nueva Oferta
          </button>
        )}
      </div>

      {step === 'FORM' && (
        <div className="fixed inset-0 bg-background-dark/80 backdrop-blur-md flex items-center justify-center z-[100] p-6">
           <div className="bg-[#161b26] p-10 rounded-[3rem] border border-white/10 shadow-2xl max-w-lg w-full space-y-6 animate-in zoom-in duration-300">
              <div className="flex items-center gap-4 mb-2">
                 <span className="material-symbols-outlined text-primary">edit_document</span>
                 <h3 className="text-2xl font-black italic uppercase text-white tracking-tighter">Configurar Oferta</h3>
              </div>
              <form onSubmit={handleToPreview} className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">Entidad Cliente</p>
                        <input 
                          type="text" 
                          placeholder="CORPORACIÓN ALPHA" 
                          className="w-full bg-[#0a0f18] border-none rounded-xl p-4 text-[11px] font-black italic uppercase text-white placeholder:text-slate-600 focus:ring-1 focus:ring-primary"
                          value={newOffer.client}
                          onChange={e => setNewOffer({...newOffer, client: e.target.value})}
                          required
                        />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">Monto (USD)</p>
                        <input 
                          type="number" 
                          placeholder="0.00" 
                          className="w-full bg-[#0a0f18] border-none rounded-xl p-4 text-[11px] font-black italic uppercase text-white placeholder:text-slate-600 focus:ring-1 focus:ring-primary"
                          value={newOffer.amount}
                          onChange={e => setNewOffer({...newOffer, amount: e.target.value})}
                          required
                        />
                    </div>
                 </div>

                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">Nombre del Destinatario (Responsable)</p>
                    <input 
                      type="text" 
                      placeholder="EJ: ING. RICARDO TOLEDO" 
                      className="w-full bg-[#0a0f18] border-none rounded-xl p-4 text-[11px] font-black italic uppercase text-white placeholder:text-slate-600 focus:ring-1 focus:ring-primary"
                      value={newOffer.recipient}
                      onChange={e => setNewOffer({...newOffer, recipient: e.target.value})}
                      required
                    />
                 </div>

                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">Correo Electrónico de Envío</p>
                    <input 
                      type="email" 
                      placeholder="CLIENTE@EMPRESA.COM" 
                      className="w-full bg-[#0a0f18] border-none rounded-xl p-4 text-[11px] font-black italic uppercase text-white placeholder:text-slate-600 focus:ring-1 focus:ring-primary"
                      value={newOffer.recipientEmail}
                      onChange={e => setNewOffer({...newOffer, recipientEmail: e.target.value})}
                      required
                    />
                 </div>

                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2 italic">Modelo de Contrato</p>
                    <select 
                      className="w-full bg-[#0a0f18] border-none rounded-xl p-4 text-[11px] font-black italic uppercase text-white focus:ring-1 focus:ring-primary"
                      value={newOffer.type}
                      onChange={e => setNewOffer({...newOffer, type: e.target.value})}
                    >
                        <option value="Suministro">Suministro Anual</option>
                        <option value="Lubricantes">Lubricantes Flota</option>
                        <option value="Inversión">Proyecto Expansión</option>
                    </select>
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setStep('LIST')} className="flex-1 py-4 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-all italic">Descartar</button>
                    <button type="submit" className="flex-1 bg-primary py-4 rounded-xl text-[10px] font-black uppercase text-white shadow-lg italic">Generar Preview</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {step === 'PREVIEW' && (
        <div className="fixed inset-0 bg-background-dark/90 backdrop-blur-xl flex items-center justify-center z-[110] p-6 overflow-y-auto">
           <div className="bg-white text-[#0a0f18] p-16 rounded-xl shadow-2xl max-w-2xl w-full space-y-10 animate-in slide-in-from-bottom-10 duration-500 relative border-t-8 border-primary">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <span className="material-symbols-outlined text-[120px]">verified</span>
              </div>
              
              <header className="border-b-2 border-[#0a0f18] pb-6 flex justify-between items-start">
                 <div>
                    <h4 className="text-3xl font-black italic uppercase tracking-tighter leading-none">Propuesta Táctica</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-60">Zeus Command Center • ID: {Date.now().toString().slice(-6)}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest">Fecha de Emisión</p>
                    <p className="font-black italic uppercase">{new Date().toLocaleDateString()}</p>
                 </div>
              </header>

              <div className="space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">Solicitante (FFVV)</p>
                       <p className="font-black italic uppercase text-sm">{role === UserRole.VP ? 'FRANCISCO ANDUAGA' : 'OPERADOR ZEUS'}</p>
                    </div>
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">Entidad Cliente</p>
                       <p className="font-black italic uppercase text-sm">{newOffer.client}</p>
                    </div>
                 </div>

                 <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-2">Atención Directa a:</p>
                    <div className="flex items-center gap-3">
                       <span className="material-symbols-outlined text-primary text-xl">person</span>
                       <div>
                          <p className="font-black italic uppercase text-base leading-none">{newOffer.recipient}</p>
                          <p className="text-[10px] font-bold text-slate-500 mt-1">{newOffer.recipientEmail}</p>
                       </div>
                    </div>
                 </div>

                 <div className="bg-slate-100 p-8 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Descripción del Servicio</p>
                       <span className="bg-[#0a0f18] text-white px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest">{newOffer.type}</span>
                    </div>
                    <p className="text-sm font-bold italic leading-relaxed">
                       Suministro integral de activos bajo protocolo Zeus v4.6. Esta oferta contempla la logística y el despliegue de soluciones energéticas según los parámetros capturados en el Radar Territorial.
                    </p>
                 </div>

                 <div className="flex justify-between items-end border-t border-slate-200 pt-6">
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Monto Total Estimado</p>
                       <p className="text-5xl font-black italic tracking-tighter">${Number(newOffer.amount).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[8px] font-black uppercase leading-none opacity-40">Validez</p>
                       <p className="text-[10px] font-black italic uppercase">15 Días Naturales</p>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-dashed border-slate-300">
                 <button 
                  onClick={() => setStep('FORM')} 
                  className="flex-1 py-4 text-[10px] font-black uppercase text-slate-500 hover:text-[#0a0f18] transition-all italic flex items-center justify-center gap-2"
                 >
                    <span className="material-symbols-outlined text-sm">edit</span> Corregir Datos
                 </button>
                 <button 
                  onClick={handleFinalSubmit} 
                  className="flex-1 bg-primary py-4 rounded-lg text-[10px] font-black uppercase text-white shadow-xl italic flex items-center justify-center gap-2 hover:bg-[#0a0f18] transition-colors"
                 >
                    <span className="material-symbols-outlined text-sm">mark_as_unread</span> Confirmar y Enviar
                 </button>
              </div>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-[#161b26] p-8 rounded-3xl border border-white/5">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 italic">Total Acumulado</p>
            <p className="text-4xl font-black italic text-white tracking-tighter">$213,500</p>
         </div>
         <div className="bg-[#161b26] p-8 rounded-3xl border border-white/5">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 italic">Tasa de Cierre</p>
            <p className="text-4xl font-black italic text-emerald-400 tracking-tighter">64.2%</p>
         </div>
         <div className="bg-[#161b26] p-8 rounded-3xl border border-white/5">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 italic">Activas</p>
            <p className="text-4xl font-black italic text-primary tracking-tighter">{offers.length}</p>
         </div>
      </div>

      <div className="bg-[#161b26] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
           <thead className="bg-[#1c222e] border-b border-white/5">
             <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
                <th className="px-10 py-6">Cliente / Destinatario</th>
                <th className="px-10 py-6">Monto</th>
                <th className="px-10 py-6 text-right">Estatus</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-white/5">
              {offers.map(o => (
                <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-10 py-8">
                     <p className="text-white font-black italic uppercase text-lg leading-none">{o.client}</p>
                     <p className="text-slate-500 text-[10px] font-black uppercase mt-1">ATTN: {o.recipient}</p>
                     <p className="text-primary text-[10px] font-black mt-2">{o.type} • {o.date}</p>
                  </td>
                  <td className="px-10 py-8 text-white font-black italic text-lg">{o.amount}</td>
                  <td className="px-10 py-8 text-right">
                     <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary/20 bg-primary/10 text-primary">
                        {o.status}
                     </span>
                  </td>
                </tr>
              ))}
              {offers.length === 0 && (
                <tr>
                   <td colSpan={3} className="px-10 py-20 text-center text-slate-600 italic font-black uppercase tracking-widest">No hay ofertas generadas en el periodo actual</td>
                </tr>
              )}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default Offers;
