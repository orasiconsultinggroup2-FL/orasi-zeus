
import React, { useState, useRef } from 'react';
import { UserRole, PipelineCard, ScanResult } from '../types';
import { parseVoiceCommand, generateRealisticLeads } from '../services/geminiService';

interface RadarProps {
  onAddLead: (lead: PipelineCard) => void;
  results: ScanResult[];
  setResults: (res: ScanResult[]) => void;
  role: UserRole;
  capturedLeads: PipelineCard[];
}

const Radar: React.FC<RadarProps> = ({ onAddLead, results, setResults, role, capturedLeads }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [range, setRange] = useState<'1km' | '5km' | '10km' | '25km'>('1km');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const scan = async () => {
    if (!searchInput.trim()) {
      setError("INGRESE UBICACIÓN O ACTIVE GPS");
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setError(null);
    setIsScanning(true);
    // Ya no hay contexto por defecto; usamos estrictamente lo que hay en searchInput
    const aiLeads = await generateRealisticLeads(searchInput);
    setResults(aiLeads);
    setIsScanning(false);
  };

  const handleGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setSearchInput(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        setError(null);
      }, () => alert("Permiso de GPS denegado."));
    }
  };

  const toggleVoiceSearch = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Navegador no compatible con voz.");
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      const parsedLocation = await parseVoiceCommand(transcript);
      setSearchInput(parsedLocation);
      setError(null);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const filteredResults = activeFilter === 'ALL' 
    ? results 
    : results.filter(r => r.type === activeFilter);

  const isButtonDisabled = isScanning || !searchInput.trim();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black tracking-tighter italic uppercase text-white leading-none">Radar Zeus v4.6</h2>
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mt-3 italic flex items-center gap-2">
             <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span> Geolocalización FFVV Francisco Anduaga
          </p>
        </div>
        
        <div className="flex-1 max-w-2xl flex gap-2">
           <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">location_on</span>
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="UBICACIÓN O COMANDO DE VOZ..."
                className={`w-full bg-[#161b26] border rounded-2xl py-5 pl-12 pr-14 text-xs font-black italic text-white placeholder:text-slate-600 focus:border-primary outline-none shadow-xl transition-colors ${error ? 'border-rose-500/50 shadow-rose-500/10' : 'border-white/10'}`}
              />
              <button 
                onClick={toggleVoiceSearch}
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all p-2 rounded-lg ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-slate-500 hover:text-primary'}`}
              >
                <span className="material-symbols-outlined">mic</span>
              </button>
           </div>
           <button onClick={handleGPS} className="bg-[#161b26] p-5 rounded-2xl border border-white/10 hover:border-primary transition-all text-primary shadow-xl">
              <span className="material-symbols-outlined">my_location</span>
           </button>
        </div>
      </header>

      <div className="bg-[#161b26] p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-8">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
          <div className="flex gap-2 bg-[#0a0f18] p-2 rounded-2xl border border-white/5">
            {['1km', '5km', '10km', '25km'].map(r => (
              <button 
                key={r}
                onClick={() => setRange(r as any)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all italic ${range === r ? 'bg-primary text-white' : 'text-slate-500 hover:text-white'}`}
              >
                {r}
              </button>
            ))}
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={scan}
              disabled={isButtonDisabled}
              className={`px-12 py-5 rounded-2xl font-black text-[12px] uppercase shadow-2xl italic transition-all ${isButtonDisabled ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20 hover:scale-[1.02]'}`}
            >
              {isScanning ? 'PROCESANDO UBICACIÓN...' : error ? error : 'EJECUTAR ESCANEO TÁCTICO'}
            </button>
            {error && <p className="text-rose-500 text-[9px] font-black uppercase animate-bounce">{error}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Resultados Detectados ({filteredResults.length})</h3>
            {results.length > 0 && (
              <button onClick={() => setResults([])} className="text-rose-500 text-[8px] font-black uppercase tracking-widest border border-rose-500/20 px-2 py-1 rounded-lg hover:bg-rose-500/10 transition-all">Limpiar Radar</button>
            )}
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto hide-scrollbar p-1">
            {filteredResults.length > 0 ? filteredResults.map(t => {
              const isCaptured = capturedLeads.some(l => l.id === t.id);
              return (
                <div key={t.id} className="bg-[#161b26] p-8 rounded-[3rem] border border-white/5 flex items-center justify-between group hover:border-primary/40 transition-all shadow-xl animate-in slide-in-from-left-4">
                  <div>
                    <h4 className="text-xl font-black italic uppercase text-white tracking-tight">{t.name}</h4>
                    <p className={`text-[10px] font-black uppercase tracking-widest mt-1 text-primary`}>{t.type} • Distancia: {t.dist}</p>
                    <div className="flex gap-4 mt-3">
                       <p className="text-[9px] text-slate-500 font-black uppercase italic">VALOR: <span className="text-white">{t.value}</span></p>
                       <p className="text-[9px] text-slate-500 font-black uppercase italic">VENCE: <span className="text-white">{t.term}</span></p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onAddLead({ id: t.id, title: t.name, status: 'PENDIENTE', probability: '85%', value: t.value, owner: role, nextStep: 'Gobernanza AI', date: 'HOY', type: t.type as any, contractTerm: t.term })}
                    disabled={isCaptured}
                    className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase transition-all italic border ${isCaptured ? 'border-emerald-500/50 text-emerald-500 bg-emerald-500/5' : 'bg-primary text-white border-primary shadow-lg shadow-primary/20'}`}
                  >
                    {isCaptured ? 'EN LISTA' : 'CAPTURAR'}
                  </button>
                </div>
              );
            }) : (
              <div className="py-20 flex flex-col items-center justify-center opacity-20 border border-dashed border-white/10 rounded-[3rem]">
                 <span className="material-symbols-outlined text-6xl mb-4 italic">radar</span>
                 <p className="text-white font-black uppercase tracking-[0.2em] text-[10px] italic">Esperando Ubicación para Escanear</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] italic px-4">Capturas del Operador ({capturedLeads.length})</h3>
          <div className="bg-[#161b26] p-10 rounded-[4rem] border border-white/5 h-[600px] overflow-y-auto hide-scrollbar space-y-4 shadow-2xl">
            {capturedLeads.map(l => (
              <div key={l.id} className="bg-[#0a0f18] p-6 rounded-3xl border border-white/5 flex justify-between items-center group">
                <div>
                  <p className="text-white font-black text-base uppercase italic tracking-tight">{l.title}</p>
                  <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest mt-1 italic">{l.type} • {l.status}</p>
                </div>
                <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-sm italic">inventory_2</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Radar;
