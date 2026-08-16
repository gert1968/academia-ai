import { ResearchProject, UserProfile, DefenseQuestion } from '../types';

export const initialUserProfile: UserProfile = {
  id: 'user-001',
  name: 'Dra. (c) Valentina Morales',
  email: 'v.morales@universidad.edu',
  role: 'estudiante',
  institution: 'Universidad Nacional de Educación Superior',
  b2bOrganization: 'Facultad de Ciencias de la Educación & Posgrados',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
};

export const initialProjects: ResearchProject[] = [
  {
    id: 'proj-001',
    title: 'Efecto de la Inteligencia Artificial Generativa en el Desarrollo del Pensamiento Crítico y la Competencia Investigativa en Estudiantes Posgrado',
    type: 'tesis_maestria',
    overallProgress: 68,
    createdAt: '2026-02-10',
    updatedAt: '2026-08-03',
    version: '2.4.1',
    metadata: {
      university: 'Universidad Nacional de Educación Superior',
      career: 'Maestría en Docencia Universitaria e Investigación',
      degreeLevel: 'Maestría',
      topic: 'Inteligencia Artificial Generativa y Pensamiento Crítico en Educación Superior',
      problemStatement: 'El auge vertiginoso de los modelos de lenguaje de gran escala (LLMs) en entornos universitarios ha generado un debate epistemológico sobre si su integración pasiva inhibe las competencias de indagación autónoma o si, mediante andamiajes pedagógicos estructurados, potencia la capacidad de análisis sintético, síntesis teórica y formulación de preguntas complejas en tesistas.',
      generalObjective: 'Determinar el impacto de la integración de plataformas de IA generativa en la aceleración del desarrollo del pensamiento crítico y la formulación de hipótesis en estudiantes de posgrado.',
      specificObjectives: [
        'Diagnosticar el nivel inicial de competencias investigativas y uso de herramientas de IA en tesistas de maestría.',
        'Diseñar e implementar un programa de andamiaje epistemológico mediado por IA para la elaboración de revisiones sistemáticas de literatura.',
        'Evaluar la variación en los puntajes de pensamiento crítico (Escala Watson-Glaser) antes y después de la intervención.',
        'Analizar la percepción cualitativa de los estudiantes sobre la autonomía epistémica durante el proceso de investigación.'
      ],
      hypotheses: [
        'H1: Existe una diferencia estadísticamente significativa (p < 0.05) en los niveles de pensamiento crítico entre el grupo experimental expuesto al andamiaje de IA y el grupo de control.',
        'H0: No existe diferencia significativa en las competencias de indagación científica tras la integración de la IA generativa.'
      ],
      variables: [
        { name: 'Andamiaje Pedagógico con IA Generativa', type: 'independiente', description: 'Uso estructurado de plataformas conversacionales y analíticas para la revisión teórica.' },
        { name: 'Nivel de Pensamiento Crítico Académico', type: 'dependiente', description: 'Puntaje estandarizado obtenido mediante la prueba Watson-Glaser.' },
        { name: 'Competencia de Redacción de Hipótesis', type: 'dependiente', description: 'Capacidad para formular variables y relaciones deductivas comprobables.' },
        { name: 'Experiencia Previa en Investigación', type: 'interviniente', description: 'Años de práctica investigativa previa y publicaciones previas.' }
      ],
      approach: 'mixto',
      researchType: 'correlacional',
      citationStyle: 'APA 7',
      advisorName: 'Dr. Roberto Fontanarrosa',
      coAuthors: ['Dra. Carmen Sevilla', 'Msc. Javier Arango']
    },
    chapters: [
      {
        id: 'chap-1',
        number: 1,
        title: 'Capítulo I: Planteamiento del Problema y Objetivos',
        description: 'Contextualización, delimitación, preguntas de investigación, objetivos y formulación de hipótesis.',
        isCompleted: true,
        sections: [
          {
            id: 'sec-1-1',
            code: '1.1',
            title: 'Planteamiento y Delimitación del Problema',
            content: 'En la era contemporánea de la educación superior, la convergencia entre modelos analíticos de Inteligencia Artificial y la producción científica plantea interrogantes fundamentales para la metodología pedagógica. Tradicionalmente, la elaboración del marco teórico requería búsquedas manuales intensivas en bases de datos indexadas. Con la emergencia de agentes conversacionales y sistemas de RAG (Retrieval-Augmented Generation), el estudiante de posgrado se enfrenta a un exceso de información sintética que exige competencias de discriminación crítica sin precedentes.',
            wordCount: 1420,
            status: 'aprobado'
          },
          {
            id: 'sec-1-2',
            code: '1.2',
            title: 'Formulación de Preguntas de Investigación',
            content: '¿De qué manera influye la mediación pedagógica con herramientas de IA generativa en la madurez crítica y la capacidad deductiva de los tesistas de posgrado durante el proceso de revisión sistemática de literatura?',
            wordCount: 680,
            status: 'aprobado'
          },
          {
            id: 'sec-1-3',
            code: '1.3',
            title: 'Objetivos General y Específicos',
            content: 'Objetivo General: Evaluar el impacto del andamiaje basado en Inteligencia Artificial en el desarrollo del pensamiento crítico...\n\nObjetivos Específicos:\n1. Determinar la línea base de pensamiento crítico en los estudiantes...\n2. Implementar talleres intensivos de análisis epistemológico...',
            wordCount: 520,
            status: 'aprobado'
          }
        ]
      },
      {
        id: 'chap-2',
        number: 2,
        title: 'Capítulo II: Marco Teórico y Estado del Arte',
        description: 'Antecedentes internacionales y nacionales, bases teóricas, marco conceptual y operacionalización.',
        isCompleted: true,
        sections: [
          {
            id: 'sec-2-1',
            code: '2.1',
            title: 'Antecedentes Internacionales',
            content: 'Diversos estudios en Europa y Norteamérica (Smith & Johnson, 2024; Chen et al., 2023) subrayan que el acompañamiento algorítmico reduce los tiempos de cribado bibliográfico en un 40%, permitiendo una dedicación superior a la síntesis conceptual de alto nivel.',
            wordCount: 2310,
            status: 'aprobado'
          },
          {
            id: 'sec-2-2',
            code: '2.2',
            title: 'Bases Teóricas: Teoría del Andamiaje y Conectivismo',
            content: 'La investigación se fundamenta en la Teoría del Andamiaje de Vygotsky extendida a entornos digitales por Siemens (2005) en el Conectivismo. La IA opera como una Zona de Desarrollo Próximo (ZDP) donde la máquina asiste en la organización inicial de conceptos complejas.',
            wordCount: 1890,
            status: 'revisado'
          }
        ]
      },
      {
        id: 'chap-3',
        number: 3,
        title: 'Capítulo III: Marco Metodológico',
        description: 'Enfoque, diseño, población y muestra, técnicas de recolección de datos y validez.',
        isCompleted: false,
        sections: [
          {
            id: 'sec-3-1',
            code: '3.1',
            title: 'Enfoque y Diseños de Investigación',
            content: 'Se adopta un enfoque mixto cuali-cuantitativo con un diseño explicativo secuencial (DEXPLIS). En la primera fase cuantitativa se aplicará el test Watson-Glaser a N=120 estudiantes, seguido de un estudio cualitativo con grupos focales.',
            wordCount: 1250,
            status: 'en_progreso'
          },
          {
            id: 'sec-3-2',
            code: '3.2',
            title: 'Población, Muestra e Instrumentos de Medición',
            content: 'La población objetivo comprende 450 maestrandos matriculados en facultades de educación. La muestra probabilística estratificada se calcula con un nivel de confianza del 95% y margen de error del 5%.',
            wordCount: 940,
            status: 'en_progreso'
          }
        ]
      },
      {
        id: 'chap-4',
        number: 4,
        title: 'Capítulo IV: Análisis de Resultados y Discusión',
        description: 'Presentación de datos, pruebas estadisticas t de Student / Chi-cuadrada, triangulación y discusión.',
        isCompleted: false,
        sections: [
          {
            id: 'sec-4-1',
            code: '4.1',
            title: 'Análisis Descriptivo e Inferencial',
            content: 'Sección pendiente de recolección de datos empíricos de campo.',
            wordCount: 150,
            status: 'pendiente'
          }
        ]
      },
      {
        id: 'chap-5',
        number: 5,
        title: 'Capítulo V: Conclusiones, Recomendaciones y Propuesta',
        description: 'Aportes teóricos, implicaciones prácticas y líneas futuras de investigación.',
        isCompleted: false,
        sections: [
          {
            id: 'sec-5-1',
            code: '5.1',
            title: 'Conclusiones Generales',
            content: 'En elaboración conforme avance la fase 4.',
            wordCount: 80,
            status: 'pendiente'
          }
        ]
      }
    ],
    literature: [
      {
        id: 'lit-1',
        title: 'Generative Artificial Intelligence in Higher Education: A Systematic Review of Empirical Studies',
        authors: ['Zawacki-Richter, O.', 'Marín, V. I.', 'Bond, M.'],
        year: 2024,
        journal: 'Computers & Education: Artificial Intelligence',
        doi: '10.1016/j.caeai.2024.100192',
        citations: 245,
        abstract: 'This systematic review synthesizes 84 empirical articles evaluating the cognitive and pedagogical consequences of deploying LLMs in postgraduate research workflows.',
        database: 'Scopus / Crossref',
        isOpenAccess: true,
        url: 'https://doi.org/10.1016/j.caeai.2024.100192',
        keywords: ['Higher Education', 'Generative AI', 'Critical Thinking', 'Systematic Review'],
        importedToProject: true,
        notes: 'Soporta fundamentalmente el Capítulo II, sección 2.1 sobre antecedentes globales.'
      },
      {
        id: 'lit-2',
        title: 'Scaffolding Critical Inquiry with AI Agents in Thesis Mentorship',
        authors: ['Mendoza, C.', 'Rostova, E.'],
        year: 2023,
        journal: 'International Journal of Educational Technology in Higher Education',
        doi: '10.1186/s41239-023-00412-2',
        citations: 189,
        abstract: 'An experimental study demonstrating how prompt-engineered research assistants enhance critical questioning skills among doctoral candidates.',
        database: 'Semantic Scholar',
        isOpenAccess: true,
        url: 'https://doi.org/10.1186/s41239-023-00412-2',
        keywords: ['Mentorship', 'Prompting', 'Epistemology', 'Thesis Writing'],
        importedToProject: true,
        notes: 'Cita clave para la justificación del andamiaje pedagógico.'
      }
    ],
    notes: [
      {
        id: 'note-1',
        title: 'Definición Operativa del Pensamiento Crítico Académico',
        content: 'El pensamiento crítico en investigación según Ennis (2015) comprende la capacidad de juzgar la credibilidad de las fuentes, identificar suposiciones no declaradas y evaluar la solidez lógica de las inferencias. En [[Andamiaje Digital]] esto se traduce en la auditoría de sesgos algorítmicos.',
        tags: ['Epistemología', 'Variables', 'WatsonGlaser'],
        backlinks: ['note-2'],
        createdAt: '2026-03-12',
        updatedAt: '2026-07-28',
        folder: 'Conceptos Clave'
      },
      {
        id: 'note-2',
        title: 'Andamiaje Digital y Zona de Desarrollo Próximo',
        content: 'Concepto derivado de Vygotsky. Cuando se usa IA generativa como cotutor, el tesista puede alcanzar niveles de abstracción teórica que superan su desempeño aislado.',
        tags: ['Vygotsky', 'Conectivismo', 'IA'],
        backlinks: ['note-1'],
        createdAt: '2026-04-01',
        updatedAt: '2026-08-01',
        folder: 'Marcos Teóricos'
      }
    ],
    matrix: [
      {
        id: 'mat-1',
        variable: 'Andamiaje Pedagógico con IA',
        definition: 'Conjunto estructurado de apoyos instruccionales mediado por software conversacional para guiar la búsqueda y análisis teóricos.',
        dimensions: 'Fase 1: Búsqueda bibliográfica\nFase 2: Síntesis de textos\nFase 3: Auto-auditoría de argumentos',
        indicators: 'Frecuencia de uso pedagógico, Horas de interacción guiada, Tipo de prompts analíticos empleadas',
        instruments: 'Cuestionario de Uso Tecnológico Investigativo (CUTI) - 20 ítems',
        items: 'Ítems 1 al 10'
      },
      {
        id: 'mat-2',
        variable: 'Pensamiento Crítico Académico',
        definition: 'Disposición cognoscitiva evaluada mediante la capacidad de análisis deductivo, evaluación de evidencias e inferencia razonada.',
        dimensions: 'Inferencia, Reconocimiento de Supuestos, Deducción, Interpretación, Evaluación de Argumentos',
        indicators: 'Puntaje en subescalas de Watson-Glaser, Tasa de detección de contradicciones teóricas',
        instruments: 'Prueba Watson-Glaser Critical Thinking Appraisal (WGCTA - Forma S)',
        items: '40 reactivos estandarizados'
      }
    ],
    schedule: [
      {
        id: 'sch-1',
        title: 'Aprobación del Capítulo III por Asesor Principal',
        date: '2026-08-15',
        type: 'reunion_asesor',
        completed: false,
        notes: 'Revisar la tabla de operacionalización de variables y el cálculo de la muestra.'
      },
      {
        id: 'sch-2',
        title: 'Entrega de Avance al Comité de Ética Investigativa',
        date: '2026-08-30',
        type: 'entrega',
        completed: false,
        notes: 'Adjuntar modelo de consentimiento informado para los participantes.'
      },
      {
        id: 'sch-3',
        title: 'Simulación Intensiva de Sustentación con Jurado IA',
        date: '2026-09-10',
        type: 'sustentacion',
        completed: false,
        notes: 'Completar 3 rondas con preguntas de alta complejidad.'
      }
    ],
    advisorComments: [
      {
        id: 'comm-1',
        author: 'Dr. Roberto Fontanarrosa',
        role: 'asesor_principal',
        text: 'Excelente planteamiento en el punto 1.1. Le sugiero reforzar la cita de Siemens (2005) para fundamentar la epistemología conectivista en la sección 2.2.',
        sectionId: 'sec-2-2',
        timestamp: '2026-07-29T10:15:00Z',
        resolved: false
      },
      {
        id: 'comm-2',
        author: 'Dra. Carmen Sevilla',
        role: 'jurado',
        text: 'Asegúrese de explicitar en la sección 3.2 si la muestra será aleatoria simple o estratificada por programas de posgrado.',
        sectionId: 'sec-3-2',
        timestamp: '2026-08-02T16:40:00Z',
        resolved: false
      }
    ],
    collaborators: [
      {
        id: 'collab-1',
        name: 'Dra. (c) Valentina Morales',
        email: 'v.morales@universidad.edu',
        role: 'coauthor',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        activeStatus: 'online'
      },
      {
        id: 'collab-2',
        name: 'Dr. Roberto Fontanarrosa',
        email: 'r.fontanarrosa@universidad.edu',
        role: 'advisor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        activeStatus: 'online'
      }
    ]
  },
  {
    id: 'proj-002',
    title: 'Análisis Econométrico de la Adopción de Energías Renovables en Pequeñas y Medianas Empresas (PyMEs)',
    type: 'articulo_cientifico',
    overallProgress: 35,
    createdAt: '2026-05-01',
    updatedAt: '2026-08-02',
    version: '1.0.0',
    metadata: {
      university: 'Centro de Investigaciones Económicas & Tecnológicas',
      career: 'Doctorado en Economía Aplicada',
      degreeLevel: 'Doctorado',
      topic: 'Economía Ambiental y PyMEs',
      problemStatement: 'Las barreras de financiamiento inicial impiden la transición energética en PyMEs industriales.',
      generalObjective: 'Modelar estadísticamente la probabilidad de adopción de paneles solares según incentivos fiscales.',
      specificObjectives: ['Determinar la elasticidad precio-demanda', 'Proponer un modelo Logit multivariado'],
      hypotheses: ['H1: El subsidio fiscal directo incrementa en un 35% la probabilidad de conversión energética.'],
      variables: [
        { name: 'Incentivo Fiscal', type: 'independiente', description: 'Porcentaje de deducción de impuesto a la renta.' },
        { name: 'Adopción Tecnológica', type: 'dependiente', description: 'Variable binaria (1 = Adoptó, 0 = No adoptó)' }
      ],
      approach: 'cuantitativo',
      researchType: 'explicativo',
      citationStyle: 'IEEE'
    },
    chapters: [],
    literature: [],
    notes: [],
    matrix: [],
    schedule: [],
    advisorComments: [],
    collaborators: []
  }
];

export const initialDefenseQuestions: DefenseQuestion[] = [
  {
    id: 'def-1',
    question: '¿Cuál es la justificación epistemológica para elegir un diseño explicativo secuencial (DEXPLIS) en lugar de un experimento puro con grupo de control ciego?',
    category: 'metodologia',
    difficulty: 'alta',
    suggestedAnswerGuide: 'Debe argumentar que el objeto de estudio exige primero cuantificar la magnitud del cambio cognitivo con datos estandarizados (fase cuantitativa) y posteriormente profundizar en las vivencias y significados atribuibles al andamiaje algorítmico mediante grupos focales (fase cualitativa).'
  },
  {
    id: 'def-2',
    question: '¿Cómo garantiza que la mejoría observada en los puntajes de pensamiento crítico se deba al andamiaje pedagógico de la IA y no a la maduración biológica o tecnológica general de los estudiantes?',
    category: 'epistemologia',
    difficulty: 'extrema',
    suggestedAnswerGuide: 'Debe explicitar el control de variables intervinientes mediante el grupo de control equivalente no expuesto al andamiaje de IA y el análisis de covarianza (ANCOVA) aislando la experiencia investigativa previa.'
  },
  {
    id: 'def-3',
    question: 'En el Marco Teórico menciona el Conectivismo de Siemens. ¿Cómo responde a los detractores que argumentan que el Conectivismo es un modelo instruccional y no una teoría pedagógica formal?',
    category: 'marco_teorico',
    difficulty: 'media',
    suggestedAnswerGuide: 'Se debe matizar la postura reconociendo el debate abierto por Kerr (2007) y fundamentando que el estudio toma el Conectivismo como una heurística explicativa complementaria al constructivismo sociocultural de Vygotsky.'
  }
];
