import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { ProjectManagerView } from './components/ProjectManagerView';
import { ThesisBuilderView } from './components/ThesisBuilderView';
import { MethodologyView } from './components/MethodologyView';
import { TheoreticalFrameworkView } from './components/TheoreticalFrameworkView';
import { LiteratureSearchView } from './components/LiteratureSearchView';
import { PDFReaderView } from './components/PDFReaderView';
import { BibliographyView } from './components/BibliographyView';
import { AcademicCorrectorView } from './components/AcademicCorrectorView';
import { AIDetectorView } from './components/AIDetectorView';
import { AcademicRewriterView } from './components/AcademicRewriterView';
import { CitationGeneratorView } from './components/CitationGeneratorView';
import { NotesGraphView } from './components/NotesGraphView';
import { MindMapView } from './components/MindMapView';
import { MatricesView } from './components/MatricesView';
import { PresentationBuilderView } from './components/PresentationBuilderView';
import { ScheduleView } from './components/ScheduleView';
import { SpecializedChatView } from './components/SpecializedChatView';
import { TutorIAView } from './components/TutorIAView';
import { DefenseSimulatorView } from './components/DefenseSimulatorView';
import { AdvisorPanelView } from './components/AdvisorPanelView';
import { CollaborationView } from './components/CollaborationView';
import { ExportView } from './components/ExportView';

import { initialProjects, initialUserProfile } from './data/mockData';
import { ResearchProject, ModuleType } from './types';

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');
  const [projects, setProjects] = useState<ResearchProject[]>(initialProjects);
  const [activeProjectId, setActiveProjectId] = useState<string>(initialProjects[0].id);
  const [isB2BMode, setIsB2BMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const activeProject = projects.find(p => p.id === activeProjectId) || projects[0];

  const handleUpdateActiveProject = (updated: ResearchProject) => {
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleCreateProject = (newProj: ResearchProject) => {
    setProjects(prev => [newProj, ...prev]);
    setActiveProjectId(newProj.id);
  };

  const handleDeleteProject = (id: string) => {
    if (projects.length <= 1) return;
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeProjectId === id) {
      const remaining = projects.filter(p => p.id !== id);
      if (remaining.length > 0) setActiveProjectId(remaining[0].id);
    }
  };

  const renderActiveView = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardView project={activeProject} onNavigateToModule={(mod) => setActiveModule(mod as ModuleType)} />;
      case 'projects':
        return (
          <ProjectManagerView
            projects={projects}
            activeProjectId={activeProjectId}
            onSelectProject={setActiveProjectId}
            onCreateProject={handleCreateProject}
            onDeleteProject={handleDeleteProject}
          />
        );
      case 'thesis_builder':
        return (
          <ThesisBuilderView
            project={activeProject}
            onUpdateProject={handleUpdateActiveProject}
          />
        );
      case 'methodology':
        return <MethodologyView project={activeProject} onUpdateProject={handleUpdateActiveProject} />;
      case 'theoretical_framework':
        return <TheoreticalFrameworkView project={activeProject} />;
      case 'literature_search':
        return <LiteratureSearchView project={activeProject} onUpdateProject={handleUpdateActiveProject} />;
      case 'pdf_reader':
        return <PDFReaderView />;
      case 'bibliography':
        return <BibliographyView project={activeProject} onUpdateProject={handleUpdateActiveProject} />;
      case 'corrector':
        return <AcademicCorrectorView />;
      case 'ai_detector':
        return <AIDetectorView />;
      case 'rewriter':
        return <AcademicRewriterView />;
      case 'citation_generator':
        return <CitationGeneratorView project={activeProject} />;
      case 'notes':
        return <NotesGraphView project={activeProject} onUpdateProject={handleUpdateActiveProject} />;
      case 'mindmap':
        return <MindMapView project={activeProject} />;
      case 'matrices':
      case 'tables_matrices':
        return <MatricesView project={activeProject} onUpdateProject={handleUpdateActiveProject} />;
      case 'presentation':
        return <PresentationBuilderView project={activeProject} />;
      case 'schedule':
        return <ScheduleView project={activeProject} onUpdateProject={handleUpdateActiveProject} />;
      case 'chat_specialized':
        return <SpecializedChatView project={activeProject} />;
      case 'tutor_ia':
        return <TutorIAView project={activeProject} />;
      case 'defense_simulator':
        return <DefenseSimulatorView project={activeProject} />;
      case 'advisor_panel':
        return <AdvisorPanelView project={activeProject} onUpdateProject={handleUpdateActiveProject} />;
      case 'collaboration':
        return <CollaborationView project={activeProject} onUpdateProject={handleUpdateActiveProject} />;
      case 'export':
        return <ExportView project={activeProject} />;
      default:
        return <DashboardView project={activeProject} onNavigateToModule={(mod) => setActiveModule(mod as ModuleType)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white antialiased">
      <Header
        projects={projects}
        activeProject={activeProject}
        onSelectProject={setActiveProjectId}
        onNewProject={() => setActiveModule('projects')}
        userProfile={initialUserProfile}
        isB2BMode={isB2BMode}
        onToggleB2BMode={(b2b) => setIsB2BMode(b2b)}
        onNavigateToModule={(mod) => setActiveModule(mod as ModuleType)}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          activeModule={activeModule} 
          onSelectModule={(mod) => setActiveModule(mod as ModuleType)} 
          isB2BMode={isB2BMode}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
        
        <main className="flex-1 overflow-y-auto bg-[#0a0f1d]">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}
