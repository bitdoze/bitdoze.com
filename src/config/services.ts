export type ServiceLocale = "en" | "es";

type LocalizedText = {
  en: string;
  es: string;
};

type LocalizedStringList = {
  en: string[];
  es: string[];
};

type ServiceArticleReference = {
  slug: string;
};

type ServiceFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

type ServiceDeliverable = {
  title: LocalizedText;
  description: LocalizedText;
};

export type ServiceConfig = {
  key: string;
  slug: {
    en: string;
    es: string;
  };
  icon: string;
  accent: string;
  title: LocalizedText;
  shortDescription: LocalizedText;
  heroDescription: LocalizedText;
  intro: LocalizedText;
  idealFor: LocalizedStringList;
  deliverables: ServiceDeliverable[];
  process: LocalizedStringList;
  outcomes: LocalizedStringList;
  faq: ServiceFaq[];
  relatedArticles: ServiceArticleReference[];
};

export const servicesPageCopy = {
  badge: {
    en: "Bitdoze Services",
    es: "Servicios Bitdoze",
  },
  title: {
    en: "Technical Services Built Around the Guides You Already Read",
    es: "Servicios tecnicos basados en las guias que ya lees aqui",
  },
  description: {
    en: "I help with Astro sites, AI agent workflows, VPS infrastructure, self-hosted stacks, and Dokploy deployments. The services below are shaped by the same topics already covered across Bitdoze.",
    es: "Ayudo con sitios en Astro, flujos con agentes IA, infraestructura VPS, stacks self-hosted y despliegues con Dokploy. Los servicios de abajo salen de los mismos temas que ya publico en Bitdoze.",
  },
  trustLabel: {
    en: "What you can hire me for",
    es: "En que te puedo ayudar",
  },
  sectionTitle: {
    en: "Service Areas",
    es: "Areas de servicio",
  },
  sectionDescription: {
    en: "Each service has its own page with scope, fit, deliverables, FAQs, and relevant articles.",
    es: "Cada servicio tiene su propia pagina con alcance, encaje, entregables, FAQ y articulos relacionados.",
  },
  processTitle: {
    en: "How Projects Usually Work",
    es: "Como suelen funcionar los proyectos",
  },
  processSteps: {
    en: [
      "We define the actual problem first, not just the tool you think you need.",
      "I audit the current setup, content, or infrastructure and propose a practical scope.",
      "Implementation focuses on shipping a clean result you can keep running after handoff.",
    ],
    es: [
      "Primero definimos el problema real, no solo la herramienta que crees que necesitas.",
      "Reviso la configuracion, el contenido o la infraestructura actual y propongo un alcance realista.",
      "La implementacion se centra en dejar un resultado limpio que puedas mantener despues de la entrega.",
    ],
  },
  faqTitle: {
    en: "General Questions",
    es: "Preguntas generales",
  },
  ctaTitle: {
    en: "Need help with one of these?",
    es: "Necesitas ayuda con alguno de estos servicios?",
  },
  ctaDescription: {
    en: "The contact links are placeholders for now, but the service structure is ready. Pick the service page that matches your project and use the CTA there.",
    es: "Los enlaces de contacto son temporales por ahora, pero la estructura del servicio ya esta lista. Entra en la pagina del servicio que encaja con tu proyecto y usa el CTA desde alli.",
  },
  primaryCta: {
    en: "Contact About a Project",
    es: "Contactar por un proyecto",
  },
  secondaryCta: {
    en: "Browse Services",
    es: "Ver servicios",
  },
  generalFaq: [
    {
      question: {
        en: "Can you work from existing articles or rough notes?",
        es: "Puedes trabajar desde articulos existentes o notas a medio hacer?",
      },
      answer: {
        en: "Yes. That is usually the fastest path. Existing posts, repo notes, server docs, or a rough architecture sketch are enough to scope the work.",
        es: "Si. Normalmente es la forma mas rapida. Articulos existentes, notas del repositorio, documentacion del servidor o un esquema rapido de arquitectura suelen ser suficientes para definir el alcance.",
      },
    },
    {
      question: {
        en: "Do you only work on greenfield projects?",
        es: "Solo trabajas en proyectos desde cero?",
      },
      answer: {
        en: "No. Most work starts from an existing site, VPS, or self-hosted stack that needs cleanup, migration, or a more reliable deployment flow.",
        es: "No. La mayoria de trabajos parten de un sitio, VPS o stack self-hosted ya existente que necesita limpieza, migracion o un flujo de despliegue mas fiable.",
      },
    },
    {
      question: {
        en: "Can a project combine multiple services?",
        es: "Un proyecto puede combinar varios servicios?",
      },
      answer: {
        en: "Yes. A common setup is Astro plus VPS deployment, or Dokploy plus a self-hosted app rollout with monitoring and backups.",
        es: "Si. Un caso comun es Astro con despliegue en VPS, o Dokploy junto con el despliegue de una app self-hosted con monitoreo y backups.",
      },
    },
  ],
} as const;

export const services: ServiceConfig[] = [
  {
    key: "astro-development",
    slug: {
      en: "astro-development",
      es: "desarrollo-astro",
    },
    icon: "mdi:rocket-launch-outline",
    accent: "from-sky-500 to-cyan-500",
    title: {
      en: "Astro Website Development",
      es: "Desarrollo de sitios con Astro",
    },
    shortDescription: {
      en: "Build or improve fast content sites, docs, landing pages, and multilingual Astro setups.",
      es: "Crear o mejorar sitios rapidos de contenido, documentacion, landings y setups multilenguaje en Astro.",
    },
    heroDescription: {
      en: "Astro work for blogs, resource sites, content platforms, and multilingual marketing pages with a clear publishing workflow.",
      es: "Trabajo con Astro para blogs, sitios de recursos, plataformas de contenido y paginas de marketing multilenguaje con un flujo de publicacion claro.",
    },
    intro: {
      en: "This fits teams or solo founders who want a site that stays fast, easy to edit, and clean to deploy. It is a good match for migrations away from WordPress, performance cleanup, and structured content work.",
      es: "Esto encaja con equipos o founders que quieren un sitio rapido, facil de editar y limpio de desplegar. Va bien para migraciones desde WordPress, mejoras de rendimiento y trabajo con contenido estructurado.",
    },
    idealFor: {
      en: [
        "Content-heavy websites that need better speed and cleaner structure",
        "Astro migrations from WordPress or other CMS setups",
        "Multilingual sites with SEO-focused routing and hreflang support",
      ],
      es: [
        "Sitios con mucho contenido que necesitan mas velocidad y mejor estructura",
        "Migraciones a Astro desde WordPress u otros CMS",
        "Sitios multilenguaje con rutas SEO y soporte hreflang",
      ],
    },
    deliverables: [
      {
        title: {
          en: "Architecture and content model",
          es: "Arquitectura y modelo de contenido",
        },
        description: {
          en: "Collection structure, page templates, shared components, and content workflows that do not collapse once the site grows.",
          es: "Estructura de colecciones, templates de pagina, componentes compartidos y flujos de contenido que no se rompen cuando el sitio crece.",
        },
      },
      {
        title: {
          en: "Performance-focused frontend",
          es: "Frontend centrado en rendimiento",
        },
        description: {
          en: "Lean pages, better asset handling, and practical cleanup around layout, navigation, and page speed.",
          es: "Paginas ligeras, mejor gestion de assets y limpieza practica en layout, navegacion y velocidad.",
        },
      },
      {
        title: {
          en: "Deployment-ready setup",
          es: "Setup listo para despliegue",
        },
        description: {
          en: "Build and deployment flow that works on static hosting, VPS, or your current platform without fragile manual steps.",
          es: "Flujo de build y despliegue que funciona en hosting estatico, VPS o tu plataforma actual sin pasos manuales fragiles.",
        },
      },
    ],
    process: {
      en: [
        "Review content structure, templates, and current pain points",
        "Define page architecture, component reuse, and migration plan",
        "Implement and hand off a maintainable Astro codebase",
      ],
      es: [
        "Revisar estructura de contenido, templates y problemas actuales",
        "Definir arquitectura de paginas, reutilizacion de componentes y plan de migracion",
        "Implementar y entregar un codebase de Astro mantenible",
      ],
    },
    outcomes: {
      en: [
        "A faster publishing site with less frontend clutter",
        "Clear templates for future pages and sections",
        "A deployment path that is easier to repeat",
      ],
      es: [
        "Un sitio de publicacion mas rapido y con menos ruido frontend",
        "Templates claros para futuras paginas y secciones",
        "Un camino de despliegue mas facil de repetir",
      ],
    },
    faq: [
      {
        question: {
          en: "Can you work on an existing Astro codebase instead of starting fresh?",
          es: "Puedes trabajar sobre un proyecto Astro existente en lugar de empezar de cero?",
        },
        answer: {
          en: "Yes. A cleanup or extension of an existing Astro project is usually more useful than a rewrite unless the current structure is beyond repair.",
          es: "Si. Limpiar o ampliar un proyecto Astro existente suele ser mas util que reescribirlo, salvo que la estructura actual este demasiado rota.",
        },
      },
      {
        question: {
          en: "Can you add multilingual routing and SEO support?",
          es: "Puedes anadir rutas multilenguaje y soporte SEO?",
        },
        answer: {
          en: "Yes. That includes localized routes, language switching, hreflang tags, and content organization that is manageable long term.",
          es: "Si. Eso incluye rutas localizadas, cambio de idioma, etiquetas hreflang y una organizacion del contenido que siga siendo manejable a largo plazo.",
        },
      },
    ],
    relatedArticles: [
      { slug: "build-astro-blog-free" },
      { slug: "deploy-astro-on-vps" },
      { slug: "astro-i18n-localization" },
    ],
  },
  {
    key: "ai-agent-development",
    slug: {
      en: "ai-agent-development",
      es: "desarrollo-agentes-ia",
    },
    icon: "mdi:robot-outline",
    accent: "from-emerald-500 to-teal-500",
    title: {
      en: "AI Agent Development",
      es: "Desarrollo de agentes IA",
    },
    shortDescription: {
      en: "Prototype, structure, and deploy agent workflows with Agno, ADK, MCP tools, and self-hosted options.",
      es: "Prototipar, estructurar y desplegar flujos con agentes usando Agno, ADK, herramientas MCP y opciones self-hosted.",
    },
    heroDescription: {
      en: "Agent systems that are practical, scoped around real tasks, and deployable on infrastructure you control.",
      es: "Sistemas de agentes que sean practicos, tengan un alcance claro y se puedan desplegar en infraestructura que controles.",
    },
    intro: {
      en: "This service is for teams testing an internal AI workflow, founders building an AI-first product feature, or operators who want agent systems they can actually run and maintain.",
      es: "Este servicio es para equipos que estan probando flujos internos con IA, founders que construyen una funcionalidad AI-first o perfiles tecnicos que quieren sistemas de agentes que puedan ejecutar y mantener.",
    },
    idealFor: {
      en: [
        "Internal assistants with tool use, memory, or document workflows",
        "Proof-of-concept multi-agent systems",
        "Self-hosted agent setups where data control matters",
      ],
      es: [
        "Asistentes internos con herramientas, memoria o flujos sobre documentos",
        "Pruebas de concepto con sistemas multiagente",
        "Setups self-hosted de agentes cuando el control de datos importa",
      ],
    },
    deliverables: [
      {
        title: {
          en: "Agent workflow design",
          es: "Diseno del flujo de agentes",
        },
        description: {
          en: "Task boundaries, model choices, tool integration, and execution flow based on what the agent actually needs to do.",
          es: "Limites de tareas, eleccion de modelos, integracion de herramientas y flujo de ejecucion segun lo que el agente realmente necesita hacer.",
        },
      },
      {
        title: {
          en: "Deployment and runtime setup",
          es: "Setup de despliegue y runtime",
        },
        description: {
          en: "Containerized local or VPS deployment, environment handling, and the basic observability needed to keep it usable.",
          es: "Despliegue local o en VPS con contenedores, manejo de entornos y la observabilidad basica necesaria para que siga siendo util.",
        },
      },
      {
        title: {
          en: "Practical guardrails",
          es: "Guardrails practicos",
        },
        description: {
          en: "Clear limits around prompts, tools, and system behavior so the result is less fragile and easier to debug.",
          es: "Limites claros sobre prompts, herramientas y comportamiento del sistema para que el resultado sea menos fragil y mas facil de depurar.",
        },
      },
    ],
    process: {
      en: [
        "Define the task the agent should own and what stays manual",
        "Choose framework, model, tool access, and hosting model",
        "Ship a working implementation with repeatable deployment steps",
      ],
      es: [
        "Definir la tarea que el agente debe asumir y lo que sigue siendo manual",
        "Elegir framework, modelo, acceso a herramientas y modelo de hosting",
        "Entregar una implementacion funcional con pasos de despliegue repetibles",
      ],
    },
    outcomes: {
      en: [
        "A clearer AI workflow instead of a vague demo",
        "An agent setup that can actually run outside a notebook",
        "Fewer moving parts than most overbuilt agent prototypes",
      ],
      es: [
        "Un flujo de IA mas claro en lugar de una demo vaga",
        "Un setup de agentes que realmente funcione fuera de un notebook",
        "Menos piezas moviles que la mayoria de prototipos sobrecomplicados",
      ],
    },
    faq: [
      {
        question: {
          en: "Do you only work with one framework?",
          es: "Solo trabajas con un framework?",
        },
        answer: {
          en: "No. The framework depends on the task. Agno, Google ADK, MCP-based tooling, or a simpler Python service can all be valid choices.",
          es: "No. El framework depende de la tarea. Agno, Google ADK, tooling basado en MCP o incluso un servicio Python mas simple pueden ser elecciones validas.",
        },
      },
      {
        question: {
          en: "Can this be self-hosted?",
          es: "Esto se puede self-hostear?",
        },
        answer: {
          en: "Yes, when the tooling stack allows it. Self-hosted deployments are often the right fit for internal use cases or privacy-sensitive workflows.",
          es: "Si, cuando el stack lo permite. Los despliegues self-hosted suelen encajar bien en casos internos o en flujos sensibles a la privacidad.",
        },
      },
    ],
    relatedArticles: [
      { slug: "agno-get-start" },
      { slug: "google-adk-start" },
      { slug: "create-your-own-ai-agent" },
      { slug: "memoh-ai-agent-deploy" },
    ],
  },
  {
    key: "vps-server-setup",
    slug: {
      en: "vps-server-setup",
      es: "configuracion-vps-servidores",
    },
    icon: "mdi:server-network",
    accent: "from-indigo-500 to-blue-500",
    title: {
      en: "VPS Setup and Hardening",
      es: "Configuracion y hardening de VPS",
    },
    shortDescription: {
      en: "Provision servers, secure access, add monitoring, and prepare a cleaner base for apps and websites.",
      es: "Provisionar servidores, asegurar accesos, anadir monitoreo y dejar una base mas limpia para apps y sitios.",
    },
    heroDescription: {
      en: "Practical VPS work for operators who want a solid base before layering on apps, automation, or content platforms.",
      es: "Trabajo practico sobre VPS para quien necesita una base solida antes de montar apps, automatizacion o plataformas de contenido.",
    },
    intro: {
      en: "If you already have a server but do not trust its setup, or you need a new one configured properly from the start, this service covers the boring but important parts that keep future work stable.",
      es: "Si ya tienes un servidor pero no confias en su configuracion, o necesitas uno nuevo bien montado desde el inicio, este servicio cubre la parte aburrida pero importante que hace estable todo lo demas.",
    },
    idealFor: {
      en: [
        "New VPS deployments that need a clean foundation",
        "Existing servers with weak SSH, firewall, backup, or monitoring setup",
        "Teams preparing infrastructure for websites, Docker apps, or internal tools",
      ],
      es: [
        "Nuevos despliegues VPS que necesitan una base limpia",
        "Servidores existentes con una configuracion floja de SSH, firewall, backups o monitoreo",
        "Equipos que preparan infraestructura para sitios, apps Docker o herramientas internas",
      ],
    },
    deliverables: [
      {
        title: {
          en: "Base server setup",
          es: "Configuracion base del servidor",
        },
        description: {
          en: "SSH access cleanup, user setup, package baseline, and a saner starting point than the provider default.",
          es: "Limpieza del acceso SSH, configuracion de usuarios, paquetes base y un punto de partida mas sensato que el default del proveedor.",
        },
      },
      {
        title: {
          en: "Security and resilience",
          es: "Seguridad y resiliencia",
        },
        description: {
          en: "Firewall, access policy, backup approach, and monitoring choices aligned with the actual stack you want to run.",
          es: "Firewall, politicas de acceso, estrategia de backup y decisiones de monitoreo alineadas con el stack real que quieres ejecutar.",
        },
      },
      {
        title: {
          en: "Ready-for-apps environment",
          es: "Entorno listo para apps",
        },
        description: {
          en: "Reverse proxy, container runtime, or panel setup depending on whether you want raw Docker, Dokploy, CloudPanel, or another workflow.",
          es: "Reverse proxy, runtime de contenedores o panel, segun si quieres Docker puro, Dokploy, CloudPanel u otro flujo.",
        },
      },
    ],
    process: {
      en: [
        "Audit current provider, OS, access model, and deployment goals",
        "Harden the server and remove weak defaults",
        "Prepare the stack for the next layer: website, app, or self-hosted platform",
      ],
      es: [
        "Revisar proveedor, OS, modelo de acceso y objetivos de despliegue",
        "Endurecer el servidor y quitar defaults debiles",
        "Preparar el stack para la siguiente capa: sitio, app o plataforma self-hosted",
      ],
    },
    outcomes: {
      en: [
        "A cleaner server baseline with fewer avoidable risks",
        "Better visibility into uptime and failures",
        "Less ad-hoc setup work before every new deployment",
      ],
      es: [
        "Una base de servidor mas limpia y con menos riesgos evitables",
        "Mejor visibilidad sobre caidas y errores",
        "Menos trabajo improvisado antes de cada despliegue nuevo",
      ],
    },
    faq: [
      {
        question: {
          en: "Can you work with an existing VPS instead of a fresh server?",
          es: "Puedes trabajar sobre un VPS existente en vez de uno nuevo?",
        },
        answer: {
          en: "Yes. Existing servers are common, but I will usually start by identifying what should be kept, cleaned up, or rebuilt.",
          es: "Si. Es muy comun trabajar sobre servidores ya existentes, pero normalmente empiezo identificando que conviene mantener, limpiar o rehacer.",
        },
      },
      {
        question: {
          en: "Do you also handle monitoring and backup basics?",
          es: "Tambien cubres monitoreo y backups basicos?",
        },
        answer: {
          en: "Yes. That is part of making the server usable in practice, not just technically online.",
          es: "Si. Eso forma parte de dejar el servidor util de verdad, no solo tecnicamente encendido.",
        },
      },
    ],
    relatedArticles: [
      { slug: "secure-ssh-server-linux" },
      { slug: "deploy-uptime-kuma" },
      { slug: "hetzner-cloud-review" },
    ],
  },
  {
    key: "dokploy-deployment",
    slug: {
      en: "dokploy-deployment",
      es: "despliegue-dokploy",
    },
    icon: "mdi:layers-triple-outline",
    accent: "from-violet-500 to-fuchsia-500",
    title: {
      en: "Dokploy Deployment and Setup",
      es: "Despliegue y setup con Dokploy",
    },
    shortDescription: {
      en: "Set up Dokploy, structure projects, and turn scattered Docker deployments into a cleaner workflow.",
      es: "Montar Dokploy, estructurar proyectos y convertir despliegues Docker dispersos en un flujo mas limpio.",
    },
    heroDescription: {
      en: "Dokploy work for teams that want a straightforward self-hosted deployment layer without living in raw shell scripts forever.",
      es: "Trabajo con Dokploy para equipos que quieren una capa de despliegue self-hosted directa sin vivir para siempre entre scripts sueltos.",
    },
    intro: {
      en: "This fits people moving off manual Docker commands, projects that need a simpler deployment panel, or teams standardizing how they ship apps and services on their own VPS.",
      es: "Esto encaja con quien quiere salir de comandos Docker manuales, con proyectos que necesitan un panel de despliegue mas simple o con equipos que quieren estandarizar como publican apps y servicios en su propio VPS.",
    },
    idealFor: {
      en: [
        "First-time Dokploy setup on a clean VPS",
        "Existing Dokploy installs that need saner project structure",
        "Teams managing several apps, domains, backups, or compose-based services",
      ],
      es: [
        "Primer setup de Dokploy sobre un VPS limpio",
        "Instalaciones de Dokploy existentes que necesitan una estructura mas ordenada",
        "Equipos que gestionan varias apps, dominios, backups o servicios basados en compose",
      ],
    },
    deliverables: [
      {
        title: {
          en: "Dokploy installation and baseline",
          es: "Instalacion y base de Dokploy",
        },
        description: {
          en: "Provider setup, Dokploy installation, domain and proxy planning, plus the basic environment decisions that matter later.",
          es: "Setup del proveedor, instalacion de Dokploy, plan de dominios y proxy, mas las decisiones de entorno que despues si importan.",
        },
      },
      {
        title: {
          en: "Project and deployment structure",
          es: "Estructura de proyectos y despliegues",
        },
        description: {
          en: "Application layout, compose-based services, environment handling, and a deployment model that is easier to understand months later.",
          es: "Organizacion de aplicaciones, servicios basados en compose, manejo de entornos y un modelo de despliegue mas facil de entender meses despues.",
        },
      },
      {
        title: {
          en: "Backups and operational basics",
          es: "Backups y operacion basica",
        },
        description: {
          en: "Storage, backup paths, and simple guardrails so the panel does not become another fragile layer.",
          es: "Storage, rutas de backup y guardrails simples para que el panel no se convierta en otra capa fragil.",
        },
      },
    ],
    process: {
      en: [
        "Review whether Dokploy is the right fit for the stack",
        "Install or clean up the Dokploy environment",
        "Organize projects, domains, compose apps, and backup flow",
      ],
      es: [
        "Revisar si Dokploy encaja de verdad con el stack",
        "Instalar o limpiar el entorno de Dokploy",
        "Organizar proyectos, dominios, apps compose y flujo de backups",
      ],
    },
    outcomes: {
      en: [
        "A simpler deployment panel for ongoing app changes",
        "Less shell-only deployment drift across projects",
        "A more predictable self-hosted app workflow",
      ],
      es: [
        "Un panel de despliegue mas simple para cambios continuos en apps",
        "Menos deriva entre proyectos gestionados solo con shell",
        "Un flujo mas predecible para apps self-hosted",
      ],
    },
    faq: [
      {
        question: {
          en: "Can you migrate existing Docker Compose apps into Dokploy?",
          es: "Puedes migrar apps Docker Compose existentes a Dokploy?",
        },
        answer: {
          en: "Yes, in many cases. The first step is checking whether the existing compose setup maps cleanly or needs some restructuring first.",
          es: "Si, en muchos casos. El primer paso es ver si el compose actual se puede trasladar tal cual o si antes necesita algo de reestructuracion.",
        },
      },
      {
        question: {
          en: "Do you also handle storage and backups around Dokploy?",
          es: "Tambien cubres storage y backups alrededor de Dokploy?",
        },
        answer: {
          en: "Yes. Dokploy on its own is not enough if the surrounding server and backup approach are weak.",
          es: "Si. Dokploy por si solo no basta si el servidor de alrededor y la estrategia de backups son flojos.",
        },
      },
    ],
    relatedArticles: [
      { slug: "dokploy-install" },
      { slug: "dokploy-backups-cloudflare-r2" },
      { slug: "dokploy-docker-compose-app" },
    ],
  },
  {
    key: "self-hosted-apps",
    slug: {
      en: "self-hosted-apps",
      es: "aplicaciones-self-hosted",
    },
    icon: "mdi:docker",
    accent: "from-orange-500 to-amber-500",
    title: {
      en: "Self-Hosted App Deployment",
      es: "Despliegue de apps self-hosted",
    },
    shortDescription: {
      en: "Deploy useful open source apps on your own infrastructure with a setup you can keep operating.",
      es: "Desplegar apps open source utiles en tu propia infraestructura con un setup que puedas seguir operando.",
    },
    heroDescription: {
      en: "Self-hosted stacks for search, monitoring, docs, file sharing, AI tooling, and the infrastructure around them.",
      es: "Stacks self-hosted para busqueda, monitoreo, documentacion, comparticion de archivos, tooling IA y la infraestructura que los rodea.",
    },
    intro: {
      en: "This service is a fit when you know the app you want to run, but you do not want to waste days stitching together containers, reverse proxy, storage, backups, and updates.",
      es: "Este servicio encaja cuando sabes que app quieres ejecutar, pero no quieres perder dias uniendo contenedores, reverse proxy, storage, backups y actualizaciones.",
    },
    idealFor: {
      en: [
        "Teams replacing SaaS with a self-hosted tool",
        "Operators building a home-lab or production-friendly service stack",
        "Projects that need app deployment plus reverse proxy, TLS, backups, and monitoring",
      ],
      es: [
        "Equipos que reemplazan SaaS por una herramienta self-hosted",
        "Perfiles tecnicos montando un home lab o un stack util para produccion",
        "Proyectos que necesitan despliegue de apps junto con reverse proxy, TLS, backups y monitoreo",
      ],
    },
    deliverables: [
      {
        title: {
          en: "App deployment planning",
          es: "Planificacion del despliegue",
        },
        description: {
          en: "Check resource fit, storage needs, network layout, and whether the app is realistic for your VPS or local server.",
          es: "Revisar encaje de recursos, necesidades de storage, red y si la app es realista para tu VPS o servidor local.",
        },
      },
      {
        title: {
          en: "Operational deployment",
          es: "Despliegue operativo",
        },
        description: {
          en: "Container setup, domain or local access, TLS if needed, and the update path that keeps the app maintainable.",
          es: "Setup de contenedores, acceso por dominio o local, TLS si hace falta y una ruta de actualizacion que mantenga la app util.",
        },
      },
      {
        title: {
          en: "Documentation for the handoff",
          es: "Documentacion para la entrega",
        },
        description: {
          en: "The important commands, file locations, and decisions so the service is not a black box after deployment.",
          es: "Los comandos importantes, rutas de archivos y decisiones tomadas para que el servicio no quede como una caja negra tras el despliegue.",
        },
      },
    ],
    process: {
      en: [
        "Choose the right app and hosting approach for the requirement",
        "Deploy the stack with the missing operational pieces included",
        "Document the moving parts so the service stays manageable",
      ],
      es: [
        "Elegir la app y el enfoque de hosting adecuados para la necesidad",
        "Desplegar el stack incluyendo las piezas operativas que faltan",
        "Documentar las partes moviles para que el servicio siga siendo manejable",
      ],
    },
    outcomes: {
      en: [
        "A working self-hosted app with fewer hidden traps",
        "Less time lost in random Docker fixes",
        "A stack you can update and understand later",
      ],
      es: [
        "Una app self-hosted funcionando y con menos trampas ocultas",
        "Menos tiempo perdido en arreglos aleatorios de Docker",
        "Un stack que puedas actualizar y entender despues",
      ],
    },
    faq: [
      {
        question: {
          en: "Can you deploy more than one app in the same project?",
          es: "Puedes desplegar mas de una app dentro del mismo proyecto?",
        },
        answer: {
          en: "Yes, as long as the scope is clear. A lot of self-hosted work is really about the stack around the app, not just one container.",
          es: "Si, siempre que el alcance este claro. Mucho trabajo self-hosted trata mas del stack alrededor de la app que de un solo contenedor.",
        },
      },
      {
        question: {
          en: "Do you only work with home-lab setups?",
          es: "Solo trabajas con setups de home lab?",
        },
        answer: {
          en: "No. The same patterns can apply to a personal server, an internal team tool, or a small production deployment.",
          es: "No. Los mismos patrones sirven para un servidor personal, una herramienta interna de equipo o un despliegue pequeno en produccion.",
        },
      },
    ],
    relatedArticles: [
      { slug: "docker-containers-home-server" },
      { slug: "best-self-hosted-panels" },
      { slug: "searxng-self-host-privacy-search" },
    ],
  },
];

export function getServices(locale: ServiceLocale): ServiceConfig[] {
  return services.slice().sort((a, b) =>
    a.title[locale].localeCompare(b.title[locale], locale === "es" ? "es" : "en"),
  );
}

export function getServiceBySlug(locale: ServiceLocale, slug: string): ServiceConfig | undefined {
  return services.find((service) => service.slug[locale] === slug);
}

export function getServicesContactHref(locale: ServiceLocale): string {
  return locale === "es" ? "/es/contact/" : "/contact/";
}

export function getServicePath(service: ServiceConfig, locale: ServiceLocale): string {
  return locale === "es"
    ? `/es/services/${service.slug.es}/`
    : `/services/${service.slug.en}/`;
}

export function getServicesIndexPath(locale: ServiceLocale): string {
  return locale === "es" ? "/es/services/" : "/services/";
}
