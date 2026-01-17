import React, { useState, useRef, useEffect } from 'react';
import { getAresResponse } from '../services/geminiService';
import { UserProfile } from '../../types';


const STORAGE_KEY = 'zeus_ares_history';

export const SupportAgent: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ares' | 'user', text: string}[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      {role: 'ares', text: `Operador ${user.name} detectado. Soy ARES. ¿En qué táctica de ZEUS necesitas apoyo hoy?`}
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Fix: Explicitly type the initial message array to resolve TypeScript 'role' string mismatch error.
  const handleClearHistory = () => {
    if (window.confirm("¿Confirmar limpieza de memoria de ARES?")) {
      const initial: {role: 'ares' | 'user', text: string}[] = [{role: 'ares', text: `Memoria reseteada. Operador ${user.name}, ¿cuál es el nuevo objetivo?`}];
      setMessages(initial);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    const newMessages = [...messages, { role: 'user' as const, text: userText }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    const apiHistory = newMessages.map(m => ({
  role: m.role === 'user' ? 'user' : 'model',
  parts: [{ text: m.text }]
}));

    const response = await getAresResponse(apiHistory, user);
    
    setMessages(prev => [
  ...prev,
  { role: 'ares', text: response }
]);

    setIsTyping(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 size-16 bg-primary rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center z-[200] hover:scale-110 active:scale-95 transition-all border border-white/20"
      >
        <span className="material-symbols-outlined text-white text-3xl italic">{isOpen ? 'close' : 'smart_toy'}</span>
        {!isOpen && <span className="absolute -top-1 -right-1 size-4 bg-emerald-500 rounded-full border-2 border-background-dark animate-pulse"></span>}
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-96 h-[550px] bg-[#161b26]/95 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl z-[200] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <header className="bg-primary p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl italic">bolt</span>
              </div>
              <div>
                <p className="text-white font-black text-xs uppercase tracking-widest leading-none">ARES • Operador {user.name}</p>
                <p className="text-white/60 text-[8px] font-black uppercase mt-1 tracking-widest">Unidad: {user.unit}</p>
              </div>
            </div>
            <button 
              onClick={handleClearHistory}
              className="size-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 hide-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] font-bold italic leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none shadow-lg' 
                  : 'bg-[#0a0f18] text-slate-300 border border-white/5 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#0a0f18] p-4 rounded-2xl border border-white/5 flex gap-1 items-center">
                  <div className="size-1 bg-primary rounded-full animate-bounce"></div>
                  <div className="size-1 bg-primary rounded-full animate-bounce delay-100"></div>
                  <div className="size-1 bg-primary rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-4 bg-[#0a0f18] border-t border-white/5 flex gap-2">
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Consulta táctica..."
              className="flex-1 bg-white/5 border-none rounded-xl px-4 py-3 text-[11px] font-black text-white italic placeholder:text-slate-600 focus:ring-1 focus:ring-primary transition-all"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              disabled={isTyping}
              className="bg-primary size-10 rounded-xl flex items-center justify-center text-white disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
};
