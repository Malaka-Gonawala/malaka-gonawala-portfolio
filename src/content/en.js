export const en = {
  hero: {
    name: "Malaka Gonawala",
    line: "Front-end developer. Websites for restaurants, barbers and small shops, built sleek, modern and accessible to anyone.",
    cta: "Open the projects",
    cmd: "cd \\work ↓",
  },
  // About page "Now" (Phase 5, approved 2026-11-09), shown as now.txt in the underside.
  now: 'Today I\'m in my fifth year at Istituto Tecnico e Liceo "Enrico Mattei", studying computer science.',
  // Copy from the prototype's Flip menu (plan/phase4/prototype), word for word.
  nav: {
    flip: "Flip",
    flipBack: "Flip back",
    label: "Main",
    links: [
      ["Work", "#work"],
      ["Lab", "/lab/"],
      ["About", "/about/"],
      ["Resume", "/resume/"],
      ["Contact", "/contact/"],
    ],
    here: "you are here",
    hereArrow: "  ← you are here",
    prompt: "PS C:\\Users\\Malaka> ",
    prompt2: "PS C:\\Users\\Malaka\\site> ",
    cd: "cd site",
    up: "cd ..",
    dir: "Directory: C:\\Users\\Malaka\\site",
    cols: ["Mode", "LastWriteTime", "Name"],
    mode: "d-----",
    theme: "Dark / Light",
    cert: "CCNA · Security + AI (planned)",
    domain: "malakagonawala.dev/",
  },
};

// Pitches: Phase 5 approved copy (plan/phase5/*-page.md), word for word.
export const work = {
  open: "Open project →",
  othersTitle: "Other projects",
  leads: [
    {
      slug: "fortheroot",
      name: "ForTheRoot",
      pitch:
        "A website that teaches the basics of cybersecurity through three playable mini-games.",
      alt: "ForTheRoot home page on a laptop and on a phone",
    },
    {
      slug: "forvalue",
      name: "ForValue",
      pitch:
        "A working demo of a wood supply chain, from forest to buyer, where every batch carries a QR code with its full history.",
      alt: "ForValue dashboard on a laptop and on a phone",
    },
  ],
  others: [
    {
      slug: "holoservice",
      shot: true,
      name: "Holo Service",
      pitch:
        "A one-page website for a Milan cleaning and reception company, with a quote form that sends requests straight to the owner's email.",
    },
    {
      slug: "shitosbarber",
      shot: true,
      name: "Shitos Barber",
      pitch:
        "A one-page website for a barber shop in Milan, with a price list, a photo gallery and a map of both shops.",
    },
    {
      slug: "antigravity",
      shot: true,
      name: "Antigravity Bikes",
      pitch:
        "A motorbike dealership demo website with a model catalog, test-drive booking, a simulated job portal and a user profile.",
    },
    {
      slug: "prettysrilanka",
      name: "Pretty Sri Lanka",
      pitch: "Where it all started: my first website.",
      href: "/about/",
    },
    {
      slug: "experiments",
      name: "Experiments and early work →",
      href: "/lab/",
    },
  ],
};

// Project pages, Lab, Resume and the AI section: Phase 5 approved copy (plan/phase5/*.md), word for word. Strings may
// hold links. Anything without approved copy stays in [brackets] (S9).
const VIEW = "view only, all rights reserved";
export const projects = {
  forvalue: {
    context:
      "Fifth-year high school project for Project Management and Business Organization (GPOI).",
    role: "I planned and directed ForValue (screens, roles, design choices), built it with AI, and tested and checked every part myself. School project, done as a pair.",
    stack:
      "HTML, CSS and JavaScript, no framework. Data is saved in the browser (localStorage). Hosted on GitHub Pages.",
    more: [
      [
        "Problem and solution",
        "In Italy, a log's paperwork is still mostly on paper and split across regions, which makes it hard to prove where wood was cut. ForValue gives every batch a QR code with its full history, from forest to buyer. Sawmills can also sell byproducts like wood chips and sawdust on the same platform, traced back to the batch they came from.",
      ],
      [
        "How it works",
        "Three roles, each with its own menu. The forest owner registers a batch and gets a QR code. The sawmill sells boards and byproducts. The buyer orders, and the truck's trip shows on a map until delivery. Anyone can scan the QR and see the batch history, no login needed. It works on phone and laptop, in Italian and English. It has no back end: this is a demo, and the data stays in your browser.",
      ],
      [
        "Accessibility",
        "The whole site works with the keyboard and shows a clear focus outline. Text has readable contrast, every form field has a label, and images have alt text. Checked against WCAG 2.2 AA with axe-core and by hand: axe ran on all 25 pages at phone and desktop sizes, plus keyboard walks, a 320 px test and contrast checks.",
      ],
    ],
    live: "https://malaka-gonawala.github.io/forvalue/",
    code: "https://github.com/Malaka-Gonawala/forvalue",
    codeNote: VIEW,
  },
  fortheroot: {
    context:
      "Fourth-year high school project for Systems and Networks (Sistemi e Reti). The assignment was a PowerPoint; we built a website instead.",
    role: "I designed the game mechanics and built the site, mostly hand-coded in under two days. Hugo provided the content, colour palette and overall design. I used ChatGPT to debug code, and it generated the reverse-engineering level, where I set the password.",
    stack: "HTML, CSS and JavaScript. Hosted on GitHub Pages.",
    more: [
      ["Credit", 'Made with <a href="https://github.com/h9go">Hugo Batoon</a>'],
      [
        "Goal",
        "Introduce beginners to the fundamentals of cybersecurity through short explanations and mini-games.",
      ],
      [
        "The games",
        "Cryptography: follow the instructions and decode the password. Reverse engineering: read the JavaScript and watch the console to crack it. Web security: use the browser's DevTools to find the weak spots in the page. The site itself is in Italian.",
      ],
    ],
    live: "https://h9go.github.io/ForTheRoot/",
    code: "https://github.com/h9go/ForTheRoot",
    codeNote: VIEW,
  },
  holoservice: {
    context:
      "Client project, in Italian. Holo Service offers cleaning and disinfection, plus concierge and reception services.",
    role: "My second client project. The client gave me a finished design, and I turned it into a working website by directing Google Antigravity (an AI coding tool) and checking the result, including the contact form that sends messages straight to their email.",
    stack:
      "HTML, CSS and JavaScript, no framework. Contact form through FormSubmit.",
    more: [
      [
        "Contact form",
        "Messages go straight to the client's email (FormSubmit), set up and tested with the client.",
      ],
    ],
    live: "https://holoservice.it",
  },
  "shitos-barber": {
    context: "Client project, in Italian.",
    role: "My first client project. The client sent me his Instagram page, prices and content. I built the colour palette by studying the videos on his page, put videos from it into the site, and directed Google Antigravity (an AI coding tool) to build the one-page site.",
    stack:
      "HTML, CSS and JavaScript, no framework. Interactive map with Leaflet and OpenStreetMap. Hosted on Netlify.",
    more: [
      [
        "What's on the page",
        "a short logo loader, the price list, a photo gallery with a viewer, a map of both shops, opening hours and a WhatsApp link.",
      ],
    ],
    live: "https://shitosbarber.netlify.app",
  },
  "antigravity-bike": {
    context:
      'A concept project, not a real dealership. My first test of Google Antigravity, built from leftover assets from my school project <a href="https://malaka-gonawala.github.io/Cavalleria_su_due_ruote/">Cavalleria su due ruote</a>. It grew into a full demo website.',
    role: "I let Antigravity build the first version on its own to see its limits. Then I directed it to add features: simulated login, a job-application portal and a user profile. The bike photos come from the web and belong to their owners.",
    stack:
      "React and Vite, Lucide icons, CSS3 (glassmorphism, flex and grid animations), React Context for state, data saved in the browser (localStorage).",
    more: [
      [
        "Features",
        "Catalog of bikes from Ducati, Honda, Kawasaki, KTM, Suzuki and Yamaha, with a compare option. Job portal where an application moves from pending to accepted or rejected after a realistic delay. Profile page to manage test drives and job applications, with details that expand on hover and cancellations. Animated mobile menu and scroll-to-top navigation.",
      ],
      ["Note", "Concept project. Bike photos belong to their owners."],
    ],
    live: "https://malaka-gonawala.github.io/Antigravity-bike-web/",
    codePending: "[View code: waiting for Malaka's OK]",
  },
};

// Screenshot folders and alt texts (from plan/phase5/screenshots/LIST.md); pairs put the phone shot over the desktop one.
export const shots = {
  forvalue: [
    [
      "forvalue-d1",
      "Forest owner home: lots, volumes, certificate share and QR per lot",
      "forvalue-p1",
      "Phone login: three roles and the scan-a-QR entry point",
    ],
    [
      "forvalue-d2",
      "Public QR batch history: map, cut date, certificate, timeline",
      "forvalue-p2",
      "Phone QR batch history, what a scan shows on the road",
    ],
    ["forvalue-d3", "Buyer marketplace: filtered offers with PEFC/EUDR badges"],
  ],
  fortheroot: [
    [
      "fortheroot-d1",
      "Home: intro to the cybersecurity mini-games and logo",
      "fortheroot-p1",
      "Phone home: intro text under the logo and menu button",
    ],
    [
      "fortheroot-d2",
      "Games page: Cryptography, Reverse Engineering, Web Security",
      "fortheroot-p2",
      "Phone games list: all three games",
    ],
    ["fortheroot-d3", "Cryptography game briefing: goal, 4 levels, start link"],
  ],
  holoservice: [
    [
      "holoservice-d1",
      "Hero: headline, services summary, quote call to action",
      "holoservice-p1",
      "Phone hero",
    ],
    [
      "holoservice-d3",
      "Services: cleaning and reception/concierge cards",
      "holoservice-p2",
      "Phone services section",
    ],
    ["holoservice-d2", "Chi siamo: company story and values"],
  ],
  "shitos-barber": [
    [
      "shitosbarber-d1",
      "Prices list (listino) in the shop style",
      "shitosbarber-p1",
      "Phone prices list",
    ],
    [
      "shitosbarber-d2",
      'Work gallery "Freschi di poltrona": cuts and the shop interior',
      "shitosbarber-p2",
      "Phone work gallery: heading and first photos",
    ],
  ],
  "antigravity-bike": [
    [
      "antigravity-d1",
      'Home hero: "Defy, ride the future" and the two main actions',
      "antigravity-p1",
      "Phone home hero",
    ],
    [
      "antigravity-d3",
      "Bike detail (Z H2 SE): photo, price, specs, test drive button",
      "antigravity-p2",
      "Phone bike detail",
    ],
    ["antigravity-d2", "Catalog: brand and category filters with bike cards"],
  ],
};

// Lab (lab-entries.md): [title, line, text, stack, links, shot]
export const lab = [
  [
    "Cavalleria su due ruote",
    "An Italian motorbike dealership demo with a model catalog and a simulated test-drive booking.",
    "Fourth-year school project for TPSIT (Technology and Design of IT and Telecommunications Systems), done in a group of four. I designed and built the whole website, hand-coded with some AI-generated snippets, using HTML, CSS, JavaScript and Bootstrap. My teammates found the images and gathered the information. Later I removed the team page and photos at my teammates' request.",
    "HTML, CSS, JavaScript, Bootstrap, Ionicons.",
    [
      ["Live", "https://malaka-gonawala.github.io/Cavalleria_su_due_ruote/"],
      ["[View code: after Malaka's README check]"],
    ],
    "[screenshot: S20 decision pending]",
  ],
  [
    "Russian Roulette",
    "",
    "A terminal game in Java, made as a third-year solo school project while I was learning the language, inspired by Squid Game season 2. You play rock-paper-scissors against the computer, and whoever loses a round takes a shot, until one of you loses. It has three modes: normal (one loaded slot), reverse (one empty slot) and progressive (the chamber isn't shuffled). Almost entirely written by me.",
    "Java, terminal.",
    [["View code", "https://github.com/Malaka-Gonawala/russian_roulette"]],
  ],
  [
    "LeetSpeak Encoder/Decoder",
    "",
    "A website that turns text into leetspeak and back, with a copy button. Solo project, almost entirely hand-coded.",
    "",
    [
      ["Live", "https://malaka-gonawala.github.io/LeetSpeak/"],
      ["View code", "https://github.com/Malaka-Gonawala/LeetSpeak"],
    ],
    [
      "leetspeak-d1",
      "Leetspeak encoder after typing a sentence: the converted text appears on the right",
    ],
  ],
  [
    "Manuale HTML CSS JS",
    "",
    "A manual of HTML, CSS and JavaScript with code examples, written in Italian (paragraphs, headings, lists, tables, buttons). Third-year solo school project, entirely hand-coded.",
    "",
    [
      ["Live", "https://malaka-gonawala.github.io/Manuale_html/"],
      ["View code", "https://github.com/Malaka-Gonawala/Manuale_html"],
    ],
    [
      "manuale-d1",
      "HTML/CSS/JS manual: topic tabs with code and rendered result",
    ],
  ],
  [
    "Random Color Generator",
    "",
    "Click a button to generate a colour, then copy it. Solo project, hand-coded.",
    "",
    [
      ["Live", "https://malaka-gonawala.github.io/Random-Color/"],
      ["View code", "https://github.com/Malaka-Gonawala/Random-Color"],
    ],
    ["randomcolor-d1", "Random colour generator after one click"],
  ],
  [
    "Random Message Generator",
    "",
    "Generates a motivational message, an anime quote or an IT joke. Made for a course I was taking, entirely hand-coded; I used AI only to write the messages.",
    "",
    [
      ["Live", "https://malaka-gonawala.github.io/Random_Massage_Generator/"],
      [
        "View code",
        "https://github.com/Malaka-Gonawala/Random_Massage_Generator",
      ],
    ],
    [
      "randommessage-d1",
      "Random message generator: motivational line, anime quote, IT joke",
    ],
  ],
  [
    "Morse Translator",
    "",
    "A Java terminal program that encodes text into Morse code and decodes it back. Solo project, entirely hand-coded.",
    "",
    [["View code", "https://github.com/Malaka-Gonawala/traduttore_morse"]],
  ],
  [
    "v1, hand-coded",
    "",
    "My first portfolio website, made in fourth year for myself. Almost entirely hand-coded, with some AI help.",
    "",
    [
      ["[Live: the old site at /v1, once it is live]"],
      ["[View code: old version, checked at the repo swap]"],
    ],
  ],
];

// Resume (resume-content.md): [heading, html]
export const resume = [
  [
    "",
    '<p><b>Malaka Gonawala</b> · Front-end developer</p><p class="mono">malaka@malakagonawala.dev · malakagonawala.dev · <a href="https://github.com/Malaka-Gonawala">github.com/Malaka-Gonawala</a> · <a href="https://www.linkedin.com/in/malaka-gonawala-a923813a6/">linkedin.com/in/malaka-gonawala-a923813a6</a></p><p class="note">[PDF]</p>',
  ],
  [
    "Summary",
    "<p>Websites for restaurants, barbers and small shops, built sleek, modern and accessible to anyone.</p>",
  ],
  [
    "Education",
    '<p>Istituto Tecnico e Liceo "Enrico Mattei", computer science track. Diploma (maturità) expected 2027.</p>',
  ],
  [
    "Experience",
    "<p>Freelance front-end developer. Websites for clients: a cleaning and reception company (holoservice.it) and a barber shop in Milan (Shitos Barber), built from the clients' own designs and content, including a contact form that sends messages straight to the client's email.</p>",
  ],
  [
    "Projects",
    "<ul><li>ForValue: a wood supply chain demo with a QR code for every batch, WCAG 2.2 AA checked with axe-core and by hand. (fifth-year school project)</li><li>ForTheRoot: cybersecurity mini-games for beginners, built with a classmate. (fourth-year school project)</li><li>Antigravity Bikes: a motorbike dealership demo, built to test an AI coding tool. (concept project)</li></ul>",
  ],
  [
    "Skills",
    "<p>Solid: HTML, CSS, JavaScript, Java (objects, methods, networking basics), Bootstrap, working with AI coding tools (Claude Code).</p><p>Learning: React, MariaDB (InnoDB) and MySQL, accessibility.</p>",
  ],
  [
    "Languages",
    "<p>English: fluent · Italian: good understanding, working speaking and writing · Sinhala: fluent speaker</p>",
  ],
];

// "How I built this with AI" (ai-section.md, headline B), the last part of About
export const ai = [
  "I run a team of AI agents. Here's how I keep them honest.",
  [
    [
      "The setup.",
      "I talk to the main project chat, and it opens a thread for each goal. Each goal thread splits its goal into smaller tasks and hands them to new, smaller threads by difficulty: a group of small tasks can share one thread, while one huge task gets a thread of its own. Three threads own the shared files: one keeps the checklist, one keeps the diary, one keeps the rulebook, and nobody else may edit them. In a few days that meant about 30 threads.",
    ],
    [
      "The rules.",
      "A written rulebook of over 50 rules, with a Judge thread that every other thread reports to and that flags rule breaks. The strict rules only I can change. The AI never invents content, never merges its own work (I merge every pull request), and never adds a paid service without my OK. Anything it breaks is reported with a reason.",
    ],
    [
      "Matching the model to the job.",
      "Replies and small edits go to a small, fast model; research, planning, design and review step up to the most capable one, then back down.",
    ],
    [
      "Quality loops.",
      'A critic reviews design work until it says "no blocking flaws" before I ever see it. Fixes are tested by a separate tester that never wrote them, and failures go back until they pass. When I have to choose, the AI gives me two to five options and one recommendation.',
    ],
    [
      "Memory.",
      "A project memory, a diary and a checklist keep the state, so a fresh AI session can pick up where the last one stopped.",
    ],
    [
      "For code.",
      "A planner talks to me; executors build and report back to the planner in two lines.",
    ],
    [
      "My part.",
      "I set the goals and the rules, answer the questions, choose between options, approve every piece of copy word for word, and merge the work. The AI drafts, researches and builds.",
    ],
  ],
];
