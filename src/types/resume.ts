export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export type Profile = {
  name: string;
  title: string;
  bio: string;
  phone: string;
  email: string;
  github: string[];
  photoUrl?: string | null;
};

export type BasicInfo = {
  address: string[];
  birthday: string;
  hobbies: string[];
};

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  arrangement: string;
  startDate: string;
  endDate: string;
  bullets: string[];
};

export type Education = {
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
};

export type Project = {
  name: string;
  description: string;
};

export type ResumeData = {
  profile: Profile;
  basicInfo: BasicInfo;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
};

export const DEFAULT_RESUME: ResumeData = {
  profile: {
    name: "Leonhail L. Paypa",
    title: "Software Engineer",
    bio: "I am an experienced front-end developer for almost 6 years with expertise in Vue.js. Experienced with Tailwind, Typescript, Vuetify, Nuxt.js, React.js, Next.js, Inertia.js and Laravel. Goal-oriented and driven.",
    phone: "09395146122",
    email: "leonhaipaypa27@gmail.com",
    github: ["leonhail-nell", "leonhail-sudo"],
    photoUrl: null,
  },
  basicInfo: {
    address: ["San Francisco, Panabo City", "Davao del Norte, Philippines"],
    birthday: "February 27, 1998",
    hobbies: ["Playing Basketball", "Watching Anime"],
  },
  skills: [
    { name: "PHP", level: 5 },
    { name: "LARAVEL", level: 5 },
    { name: "LIVEWIRE", level: 3 },
    { name: "JAVASCRIPT", level: 5 },
    { name: "TYPESCRIPT", level: 5 },
    { name: "VUEJS", level: 5 },
    { name: "NUXTJS", level: 5 },
    { name: "INERTIAJS", level: 4 },
    { name: "QUASAR", level: 4 },
    { name: "REACTJS", level: 4 },
    { name: "NEXTJS", level: 4 },
    { name: "HTML", level: 5 },
    { name: "CSS", level: 5 },
    { name: "TAILWIND", level: 5 },
    { name: "VUETIFY", level: 5 },
    { name: "ELEMENTUI", level: 5 },
    { name: "MUI", level: 5 },
    { name: "GIT", level: 5 },
  ],
  experience: [
    {
      company: "DevCodic",
      role: "Fullstack Web Developer",
      location: "Panabo City, Philippines",
      arrangement: "Office Base - Part-time",
      startDate: "2019-01",
      endDate: "2021-02",
      bullets: [
        "Designed, implemented and monitored web pages, plugins and functionality for continuous improvement.",
        "Designed, developed and implemented software applications for website based on analyzed requirements and understanding of industry technical standards.",
      ],
    },
    {
      company: "Emapta",
      role: "Frontend Web Developer",
      location: "Ortigas City, Philippines",
      arrangement: "Remote - Full-time",
      startDate: "2021-02",
      endDate: "2022-01",
      bullets: [
        "Developed functional digital design concepts across various platforms to strengthen company brand and identity.",
        "Planned website development, converting mockups into usable web presence with HTML, JavaScript, AJAX and JSON coding.",
      ],
    },
    {
      company: "LMG",
      role: "Frontend Web Developer",
      location: "Australia",
      arrangement: "Remote - Full-time",
      startDate: "2022-01",
      endDate: "2024-02",
      bullets: [
        "Oversaw back-end development using PHP to maintain website integrity, security and efficiency.",
        "Conducted testing and review of website design for responsiveness, clarity and effectiveness.",
        "Pulled from PHP, SQL, JavaScript and other back-end library knowledge to bolster programming resources.",
      ],
    },
  ],
  education: [
    {
      school: "Davao del Norte State College",
      degree: "Bachelor of Science: Information Technology",
      location: "New Visayas, Panabo City, Philippines",
      startDate: "2015-08",
      endDate: "2019-08",
    },
  ],
  projects: [
    { name: "Pamalengke.ph", description: "Ecommerce website" },
    { name: "Tindah.ph", description: "Ecommerce website" },
    { name: "Mysms.ph", description: "SMS gateway" },
    { name: "Bluxe.eu", description: "Online Business website" },
    { name: "Nodifi.cloud", description: "Online Business website" },
    { name: "Onlineloans", description: "Asset Finance Application" },
  ],
};
