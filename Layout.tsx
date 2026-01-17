
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, UserRole, UserProfile } from '../types';

const SidebarItem: React.FC<{
  to: AppRoute;
  icon: string;
  label: string;
  roles: UserRole[];
  currentRole: UserRole;
}> = ({ to, icon, label, roles, currentRole }) => {
  const location = useLocation();
  const hasAccess = currentRole === UserRole.VP || roles.includes(currentRole);
  if (!hasAccess) return null;
  
  const active = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-6 py-3.5 rounded-xl transition-all ${
        active 
          ? 'bg-primary text-white shadow-lg' 
          : 'text-slate-500 hover:text-white hover:bg-white/5'
      }`}
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      <span className="text-[12px] font-bold uppercase tracking-tight">{label}</span>
    </Link>
  );
};

export const Layout: React.FC<{ 
  children: React.ReactNode; 
  user: UserProfile;
  onRoleChange: (role: UserRole) => void;
}> = ({ children, user, onRoleChange }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#0a0f18] text-white font-display overflow-hidden">
      <aside className="w-72 border-r border-white/5 flex flex-col p-6 shrink-0">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">ZEUS <span className="text-primary">CCE</span></h1>
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Command Center Élite</p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto hide-scrollbar">
          <SidebarItem to={AppRoute.HOME} icon="dashboard" label="Mando Central" roles={[UserRole.FFVV, UserRole.SUPERVISOR]} currentRole={user.role} />
          <SidebarItem to={AppRoute.RADAR} icon="radar" label="Radar de Campo" roles={[UserRole.FFVV, UserRole.SUPERVISOR]} currentRole={user.role} />
          <SidebarItem to={AppRoute.GOVERNANCE} icon="verified_user" label="Gobernanza AI" roles={[UserRole.SUPERVISOR]} currentRole={user.role} />
          <SidebarItem to={AppRoute.PIPELINE} icon="view_kanban" label="Pipeline" roles={[UserRole.FFVV, UserRole.SUPERVISOR]} currentRole={user.role} />
          <SidebarItem to={AppRoute.KPIS} icon="analytics" label="Métricas ROI" roles={[UserRole.SUPERVISOR]} currentRole={user.role} />
          <SidebarItem to={AppRoute.OFFERS} icon="payments" label="Ofertas" roles={[UserRole.FFVV]} currentRole={user.role} />
          <SidebarItem to={AppRoute.RESOURCES} icon="description" label="Recursos $0" roles={[UserRole.FFVV, UserRole.SUPERVISOR]} currentRole={user.role} />
        </nav>

        <div className="mt-auto pt-6 space-y-4">
           <div className="bg-[#161b26] p-4 rounded-2xl border border-white/5 shadow-inner">
              <div className="flex items-center justify-between mb-3">
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Estado Core</p>
                 <span className="text-[8px] font-black text-emerald-500 uppercase flex items-center gap-1">
                    <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Estable
                 </span>
              </div>
              <div className="flex gap-1 bg-[#0a0f18] p-1 rounded-lg">
                 <button onClick={() => onRoleChange(UserRole.FFVV)} className={`flex-1 py-1.5 text-[7px] font-black rounded ${user.role === UserRole.FFVV ? 'bg-primary' : 'text-slate-600'}`}>FFVV</button>
                 <button onClick={() => onRoleChange(UserRole.SUPERVISOR)} className={`flex-1 py-1.5 text-[7px] font-black rounded ${user.role === UserRole.SUPERVISOR ? 'bg-primary' : 'text-slate-600'}`}>SUP</button>
                 <button onClick={() => onRoleChange(UserRole.VP)} className={`flex-1 py-1.5 text-[7px] font-black rounded ${user.role === UserRole.VP ? 'bg-primary' : 'text-slate-600'}`}>VP</button>
              </div>
           </div>
           <p className="text-[7px] text-center text-slate-600 font-black uppercase tracking-widest">ORASI Lab Intelligence © 2024</p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[#0a0f18]">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 shrink-0">
           <div className="flex items-center gap-4">
              <span className="text-primary material-symbols-outlined italic">verified</span>
              <div>
                 <h2 className="text-xs font-black italic uppercase tracking-widest leading-none">
                   {user.role === UserRole.VP ? `COMANDANTE: FRANCISCO ANDUAGA` : `OPERADOR: ${user.name}`}
                 </h2>
                 <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">Nivel de Acceso: {user.role}</p>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                 <span className="material-symbols-outlined text-[14px] text-primary">security</span>
                 <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Encriptación Zeus v4.6</p>
              </div>
              <div className="flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                 <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
                 <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">Sincronización OK</span>
              </div>
           </div>
        </header>
        <div className="flex-1 overflow-y-auto p-10 hide-scrollbar scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};
