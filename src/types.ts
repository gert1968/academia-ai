export type ResearchType = 
  | 'tesis_maestria'
  | 'articulo_cientifico'
  | 'proyecto_investigacion'
  | 'libro_academico'
  | 'ponencia'
  | 'trabajo_grado'
  | 'semillero'
  | 'proyecto_doctoral';

export type CitationStyle = 'APA 7' | 'ICONTEC' | 'MLA' | 'Chicago' | 'Harvard' | 'IEEE' | 'Vancouver';

export type ModuleType = 
  | 'dashboard'
  | 'projects'
  | 'thesis_builder'
  | 'methodology'
  | 'theoretical_framework'
  | 'literature_search'
  | 'pdf_reader'
  | 'bibliography'
  | 'corrector'
  | 'ai_detector'
  | 'rewriter'
  | 'citation_generator'
  | 'notes'
  | 'mindmap'
  | 'matrices'
  | 'tables_matrices'
  | 'presentation'
  | 'schedule'
  | 'chat_specialized'
  | 'tutor_ia'
  | 'defense_simulator'
  | 'advisor_panel'
  | 'collaboration'
  | 'export';

export interface ThesisMetadata {
  university: string;
  career: string;
  degreeLevel: string;
  topic: string;
  problemStatement: string;
  generalObjective: string;
  specificObjectives: string[];
  hypotheses: string[];
  variables: { name: string; type: 'dependiente' | 'independiente' | 'interviniente' | 'cualitativa'; description: string }[];
  approach: 'cuantitativo' | 'cualitativo' | 'mixto';
  researchType: 'descriptivo' | 'correlacional' | 'explicativo' | 'exploratorio' | 'experimental' | 'fenomenologico' | 'etnografico';
  citationStyle: CitationStyle;
  advisorName?: string;
  coAuthors?: string[];
}

export interface ChapterSection {
  id: string;
  title: string;
  code: string; // e.g., "1.1"
  content: string;
  wordCount: number;
  status: 'pendiente' | 'en_progreso' | 'revisado' | 'aprobado';
  comments?: AdvisorComment[];
}

export interface ThesisChapter {
  id: string;
  title: string;
  number: number;
  description: string;
  sections: ChapterSection[];
  isCompleted: boolean;
}

export interface LiteratureArticle {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  doi: string;
  citations: number;
  abstract: string;
  database: string;
  isOpenAccess: boolean;
  url: string;
  keywords: string[];
  importedToProject?: boolean;
  notes?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  backlinks: string[]; // IDs of other linked notes
  createdAt: string;
  updatedAt: string;
  folder?: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PDFDocumentAnalysis {
  fileName: string;
  fileSize: string;
  pageCount: number;
  extractedText: string;
  summary: string;
  keyQuotes: string[];
  flashcards: Flashcard[];
  extractedTables: { title: string; columns: string[]; rows: string[][] }[];
  mindMapNodes: { id: string; label: string; parentId?: string }[];
}

export interface MatrixRow {
  id: string;
  variable: string;
  definition: string;
  dimensions: string;
  indicators: string;
  instruments: string;
  items: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  date: string;
  type: 'entrega' | 'sustentacion' | 'reunion_asesor' | 'hito' | 'investigacion';
  completed: boolean;
  notes?: string;
  task?: string;
  startDate?: string;
  endDate?: string;
  phase?: string;
}

export type ScheduleItem = ScheduleEvent;

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'coauthor' | 'advisor' | 'peer_reviewer';
  avatar: string;
  activeStatus: 'online' | 'offline' | 'invited';
}

export interface AdvisorComment {
  id: string;
  author: string;
  role: 'asesor_principal' | 'jurado' | 'coautor';
  text: string;
  sectionId?: string;
  timestamp: string;
  resolved: boolean;
}

export interface DefenseQuestion {
  id: string;
  question: string;
  category: 'metodologia' | 'marco_teorico' | 'hallazgos' | 'limitaciones' | 'epistemologia';
  difficulty: 'alta' | 'media' | 'extrema';
  suggestedAnswerGuide: string;
  userAnswer?: string;
  aiScore?: number; // 0 - 100
  aiFeedback?: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  type: ResearchType;
  metadata: ThesisMetadata;
  chapters: ThesisChapter[];
  literature: LiteratureArticle[];
  notes: NoteItem[];
  matrix: MatrixRow[];
  schedule: ScheduleEvent[];
  advisorComments: AdvisorComment[];
  collaborators: Collaborator[];
  overallProgress: number; // 0 - 100
  createdAt: string;
  updatedAt: string;
  version: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'estudiante' | 'investigador' | 'docente' | 'director_investigacion';
  institution: string;
  b2bOrganization?: string;
  avatarUrl: string;
}
