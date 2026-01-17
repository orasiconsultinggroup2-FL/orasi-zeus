
import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppRoute, PipelineCard, KanbanColumn, UserRole, Offer, ScanResult, UserProfile } from './types.ts';
import Home from './pages/Home';
import Pipeline from './pages/Pipeline';
import Radar from './pages/Radar';
import KPIs from './pages/KPIs';
import Governance from './pages/Governance';
import Resources from './pages/Resources';
import Offers from './pages/Offers';
import Academy from './pages/Academy';
import { SupportAgent } from './components/SupportAgent';

// Componente de recuperación ante fallos críticos
// Fix: Explicitly define Props and State interfaces for the class component to satisfy TypeScript's component requirement.
interface ZeusErrorBoundaryProps {
  children?: ReactNode;
}

interface ZeusErrorBoundaryState {
  hasError: boolean;
}

class ZeusErrorBoundary extends Component<ZeusErrorBoundaryProps, ZeusErrorBoundaryState> {
  constructor(props: ZeusErrorBoundaryProps) {
    super(props);
    // Fix: Correctly initialize state property
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError() { 
    return { hasError: true }; 
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Fallo crítico detectado en Núcleo Zeus:", error, errorInfo);
  }
  
  render() {
    // Fix: Access state and props via 'this' safely within the class instance
    if (this.state.hasError) {
      return (
        <div className="h-screen bg-[#0a0f18] flex items-center justify-center p-10 text-center">
          <div className="max-w-md space-y-6">
            <span className="material-symbols-outlined text-rose-500 text-6xl">emergency_home</span>
            <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">Recuperación de Sistema</h2>
            <p className="text-slate-500 text-sm font-bold italic">Se ha detectado una anomalía en el renderizado. El protocolo de seguridad ha aislado el error para proteger tus datos.</p>
            <button onClick={() => window.location.reload()} className="bg-primary px-8 py-4 rounded-2xl text-[10px] font-black uppercase text-white shadow-xl">Reiniciar Núcleo</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const DEMO_LEADS: PipelineCard[] = [
  { id: 'D1', title: 'EDS Primax Norte', status: 'PENDIENTE', probability: '85%', value: '$2.8M', owner: UserRole.VP, nextStep: 'Gobernanza AI', date: '12/05/24', type: 'COMPETENCIA', contractTerm: '2025-06-15' },
  { id: 'D2', title: 'Logística TransOriental', status: 'VALIDADO', probability: '92%', value: '$120k', owner: UserRole.VP, nextStep: 'Cierre de Contrato', date: '10/05/24', type: 'B2B', contractTerm: '2024-12-01' }
];

const INITIAL_PIPELINE: KanbanColumn[] = [
  { id: 'c1', name: 'Prospección', color: 'bg-blue-400', totalValue: '$2.8M', cards: [] },
  { id: 'c2', name: 'Validación', color: 'bg-indigo-400', totalValue: '$120k', cards: [DEMO_LEADS[1]] },
  { id: 'c3', name: 'Cierre', color: 'bg-amber-400', totalValue: '$0', cards: [] },
  { id: 'c4', name: 'Instalación', color: 'bg-emerald-400', totalValue: '$0', cards: [] }
];

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('zeus_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });

  const [pipelineData, setPipelineData] = useState<KanbanColumn[]>(() => {
    try {
      const saved = localStorage.getItem('zeus_pipeline');
      return saved ? JSON.parse(saved) : INITIAL_PIPELINE;
    } catch (e) { return INITIAL_PIPELINE; }
  });

  const [allLeads, setAllLeads] = useState<PipelineCard[]>(() => {
    try {
      const saved = localStorage.getItem('zeus_all_leads');
      return saved ? JSON.parse(saved) : DEMO_LEADS;
    } catch (e) { return DEMO_LEADS; }
  });

  const [results, setResults] = useState<ScanResult[]>([]);
  const [offers, setOffers] = useState<Offer[]>(() => {
    try {
      const saved = localStorage.getItem('zeus_offers');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem('zeus_user', JSON.stringify(user));
      localStorage.setItem('zeus_pipeline', JSON.stringify(pipelineData));
      localStorage.setItem('zeus_all_leads', JSON.stringify(allLeads));
      localStorage.setItem('zeus_offers', JSON.stringify(offers));
    } catch (e) {}
  }, [user, pipelineData, allLeads, offers]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const role = fd.get('role') as UserRole;
    setUser({ 
      name: role === UserRole.VP ? "Francisco Anduaga" : "Agente FFVV", 
      role, 
      unit: "OPERACIÓN CENTRAL" 
    });
  };

  const addLead = (l: PipelineCard) => {
    if (!l.id) return;
    setAllLeads(prev => [l, ...prev]);
  };

  const validateLead = (id: string, status: 'VALIDADO' | 'RESERVA', reason?: string) => {
    const lead = allLeads.find(l => l.id === id);
    if (!lead) return;
    
    setPipelineData(prev => prev.map(col => {
      if (col.id === 'c1' && status === 'VALIDADO') {
         const exists = col.cards.some(c => c.id === id);
         if (exists) return col;
         return { ...col, cards: [{ ...lead, status, validationReason: reason }, ...col.cards] };
      }
      return col;
    }));
    
    setAllLeads(prev => prev.map(l => l.id === id ? { ...l, status, validationReason: reason } : l));
  };

  const handleAddOffer = (o: Offer) => setOffers(prev => [o, ...prev]);

  if (!user) {
    return (
      <div className="h-screen bg-[#0a0f18] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#161b26] p-12 rounded-[3.5rem] border border-white/5 shadow-2xl text-center space-y-8 animate-in zoom-in">
           <div>
              <span className="material-symbols-outlined text-primary text-6xl italic">bolt</span>
              <h1 className="text-3xl font-black italic uppercase text-white mt-4 tracking-tighter">ZEUS CCE</h1>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Protocolo Francisco Anduaga</p>
           </div>
           <form onSubmit={handleLogin} className="space-y-4">
              <select name="role" required className="w-full bg-[#0a0f18] border-none rounded-2xl p-4 text-xs font-black uppercase italic text-white outline-none cursor-pointer hover:bg-[#111622] transition-colors">
                 <option value={UserRole.VP}>FRANCISCO ANDUAGA (VP)</option>
                 <option value={UserRole.SUPERVISOR}>SUPERVISOR DE OPERACIÓN</option>
                 <option value={UserRole.FFVV}>AGENTE FFVV (VENTAS)</option>
              </select>
              <button className="w-full bg-primary py-5 rounded-2xl font-black text-xs uppercase text-white shadow-xl italic tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">Desplegar Sistema</button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ZeusErrorBoundary>
        <Layout user={user} onRoleChange={(r: UserRole) => setUser({ ...user, role: r, name: r === UserRole.VP ? "Francisco Anduaga" : user.name })}>
          <Routes>
            <Route path="/" element={<Home role={user.role} />} />
            <Route path="/radar" element={<Radar onAddLead={addLead} results={results} setResults={setResults} role={user.role} capturedLeads={allLeads} />} />
            <Route path="/pipeline" element={<Pipeline data={pipelineData} reserveLeads={allLeads.filter(l => l.status === 'RESERVA')} role={user.role} />} />
            <Route path="/governance" element={<Governance role={user.role} pendingLeads={allLeads.filter(l => l.status === 'PENDIENTE')} onValidate={validateLead} />} />
            <Route path="/kpis" element={<KPIs role={user.role} />} />
            <Route path="/offers" element={<Offers role={user.role} offers={offers} onAddOffer={handleAddOffer} />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <SupportAgent user={user} />
      </ZeusErrorBoundary>
    </Router>
  );
};

export default App;
