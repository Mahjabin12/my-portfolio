const PortfolioProjects = (() => {
  const projects = [
    {
      id: "skillora",
      title: "Skillora Learning Management System",
      shortTitle: "Skillora",
      category: "Full-Stack Development",
      year: "2026",
      role: "Full-Stack Developer",
      tags: ["MERN Stack", "LMS", "Admin Dashboard"],
      tagline:
        "A role-focused learning platform with practical content management.",
      oneLiner:
        "A full-stack learning management system developed to organize learning content, support administrative workflows, and provide a responsive experience across devices.",
      live: "https://skillora-lms-mahjabin12.netlify.app",
      github: "https://github.com/Mahjabin12/Learning-Management-System",

      problem:
        "Learning platforms often separate course content, administration, and publishing into disconnected workflows. The project challenge was to create a clearer system where users can access learning-related pages while administrators can manage platform content from one structured dashboard.",

      constraints:
        "The project uses separate frontend and backend directories, so the interface, API structure, deployment configuration, and cross-origin communication need to remain organized. The frontend also needed to be responsive and deployable independently while backend development continued.",

      researchInsight:
        "Administrative tools are easier to use when content status is immediately visible and create, edit, and delete actions are available from the same management view.",

      decisions: [
        {
          decision: "Separated the frontend and backend architecture.",
          why:
            "A clear separation makes the React interface and server-side API easier to develop, maintain, and deploy.",
          tradeoff:
            "The production version requires separate deployment and environment configuration for the frontend and backend."
        },
        {
          decision: "Created a reusable admin interface structure.",
          why:
            "Shared page headers, tables, status elements, and theme-aware components keep admin pages consistent.",
          tradeoff:
            "Reusable components require more planning than writing each page independently."
        },
        {
          decision: "Built the blog workflow around CRUD operations.",
          why:
            "Administrators need to create, view, update, and delete posts without switching between unrelated tools.",
          tradeoff:
            "The public blog page and admin list must remain synchronized with the backend data."
        }
      ],

      solution: [
        {
          title: "Admin blog management",
          annotation:
            "The admin area supports adding blog posts and is structured for listing, editing, and deleting published content."
        },
        {
          title: "Responsive learning interface",
          annotation:
            "The React frontend uses reusable components and responsive layouts for public and administrative pages."
        },
        {
          title: "Deployment-ready project structure",
          annotation:
            "The frontend is deployed through Netlify, while the repository keeps frontend and backend code organized separately."
        }
      ],

      outcomes: {
        metrics: [
          {
            value: "4",
            label: "Core blog CRUD actions"
          },
          {
            value: "2",
            label: "Separated application layers"
          },
          {
            value: "1",
            label: "Live frontend deployment"
          }
        ],
        qualitative:
          "Skillora demonstrates practical full-stack project organization, admin content management, responsive interface development, Git-based collaboration, and frontend deployment."
      },

      reflection:
        "The next priority is to deploy the backend, connect all production API endpoints, strengthen authentication and authorization, and add validation and automated testing."
    },

    {
      id: "lifelink",
      title: "LifeLink Medicine Donation",
      shortTitle: "Lifelink",
      category: "Case Study",
      year: "2024–2025",
      role: "UI/UX Designer",
      tags: ["Case Study", "Web App", "Healthcare"],
      tagline: "A medicine donation product for trust-first access.",
      oneLiner:
        "A medicine donation platform designed to make donating, requesting, and tracking medicine support feel simple, safe, and trustworthy.",
      live: "../my project/lifelink - A medicine donation site/index.html",
      github: "#",

      problem:
        "Many people may have unused medicine while others struggle to access basic medicine support. The design challenge was to create a clear, respectful, and trustworthy flow where donors can offer medicine and receivers can request help without confusion or fear.",

      constraints:
        "The concept needed to stay simple, mobile-friendly, and easy to understand. Because medicine donation involves trust and safety, the interface needed clear form fields, privacy-friendly language, and visible confirmation steps.",

      researchInsight:
        "The most important insight was that users do not only need a donation form — they need trust signals before they feel comfortable sharing medicine-related information.",

      decisions: [
        {
          decision: "Made donation and request flows separate.",
          why:
            "Donors and receivers have different goals, so mixing both in one flow would create confusion.",
          tradeoff:
            "The homepage needed two clear CTAs instead of one single primary action."
        },
        {
          decision: "Kept the form short and progressive.",
          why:
            "Healthcare-related forms can feel stressful, so the first step should feel easy.",
          tradeoff:
            "Some advanced medicine details were moved into optional fields."
        },
        {
          decision: "Used calm colors and direct language.",
          why:
            "The product needs to feel trustworthy, not promotional.",
          tradeoff:
            "The visual design became quieter but more appropriate for the context."
        }
      ],

      solution: [
        {
          title: "Trust-first hero section",
          annotation:
            "The opening screen explains the purpose immediately and gives users two clear paths: donate medicine or request support."
        },
        {
          title: "Simple donation flow",
          annotation:
            "The form is structured to collect only the most important details first, reducing friction for first-time donors."
        },
        {
          title: "Support-focused receiver journey",
          annotation:
            "The request flow uses respectful language and clear steps so users do not feel exposed or overwhelmed."
        }
      ],

      outcomes: {
        metrics: [
          {
            value: "2",
            label: "Primary user flows"
          },
          {
            value: "3",
            label: "Key trust decisions"
          },
          {
            value: "1",
            label: "Clear social impact goal"
          }
        ],
        qualitative:
          "The final concept communicates the donation purpose clearly and turns a sensitive healthcare-related task into a more understandable digital flow."
      },

      reflection:
        "If I continued this project, I would test the form language with real users and add a stronger verification flow for safety."
    },

    {
      id: "chittagong",
      title: "Chattogram City Website Concept",
      shortTitle: "Chattogram",
      category: "Web Design",
      year: "2024–2025",
      role: "Web Designer",
      tags: ["Web Design", "Concept", "Civic"],
      tagline: "A tourism and city guide concept with calm navigation.",
      oneLiner:
        "A city website concept designed to present Chattogram’s places, culture, hotels, and travel information in a clean and discoverable structure.",
      live: "../my project/ctg website claude prompt/index.html",
      github: "#",

      problem:
        "Travel and city information often becomes scattered across many pages. The challenge was to design a website where visitors can quickly understand where to go, what to see, and how to explore Chattogram.",

      constraints:
        "The design needed to support image-heavy content, simple navigation, responsive layouts, and a clear structure for multiple categories such as tourism, hotels, food, and local culture.",

      researchInsight:
        "Visitors do not browse city websites like documents; they scan visually and choose based on strong categories, images, and simple labels.",

      decisions: [
        {
          decision: "Used category-based navigation.",
          why:
            "Visitors need quick access to places, hotels, food, and culture.",
          tradeoff:
            "The menu needed careful grouping to avoid becoming too large."
        },
        {
          decision: "Focused on visual storytelling.",
          why:
            "Tourism pages need imagery and atmosphere to build interest.",
          tradeoff:
            "Image sections needed stronger spacing to avoid visual clutter."
        },
        {
          decision: "Made cards scannable.",
          why:
            "Users can compare destinations faster when each card has consistent title, image, and short description.",
          tradeoff:
            "Long descriptive text was avoided on the main listing."
        }
      ],

      solution: [
        {
          title: "Destination-first homepage",
          annotation:
            "The homepage introduces the city visually and guides users toward key travel categories."
        },
        {
          title: "Reusable content cards",
          annotation:
            "Cards make destinations easier to scan and allow the layout to scale with more places."
        },
        {
          title: "Responsive travel guide sections",
          annotation:
            "The structure adapts to mobile screens so visitors can browse from phones while traveling."
        }
      ],

      outcomes: {
        metrics: [
          {
            value: "4",
            label: "Main travel categories"
          },
          {
            value: "1",
            label: "Responsive website concept"
          },
          {
            value: "100%",
            label: "Visual-first approach"
          }
        ],
        qualitative:
          "The concept creates a cleaner information architecture for city exploration and makes tourism content easier to browse."
      },

      reflection:
        "Next, I would improve the content strategy with real destination data, maps, and user reviews."
    },

    {
      id: "os",
      title: "OS Concept",
      shortTitle: "OS",
      category: "UI Exploration",
      year: "2024–2025",
      role: "Interface Designer",
      tags: ["UI Exploration", "Concept", "Productivity"],
      tagline: "A calm operating system for one task at a time.",
      oneLiner:
        "A minimal operating system interface concept focused on calm visuals, task clarity, and reduced distraction.",
      live: "../my project/os/index.html",
      github: "#",

      problem:
        "Most operating system interfaces show too much at once. The challenge was to imagine a calmer interface where users can focus on the current task without losing access to key controls.",

      constraints:
        "The concept had to feel familiar enough to understand but different enough to communicate a calmer, more intentional interaction model.",

      researchInsight:
        "A productivity interface does not need to remove features; it needs to reduce visible noise and reveal controls at the right time.",

      decisions: [
        {
          decision: "Reduced visible controls.",
          why:
            "A calm interface needs fewer competing visual elements.",
          tradeoff:
            "Some actions become less obvious and need better interaction cues."
        },
        {
          decision: "Used large empty space.",
          why:
            "Spacing helps users understand focus and hierarchy.",
          tradeoff:
            "The layout may feel too minimal if content is not balanced carefully."
        },
        {
          decision: "Kept core navigation familiar.",
          why:
            "Users should not need to relearn everything.",
          tradeoff:
            "The concept stays closer to existing OS patterns."
        }
      ],

      solution: [
        {
          title: "Focused workspace",
          annotation:
            "The interface prioritizes one active task and reduces visual competition around it."
        },
        {
          title: "Calm control surfaces",
          annotation:
            "Controls are visually soft and separated from the main work area."
        },
        {
          title: "Minimal system language",
          annotation:
            "Typography, color, and spacing are used to create a quiet product feel."
        }
      ],

      outcomes: {
        metrics: [
          {
            value: "1",
            label: "Core interface concept"
          },
          {
            value: "3",
            label: "Focus decisions"
          },
          {
            value: "0",
            label: "Unnecessary clutter goal"
          }
        ],
        qualitative:
          "The exploration helped define how a minimal system interface can feel focused without becoming empty."
      },

      reflection:
        "I would next prototype task switching and test whether users can still find controls quickly."
    },

    {
      id: "solar",
      title: "Solar System Explorer",
      shortTitle: "Solar",
      category: "Game UI",
      year: "2024–2025",
      role: "Interaction Designer",
      tags: ["Game UI", "Concept", "Education"],
      tagline: "A game UI that teaches a planet at a time.",
      oneLiner:
        "An interactive educational interface for exploring planets through visual cards, playful motion, and simple learning moments.",
      live:
        "../my project/solar system explorer game concept/index.html",
      github: "#",

      problem:
        "Educational interfaces can easily become text-heavy. The challenge was to make space learning feel visual, playful, and easy to explore without overwhelming young learners.",

      constraints:
        "The UI needed to feel game-like while still keeping information readable and structured.",

      researchInsight:
        "Learning improves when information is broken into small, visually distinct moments instead of long paragraphs.",

      decisions: [
        {
          decision: "Used planet-based cards.",
          why:
            "Cards make each planet feel like a separate discovery.",
          tradeoff:
            "The design needed consistent card rules to avoid visual chaos."
        },
        {
          decision: "Added playful motion ideas.",
          why:
            "Motion can make the topic feel more alive and interactive.",
          tradeoff:
            "Animation must stay light so it does not distract from learning."
        },
        {
          decision: "Kept information short.",
          why:
            "Short facts are easier to scan and remember.",
          tradeoff:
            "Detailed educational content needs deeper pages or expanded views."
        }
      ],

      solution: [
        {
          title: "Planet discovery cards",
          annotation:
            "Each planet is presented as a focused card with a clear title and short learning content."
        },
        {
          title: "Space-themed visual direction",
          annotation:
            "The visual style supports the subject and creates curiosity."
        },
        {
          title: "Simple interaction flow",
          annotation:
            "The experience is designed around exploring one planet at a time."
        }
      ],

      outcomes: {
        metrics: [
          {
            value: "8",
            label: "Planet content opportunities"
          },
          {
            value: "1",
            label: "Educational UI concept"
          },
          {
            value: "3",
            label: "Interaction ideas"
          }
        ],
        qualitative:
          "The project shows how educational content can become more engaging through structure, visuals, and interaction."
      },

      reflection:
        "Next, I would add quiz states and test whether the UI helps users remember planet facts."
    },

    {
      id: "voice",
      title: "Voice Assistant Concept",
      shortTitle: "Voice",
      category: "Interaction Design",
      year: "2024–2025",
      role: "Interaction Designer",
      tags: ["Voice UI", "Automation", "Accessibility"],
      tagline:
        "A voice interaction concept for simple command-based tasks.",
      oneLiner:
        "A voice assistant concept exploring speech recognition, command response, and accessibility-focused interaction.",
      live: "../my project/voice assistant/index.html",
      github: "#",

      problem:
        "Not every interaction needs a visual interface. The challenge was to explore how voice commands can support simple tasks and make interaction more accessible.",

      constraints:
        "The system needed clear command recognition, understandable responses, and predictable user feedback.",

      researchInsight:
        "Voice interaction works best when the system makes its available commands clear and responds in a predictable way.",

      decisions: [
        {
          decision: "Focused on simple commands.",
          why:
            "Simple commands are easier to recognize and easier for users to remember.",
          tradeoff:
            "The assistant supports fewer tasks at the concept stage."
        },
        {
          decision: "Used response feedback.",
          why:
            "Users need confirmation that the system understood them.",
          tradeoff:
            "Too much feedback can slow down the interaction."
        },
        {
          decision: "Framed it as accessibility support.",
          why:
            "Voice UI can help users who prefer hands-free interaction.",
          tradeoff:
            "More accessibility testing would be needed for real use."
        }
      ],

      solution: [
        {
          title: "Command-based interaction",
          annotation:
            "The assistant listens for simple instructions and maps them to predictable responses."
        },
        {
          title: "Feedback-first flow",
          annotation:
            "The system confirms actions so users understand what happened."
        },
        {
          title: "Accessibility angle",
          annotation:
            "The concept explores how voice can reduce dependency on traditional input."
        }
      ],

      outcomes: {
        metrics: [
          {
            value: "1",
            label: "Voice interaction concept"
          },
          {
            value: "3",
            label: "Core command patterns"
          },
          {
            value: "1",
            label: "Accessibility direction"
          }
        ],
        qualitative:
          "The project helped translate technical voice features into a clearer interaction design story."
      },

      reflection:
        "I would next create a visible command list and test how users phrase natural requests."
    }
  ];

  function getProject(id) {
    return projects.find((project) => project.id === id);
  }

  function getNextProject(id) {
    const index = projects.findIndex(
      (project) => project.id === id
    );

    const nextIndex =
      index === -1 || index === projects.length - 1
        ? 0
        : index + 1;

    return projects[nextIndex];
  }

  function getCategories() {
    return [
      "All",
      ...new Set(
        projects.map((project) => project.category)
      )
    ];
  }

  return {
    projects,
    getProject,
    getNextProject,
    getCategories
  };
})();