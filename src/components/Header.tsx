import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  ChevronDown, 
  Building2, 
  User, 
  Search, 
  BookOpen, 
  Plus,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { ResearchProject, UserProfile } from '../types';

interface HeaderProps {
  projects: ResearchProject[];
  activeProject: ResearchProject;
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
  userProfile: UserProfile;
  isB2BMode: boolean;
  onToggleB2BMode: (b2b: boolean) => void;
  onNavigateToModule: (moduleId: string) => void;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  projects,
  activeProject,
  onSelectProject,
  onNewProject,
  userProfile,
  isB2BMode,
  onToggleB2BMode,
  onNavigateToModule,
  isMobileMenuOpen = false,
  onToggleMobileMenu,
}) => {
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-[#0d131f] border-b border-slate-800/80 px-2.5 sm:px-4 flex items-center justify-between sticky top-0 z-40 text-slate-200 backdrop-blur-md gap-2">
      {/* Left: Hamburger (mobile), Brand logo & Active Project Switcher */}
      <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 focus:outline-none transition-colors"
            title="Abrir menú"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigateToModule('dashboard')}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/10 shrink-0">
            <div className="w-full h-full bg-[#0d131f] rounded-[10px] flex items-center justify-center">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-bold text-sm sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                ACADEMIA<span className="text-cyan-400">.AI</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold uppercase px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50 hidden xs:inline-block">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden md:block">Ecosistema Científico Universidades & Posgrados</p>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-slate-800 hidden md:block" />

        {/* Project Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProjectDropdown(!showProjectDropdown)}
            className="flex items-center space-x-1.5 bg-slate-900/90 hover:bg-slate-800/80 border border-slate-700/60 rounded-lg px-2 sm:px-3 py-1.5 text-xs font-medium text-slate-200 transition-all max-w-[100px] xs:max-w-[160px] sm:max-w-[260px] md:max-w-[320px]"
            title={activeProject?.title}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">{activeProject?.title || 'Proyecto'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0 ml-0.5" />
          </button>

          {showProjectDropdown && (
            <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-[#121927] border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-w-[calc(100vw-2rem)]">
              <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800 flex justify-between items-center">
                <span>Tus Proyectos ({projects.length})</span>
                <button
                  onClick={() => {
                    setShowProjectDropdown(false);
                    onNewProject();
                  }}
                  className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Nuevo</span>
                </button>
              </div>
              <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj.id);
                      setShowProjectDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/60 transition-colors ${
                      proj.id === activeProject.id ? 'bg-cyan-950/40 text-cyan-300 border-l-2 border-cyan-400' : 'text-slate-300'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <p className="font-medium truncate">{proj.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">{proj.type.replace('_', ' ')}</p>
                    </div>
                    {proj.id === activeProject.id && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Global Academic Search bar */}
      <div className="hidden xl:flex items-center flex-1 max-w-xs xl:max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                onNavigateToModule('literature_search');
              }
            }}
            placeholder="Buscar en Scopus, PubMed..."
            className="w-full bg-slate-900/80 border border-slate-700/60 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          />
        </div>
      </div>

      {/* Right: B2B/B2C Mode Toggle, Credits & Profile */}
      <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
        {/* B2C vs B2B Switcher - Optimized for mobile */}
        <div className="bg-slate-900/90 border border-slate-800 p-0.5 rounded-lg flex items-center text-[10px] sm:text-[11px] font-medium">
          <button
            onClick={() => onToggleB2BMode(false)}
            className={`px-1.5 sm:px-2.5 py-1 rounded-md transition-all flex items-center space-x-1 ${
              !isB2BMode ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Modo Investigador Individual"
          >
            <User className="w-3 h-3" />
            <span className="hidden sm:inline">Investigador</span>
            <span className="sm:hidden">Indiv.</span>
          </button>
          <button
            onClick={() => onToggleB2BMode(true)}
            className={`px-1.5 sm:px-2.5 py-1 rounded-md transition-all flex items-center space-x-1 ${
              isB2BMode ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Modo Institucional / Universidad B2B"
          >
            <Building2 className="w-3 h-3" />
            <span className="hidden sm:inline">Universidad (B2B)</span>
            <span className="sm:hidden">Univ.</span>
          </button>
        </div>

        {/* AI Meter */}
        <div className="hidden md:flex items-center space-x-1.5 bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-800/40 px-2.5 py-1 rounded-lg text-xs text-amber-300">
          <Sparkles className="w-3.5 h-[14px] text-amber-400 animate-pulse" />
          <span className="font-semibold text-[11px]">Gemini 3.6 Flash</span>
        </div>

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-800/80 transition-all focus:outline-none"
          >
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-slate-700"
            />
            <div className="text-left hidden lg:block">
              <p className="text-xs font-semibold text-slate-200 leading-none">{userProfile.name}</p>
              <p className="text-[10px] text-slate-400 leading-tight truncate max-w-[110px]">{userProfile.institution}</p>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-[#121927] border border-slate-700/80 rounded-xl shadow-2xl py-3 px-4 z-50 text-xs">
              <div className="border-b border-slate-800 pb-2 mb-2">
                <p className="font-semibold text-slate-100">{userProfile.name}</p>
                <p className="text-slate-400 text-[11px]">{userProfile.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                  {userProfile.role.toUpperCase()} - {userProfile.b2bOrganization || 'Plan Individual'}
                </span>
              </div>
              <div className="space-y-1.5 text-slate-300">
                <p className="text-slate-400 text-[11px] font-medium">Capacidad de Servidor:</p>
                <div className="flex justify-between text-[11px]">
                  <span>Límite de Consultas RAG</span>
                  <span className="text-cyan-400 font-semibold">Ilimitado</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Exportador LaTeX/DOCX</span>
                  <span className="text-emerald-400 font-semibold">Habilitado</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
