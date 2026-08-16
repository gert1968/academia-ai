import React from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Sparkles, 
  Compass, 
  BookMarked, 
  Search, 
  FileSearch, 
  BookmarkCheck, 
  CheckCheck, 
  ScanEye, 
  Wand2, 
  Quote, 
  Network, 
  Workflow, 
  TableProperties, 
  Presentation, 
  Calendar, 
  MessageSquareCode, 
  GraduationCap, 
  Award, 
  UserCheck, 
  Users2, 
  Download, 
  Building,
  ChevronRight,
  X
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onSelectModule: (id: string) => void;
  isB2BMode: boolean;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeModule, 
  onSelectModule, 
  isB2BMode,
  isMobileOpen = false,
  onCloseMobile 
}) => {
  const categories = [
    {
      title: 'PROYECTO & ESTRUCTURA',
      items: [
        { id: 'dashboard', label: '1. Panel Principal', icon: LayoutDashboard },
        { id: 'projects', label: '2. Gestor Proyectos', icon: FolderKanban },
        { id: 'thesis_builder', label: '3. Constructor IA Tesis', icon: Sparkles, highlight: true },
        { id: 'methodology', label: '4. Asistente Metodológico', icon: Compass },
        { id: 'theoretical_framework', label: '5. Marco Teórico IA', icon: BookMarked },
      ]
    },
    {
      title: 'LITERATURA & LECTOR PDF',
      items: [
        { id: 'literature_search', label: '6. Buscador Literatura', icon: Search },
        { id: 'pdf_reader', label: '7. Lector PDF e IA', icon: FileSearch },
        { id: 'bibliography', label: '8. Gestor Bibliográfico', icon: BookmarkCheck },
        { id: 'citation_generator', label: '12. Generador Citas', icon: Quote },
      ]
    },
    {
      title: 'ESCRITURA & REVISIÓN IA',
      items: [
        { id: 'corrector', label: '9. Corrector Académico', icon: CheckCheck },
        { id: 'ai_detector', label: '10. Detector de IA', icon: ScanEye },
        { id: 'rewriter', label: '11. Reescritor Científico', icon: Wand2 },
        { id: 'notes', label: '13. Gestor Notas (Obsidian)', icon: Network },
      ]
    },
    {
      title: 'DIAGRAMAS & TABLAS',
      items: [
        { id: 'mindmap', label: '14. Mapas Conceptuales', icon: Workflow },
        { id: 'matrices', label: '15. Tablas & Matrices', icon: TableProperties },
        { id: 'presentation', label: '16. Slide Presentación', icon: Presentation },
        { id: 'schedule', label: '17. Cronograma & Metas', icon: Calendar },
      ]
    },
    {
      title: 'ASESORÍA & SUSTENTACIÓN',
      items: [
        { id: 'chat_specialized', label: '18. Chat Investigación', icon: MessageSquareCode },
        { id: 'tutor_ia', label: '19. Tutor IA Audit', icon: GraduationCap },
        { id: 'defense_simulator', label: '20. Simulador Sustentación', icon: Award, highlight: true },
        { id: 'advisor_panel', label: '21. Panel Asesores', icon: UserCheck },
        { id: 'collaboration', label: '22. Trabajo Colaborativo', icon: Users2 },
        { id: 'export', label: '23. Exportador DOCX/LaTeX', icon: Download },
      ]
    }
  ];

  const handleModuleClick = (id: string) => {
    onSelectModule(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <div className="py-3 px-2 space-y-6">
      {/* Mobile Drawer Header */}
      <div className="flex items-center justify-between px-3 pb-2 border-b border-slate-800 lg:hidden">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Navegación Módulos</span>
        <button
          onClick={onCloseMobile}
          className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Institutional B2B Banner if B2B mode active */}
      {isB2BMode && (
        <div className="p-3 m-2 rounded-xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-800/60 shadow-inner">
          <div className="flex items-center space-x-2 text-indigo-300">
            <Building className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">ERP Universitario</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Panel de Control de Posgrados & Grupos de Investigación B2B</p>
          <button
            onClick={() => handleModuleClick('advisor_panel')}
            className="mt-2 w-full py-1 px-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold flex items-center justify-center space-x-1 transition-all"
          >
            <span>Ver Métricas B2B</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {categories.map((cat, idx) => (
        <div key={idx} className="space-y-1">
          <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {cat.title}
          </h3>
          <div className="space-y-0.5 mt-1">
            {cat.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleModuleClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-cyan-950/70 text-cyan-300 font-semibold border-l-2 border-cyan-400 shadow-sm shadow-cyan-950/50'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="w-64 bg-[#0a0e17] border-r border-slate-800/80 flex-col shrink-0 select-none overflow-y-auto custom-scrollbar hidden lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#0a0e17] border-r border-slate-800 h-full overflow-y-auto custom-scrollbar shadow-2xl z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

