const STORAGE = {
  language: "virtulabLanguage",
  studentName: "studentName",
  studentClass: "studentClass",
  currentLevel: "currentLevel",
  currentSubject: "currentSubject",
  experimentScores: "experimentScores",
  quizScores: "quizScores",
  resultHistory: "virtulabResultHistory",
  lastExperiment: "lastExperiment",
  lastResult: "virtulabLastResult",
  teacherLogged: "virtulabTeacherLogged",
  adminLogged: "virtulabAdminLogged",
  currentTeacher: "virtulabCurrentTeacher",
  professors: "virtulabProfessors",
  labCodes: "virtulabLabCodes",
  activeLabCode: "virtulabActiveLabCode",
  students: "virtulabStudents"
};

const SUBJECTS = {
  primary: [{ id: "science-education", fr: "Education scientifique", ar: "التربية العلمية" }],
  cem: [
    { id: "natural-sciences", fr: "Sciences naturelles", ar: "العلوم الطبيعية" },
    { id: "physics", fr: "Physique", ar: "الفيزياء" }
  ],
  lycee: [
    { id: "svt", fr: "Sciences de la vie et de la Terre", ar: "علوم الطبيعة والحياة" },
    { id: "physics-chemistry", fr: "Physique-Chimie", ar: "فيزياء وكيمياء" },
    { id: "organic-chemistry", fr: "Chimie organique", ar: "الكيمياء العضوية" }
  ]
};

const LEVEL_LABELS = {
  primary: { fr: "Primaire", ar: "ابتدائي" },
  cem: { fr: "CEM", ar: "متوسط" },
  lycee: { fr: "Lycee", ar: "ثانوي" }
};

const SUBJECT_HINTS = {
  "science-education": { fr: "Experiences simples pour observer et comprendre.", ar: "تجارب بسيطة للملاحظة والفهم." },
  "natural-sciences": { fr: "Plantes, eau et observation du vivant.", ar: "النبات والماء وملاحظة الكائنات الحية." },
  physics: { fr: "Circuits, masses et mesures faciles.", ar: "دوائر وكتل وقياسات سهلة." },
  svt: { fr: "Sciences de la vie avec observation.", ar: "علوم الحياة مع الملاحظة." },
  "physics-chemistry": { fr: "Physique et chimie avec un labo 3D.", ar: "فيزياء وكيمياء مع مختبر ثلاثي." },
  "organic-chemistry": { fr: "Chimie plus avancee, etapes de securite.", ar: "كيمياء أكثر تقدما مع خطوات السلامة." }
};

const EXPERIMENT_AUDIENCE = {
  circuit: { levels: ["cem", "lycee"], subjects: ["physics", "physics-chemistry"] },
  plante: { levels: ["primary", "cem", "lycee"], subjects: ["science-education", "natural-sciences", "svt"] },
  masse: { levels: ["primary", "cem"], subjects: ["science-education", "physics"] },
  chimie: { levels: ["lycee"], subjects: ["physics-chemistry", "organic-chemistry"] }
};

Object.assign(SUBJECTS, {
  primaire: [{ id: "science-education", fr: "Éducation scientifique", ar: "التربية العلمية", en: "Science education" }],
  primary: [{ id: "science-education", fr: "Éducation scientifique", ar: "التربية العلمية", en: "Science education" }],
  cem: [
    { id: "natural-sciences", fr: "Sciences naturelles", ar: "علوم الطبيعة", en: "Natural sciences" },
    { id: "physics", fr: "Physique", ar: "الفيزياء", en: "Physics" }
  ],
  lycee: [
    { id: "svt", fr: "Sciences de la vie et de la Terre", ar: "علوم الطبيعة والحياة", en: "Life and Earth sciences" },
    { id: "physics-chemistry", fr: "Physique-Chimie", ar: "فيزياء وكيمياء", en: "Physics and chemistry" },
    { id: "organic-chemistry", fr: "Chimie organique", ar: "الكيمياء العضوية", en: "Organic chemistry" }
  ]
});

Object.assign(LEVEL_LABELS, {
  primaire: { fr: "Primaire", ar: "ابتدائي", en: "Primary school" },
  primary: { fr: "Primaire", ar: "ابتدائي", en: "Primary school" },
  cem: { fr: "CEM", ar: "التعليم المتوسط", en: "Middle school" },
  lycee: { fr: "Lycée", ar: "ثانوي", en: "High school" }
});

Object.assign(SUBJECT_HINTS, {
  "science-education": { fr: "Expériences simples pour observer et comprendre.", ar: "تجارب بسيطة للملاحظة والفهم.", en: "Simple experiments to observe and understand." },
  "natural-sciences": { fr: "Plantes, eau et observation du vivant.", ar: "النبات والماء وملاحظة الكائنات الحية.", en: "Plants, water, and observing living things." },
  physics: { fr: "Circuits, masses et mesures faciles.", ar: "دوائر وكتل وقياسات سهلة.", en: "Circuits, masses, and simple measurements." },
  svt: { fr: "Sciences de la vie avec observation.", ar: "علوم الحياة مع الملاحظة.", en: "Life sciences with observation." },
  "physics-chemistry": { fr: "Physique et chimie avec un labo 3D.", ar: "فيزياء وكيمياء مع مختبر ثلاثي.", en: "Physics and chemistry with a 3D lab." },
  "organic-chemistry": { fr: "Chimie plus avancée, étapes de sécurité.", ar: "كيمياء أكثر تقدما مع خطوات السلامة.", en: "More advanced chemistry with safety steps." }
});

Object.assign(EXPERIMENT_AUDIENCE, {
  plante: { levels: ["primaire", "primary", "cem", "lycee"], subjects: ["science-education", "natural-sciences", "svt"] },
  masse: { levels: ["primaire", "primary", "cem"], subjects: ["science-education", "physics"] }
});

const LEVEL_META = {
  primaire: { accent: "#4CAF50", icons: "📚✏️🎨", className: "level-primary" },
  cem: { accent: "#2196F3", icons: "🧪⚗️🔭", className: "level-cem" },
  lycee: { accent: "#9C27B0", icons: "🎓🔬💡", className: "level-lycee" }
};

const SUBJECT_ICONS = {
  "science-education": "🌱",
  "natural-sciences": "🌿",
  physics: "⚡",
  svt: "🧬",
  "physics-chemistry": "⚗️",
  "organic-chemistry": "🧪"
};

const LAB_PREVIEWS = {
  circuit: {
    icon: "⚡",
    objects: ["🔋", "💡", "🔌", "🔘"],
    title: { fr: "Circuit électrique", ar: "الدائرة الكهربائية", en: "Electrical circuit" },
    text: {
      fr: "Prépare la pile, la lampe et les fils avant d'ouvrir le labo 3D.",
      ar: "حضّر البطارية والمصباح والأسلاك قبل فتح المختبر الثلاثي الأبعاد.",
      en: "Prepare the battery, lamp, and wires before opening the 3D lab."
    }
  },
  biology: {
    icon: "🌱",
    objects: ["💧", "🌿", "🧪", "☀️"],
    title: { fr: "Plante et eau", ar: "النبات والماء", en: "Plant and water" },
    text: {
      fr: "Observe comment l'eau colorée monte dans la tige.",
      ar: "لاحظ كيف يصعد الماء الملون داخل الساق.",
      en: "Observe how colored water rises through the stem."
    }
  },
  chemistry: {
    icon: "⚗️",
    objects: ["🥽", "🧪", "🫧", "🔥"],
    title: { fr: "Réaction chimique", ar: "تفاعل كيميائي", en: "Chemical reaction" },
    text: {
      fr: "Commence par la sécurité, puis observe la réaction.",
      ar: "ابدأ بالسلامة ثم لاحظ التفاعل.",
      en: "Start with safety, then observe the reaction."
    }
  },
  physics: {
    icon: "⚖️",
    objects: ["📏", "⚖️", "🧲", "⏱️"],
    title: { fr: "Physique visuelle", ar: "فيزياء بصرية", en: "Visual physics" },
    text: {
      fr: "Manipule, mesure et compare dans le labo 3D.",
      ar: "جرّب وقِس وقارن داخل المختبر الثلاثي الأبعاد.",
      en: "Manipulate, measure, and compare in the 3D lab."
    }
  }
};

const LEVEL_EXPERIENCES = {
  primaire: [
    {
      id: "prim-01",
      status: "available",
      icon: "🌱",
      lab: "plante",
      subject: { fr: "Sciences de la nature", ar: "علوم الطبيعة", en: "Natural sciences" },
      title: { fr: "Absorption de l'eau par la plante", ar: "امتصاص الماء بواسطة النبات", en: "Water absorption by plants" },
      description: {
        fr: "Observe comment les racines absorbent l'eau et la font monter jusqu'aux feuilles.",
        ar: "لاحظ كيف تمتص الجذور الماء وترفعه حتى الأوراق.",
        en: "Observe how roots absorb water and carry it up to the leaves."
      }
    },
    { id: "prim-02", status: "coming_soon", icon: "🌾", title: { fr: "La germination d'une graine", ar: "إنبات البذرة", en: "Seed germination" } },
    { id: "prim-03", status: "coming_soon", icon: "💧", title: { fr: "Les états de l'eau", ar: "حالات الماء", en: "States of water" } },
    { id: "prim-04", status: "coming_soon", icon: "🌊", title: { fr: "Le cycle de l'eau", ar: "دورة الماء", en: "The water cycle" } },
    { id: "prim-05", status: "coming_soon", icon: "🦁", title: { fr: "Les animaux et leur milieu", ar: "الحيوانات وبيئتها", en: "Animals and their habitat" } }
  ],
  cem: [
    {
      id: "cem-01",
      status: "available",
      icon: "⚡",
      lab: "circuit",
      subject: { fr: "Physique", ar: "الفيزياء", en: "Physics" },
      title: { fr: "Circuit électrique simple", ar: "الدائرة الكهربائية البسيطة", en: "Simple electrical circuit" },
      description: {
        fr: "Monte un circuit avec une pile, une ampoule et des fils, et comprends le trajet du courant.",
        ar: "اصنع دائرة كهربائية ببطارية ومصباح وأسلاك وافهم مسار التيار.",
        en: "Build a circuit with a battery, a light bulb and wires, and understand how current flows."
      }
    },
    { id: "cem-02", status: "coming_soon", icon: "🍎", title: { fr: "La digestion des aliments", ar: "هضم الأغذية", en: "Food digestion" } },
    { id: "cem-03", status: "coming_soon", icon: "🫁", title: { fr: "La respiration chez les êtres vivants", ar: "التنفس عند الكائنات الحية", en: "Breathing in living beings" } },
    { id: "cem-04", status: "coming_soon", icon: "⚗️", title: { fr: "Les réactions chimiques simples", ar: "التفاعلات الكيميائية البسيطة", en: "Simple chemical reactions" } },
    { id: "cem-05", status: "coming_soon", icon: "🪐", title: { fr: "Le système solaire", ar: "المجموعة الشمسية", en: "The solar system" } }
  ],
  lycee: [
    {
      id: "lyc-01",
      status: "available",
      icon: "⚗️",
      lab: "chimie",
      subject: { fr: "Chimie", ar: "الكيمياء", en: "Chemistry" },
      title: { fr: "Réaction chimique : production d'hydrogène", ar: "تفاعل كيميائي: إنتاج الهيدروجين (Zn + HCl)", en: "Chemical reaction: hydrogen production" },
      description: {
        fr: "Réagis le zinc avec l'acide chlorhydrique (HCl) pour produire du dihydrogène et teste-le à la flamme.",
        ar: "فاعل الزنك مع حمض الهيدروكلوريك (HCl) لإنتاج غاز الهيدروجين واختبره باللهب.",
        en: "React zinc with hydrochloric acid (HCl) to produce hydrogen gas and test it with a flame."
      }
    },
    { id: "lyc-02", status: "coming_soon", icon: "🌿", title: { fr: "La photosynthèse", ar: "التمثيل الضوئي", en: "Photosynthesis" } },
    { id: "lyc-03", status: "coming_soon", icon: "🍎", title: { fr: "Les lois de Newton", ar: "قوانين نيوتن", en: "Newton's laws" } },
    { id: "lyc-04", status: "coming_soon", icon: "🧬", title: { fr: "La génétique - ADN et hérédité", ar: "علم الوراثة - الحمض النووي", en: "Genetics - DNA and heredity" } },
    { id: "lyc-05", status: "coming_soon", icon: "🌈", title: { fr: "Les ondes et la lumière", ar: "الموجات والضوء", en: "Waves and light" } }
  ]
};

const EXPERIMENTS = {
  circuit: {
    id: "circuit",
    title: { fr: "Circuit electrique", ar: "الدائرة الكهربائية" },
    subject: { fr: "Physique", ar: "الفيزياء" },
    intro: {
      fr: "Bienvenue. Nous allons construire un circuit ferme et verifier le bon placement des appareils de mesure.",
      ar: "أهلا بك. سنبني دارة مغلقة ونتحقق من الموضع الصحيح لأجهزة القياس."
    },
    help: {
      fr: "Commence par la boucle principale : pile, lampe, amperemetre et interrupteur. Le voltmetre reste a part en parallele.",
      ar: "ابدأ بالمسار الرئيسي: البطارية والمصباح والأمبيرمتر والمفتاح. أما الفولتميتر فيوضع منفصلا على التوازي."
    },
    next: {
      fr: "Observe l'etape non validee dans la liste et place le composant correspondant.",
      ar: "انظر إلى الخطوة غير المكتملة في القائمة وضع العنصر المناسب لها."
    },
    error: {
      fr: "Rappel : l'amperemetre se branche en serie et le voltmetre en parallele.",
      ar: "تذكير: الأمبيرمتر يوصل على التسلسل، والفولتميتر على التوازي."
    },
    success: {
      fr: "Excellent. La lampe s'allume car le circuit est correctement ferme.",
      ar: "رائع. أضاء المصباح لأن الدارة أغلقت بشكل صحيح."
    },
    defaultTip: {
      fr: "Revois calmement la place des appareils de mesure. L'amperemetre se met en serie et le voltmetre en parallele.",
      ar: "راجع بهدوء موضع أجهزة القياس: الأمبيرمتر على التسلسل والفولتميتر على التوازي."
    },
    quiz: [
      {
        prompt: { fr: "Ou place-t-on l'amperemetre ?", ar: "أين يوضع الأمبيرمتر؟" },
        options: [
          { fr: "En serie dans la boucle", ar: "على التسلسل داخل الدارة" },
          { fr: "En parallele avec la lampe", ar: "على التوازي مع المصباح" },
          { fr: "A l'exterieur du circuit", ar: "خارج الدارة" },
          { fr: "Sur la pile uniquement", ar: "على البطارية فقط" }
        ],
        correct: 0,
        explanation: {
          fr: "L'amperemetre mesure l'intensite qui traverse le circuit, il doit donc etre en serie.",
          ar: "يقيس الأمبيرمتر شدة التيار المار في الدارة، لذلك يجب أن يوصل على التسلسل."
        }
      },
      {
        prompt: { fr: "Le voltmetre se place en parallele.", ar: "يوصل الفولتميتر على التوازي." },
        options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
        correct: 0,
        explanation: {
          fr: "Oui, le voltmetre se branche en derivation pour comparer les potentiels.",
          ar: "نعم، يوصل الفولتميتر على التوازي لمقارنة فرق الجهد."
        }
      },
      {
        prompt: { fr: "Pourquoi la lampe s'allume-t-elle ?", ar: "لماذا يضيء المصباح؟" },
        options: [
          { fr: "Le circuit est ferme", ar: "لأن الدارة مغلقة" },
          { fr: "Le voltmetre est en serie", ar: "لأن الفولتميتر على التسلسل" },
          { fr: "Il n'y a pas de pile", ar: "لأنه لا توجد بطارية" },
          { fr: "Les fils sont deconnectes", ar: "لأن الأسلاك غير موصولة" }
        ],
        correct: 0,
        explanation: {
          fr: "La lampe ne fonctionne que si le courant peut circuler dans une boucle fermee.",
          ar: "لا يضيء المصباح إلا إذا أمكن للتيار أن يدور داخل دارة مغلقة."
        }
      },
      {
        prompt: { fr: "Un interrupteur ouvert laisse passer le courant.", ar: "المفتاح المفتوح يسمح بمرور التيار." },
        options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
        correct: 1,
        explanation: { fr: "Faux : un interrupteur ouvert coupe la boucle.", ar: "خطأ: المفتاح المفتوح يقطع مسار الدارة." }
      },
      {
        prompt: { fr: "Quel element fournit l'energie electrique ?", ar: "أي عنصر يزوّد بالطاقة الكهربائية؟" },
        options: [
          { fr: "La pile", ar: "البطارية" },
          { fr: "La lampe", ar: "المصباح" },
          { fr: "L'amperemetre", ar: "الأمبيرمتر" },
          { fr: "Le fil seul", ar: "السلك فقط" }
        ],
        correct: 0,
        explanation: { fr: "La pile est le generateur du circuit.", ar: "البطارية هي مولد الدارة." }
      }
    ]
  },
  plante: {
    id: "plante",
    title: { fr: "Absorption de l'eau par la plante", ar: "امتصاص الماء عند النبات" },
    subject: { fr: "Sciences naturelles", ar: "العلوم الطبيعية" },
    intro: { fr: "Nous allons montrer que l'eau monte dans la plante a travers des conduits.", ar: "سنبيّن أن الماء يصعد في النبات عبر أوعية ناقلة." },
    help: { fr: "Il faut respecter l'ordre : eau coloree, tige, observation, feuilles puis conclusion.", ar: "يجب احترام الترتيب: ماء ملون، ساق، ملاحظة، أوراق، ثم استنتاج." },
    next: { fr: "Cherche la prochaine action qui n'est pas encore surlignee dans la simulation.", ar: "ابحث عن الإجراء التالي غير المفعّل بعد داخل المحاكاة." },
    error: { fr: "Si tu observes trop tot, tu ne verras pas le trajet de l'eau. Il faut d'abord placer la plante.", ar: "إذا حاولت الملاحظة مبكرا فلن ترى مسار الماء. يجب أولا وضع النبات." },
    success: { fr: "Tres bien. La coloration montre que l'eau circule de la tige vers les feuilles.", ar: "ممتاز. يبيّن التلوّن أن الماء ينتقل من الساق نحو الأوراق." },
    defaultTip: { fr: "Observe le changement de couleur et relie-le au role des vaisseaux conducteurs.", ar: "اربط تغير اللون بدور الأوعية الناقلة في النبات." },
    quiz: []
  },
  masse: {
    id: "masse",
    title: { fr: "Masses et balance", ar: "الكتل والميزان" },
    subject: { fr: "Physique", ar: "الفيزياء" },
    intro: { fr: "Nous allons determiner la masse d'un objet en equilibrant une balance.", ar: "سنحدد كتلة جسم عبر موازنة ميزان." },
    help: { fr: "Pense a additionner les masses proposees jusqu'a 250 g avant de valider.", ar: "حاول جمع الكتل المقترحة حتى تصل إلى 250 غ قبل التأكيد." },
    next: { fr: "Observe la balance. Si elle n'est pas horizontale, ajuste la masse totale.", ar: "راقب الميزان. إذا لم يكن أفقيا فعدّل الكتلة الكلية." },
    error: { fr: "Si la masse totale depasse 250 g, le plateau droit devient trop lourd.", ar: "إذا تجاوزت الكتلة الكلية 250 غ تصبح الكفة اليمنى أثقل." },
    success: { fr: "Parfait. Une balance a l'equilibre montre ici une masse de 250 g.", ar: "ممتاز. توازن الميزان هنا يدل على كتلة قدرها 250 غ." },
    defaultTip: { fr: "Garde une trace des masses ajoutees pour comprendre comment on compense la masse inconnue.", ar: "احتفظ بسجل للكتل المضافة لفهم كيفية موازنة الكتلة المجهولة." },
    quiz: []
  },
  chimie: {
    id: "chimie",
    title: { fr: "Reaction produisant l'hydrogene", ar: "تفاعل إنتاج الهيدروجين" },
    subject: { fr: "Chimie", ar: "الكيمياء" },
    intro: { fr: "Nous allons suivre une reaction simple de production d'hydrogene avec vigilance.", ar: "سنتابع تفاعلا بسيطا لإنتاج الهيدروجين مع احترام احتياطات السلامة." },
    help: { fr: "Securite d'abord : lunettes, zinc, acide, collecte du gaz, puis test final.", ar: "السلامة أولا: النظارات، الزنك، الحمض، جمع الغاز، ثم الاختبار النهائي." },
    next: { fr: "Cherche l'action qui suit logiquement la derniere etape reussie.", ar: "ابحث عن الإجراء الذي يأتي منطقيا بعد آخر خطوة ناجحة." },
    error: { fr: "Un test a la flamme avant la collecte est dangereux et ne permet pas de verifier correctement le gaz.", ar: "إجراء اختبار اللهب قبل جمع الغاز غير آمن ولا يسمح بالتحقق الصحيح منه." },
    success: { fr: "Tres bien. Le test final confirme la presence d'hydrogene apres le degagement gazeux.", ar: "أحسنت. يؤكد الاختبار النهائي وجود الهيدروجين بعد انطلاق الغاز." },
    defaultTip: { fr: "Retenir l'ordre de securite aide a comprendre la reaction sans se precipiter.", ar: "تذكّر ترتيب السلامة يساعد على فهم التفاعل دون تسرع." },
    quiz: []
  }
};

const DEMO_RECORDS = [
  { studentName: "Ahmed B.", classCode: "CEM2026", level: "cem", experimentId: "circuit", score: 85, aiEvaluation: { fr: "Tres bien", ar: "جيد جدا" }, errors: [{ fr: "Placement initial du voltmetre a corriger.", ar: "تم تصحيح موضع الفولتميتر في البداية." }] },
  { studentName: "Sara M.", classCode: "CEM2026", level: "cem", experimentId: "plante", score: 72, aiEvaluation: { fr: "Bien", ar: "جيد" }, errors: [{ fr: "Observation faite avant la preparation complete.", ar: "تمت الملاحظة قبل إنهاء التحضير الكامل." }] },
  { studentName: "Youssef K.", classCode: "LYC2025", level: "lycee", experimentId: "chimie", score: 90, aiEvaluation: { fr: "Excellent", ar: "ممتاز" }, errors: [{ fr: "Manipulation maitrissee avec rigueur.", ar: "المناولة كانت متقنة ومنظمة." }] },
  { studentName: "Fatima Z.", classCode: "CEM2026", level: "cem", experimentId: "masse", score: 60, aiEvaluation: { fr: "A renforcer", ar: "يحتاج دعما" }, errors: [{ fr: "Equilibre valide apres plusieurs essais.", ar: "تم الوصول إلى التوازن بعد عدة محاولات." }] }
];

const LAB_DETAILS = {
  circuit: {
    mode: "circuit",
    name: { fr: "Laboratoire electrique", ar: "مختبر الكهرباء" },
    summary: { fr: "Relie au labo 3D des circuits electriques.", ar: "مرتبط بمختبر الدوائر الكهربائية ثلاثي الأبعاد." }
  },
  plante: {
    mode: "biology",
    name: { fr: "Sciences CEM", ar: "علوم CEM" },
    summary: { fr: "Relie au labo 3D des sciences naturelles.", ar: "مرتبط بمختبر العلوم الطبيعية ثلاثي الأبعاد." }
  },
  masse: {
    mode: "physics",
    section: "scale",
    name: { fr: "Physique 3D", ar: "فيزياء ثلاثية الأبعاد" },
    summary: { fr: "Relie au labo 3D de physique.", ar: "مرتبط بمختبر الفيزياء ثلاثي الأبعاد." }
  },
  chimie: {
    mode: "chemistry",
    name: { fr: "Chimie lycee", ar: "كيمياء ثانوي" },
    summary: { fr: "Relie au labo 3D de chimie du lycee.", ar: "مرتبط بمختبر الكيمياء ثلاثي الأبعاد للثانوي." }
  }
};

let experimentRuntime = null;

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function currentLanguage() {
  const lang = localStorage.getItem(STORAGE.language) || "fr";
  return ["fr", "ar", "en"].includes(lang) ? lang : "fr";
}

function getText(pair) {
  if (!pair || typeof pair !== "object") return "";
  return pair[currentLanguage()] || pair.fr || pair.en || pair.ar || "";
}

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function dualText(fr, ar, en = fr) {
  return `<span class="lang-fr">${escapeHtml(fr)}</span><span class="lang-ar">${escapeHtml(ar)}</span><span class="lang-en">${escapeHtml(en)}</span>`;
}

function localizedTextMarkup(value, extraClass = "") {
  const className = extraClass ? ` ${extraClass}` : "";
  return `<span class="lang-fr${className}" dir="ltr" lang="fr">${escapeHtml(value.fr || "")}</span><span class="lang-ar${className}" dir="rtl" lang="ar">${escapeHtml(value.ar || "")}</span><span class="lang-en${className}" dir="ltr" lang="en">${escapeHtml(value.en || value.fr || "")}</span>`;
}

function normalizeLevelKey(level) {
  const key = String(level || "").trim().toLowerCase();
  if (key === "primary" || key === "primaire" || key === "ابتدائي") return "primaire";
  if (key === "lycée" || key === "lycee" || key === "ثانوي") return "lycee";
  if (key === "cem" || key === "middle") return "cem";
  return LEVEL_EXPERIENCES[key] ? key : "cem";
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function scoreToBadge(score) {
  if (score >= 90) return { fr: "Excellent", ar: "ممتاز" };
  if (score >= 75) return { fr: "Tres bien", ar: "جيد جدا" };
  if (score >= 60) return { fr: "Bien", ar: "جيد" };
  return { fr: "A renforcer", ar: "يحتاج دعما" };
}

function clearSession() {
  const language = currentLanguage();
  Object.values(STORAGE).forEach((key) => {
    const persistentKeys = new Set([STORAGE.language, STORAGE.labCodes, STORAGE.students, STORAGE.professors, STORAGE.resultHistory, STORAGE.quizScores, STORAGE.experimentScores]);
    if (!persistentKeys.has(key)) localStorage.removeItem(key);
  });
  localStorage.setItem(STORAGE.language, language);
  sessionStorage.clear();
}

function updateStudentBadge() {
  const teacherLogged = localStorage.getItem(STORAGE.teacherLogged) === "true";
  const target = document.querySelector("[data-student-display]");
  if (!target) return;
  if (teacherLogged) {
    target.innerHTML = dualText("Espace enseignant", "فضاء الأستاذ");
    return;
  }
  target.innerHTML = dualText("Profil prive", "ملف خاص");
}

function applyLanguage(lang) {
  lang = ["fr", "ar", "en"].includes(lang) ? lang : "fr";
  document.body.dataset.lang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  localStorage.setItem(STORAGE.language, lang);
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });
  document.querySelectorAll("[data-placeholder-fr]").forEach((input) => {
    input.placeholder = input.dataset[`placeholder${lang.charAt(0).toUpperCase()}${lang.slice(1)}`] || input.dataset.placeholderFr;
  });
  document.querySelectorAll(".lang-ar").forEach((node) => {
    node.setAttribute("dir", "rtl");
    node.setAttribute("lang", "ar");
  });
  document.querySelectorAll(".lang-fr").forEach((node) => {
    node.setAttribute("dir", "ltr");
    node.setAttribute("lang", "fr");
  });
  document.querySelectorAll(".lang-en").forEach((node) => {
    node.setAttribute("dir", "ltr");
    node.setAttribute("lang", "en");
  });
  const frame = document.querySelector("[data-lab-frame]");
  if (frame && document.body.dataset.labMode) {
    const labDetails = getLabDetails(currentExperimentContextId());
    const nextSrc = buildLabViewUrl(document.body.dataset.labMode, lang, labDetails.section || "");
    if (frame.dataset.labLoaded === "true") {
      if (frame.getAttribute("src") !== nextSrc) frame.setAttribute("src", nextSrc);
    } else {
      frame.dataset.labSrc = nextSrc;
    }
  }
  updateStudentBadge();
  if (document.body.dataset.page === "experiences") initLevelExperiences();
}

function bindGlobalUi() {
  document.querySelectorAll(".lang-switch").forEach((switcher) => {
    if (!switcher.querySelector('[data-lang="en"]')) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "lang-btn";
      button.dataset.lang = "en";
      button.textContent = "EN";
      switcher.appendChild(button);
    }
  });
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.lang));
  });
  document.querySelectorAll(".logout-btn").forEach((button) => {
    button.addEventListener("click", () => {
      clearSession();
      window.location.href = "index.html";
    });
  });
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".topbar-nav");
  if (menuButton && nav) menuButton.addEventListener("click", () => nav.classList.toggle("open"));
}

function assistantFallback() {
  return {
    fr: "Je suis la pour vous aider. Posez-moi une question sur votre activite.",
    ar: "أنا هنا لمساعدتك. اطرح أي سؤال حول نشاطك."
  };
}

function getExperimentConfig(experimentId) {
  return EXPERIMENTS[experimentId] || EXPERIMENTS.circuit;
}

function getLabDetails(experimentId) {
  return LAB_DETAILS[experimentId] || LAB_DETAILS.circuit;
}

function currentExperimentContextId() {
  return document.body.dataset.experiment || localStorage.getItem(STORAGE.lastExperiment) || "circuit";
}

function normalizeLabCode(value) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function readLabCodes() {
  return readJson(STORAGE.labCodes, []);
}

function writeLabCodes(codes) {
  writeJson(STORAGE.labCodes, codes);
}

function defaultProfessors() {
  return [
    {
      name: "Professeur demo",
      username: "prof",
      password: "1234",
      subject: "Sciences",
      classCode: "CEM2026",
      createdAt: "2026-01-01T00:00:00.000Z"
    }
  ];
}

function readProfessors() {
  const professors = readJson(STORAGE.professors, null);
  if (Array.isArray(professors) && professors.length) return professors;
  const seeded = defaultProfessors();
  writeJson(STORAGE.professors, seeded);
  return seeded;
}

function writeProfessors(professors) {
  writeJson(STORAGE.professors, professors);
}

function readResultHistory() {
  return readJson(STORAGE.resultHistory, []);
}

function writeResultHistory(history) {
  writeJson(STORAGE.resultHistory, history);
}

function findLabCodeAssignment(code) {
  const normalized = normalizeLabCode(code);
  if (!normalized) return null;
  return readLabCodes().find((item) => normalizeLabCode(item.code) === normalized) || null;
}

function getAssignmentType(assignment) {
  return assignment && assignment.type === "promo" ? "promo" : "single";
}

function assignmentAllowedExperiments(assignment) {
  if (!assignment) return [];
  const raw = Array.isArray(assignment.allowedExperiments) && assignment.allowedExperiments.length
    ? assignment.allowedExperiments
    : (assignment.experimentId ? [assignment.experimentId] : []);
  return [...new Set(raw.filter((experimentId) => EXPERIMENT_AUDIENCE[experimentId]))];
}

function assignmentAllowsExperiment(assignment, experimentId) {
  return assignmentAllowedExperiments(assignment).includes(experimentId);
}

function availableLabsForLevel(level) {
  return (LEVEL_EXPERIENCES[normalizeLevelKey(level)] || [])
    .filter((item) => item.status === "available" && item.lab)
    .filter((item, index, list) => list.findIndex((entry) => entry.lab === item.lab) === index);
}

function assignmentAvailableSubjects(assignment) {
  if (!assignment) return [];
  const level = normalizeLevelKey(assignment.level);
  const allowedExperiments = assignmentAllowedExperiments(assignment);
  const availableSubjectIds = [...new Set(
    (LEVEL_EXPERIENCES[level] || [])
      .filter((item) => item.status === "available" && allowedExperiments.includes(item.lab) && item.subjectId)
      .map((item) => item.subjectId)
  )];
  return (SUBJECTS[level] || []).filter((subject) => availableSubjectIds.includes(subject.id));
}

function defaultSubjectForAssignment(assignment) {
  if (!assignment) return null;
  if (getAssignmentType(assignment) === "single" && assignment.experimentId) {
    return subjectForExperiment(assignment.experimentId, assignment.level);
  }
  return assignmentAvailableSubjects(assignment)[0] || null;
}

function getActiveLabAssignment() {
  return findLabCodeAssignment(localStorage.getItem(STORAGE.activeLabCode));
}

function subjectForExperiment(experimentId, level) {
  const audience = EXPERIMENT_AUDIENCE[experimentId];
  const levelSubjects = SUBJECTS[level] || [];
  if (!audience) return levelSubjects[0] || null;
  return levelSubjects.find((subject) => audience.subjects.includes(subject.id)) || levelSubjects[0] || null;
}

function createReadableLabCode(level, experimentId) {
  const levelPart = String(level || "lab").slice(0, 2).toUpperCase();
  const experimentPart = String(experimentId || "lab").slice(0, 3).toUpperCase();
  let code = "";
  do {
    const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
    code = `${levelPart}-${experimentPart}-${randomPart}`;
  } while (findLabCodeAssignment(code));
  return code;
}

function buildLabViewUrl(mode, lang = currentLanguage(), section = "") {
  const params = new URLSearchParams({
    lab: mode,
    lang,
    single: "1"
  });
  if (section) params.set("section", section);
  return `lab-view.html?${params.toString()}`;
}

function isExperimentPage() {
  return document.body.dataset.page === "experiment";
}

function currentIncompleteStep() {
  if (!experimentRuntime) return 1;
  for (let step = 1; step <= 5; step += 1) {
    if (!experimentRuntime.completed.has(step)) return step;
  }
  return 5;
}

function currentStepHint(experimentId) {
  const stepNode = document.querySelector(`.instruction-step[data-step="${currentIncompleteStep()}"] .lang-${currentLanguage()}`);
  if (stepNode) return stepNode.textContent.trim();
  return getText(getExperimentConfig(experimentId).next);
}

function buildAssistantQuickActions() {
  return `
    <div class="assistant-shortcuts">
      <button type="button" class="shortcut-btn" data-assistant-shortcut="objectif">${dualText("Objectif", "الهدف")}</button>
      <button type="button" class="shortcut-btn" data-assistant-shortcut="next">${dualText("Etape suivante", "الخطوة التالية")}</button>
      <button type="button" class="shortcut-btn" data-assistant-shortcut="error">${dualText("Erreur frequente", "خطأ شائع")}</button>
      <button type="button" class="shortcut-btn" data-assistant-shortcut="lab">${dualText("Nom du labo", "اسم المختبر")}</button>
      <button type="button" class="shortcut-btn" data-assistant-shortcut="quiz">${dualText("Quiz", "الاختبار")}</button>
    </div>
  `;
}

function assistantGreeting(experimentId) {
  const config = getExperimentConfig(experimentId);
  const lab = getLabDetails(experimentId);
  return getText({
    fr: `Bonjour. Je peux vous guider dans ${config.title.fr}. Ce parcours est relie a ${lab.name.fr}.`,
    ar: `مرحبا. يمكنني مساعدتك في تجربة ${config.title.ar}. هذا المسار مرتبط بـ ${lab.name.ar}.`
  });
}

function getAssistantReply(input, experimentId) {
  const normalized = input.trim().toLowerCase();
  const config = getExperimentConfig(experimentId);
  const lab = getLabDetails(experimentId);
  if (!normalized) return getText(assistantFallback());
  const greetingWords = ["hello", "hi", "bonjour", "salut", "مرحبا", "السلام", "salam"];
  const helpWords = ["help", "aide", "مساعدة"];
  const nextWords = ["next", "suivant", "التالي"];
  const errorWords = ["error", "wrong", "erreur", "خطأ"];
  const objectiveWords = ["objectif", "goal", "objective", "هدف"];
  const labWords = ["lab", "labo", "laboratoire", "مختبر"];
  const quizWords = ["quiz", "test", "اختبار"];
  const finishWords = ["finish", "terminer", "end", "انهاء", "إنهاء"];
  if (greetingWords.some((word) => normalized.includes(word))) return assistantGreeting(experimentId);
  if (helpWords.some((word) => normalized.includes(word))) return getText(config.help);
  if (objectiveWords.some((word) => normalized.includes(word))) return getText(config.intro);
  if (nextWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: `${config.next.fr} Et maintenant : ${currentStepHint(experimentId)}`,
      ar: `${config.next.ar} والخطوة الحالية هي: ${currentStepHint(experimentId)}`
    });
  }
  if (errorWords.some((word) => normalized.includes(word))) return getText(config.error);
  if (labWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: `${lab.summary.fr} Ouvrez-le en grand si vous voulez travailler plus confortablement.`,
      ar: `${lab.summary.ar} ويمكنك فتحه بحجم كبير إذا أردت العمل براحة أكبر.`
    });
  }
  if (quizWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: "Quand vous avez termine la manipulation, cliquez sur le bouton de fin. Le quiz apparait ensuite avec 5 questions simples.",
      ar: "عندما تنهي التجربة اضغط على زر الإنهاء. بعد ذلك يظهر الاختبار وفيه 5 أسئلة بسيطة."
    });
  }
  if (finishWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: "Validez les etapes que vous avez faites, puis utilisez le bouton de fin sous le labo pour passer au resultat.",
      ar: "أكد الخطوات التي أنجزتها ثم استعمل زر الإنهاء الموجود تحت المختبر للانتقال إلى النتيجة."
    });
  }
  return getText({
    fr: `Je peux vous aider sur l'objectif, l'etape suivante, les erreurs frequentes ou le quiz de ${config.title.fr}.`,
    ar: `يمكنني مساعدتك في الهدف والخطوة التالية والأخطاء الشائعة أو اختبار ${config.title.ar}.`
  });
}

function appendAssistantMessage(container, text, role) {
  const message = document.createElement("div");
  message.className = `assistant-message ${role}`;
  message.textContent = text;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
}

function shortcutLabel(button) {
  const lang = currentLanguage();
  const target = button.querySelector(`.lang-${lang}`);
  return target ? target.textContent.trim() : button.textContent.trim();
}

function shortcutQuestion(button) {
  const key = button.dataset.assistantShortcut || "";
  const lang = currentLanguage();
  const questions = {
    objectif: { fr: "Quel est l'objectif de cette expérience ?", ar: "ما هو هدف هذه التجربة؟", en: "What is the objective of this experiment?" },
    next:     { fr: "Quelle est la prochaine étape à faire ?", ar: "ما هي الخطوة التالية التي يجب القيام بها؟", en: "What is the next step I should do?" },
    error:    { fr: "Quelles sont les erreurs fréquentes à éviter dans cette expérience ?", ar: "ما هي الأخطاء الشائعة التي يجب تجنبها في هذه التجربة؟", en: "What are the common mistakes to avoid in this experiment?" },
    lab:      { fr: "Décris-moi ce laboratoire et comment l'utiliser.", ar: "صف لي هذا المختبر وكيفية استخدامه.", en: "Describe this lab and how to use it." },
    quiz:     { fr: "Comment fonctionne le quiz et comment y accéder ?", ar: "كيف يعمل الاختبار وكيف أصل إليه؟", en: "How does the quiz work and how do I access it?" }
  };
  const q = questions[key];
  if (!q) return shortcutLabel(button);
  return q[lang] || q.fr;
}

function createAssistantWidget() {
  if (isExperimentPage()) return;
  const root = document.getElementById("assistant-root");
  if (!root) return;
  root.innerHTML = `
    <div class="assistant-widget">
      <div class="assistant-popover" id="assistant-popover">
        <div class="assistant-header">
          <div>
            <h2>Assistant EduVirtuel</h2>
            <p>${dualText("Aide rapide pour la navigation et les experiences.", "مساعدة سريعة للتنقل والتجارب.")}</p>
          </div>
        </div>
        <div class="assistant-messages" id="assistant-widget-messages"></div>
        ${buildAssistantQuickActions()}
        <form class="assistant-form" id="assistant-widget-form">
          <input type="text" id="assistant-widget-input" data-placeholder-fr="Tapez aide / suivant / erreur" data-placeholder-ar="اكتب مساعدة / التالي / خطأ">
          <button type="submit" class="primary-btn">${dualText("Envoyer", "إرسال")}</button>
        </form>
      </div>
      <button class="assistant-launcher" id="assistant-launcher" type="button">
        <span>💬</span>
        <span>${dualText("Assistant EduVirtuel", "مساعد EduVirtuel")}</span>
      </button>
    </div>
  `;

  const popover = document.getElementById("assistant-popover");
  const launcher = document.getElementById("assistant-launcher");
  const form = document.getElementById("assistant-widget-form");
  const input = document.getElementById("assistant-widget-input");
  const messages = document.getElementById("assistant-widget-messages");
  if (!popover || !launcher || !form || !input || !messages) return;

  input.placeholder = currentLanguage() === "ar" ? input.dataset.placeholderAr : input.dataset.placeholderFr;
  appendAssistantMessage(messages, assistantGreeting(currentExperimentContextId()), "bot");

  launcher.addEventListener("click", () => {
    popover.classList.toggle("open");
    if (popover.classList.contains("open")) input.focus();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    appendAssistantMessage(messages, value, "user");
    appendAssistantMessage(messages, getAssistantReply(value, currentExperimentContextId()), "bot");
    input.value = "";
  });

  root.querySelectorAll("[data-assistant-shortcut]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = String(button.dataset.assistantShortcut || "");
      appendAssistantMessage(messages, shortcutLabel(button), "user");
      appendAssistantMessage(messages, getAssistantReply(value, currentExperimentContextId()), "bot");
    });
  });
}

function bindEmbeddedAssistant(experimentId) {
  const form = document.querySelector("[data-assistant-form]");
  const input = document.querySelector("[data-assistant-input]");
  const messages = document.querySelector("[data-assistant-messages]");
  const scope = form ? (form.closest(".assistant-panel") || form.parentElement) : null;
  if (!form || !input || !messages) return;
  appendAssistantMessage(messages, assistantGreeting(experimentId), "bot");
  appendAssistantMessage(messages, getText(getLabDetails(experimentId).summary), "bot");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    appendAssistantMessage(messages, value, "user");
    appendAssistantMessage(messages, getAssistantReply(value, experimentId), "bot");
    input.value = "";
  });
  (scope ? scope.querySelectorAll("[data-assistant-shortcut]") : []).forEach((button) => {
    button.addEventListener("click", () => {
      const value = String(button.dataset.assistantShortcut || "");
      appendAssistantMessage(messages, shortcutLabel(button), "user");
      appendAssistantMessage(messages, getAssistantReply(value, experimentId), "bot");
    });
  });
}

function setStatus(text) {
  const target = document.querySelector("[data-experiment-status]");
  if (target) target.textContent = text;
}

function markStep(step, done) {
  if (!experimentRuntime || step === 0) return;
  if (done) experimentRuntime.completed.add(step);
  else experimentRuntime.completed.delete(step);
  document.querySelectorAll(".instruction-step").forEach((item) => {
    item.classList.toggle("done", experimentRuntime.completed.has(Number(item.dataset.step)));
  });
  const progressFill = document.querySelector("[data-progress-fill]");
  const indicator = document.querySelector("[data-step-indicator]");
  if (progressFill) progressFill.style.width = `${(experimentRuntime.completed.size / 5) * 100}%`;
  if (indicator) {
    const currentStep = Math.min(experimentRuntime.completed.size + 1, 5);
    indicator.innerHTML = dualText(`Etape ${currentStep} sur 5`, `الخطوة ${currentStep} من 5`);
  }
}

function addExperimentMessage(text) {
  const messages = document.querySelector("[data-assistant-messages]");
  if (messages) appendAssistantMessage(messages, text, "bot");
}

function registerMistake(messagePair) {
  if (!experimentRuntime) return;
  const key = `${messagePair.fr}__${messagePair.ar}`;
  if (!experimentRuntime.mistakeKeys.has(key)) {
    experimentRuntime.mistakeKeys.add(key);
    experimentRuntime.mistakes.push(messagePair);
  }
  const text = getText(messagePair);
  setStatus(text);
  addExperimentMessage(text);
}

function initializeExperimentRuntime(experimentId) {
  experimentRuntime = {
    id: experimentId,
    completed: new Set(),
    mistakes: [],
    mistakeKeys: new Set(),
    seconds: 0,
    timerHandle: null
  };
  const timer = document.querySelector("[data-timer]");
  if (timer) {
    timer.textContent = "00:00";
    experimentRuntime.timerHandle = window.setInterval(() => {
      experimentRuntime.seconds += 1;
      timer.textContent = formatTime(experimentRuntime.seconds);
    }, 1000);
  }
}

function loadEmbeddedLab(frame, labMode, section = "") {
  if (!frame) return;
  const nextSrc = buildLabViewUrl(labMode, currentLanguage(), section);
  const preview = frame.previousElementSibling?.classList?.contains("lab-preview") ? frame.previousElementSibling : null;
  if (preview) preview.classList.add("is-loading");
  frame.dataset.labLoaded = "true";
  frame.dataset.labSrc = nextSrc;
  frame.classList.remove("is-idle");
  if (frame.getAttribute("src") !== nextSrc) frame.setAttribute("src", nextSrc);
}

function createLabPreview(frame, labMode) {
  if (!frame || frame.previousElementSibling?.classList?.contains("lab-preview")) return;
  const preview = LAB_PREVIEWS[labMode] || LAB_PREVIEWS.physics;
  const node = document.createElement("div");
  node.className = `lab-preview lab-preview-${labMode}`;
  node.innerHTML = `
    <div class="lab-preview-scene" aria-hidden="true">
      <span class="lab-preview-main">${escapeHtml(preview.icon)}</span>
      ${preview.objects.map((item, index) => `<span class="lab-preview-object object-${index + 1}">${escapeHtml(item)}</span>`).join("")}
    </div>
    <div class="lab-preview-copy">
      <span class="eyebrow">${dualText("Aperçu du labo", "لمحة عن المختبر", "Lab preview")}</span>
      <h3>${escapeHtml(getText(preview.title))}</h3>
      <p>${escapeHtml(getText(preview.text))}</p>
      <div class="lab-preview-tags">
        <span>3D</span>
        <span>${dualText("Interactif", "تفاعلي", "Interactive")}</span>
        <span>${dualText("Prêt à ouvrir", "جاهز للفتح", "Ready to open")}</span>
      </div>
    </div>
  `;
  frame.insertAdjacentElement("beforebegin", node);
}

function computeExperimentScore() {
  if (!experimentRuntime) return 0;
  const score = experimentRuntime.completed.size * 18 + Math.max(0, 20 - experimentRuntime.mistakes.length * 5);
  return Math.max(30, Math.min(100, score));
}

function persistExperimentResult() {
  const experimentId = experimentRuntime.id;
  const config = getExperimentConfig(experimentId);
  const score = computeExperimentScore();
  const badge = scoreToBadge(score);
  const scores = readJson(STORAGE.experimentScores, {});
  scores[experimentId] = score;
  writeJson(STORAGE.experimentScores, scores);
  localStorage.setItem(STORAGE.lastExperiment, experimentId);
  writeJson(STORAGE.lastResult, {
    experimentId,
    score,
    badge,
    title: config.title,
    stepsCompleted: experimentRuntime.completed.size,
    errors: experimentRuntime.mistakes,
    elapsedSeconds: experimentRuntime.seconds,
    tip: experimentRuntime.mistakes[0] || config.defaultTip
  });
}

function finishExperiment() {
  persistExperimentResult();
  if (experimentRuntime && experimentRuntime.timerHandle) window.clearInterval(experimentRuntime.timerHandle);
  window.location.href = "result.html";
}

function ensureStudentSession() {
  const protectedPages = new Set(["dashboard", "experiences", "experiment", "result", "quiz"]);
  const pageId = document.body.dataset.page;
  if (!protectedPages.has(pageId)) return true;
  if (localStorage.getItem(STORAGE.studentName)) return true;
  window.location.href = "student.html";
  return false;
}

function experimentMatchesSelection(experimentId, level, subjectId, exactSubject = true) {
  const audience = EXPERIMENT_AUDIENCE[experimentId];
  if (!audience) return true;
  const levelMatches = audience.levels.includes(level);
  const subjectMatches = !subjectId || audience.subjects.includes(subjectId);
  return exactSubject ? levelMatches && subjectMatches : levelMatches;
}

function visibleExperimentIds(level, subjectId) {
  const ids = Object.keys(EXPERIMENT_AUDIENCE);
  const exact = ids.filter((id) => experimentMatchesSelection(id, level, subjectId, true));
  if (exact.length) return exact;
  return ids.filter((id) => experimentMatchesSelection(id, level, subjectId, false));
}

function initIndex() {
  const loader = document.getElementById("loading-screen");
  const main = document.getElementById("main-content");
  if (main) {
    main.style.opacity = "0";
    main.style.transition = "opacity 0.35s ease";
  }
  window.setTimeout(() => {
    if (loader) loader.classList.add("hidden");
    if (main) main.style.opacity = "1";
  }, 550);
}

function initStudentForm() {
  // If student already has a saved session, skip straight to dashboard
  const existingName = localStorage.getItem(STORAGE.studentName);
  if (existingName) {
    window.location.href = "dashboard.html";
    return;
  }
  const form = document.getElementById("student-form");
  if (!form) return;
  const levelInput = form.querySelector('input[name="level"]');
  const levelButtons = form.querySelectorAll("[data-level-choice]");
  const savedLevel = normalizeLevelKey(localStorage.getItem(STORAGE.currentLevel) || "cem");
  const continueButton = form.querySelector("[data-continue-button]");

  function selectLevel(level) {
    level = normalizeLevelKey(level);
    if (levelInput) levelInput.value = level;
    levelButtons.forEach((button) => {
      button.classList.toggle("active", normalizeLevelKey(button.dataset.levelChoice) === level);
    });
    if (continueButton) continueButton.dataset.level = level;
  }

  levelButtons.forEach((button) => {
    button.addEventListener("click", () => selectLevel(button.dataset.levelChoice));
  });
  selectLevel(savedLevel);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const enteredCode = normalizeLabCode(data.get("classCode"));
    const assignment = findLabCodeAssignment(enteredCode);
    const classCode = enteredCode || "CEM2026";
    const level = normalizeLevelKey(data.get("level") || "cem");
    if (!firstName) {
      alert(getText({ fr: "Ecris ton prenom pour continuer.", ar: "اكتب اسمك للمتابعة." }));
      return;
    }
    const fullName = `${firstName} ${lastName}`.trim();
    const resolvedLevel = assignment ? assignment.level : level;
    localStorage.setItem(STORAGE.studentName, fullName);
    localStorage.setItem(STORAGE.studentClass, classCode);
    localStorage.setItem(STORAGE.currentLevel, resolvedLevel);
    localStorage.removeItem(STORAGE.currentSubject);
    localStorage.removeItem(STORAGE.activeLabCode);
    const students = readJson(STORAGE.students, []);
    const existingIdx = students.findIndex((s) => s.name === fullName && s.classCode === classCode);
    if (existingIdx === -1) {
      students.push({ name: fullName, classCode, level: resolvedLevel });
    } else {
      students[existingIdx].level = resolvedLevel;
    }
    localStorage.setItem(STORAGE.students, JSON.stringify(students));

    if (assignment) {
      const subject = subjectForExperiment(assignment.experimentId, assignment.level);
      if (subject) localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
      localStorage.setItem(STORAGE.activeLabCode, assignment.code);
      window.location.href = `experiences.html?code=${encodeURIComponent(assignment.code)}`;
      return;
    }

    window.location.href = "dashboard.html";
  });
}

function renderSubjects(level) {
  level = normalizeLevelKey(level);
  const subjectGrid = document.getElementById("subject-grid");
  if (!subjectGrid) return;
  const assignment = getActiveLabAssignment();
  if (assignment && assignment.level === level) {
    const subject = subjectForExperiment(assignment.experimentId, assignment.level);
    const experiment = getExperimentConfig(assignment.experimentId);
    subjectGrid.classList.remove("empty-state");
    subjectGrid.innerHTML = `
      <button type="button" class="selection-card subject-card active" data-code="${escapeHtml(assignment.code)}">
        <strong>${dualText("Activite de ton professeur", "نشاط أستاذك")}</strong>
        <span class="subject-hint">${escapeHtml(getText(experiment.title))}</span>
        <span>${dualText(`Code : ${assignment.code}`, `الرمز: ${assignment.code}`)}</span>
      </button>
    `;
    const card = subjectGrid.querySelector("[data-code]");
    if (card) {
      card.addEventListener("click", () => {
        if (subject) localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
        window.location.href = `experiences.html?code=${encodeURIComponent(assignment.code)}`;
      });
    }
    return;
  }
  const subjects = SUBJECTS[level] || [];
  const meta = LEVEL_META[level] || LEVEL_META.cem;
  subjectGrid.classList.remove("empty-state");
  subjectGrid.innerHTML = subjects.map((subject) => {
    const hint = SUBJECT_HINTS[subject.id] || { fr: "Choisissez cette matière pour continuer.", ar: "اختر هذه المادة للمتابعة.", en: "Choose this subject to continue." };
    const icon = SUBJECT_ICONS[subject.id] || "🔬";
    return `
      <button type="button" class="selection-card subject-card visual-subject-card" data-level="${level}" data-subject="${subject.id}" style="--level-accent:${meta.accent}">
        <span class="subject-photo" aria-hidden="true">${icon}</span>
        <strong>${dualText(subject.fr, subject.ar, subject.en || subject.fr)}</strong>
        <span class="subject-hint">${dualText(hint.fr, hint.ar, hint.en || hint.fr)}</span>
        <span class="subject-action">${dualText("Voir mes expériences", "عرض تجاربي", "See my experiments")}</span>
      </button>
    `;
  }).join("");
  document.querySelectorAll(".subject-card").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedSubject = SUBJECTS[level].find((subject) => subject.id === button.dataset.subject);
      localStorage.setItem(STORAGE.currentLevel, level);
      localStorage.setItem(STORAGE.currentSubject, JSON.stringify(selectedSubject));
      window.location.href = `experiences.html?level=${encodeURIComponent(level)}&subject=${encodeURIComponent(button.dataset.subject)}`;
    });
  });
}

function initDashboard() {
  const welcome = document.querySelector("[data-dashboard-welcome]");
  const studentName = localStorage.getItem(STORAGE.studentName) || "";
  const savedLevel = normalizeLevelKey(localStorage.getItem(STORAGE.currentLevel) || "cem");
  const levelLabel = LEVEL_LABELS[savedLevel] || LEVEL_LABELS.cem;
  if (welcome) {
    welcome.innerHTML = studentName
      ? dualText(`Bienvenue ${studentName}. Ton niveau ${levelLabel.fr} est déjà sélectionné.`, `مرحبا ${studentName}. مستوى ${levelLabel.ar} محدد مسبقاً.`, `Welcome ${studentName}. Your ${levelLabel.en} level is already selected.`)
      : dualText(`Ton niveau ${levelLabel.fr} est déjà sélectionné.`, `مستوى ${levelLabel.ar} محدد مسبقاً.`, `Your ${levelLabel.en} level is already selected.`);
  }
  renderDashboardLevelSummary(savedLevel);
  if (savedLevel) renderSubjects(savedLevel);
}

function renderDashboardLevelSummary(level) {
  const panel = document.querySelector("[data-dashboard-level-summary]");
  if (!panel) return;
  const meta = LEVEL_META[level] || LEVEL_META.cem;
  const label = LEVEL_LABELS[level] || LEVEL_LABELS.cem;
  const subjectCount = (SUBJECTS[level] || []).length;
  panel.className = `selected-level-panel fade-up delay-2 ${meta.className}`;
  panel.style.setProperty("--level-accent", meta.accent);
  panel.innerHTML = `
    <div class="selected-level-art" aria-hidden="true">${meta.icons}</div>
    <div class="selected-level-copy">
      <span class="eyebrow">${dualText("Niveau choisi", "المستوى المختار", "Selected level")}</span>
      <h2>${localizedTextMarkup(label, "level-title-line")}</h2>
      <p>${dualText(
        `Tu verras seulement les activités de ${label.fr}.`,
        `سترى فقط أنشطة ${label.ar}.`,
        `You will only see ${label.en} activities.`
      )}</p>
      <div class="selected-level-meta">
        <span>${dualText(`${subjectCount} matière`, `${subjectCount} مادة`, `${subjectCount} subject`)}</span>
        <span>${dualText("Filtre actif", "الفلتر مفعل", "Filter active")}</span>
      </div>
    </div>
  `;
}

function parseSavedSubject() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE.currentSubject) || "null");
  } catch (error) {
    return null;
  }
}

function initExperiences() {
  const summary = document.querySelector("[data-experiences-summary]");
  if (!summary) return;
  const params = new URLSearchParams(window.location.search);
  const assignment = findLabCodeAssignment(params.get("code")) || getActiveLabAssignment();
  const level = assignment ? assignment.level : (params.get("level") || localStorage.getItem(STORAGE.currentLevel) || "cem");
  let subject = parseSavedSubject();
  const subjectId = assignment ? (subjectForExperiment(assignment.experimentId, assignment.level)?.id || "") : params.get("subject");
  if (subjectId) subject = (SUBJECTS[level] || []).find((item) => item.id === subjectId) || subject;
  if (!subject && subjectId) subject = (SUBJECTS[level] || []).find((item) => item.id === subjectId) || null;
  if (!subject) subject = (SUBJECTS[level] || [])[0] || { fr: "Physique", ar: "الفيزياء" };
  localStorage.setItem(STORAGE.currentLevel, level);
  localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
  if (assignment) localStorage.setItem(STORAGE.activeLabCode, assignment.code);
  const selectedSubjectId = subject.id || subjectId || "";
  const visibleIds = assignment ? [assignment.experimentId] : visibleExperimentIds(level, selectedSubjectId);
  document.querySelectorAll("[data-experiment-card]").forEach((card) => {
    card.hidden = !visibleIds.includes(card.dataset.experimentCard);
  });
  if (assignment) {
    const experiment = getExperimentConfig(assignment.experimentId);
    summary.innerHTML = dualText(
      `Code ${assignment.code} : une seule activite assignee par le professeur, ${experiment.title.fr}.`,
      `الرمز ${assignment.code}: نشاط واحد فقط حدده الأستاذ، ${experiment.title.ar}.`
    );
  } else {
    summary.innerHTML = dualText(
      `Voici ${visibleIds.length} experience(s) pour ${LEVEL_LABELS[level].fr} - ${subject.fr}.`,
      `هذه ${visibleIds.length} تجربة مناسبة لـ ${LEVEL_LABELS[level].ar} - ${subject.ar}.`
    );
  }
}

function initLevelExperiences() {
  const summary = document.querySelector("[data-experiences-summary]");
  if (!summary) return;
  const params = new URLSearchParams(window.location.search);
  const assignment = findLabCodeAssignment(params.get("code")) || getActiveLabAssignment();
  const level = normalizeLevelKey(assignment ? assignment.level : (params.get("level") || localStorage.getItem(STORAGE.currentLevel) || "cem"));
  let subject = parseSavedSubject();
  const subjectId = assignment
    ? (params.get("subject") || subject?.id || defaultSubjectForAssignment(assignment)?.id || "")
    : params.get("subject");
  if (subjectId) subject = (SUBJECTS[level] || []).find((item) => item.id === subjectId) || subject;
  if (!subject) subject = (SUBJECTS[level] || [])[0] || { fr: "Physique", ar: "الفيزياء", en: "Physics" };
  localStorage.setItem(STORAGE.currentLevel, level);
  localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
  if (assignment) localStorage.setItem(STORAGE.activeLabCode, assignment.code);

  const list = assignment
    ? (LEVEL_EXPERIENCES[level] || []).filter((item) => item.lab === assignment.experimentId)
    : (LEVEL_EXPERIENCES[level] || []);
  renderLevelExperiencePage(level, list);

  if (assignment) {
    const experiment = getExperimentConfig(assignment.experimentId);
    summary.innerHTML = dualText(
      `Code ${assignment.code} : une seule activité assignée par le professeur, ${experiment.title.fr}.`,
      `الرمز ${assignment.code}: نشاط واحد فقط حدده الأستاذ، ${experiment.title.ar}.`,
      `Code ${assignment.code}: one activity assigned by the teacher, ${experiment.title.en || experiment.title.fr}.`
    );
  } else {
    summary.innerHTML = dualText(
      `Voici ${list.length} expérience(s) pour ${LEVEL_LABELS[level].fr}.`,
      `هذه ${list.length} تجربة مناسبة لـ ${LEVEL_LABELS[level].ar}.`,
      `Here are ${list.length} experiment(s) for ${LEVEL_LABELS[level].en}.`
    );
  }
}

function experienceHeroText(level, count) {
  const label = LEVEL_LABELS[level] || LEVEL_LABELS.cem;
  return {
    fr: `${count} expérience(s) pour ${label.fr}.`,
    ar: `${count} تجربة مناسبة لـ ${label.ar}.`,
    en: `${count} experiment(s) for ${label.en}.`
  };
}

function renderLevelExperiencePage(level, list) {
  const lang = currentLanguage();
  const meta = LEVEL_META[level] || LEVEL_META.cem;
  const label = LEVEL_LABELS[level] || LEVEL_LABELS.cem;
  const grid = document.getElementById("experiment-grid");
  const banner = document.querySelector("[data-level-banner]");
  const title = document.querySelector("[data-level-title]");
  const icon = document.querySelector("[data-level-icon]");
  const backIcon = document.querySelector("[data-back-icon]");

  document.body.dataset.level = level;
  if (banner) {
    banner.style.setProperty("--level-accent", meta.accent);
    banner.classList.remove("level-primary", "level-cem", "level-lycee");
    banner.classList.add(meta.className);
  }
  if (title) title.innerHTML = localizedTextMarkup(label, "level-title-line");
  if (icon) icon.textContent = meta.icons;
  if (backIcon) backIcon.textContent = lang === "ar" ? "→" : "←";
  if (!grid) return;

  const available = list.filter((item) => item.status === "available");
  const comingSoon = list.filter((item) => item.status !== "available");
  const countChip = document.querySelector("[data-experience-count]");
  if (countChip) countChip.textContent = getText(experienceHeroText(level, list.length));
  const divider = comingSoon.length
    ? `<div class="coming-soon-divider"><span>${escapeHtml(getText({
        fr: "✨ D'autres expériences arrivent bientôt...",
        ar: "✨ تجارب أخرى قادمة قريباً...",
        en: "✨ More experiments coming soon..."
      }))}</span></div>`
    : "";

  grid.innerHTML = [
    ...available.map((item) => renderExperienceCard(item, level, true)),
    divider,
    ...comingSoon.map((item) => renderExperienceCard(item, level, false))
  ].join("");

  grid.querySelectorAll("[data-start-lab]").forEach((button) => {
    button.addEventListener("click", () => {
      const lab = button.dataset.startLab;
      localStorage.setItem(STORAGE.lastExperiment, lab);
      window.location.href = `${lab}.html`;
    });
  });
}

function renderExperienceCard(item, level, available) {
  const meta = LEVEL_META[level] || LEVEL_META.cem;
  const title = item.title || { fr: "", ar: "", en: "" };
  const description = item.description || {
    fr: "Bientôt disponible",
    ar: "قريباً",
    en: "Coming soon"
  };
  if (!available) {
    return `
      <article class="experiment-card level-experience-card coming-soon-card" aria-disabled="true">
        <div class="experience-art locked-art"><span aria-hidden="true">🔒</span></div>
        <h2>${escapeHtml(getText(title))}</h2>
        <span class="badge badge-muted">${escapeHtml(getText({ fr: "Bientôt disponible", ar: "قريباً", en: "Coming soon" }))}</span>
      </article>
    `;
  }
  const visual = item.visual || item.icon || "🔬";
  return `
    <article class="experiment-card level-experience-card available-card" style="--level-accent:${meta.accent}">
      <div class="experience-art science-photo ${meta.className}">
        <span aria-hidden="true">${escapeHtml(visual)}</span>
      </div>
      <span class="badge subject-badge">${escapeHtml(getText(item.subject || { fr: "Sciences", ar: "علوم", en: "Science" }))}</span>
      <h2>${localizedTextMarkup(title, "trilingual-card-title")}</h2>
      <p>${escapeHtml(getText(description))}</p>
      <div class="stars" aria-hidden="true">⭐⭐⭐</div>
      <button type="button" class="primary-btn" data-start-lab="${escapeHtml(item.lab || "circuit")}">
        <span aria-hidden="true">🚀</span>
        ${escapeHtml(getText({ fr: "Commencer", ar: "ابدأ", en: "Start" }))}
      </button>
    </article>
  `;
}

function initEmbeddedLabExperiment() {
  const experimentId = document.body.dataset.experiment;
  const labMode = document.body.dataset.labMode || getLabDetails(experimentId).mode;
  const lab = getLabDetails(experimentId);
  const labSection = lab.section || "";
  const frame = document.querySelector("[data-lab-frame]");
  const loadButton = document.querySelector("[data-load-lab]");
  const finishButton = document.querySelector("[data-finish-experiment]");
  const openButton = document.querySelector("[data-open-lab-full]");

  initializeExperimentRuntime(experimentId);
  bindEmbeddedAssistant(experimentId);

  if (frame) {
    frame.dataset.labSrc = buildLabViewUrl(labMode, currentLanguage(), labSection);
    frame.classList.add("is-idle");
    createLabPreview(frame, labMode);
    frame.addEventListener("load", () => {
      if (frame.dataset.labLoaded !== "true") return;
      const preview = frame.previousElementSibling?.classList?.contains("lab-preview") ? frame.previousElementSibling : null;
      if (preview) preview.remove();
      markStep(1, true);
      setStatus(getText({
        fr: `${lab.name.fr} est charge. Vous pouvez commencer la manipulation.`,
        ar: `تم تحميل ${lab.name.ar}. يمكنك الآن بدء المناولة.`
      }));
    });
  }

  if (loadButton && frame) {
    loadButton.addEventListener("click", () => {
      loadButton.disabled = true;
      loadEmbeddedLab(frame, labMode, labSection);
      setStatus(getText({
        fr: `Chargement de ${lab.name.fr} en cours...`,
        ar: `جار تحميل ${lab.name.ar}...`
      }));
    });
  }

  document.querySelectorAll("[data-step-complete]").forEach((button) => {
    button.addEventListener("click", () => {
      if (frame && frame.dataset.labLoaded !== "true") {
        setStatus(getText({
          fr: "Chargez d'abord le labo 3D pour garder la page plus rapide.",
          ar: "قم أولا بتحميل المختبر الثلاثي الأبعاد حتى تبقى الصفحة أسرع."
        }));
        return;
      }
      const step = Number(button.dataset.stepComplete);
      const isActive = !button.classList.contains("active");
      button.classList.toggle("active", isActive);
      markStep(step, isActive);
      setStatus(getText({
        fr: "Etape enregistree. Continuez dans le labo 3D puis terminez quand vous etes pret.",
        ar: "تم تسجيل الخطوة. واصل داخل المختبر الثلاثي الأبعاد ثم أنهِ النشاط عندما تصبح جاهزًا."
      }));
    });
  });

  if (openButton) {
    openButton.addEventListener("click", () => {
      window.open(buildLabViewUrl(labMode, currentLanguage(), labSection), "_blank", "noopener");
    });
  }

  if (finishButton) {
    finishButton.addEventListener("click", () => {
      markStep(5, true);
      finishExperiment();
    });
  }

  setStatus(getText({
    fr: `Le labo 3D ne se charge pas au debut pour accelerer la page. Cliquez sur "Demarrer le labo 3D" quand vous etes pret.`,
    ar: `لا يتم تحميل المختبر الثلاثي الأبعاد في البداية حتى تصبح الصفحة أسرع. اضغط على "بدء المختبر الثلاثي الأبعاد" عندما تصبح جاهزا.`
  }));
}

function labelForComponent(component) {
  const labels = {
    battery: { fr: "Pile", ar: "البطارية" },
    switch: { fr: "Interrupteur", ar: "المفتاح" },
    ammeter: { fr: "Amperemetre", ar: "الأمبيرمتر" },
    bulb: { fr: "Lampe", ar: "المصباح" },
    voltmeter: { fr: "Voltmetre", ar: "الفولتميتر" }
  };
  return labels[component] || { fr: "Zone libre", ar: "منطقة فارغة" };
}

function setSlotLabel(button, slotName, component) {
  if (!button) return;
  if (!component) {
    button.classList.remove("filled");
    button.innerHTML = slotName === "parallel"
      ? dualText("Branche parallele", "فرع مواز")
      : dualText(`Serie ${slotName.replace("series", "")}`, `تسلسل ${slotName.replace("series", "")}`);
    return;
  }
  button.classList.add("filled");
  button.innerHTML = dualText(labelForComponent(component).fr, labelForComponent(component).ar);
}

function initCircuitExperiment() {
  initializeExperimentRuntime("circuit");
  bindEmbeddedAssistant("circuit");
  const state = {
    selected: null,
    slots: { series1: null, series2: null, series3: null, series4: null, parallel: null },
    wiresConnected: false,
    switchClosed: false
  };
  const selectedBox = document.querySelector("[data-selected-component]");
  const bulb = document.querySelector("[data-bulb-visual]");

  function updateSelectedBox() {
    if (!selectedBox) return;
    selectedBox.innerHTML = state.selected
      ? dualText(`Composant choisi : ${labelForComponent(state.selected).fr}`, `العنصر المختار: ${labelForComponent(state.selected).ar}`)
      : dualText("Aucun composant selectionne.", "لم يتم اختيار أي عنصر.");
  }

  function refreshCircuitStatus() {
    const seriesValues = Object.keys(state.slots).filter((key) => key.startsWith("series")).map((key) => state.slots[key]);
    const batteryInSeries = seriesValues.includes("battery");
    const bulbInSeries = seriesValues.includes("bulb");
    const ammeterInSeries = seriesValues.includes("ammeter");
    const switchInSeries = seriesValues.includes("switch");
    const voltmeterParallel = state.slots.parallel === "voltmeter";
    const ammeterParallel = state.slots.parallel === "ammeter";
    const voltmeterSeries = seriesValues.includes("voltmeter");

    markStep(1, batteryInSeries);
    markStep(2, bulbInSeries);
    markStep(3, ammeterInSeries && !ammeterParallel);
    markStep(4, voltmeterParallel && !voltmeterSeries);
    markStep(5, state.wiresConnected && state.switchClosed && switchInSeries);

    if (ammeterParallel) registerMistake({ fr: "Attention : l'amperemetre ne doit pas etre sur la branche parallele.", ar: "انتبه: لا يجب وضع الأمبيرمتر على الفرع الموازي." });
    if (voltmeterSeries) registerMistake({ fr: "Le voltmetre ne se place pas en serie dans cette experience.", ar: "لا يوضع الفولتميتر على التسلسل في هذه التجربة." });

    const success = batteryInSeries && bulbInSeries && ammeterInSeries && switchInSeries && voltmeterParallel && state.wiresConnected && state.switchClosed;
    if (bulb) bulb.classList.toggle("on", success);
    setStatus(success ? getText(getExperimentConfig("circuit").success) : getText({ fr: "Construisez la boucle principale puis verifiez la branche parallele.", ar: "ابن الحلقة الرئيسية ثم تحقق من الفرع الموازي." }));
  }

  document.querySelectorAll(".component-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".component-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.selected = button.dataset.component;
      updateSelectedBox();
    });
  });

  document.querySelectorAll(".slot-btn").forEach((slotButton) => {
    setSlotLabel(slotButton, slotButton.dataset.slot, null);
    slotButton.addEventListener("click", () => {
      if (!state.selected) {
        setStatus(getText({ fr: "Selectionnez un composant avant de choisir une zone.", ar: "اختر عنصرا قبل اختيار المنطقة." }));
        return;
      }
      Object.keys(state.slots).forEach((key) => {
        if (state.slots[key] === state.selected) {
          state.slots[key] = null;
          setSlotLabel(document.querySelector(`[data-slot="${key}"]`), key, null);
        }
      });
      state.slots[slotButton.dataset.slot] = state.selected;
      setSlotLabel(slotButton, slotButton.dataset.slot, state.selected);
      refreshCircuitStatus();
    });
  });

  document.querySelectorAll("[data-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.toggle === "wires") state.wiresConnected = !state.wiresConnected;
      if (button.dataset.toggle === "switch") state.switchClosed = !state.switchClosed;
      button.classList.toggle("active");
      refreshCircuitStatus();
    });
  });

  const reset = document.querySelector('[data-action="reset-circuit"]');
  if (reset) {
    reset.addEventListener("click", () => {
      state.selected = null;
      state.wiresConnected = false;
      state.switchClosed = false;
      state.slots = { series1: null, series2: null, series3: null, series4: null, parallel: null };
      document.querySelectorAll(".component-btn, [data-toggle]").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".slot-btn").forEach((slotButton) => setSlotLabel(slotButton, slotButton.dataset.slot, null));
      updateSelectedBox();
      refreshCircuitStatus();
    });
  }

  document.querySelector("[data-finish-experiment]").addEventListener("click", finishExperiment);
  updateSelectedBox();
  refreshCircuitStatus();
}

function initPlantExperiment() {
  initializeExperimentRuntime("plante");
  bindEmbeddedAssistant("plante");
  const visual = document.querySelector(".plant-visual");
  const note = document.querySelector("[data-plant-note]");
  const state = { prepared: false, placed: false, observed: false, inspected: false, concluded: false };

  function setStage(stage) {
    if (visual) visual.className = `plant-visual stage-${stage}`;
  }

  document.querySelectorAll(".action-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "prepare-water") {
        state.prepared = true;
        markStep(1, true);
        setStage(1);
        setStatus(getText({ fr: "L'eau coloree est prete.", ar: "الماء الملون جاهز." }));
        return;
      }
      if (action === "place-plant") {
        if (!state.prepared) return registerMistake({ fr: "Prepare d'abord l'eau coloree.", ar: "حضّر الماء الملون أولا." });
        state.placed = true;
        markStep(2, true);
        setStage(2);
        setStatus(getText({ fr: "La tige est bien placee dans le becher.", ar: "تم وضع الساق بشكل صحيح داخل الكأس." }));
        return;
      }
      if (action === "observe-stem") {
        if (!state.placed) return registerMistake({ fr: "Place la tige avant d'observer.", ar: "ضع الساق قبل الملاحظة." });
        state.observed = true;
        markStep(3, true);
        setStage(3);
        if (note) note.innerHTML = dualText("Observation : la coloration monte progressivement dans la tige.", "الملاحظة: يصعد اللون تدريجيا داخل الساق.");
        setStatus(getText({ fr: "La coloration devient visible dans la tige.", ar: "أصبح اللون واضحا في الساق." }));
        return;
      }
      if (action === "inspect-leaf") {
        if (!state.observed) return registerMistake({ fr: "Observe la tige avant d'inspecter les feuilles.", ar: "لاحظ الساق أولا قبل فحص الأوراق." });
        state.inspected = true;
        markStep(4, true);
        setStage(4);
        if (note) note.innerHTML = dualText("Observation : les nervures des feuilles montrent le passage de l'eau coloree.", "الملاحظة: عروق الأوراق تبين مرور الماء الملون.");
        setStatus(getText({ fr: "Les feuilles confirment le transport de l'eau.", ar: "تؤكد الأوراق انتقال الماء داخل النبات." }));
        return;
      }
      if (action === "conclude-plant") {
        if (!state.inspected) return registerMistake({ fr: "Inspecte les feuilles avant de conclure.", ar: "افحص الأوراق قبل كتابة الاستنتاج." });
        state.concluded = true;
        markStep(5, true);
        if (note) note.innerHTML = dualText("Conclusion : la plante absorbe l'eau et la transporte vers les feuilles par des vaisseaux conducteurs.", "الاستنتاج: يمتص النبات الماء وينقله نحو الأوراق عبر أوعية ناقلة.");
        setStatus(getText(getExperimentConfig("plante").success));
      }
    });
  });

  document.querySelector("[data-finish-experiment]").addEventListener("click", finishExperiment);
  setStatus(getText({ fr: "Commencez par preparer l'eau coloree.", ar: "ابدأ بتحضير الماء الملون." }));
}

function initMassExperiment() {
  initializeExperimentRuntime("masse");
  bindEmbeddedAssistant("masse");
  const visual = document.querySelector(".balance-visual");
  const totalNode = document.querySelector("[data-weight-total]");
  const state = { selectedObject: false, weights: [], validated: false, target: 250 };

  function total() {
    return state.weights.reduce((sum, value) => sum + value, 0);
  }

  function refreshBalance() {
    const current = total();
    if (totalNode) totalNode.textContent = `${current} g`;
    if (visual) {
      visual.classList.remove("left-heavy", "right-heavy");
      if (current < state.target) visual.classList.add("left-heavy");
      else if (current > state.target) visual.classList.add("right-heavy");
    }
    markStep(2, current > 0);
    markStep(3, current === state.target);
    if (current > state.target) registerMistake({ fr: "La masse totale depasse 250 g. Retire une masse.", ar: "الكتلة الكلية تجاوزت 250 غ. انزع كتلة واحدة." });
    else setStatus(getText({ fr: "Ajustez les masses pour atteindre 250 g.", ar: "عدّل الكتل حتى تصل إلى 250 غ." }));
  }

  document.querySelector('[data-action="select-object"]').addEventListener("click", () => {
    state.selectedObject = true;
    markStep(1, true);
    setStatus(getText({ fr: "Objet mystere pret a etre mesure.", ar: "الجسم المجهول جاهز للقياس." }));
  });

  document.querySelectorAll(".weight-btn").forEach((button) => {
    button.addEventListener("click", () => {
      if (!state.selectedObject) return registerMistake({ fr: "Selectionnez d'abord l'objet mystere.", ar: "اختر الجسم المجهول أولا." });
      state.weights.push(Number(button.dataset.weight));
      refreshBalance();
    });
  });

  document.querySelector('[data-action="remove-weight"]').addEventListener("click", () => {
    state.weights.pop();
    refreshBalance();
  });

  document.querySelector('[data-action="reset-scale"]').addEventListener("click", () => {
    state.weights = [];
    state.validated = false;
    markStep(4, false);
    markStep(5, false);
    refreshBalance();
  });

  document.querySelector('[data-action="validate-balance"]').addEventListener("click", () => {
    if (total() !== state.target) return registerMistake({ fr: "La balance n'est pas encore a l'equilibre exact.", ar: "الميزان ليس في حالة توازن دقيق بعد." });
    state.validated = true;
    markStep(4, true);
    setStatus(getText({ fr: "Equilibre valide : la masse de l'objet est de 250 g.", ar: "تم تأكيد التوازن: كتلة الجسم هي 250 غ." }));
  });

  document.querySelector('[data-action="record-mass"]').addEventListener("click", () => {
    if (!state.validated) return registerMistake({ fr: "Validez l'equilibre avant de noter la conclusion.", ar: "أكد التوازن قبل كتابة الاستنتاج." });
    markStep(5, true);
    setStatus(getText(getExperimentConfig("masse").success));
  });

  document.querySelector("[data-finish-experiment]").addEventListener("click", finishExperiment);
  refreshBalance();
}

function initChemistryExperiment() {
  initializeExperimentRuntime("chimie");
  bindEmbeddedAssistant("chimie");
  const visual = document.querySelector(".chemistry-visual");
  const note = document.querySelector("[data-chemistry-note]");
  const state = { goggles: false, zinc: false, acid: false, gas: false, flame: false };

  function setChemistryStage(stage) {
    if (visual) visual.className = `chemistry-visual stage-${stage}`;
  }

  document.querySelectorAll(".chemistry-grid .action-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "wear-goggles") {
        state.goggles = true;
        markStep(1, true);
        setChemistryStage(1);
        setStatus(getText({ fr: "Protection activee, vous pouvez preparer les reactifs.", ar: "تم تفعيل الحماية، يمكنك تحضير المتفاعلات." }));
        return;
      }
      if (action === "add-zinc") {
        if (!state.goggles) return registerMistake({ fr: "Mettez les lunettes avant toute manipulation.", ar: "ضع النظارات قبل أي مناولة." });
        state.zinc = true;
        markStep(2, true);
        setChemistryStage(2);
        setStatus(getText({ fr: "Le zinc est dans le ballon.", ar: "تم وضع الزنك في الدورق." }));
        return;
      }
      if (action === "add-acid") {
        if (!state.zinc) return registerMistake({ fr: "Ajoutez d'abord le zinc avant l'acide.", ar: "أضف الزنك أولا قبل الحمض." });
        state.acid = true;
        markStep(3, true);
        setChemistryStage(3);
        if (note) note.innerHTML = dualText("Observation : des bulles apparaissent, signe d'un degagement gazeux.", "الملاحظة: تظهر فقاعات، وهذا يدل على انطلاق غاز.");
        setStatus(getText({ fr: "La reaction commence et des bulles apparaissent.", ar: "بدأ التفاعل وظهرت الفقاعات." }));
        return;
      }
      if (action === "collect-gas") {
        if (!state.acid) return registerMistake({ fr: "Attendez le degagement gazeux avant la collecte.", ar: "انتظر انطلاق الغاز قبل جمعه." });
        state.gas = true;
        markStep(4, true);
        setChemistryStage(4);
        if (note) note.innerHTML = dualText("Observation : le gaz produit est recueilli pour verification.", "الملاحظة: تم جمع الغاز الناتج للتحقق منه.");
        setStatus(getText({ fr: "Le gaz est collecte avec precaution.", ar: "تم جمع الغاز بحذر." }));
        return;
      }
      if (action === "test-flame") {
        if (!state.gas) return registerMistake({ fr: "Recueillez d'abord le gaz avant le test a la flamme.", ar: "اجمع الغاز أولا قبل اختبار اللهب." });
        state.flame = true;
        markStep(5, true);
        setChemistryStage(5);
        if (note) note.innerHTML = dualText("Conclusion : le test final confirme la presence d'hydrogene.", "الاستنتاج: يؤكد الاختبار النهائي وجود الهيدروجين.");
        setStatus(getText(getExperimentConfig("chimie").success));
      }
    });
  });

  document.querySelector("[data-finish-experiment]").addEventListener("click", finishExperiment);
  setStatus(getText({ fr: "Commencez par mettre les lunettes de protection.", ar: "ابدأ بوضع نظارات الحماية." }));
}

function initExperimentPage() {
  if (document.querySelector("[data-lab-frame]")) {
    initEmbeddedLabExperiment();
    return;
  }
  const experimentId = document.body.dataset.experiment;
  if (experimentId === "circuit") initCircuitExperiment();
  if (experimentId === "plante") initPlantExperiment();
  if (experimentId === "masse") initMassExperiment();
  if (experimentId === "chimie") initChemistryExperiment();
}

function initResultPage() {
  const result = readJson(STORAGE.lastResult, null);
  if (!result) return (window.location.href = "experiences.html");
  const title = document.querySelector("[data-result-title]");
  const score = document.querySelector("[data-result-score]");
  const badge = document.querySelector("[data-result-badge]");
  const summary = document.querySelector("[data-result-summary]");
  const tip = document.querySelector("[data-result-tip]");
  const steps = document.querySelector("[data-result-steps]");
  const errors = document.querySelector("[data-result-errors]");
  if (title) title.textContent = getText(result.title);
  if (score) score.textContent = result.score;
  if (badge) badge.textContent = getText(result.badge);
  if (summary) summary.textContent = getText({ fr: `Vous avez complete ${result.stepsCompleted} etapes sur 5 avec un score de ${result.score}/100.`, ar: `أكملت ${result.stepsCompleted} خطوات من أصل 5 بنتيجة ${result.score}/100.` });
  if (tip) tip.textContent = getText(result.tip);
  if (steps) steps.textContent = String(result.stepsCompleted);
  if (errors) errors.textContent = String(result.errors.length);
}

EXPERIMENTS.plante.quiz = [
  {
    prompt: { fr: "Pourquoi utilise-t-on une eau coloree ?", ar: "لماذا نستعمل ماء ملونا؟" },
    options: [
      { fr: "Pour voir son trajet dans la plante", ar: "لرؤية مساره داخل النبات" },
      { fr: "Pour nourrir la plante en sucre", ar: "لتغذية النبات بالسكر" },
      { fr: "Pour remplacer la lumiere", ar: "لتعويض الضوء" },
      { fr: "Pour secher la tige", ar: "لتجفيف الساق" }
    ],
    correct: 0,
    explanation: { fr: "La coloration rend visible la circulation de l'eau.", ar: "يساعد التلوين على رؤية انتقال الماء داخل النبات." }
  },
  {
    prompt: { fr: "L'eau monte de la racine vers les feuilles.", ar: "يصعد الماء من الجذر نحو الأوراق." },
    options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
    correct: 0,
    explanation: { fr: "Oui, la plante transporte l'eau vers les parties aeriennes.", ar: "نعم، ينقل النبات الماء إلى الأجزاء الهوائية." }
  },
  {
    prompt: { fr: "Que remarque-t-on au niveau de la tige ?", ar: "ماذا نلاحظ على مستوى الساق؟" },
    options: [
      { fr: "Une coloration progressive", ar: "تلونا تدريجيا" },
      { fr: "Une disparition des feuilles", ar: "اختفاء الأوراق" },
      { fr: "Une production de flamme", ar: "ظهور لهب" },
      { fr: "Une baisse de masse", ar: "نقصانا في الكتلة" }
    ],
    correct: 0,
    explanation: { fr: "La tige se colore progressivement lorsque l'eau monte.", ar: "يتغير لون الساق تدريجيا عندما يصعد الماء." }
  },
  {
    prompt: { fr: "Les feuilles peuvent montrer les traces du colorant.", ar: "يمكن أن تظهر آثار الملون على الأوراق." },
    options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
    correct: 0,
    explanation: { fr: "Oui, les nervures des feuilles peuvent devenir colorees.", ar: "نعم، قد تظهر آثار اللون في عروق الأوراق." }
  },
  {
    prompt: { fr: "Quel est le role principal de cette experience ?", ar: "ما الهدف الرئيسي من هذه التجربة؟" },
    options: [
      { fr: "Montrer le transport de l'eau", ar: "إظهار انتقال الماء" },
      { fr: "Mesurer l'electricite", ar: "قياس الكهرباء" },
      { fr: "Calculer une masse", ar: "حساب الكتلة" },
      { fr: "Produire un gaz", ar: "إنتاج غاز" }
    ],
    correct: 0,
    explanation: { fr: "L'experience met en evidence le transport de l'eau dans la plante.", ar: "توضح التجربة انتقال الماء داخل النبات." }
  }
];

EXPERIMENTS.masse.quiz = [
  {
    prompt: { fr: "Quand la balance est-elle a l'equilibre ?", ar: "متى يكون الميزان في حالة توازن؟" },
    options: [
      { fr: "Quand les deux plateaux ont la meme masse", ar: "عندما تكون كتلة الكفتين متساوية" },
      { fr: "Quand un seul plateau bouge", ar: "عندما تتحرك كفة واحدة فقط" },
      { fr: "Quand le support est incline", ar: "عندما يكون الحامل مائلا" },
      { fr: "Quand il n'y a aucune masse", ar: "عندما لا توجد أي كتلة" }
    ],
    correct: 0,
    explanation: { fr: "L'equilibre traduit l'egalite des masses.", ar: "يدل التوازن على تساوي الكتل." }
  },
  {
    prompt: { fr: "On peut mesurer une masse inconnue avec des masses marquees.", ar: "يمكن قياس كتلة مجهولة باستعمال كتل معيارية." },
    options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
    correct: 0,
    explanation: { fr: "Oui, c'est le principe de la balance a plateaux.", ar: "نعم، هذا هو مبدأ الميزان ذي الكفتين." }
  },
  {
    prompt: { fr: "Quelle masse fallait-il atteindre dans cette simulation ?", ar: "ما الكتلة التي كان يجب الوصول إليها في هذه المحاكاة؟" },
    options: [
      { fr: "250 g", ar: "250 غ" },
      { fr: "100 g", ar: "100 غ" },
      { fr: "500 g", ar: "500 غ" },
      { fr: "50 g", ar: "50 غ" }
    ],
    correct: 0,
    explanation: { fr: "L'objet mystere avait ici une masse de 250 g.", ar: "كانت كتلة الجسم المجهول هنا 250 غ." }
  },
  {
    prompt: { fr: "Si le plateau droit est plus lourd, la balance penche a droite.", ar: "إذا كانت الكفة اليمنى أثقل فإن الميزان يميل نحو اليمين." },
    options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
    correct: 0,
    explanation: { fr: "Oui, le cote le plus lourd descend.", ar: "نعم، الجهة الأثقل هي التي تنخفض." }
  },
  {
    prompt: { fr: "Que signifie la masse ?", ar: "ماذا تعني الكتلة؟" },
    options: [
      { fr: "La quantite de matiere d'un objet", ar: "كمية المادة في جسم ما" },
      { fr: "La couleur d'un objet", ar: "لون الجسم" },
      { fr: "La temperature d'un objet", ar: "درجة حرارة الجسم" },
      { fr: "La vitesse d'un objet", ar: "سرعة الجسم" }
    ],
    correct: 0,
    explanation: { fr: "La masse exprime la quantite de matiere.", ar: "تعبر الكتلة عن كمية المادة." }
  }
];

EXPERIMENTS.chimie.quiz = [
  {
    prompt: { fr: "Quelle precaution vient en premier ?", ar: "ما أول احتياط يجب القيام به؟" },
    options: [
      { fr: "Mettre les lunettes", ar: "ارتداء النظارات الواقية" },
      { fr: "Allumer la flamme", ar: "إشعال اللهب" },
      { fr: "Verser tout l'acide rapidement", ar: "سكب الحمض بسرعة" },
      { fr: "Retirer le zinc", ar: "إزالة الزنك" }
    ],
    correct: 0,
    explanation: { fr: "La securite precede toute manipulation chimique.", ar: "السلامة تسبق أي تجربة كيميائية." }
  },
  {
    prompt: { fr: "Le zinc peut reagir avec un acide pour degager un gaz.", ar: "يمكن أن يتفاعل الزنك مع حمض مطلقا غازا." },
    options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
    correct: 0,
    explanation: { fr: "Oui, cette reaction peut produire de l'hydrogene.", ar: "نعم، هذا التفاعل قد ينتج غاز الهيدروجين." }
  },
  {
    prompt: { fr: "Quel signe visuel annonce la reaction ?", ar: "ما العلامة البصرية التي تدل على بداية التفاعل؟" },
    options: [
      { fr: "L'apparition de bulles", ar: "ظهور الفقاعات" },
      { fr: "La disparition du becher", ar: "اختفاء الكأس" },
      { fr: "Le gel de la solution", ar: "تجمد المحلول" },
      { fr: "La baisse de la lumiere de la salle", ar: "انخفاض ضوء الغرفة" }
    ],
    correct: 0,
    explanation: { fr: "Les bulles montrent qu'un gaz se degage.", ar: "تدل الفقاعات على انطلاق غاز." }
  },
  {
    prompt: { fr: "Il faut recueillir le gaz avant de le tester.", ar: "يجب جمع الغاز قبل اختباره." },
    options: [{ fr: "Vrai", ar: "صحيح" }, { fr: "Faux", ar: "خطأ" }],
    correct: 0,
    explanation: { fr: "Oui, cela permet un test plus clair et plus sur.", ar: "نعم، هذا يجعل الاختبار أوضح وأكثر أمانا." }
  },
  {
    prompt: { fr: "Quel objectif a cette experience ?", ar: "ما هدف هذه التجربة؟" },
    options: [
      { fr: "Identifier un degagement d'hydrogene", ar: "التعرف على انطلاق الهيدروجين" },
      { fr: "Mesurer une masse", ar: "قياس كتلة" },
      { fr: "Comparer deux plantes", ar: "مقارنة نبتتين" },
      { fr: "Brancher un voltmetre", ar: "توصيل فولتميتر" }
    ],
    correct: 0,
    explanation: { fr: "Cette manipulation sert a mettre en evidence l'hydrogene.", ar: "تستخدم هذه التجربة لإبراز وجود الهيدروجين." }
  }
];

function renderQuizQuestion(state) {
  const stage = document.getElementById("quiz-stage");
  const progress = document.querySelector("[data-quiz-progress]");
  const config = getExperimentConfig(state.experimentId);
  const question = state.questions[state.index];
  if (!stage || !progress || !question) return;
  progress.textContent = getText({ fr: `Question ${state.index + 1} sur ${state.questions.length}`, ar: `السؤال ${state.index + 1} من ${state.questions.length}` });
  stage.innerHTML = `
    <div class="quiz-question">
      <h2>${escapeHtml(getText(question.prompt))}</h2>
      <div class="quiz-options">
        ${question.options.map((option, index) => `<button type="button" class="quiz-option" data-option-index="${index}">${escapeHtml(getText(option))}</button>`).join("")}
      </div>
      <div class="quiz-feedback" id="quiz-feedback">${dualText("Choisissez une reponse pour obtenir un retour immediat.", "اختر إجابة لتحصل على تغذية راجعة فورية.")}</div>
    </div>
  `;
  const feedback = document.getElementById("quiz-feedback");
  stage.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.optionIndex);
      const correct = selected === question.correct;
      state.answers.push({ selected, correct, question });
      if (correct) state.score += 20;
      stage.querySelectorAll(".quiz-option").forEach((optionButton) => {
        optionButton.disabled = true;
        const optionIndex = Number(optionButton.dataset.optionIndex);
        if (optionIndex === question.correct) optionButton.classList.add("correct");
        else if (optionIndex === selected && !correct) optionButton.classList.add("wrong");
      });
      feedback.innerHTML = `<strong>${escapeHtml(getText(correct ? { fr: "Bonne reponse.", ar: "إجابة صحيحة." } : { fr: "Reponse a revoir.", ar: "إجابة تحتاج مراجعة." }))}</strong><p>${escapeHtml(getText(question.explanation))}</p>`;
      const nextButton = document.createElement("button");
      nextButton.type = "button";
      nextButton.className = "primary-btn";
      nextButton.innerHTML = state.index === state.questions.length - 1 ? dualText("Voir le resultat final", "عرض النتيجة النهائية") : dualText("Question suivante", "السؤال التالي");
      nextButton.addEventListener("click", () => {
        state.index += 1;
        if (state.index >= state.questions.length) renderQuizResult(state, config);
        else renderQuizQuestion(state);
      });
      feedback.appendChild(nextButton);
    }, { once: true });
  });
}

function renderQuizResult(state, config) {
  const stage = document.getElementById("quiz-stage");
  const progress = document.querySelector("[data-quiz-progress]");
  if (!stage || !progress) return;
  const badge = scoreToBadge(state.score);
  const quizScores = readJson(STORAGE.quizScores, {});
  quizScores[state.experimentId] = state.score;
  writeJson(STORAGE.quizScores, quizScores);
  progress.textContent = getText({ fr: "Quiz termine", ar: "تم إنهاء الاختبار" });
  stage.innerHTML = `
    <div class="quiz-result">
      <h2>${escapeHtml(getText(config.title))}</h2>
      <p>${escapeHtml(getText({ fr: `Score final : ${state.score}/100`, ar: `النتيجة النهائية: ${state.score}/100` }))}</p>
      <p class="result-badge">${escapeHtml(getText(badge))}</p>
      <div class="quiz-review-card">
        <h3>${dualText("Mode revision", "وضع المراجعة")}</h3>
        ${state.answers.map((answer, index) => `
          <div class="quiz-feedback">
            <strong>${escapeHtml(getText({ fr: `Question ${index + 1}`, ar: `السؤال ${index + 1}` }))}</strong>
            <p>${escapeHtml(getText(answer.question.prompt))}</p>
            <p>${escapeHtml(getText({ fr: `Bonne reponse : ${answer.question.options[answer.question.correct].fr}`, ar: `الإجابة الصحيحة: ${answer.question.options[answer.question.correct].ar}` }))}</p>
            <p>${escapeHtml(getText(answer.question.explanation))}</p>
          </div>
        `).join("")}
      </div>
      <div class="hero-actions">
        <a class="primary-btn" href="dashboard.html">${dualText("Retour au tableau de bord", "العودة إلى اللوحة")}</a>
        <a class="secondary-btn" href="experiences.html">${dualText("Retour aux experiences", "العودة إلى التجارب")}</a>
      </div>
    </div>
  `;
}

function renderQuizResult(state, config) {
  const stage = document.getElementById("quiz-stage");
  const progress = document.querySelector("[data-quiz-progress]");
  if (!stage || !progress) return;
  const finalScore = Math.round((state.score / Math.max(state.questions.length, 1)) * 100);
  const badge = scoreToBadge(finalScore);
  const quizScores = readJson(STORAGE.quizScores, {});
  quizScores[state.experimentId] = finalScore;
  writeJson(STORAGE.quizScores, quizScores);

  const labResult = readJson(STORAGE.lastResult, null) || {};
  const completedAt = new Date().toISOString();
  const nextResult = {
    ...labResult,
    experimentId: state.experimentId,
    title: config.title,
    quizScore: finalScore,
    quizCorrect: state.score,
    quizTotal: state.questions.length,
    completedAt
  };
  writeJson(STORAGE.lastResult, nextResult);

  const history = readResultHistory();
  history.unshift({
    id: `${completedAt}-${state.experimentId}`,
    studentName: localStorage.getItem(STORAGE.studentName) || "",
    classCode: localStorage.getItem(STORAGE.studentClass) || "DIRECT",
    level: normalizeLevelKey(localStorage.getItem(STORAGE.currentLevel) || "cem"),
    experimentId: state.experimentId,
    title: config.title,
    labScore: Number(labResult.score || 0),
    quizScore: finalScore,
    quizCorrect: state.score,
    quizTotal: state.questions.length,
    completedAt
  });
  writeResultHistory(history.slice(0, 80));

  progress.textContent = getText({ fr: "Quiz termine", ar: "Quiz termine", en: "Quiz completed" });
  stage.innerHTML = `
    <div class="quiz-result">
      <h2>${escapeHtml(getText(config.title))}</h2>
      <p>${escapeHtml(getText({
        fr: `Score final : ${finalScore}/100 (${state.score}/${state.questions.length} reponses justes)`,
        ar: `Score final : ${finalScore}/100 (${state.score}/${state.questions.length})`,
        en: `Final score: ${finalScore}/100 (${state.score}/${state.questions.length} correct answers)`
      }))}</p>
      <p class="result-badge">${escapeHtml(getText(badge))}</p>
      <div class="quiz-review-card">
        <h3>${escapeHtml(getText({ fr: "Revision", ar: "Revision", en: "Review" }))}</h3>
        ${state.answers.map((answer, index) => `
          <div class="quiz-feedback">
            <strong>${escapeHtml(getText({ fr: `Question ${index + 1}`, ar: `Question ${index + 1}`, en: `Question ${index + 1}` }))}</strong>
            <p>${escapeHtml(getText(answer.question.prompt))}</p>
            <p>${escapeHtml(getText({
              fr: `Bonne reponse : ${getText(answer.question.options[answer.question.correct])}`,
              ar: `Bonne reponse : ${getText(answer.question.options[answer.question.correct])}`,
              en: `Correct answer: ${getText(answer.question.options[answer.question.correct])}`
            }))}</p>
            <p>${escapeHtml(getText(answer.question.explanation))}</p>
          </div>
        `).join("")}
      </div>
      <div class="hero-actions">
        <a class="primary-btn" href="result.html">${escapeHtml(getText({ fr: "Voir le resultat complet", ar: "Voir le resultat complet", en: "View full result" }))}</a>
        <a class="secondary-btn" href="dashboard.html">${escapeHtml(getText({ fr: "Retour au tableau de bord", ar: "Retour au tableau de bord", en: "Back to dashboard" }))}</a>
      </div>
    </div>
  `;
}

function initQuizPage() {
  const experimentId = localStorage.getItem(STORAGE.lastExperiment) || "circuit";
  const config = getExperimentConfig(experimentId);
  const title = document.querySelector("[data-quiz-title]");
  if (title) title.textContent = getText({ fr: `Quiz lie a l'experience : ${config.title.fr}.`, ar: `اختبار مرتبط بالتجربة: ${config.title.ar}.` });
  renderQuizQuestion({ experimentId, questions: config.quiz, index: 0, score: 0, answers: [] });
}

const EDUVIRTUEL_QUIZ_BANK = {
  circuit: [
    quizQuestion("Quel composant fournit l'énergie dans un circuit simple ?", "ما العنصر الذي يزوّد الدارة بالطاقة؟", "Which component supplies energy in a simple circuit?", ["La pile", "L'interrupteur", "Le fil", "La lampe"], ["البطارية", "القاطع", "السلك", "المصباح"], ["The battery", "The switch", "The wire", "The bulb"], 0, "La pile fournit l'énergie électrique nécessaire au circuit.", "البطارية تزوّد الدارة بالطاقة الكهربائية اللازمة.", "The battery provides the electrical energy needed by the circuit."),
    quizQuestion("Que faut-il pour qu'une lampe s'allume ?", "ماذا نحتاج حتى يضيء المصباح؟", "What is needed for a bulb to light up?", ["Une boucle fermée", "Un fil coupé", "Un interrupteur ouvert", "Aucune pile"], ["دارة مغلقة", "سلك مقطوع", "قاطع مفتوح", "بدون بطارية"], ["A closed loop", "A cut wire", "An open switch", "No battery"], 0, "Le courant circule seulement si la boucle est fermée.", "يمر التيار فقط عندما تكون الدارة مغلقة.", "Current flows only when the loop is closed."),
    quizQuestion("Quel appareil mesure la tension électrique ?", "أي جهاز يقيس التوتر الكهربائي؟", "Which instrument measures voltage?", ["Le voltmètre", "L'ampèremètre", "La balance", "Le thermomètre"], ["الفولتميتر", "الأمبيرمتر", "الميزان", "المحرار"], ["The voltmeter", "The ammeter", "The scale", "The thermometer"], 0, "Le voltmètre mesure la tension entre deux points du circuit.", "الفولتميتر يقيس التوتر بين نقطتين في الدارة.", "A voltmeter measures voltage between two points in a circuit."),
    quizQuestion("Dans un montage en série, que se passe-t-il si une lampe est retirée ?", "في التركيب على التسلسل، ماذا يحدث إذا نزعنا مصباحا؟", "In a series circuit, what happens if one bulb is removed?", ["Tout le circuit s'arrête", "Les autres lampes brillent plus", "Rien ne change", "La pile disparaît"], ["تتوقف الدارة كلها", "تضيء المصابيح الأخرى أكثر", "لا يتغير شيء", "تختفي البطارية"], ["The whole circuit stops", "The other bulbs glow brighter", "Nothing changes", "The battery disappears"], 0, "En série, ouvrir un point de la boucle arrête le courant.", "في التسلسل، فتح نقطة من الحلقة يوقف التيار.", "In series, opening one point of the loop stops the current."),
    quizQuestion("Quel matériau laisse facilement passer le courant ?", "أي مادة تسمح بمرور التيار بسهولة؟", "Which material lets current pass easily?", ["Le cuivre", "Le plastique", "Le bois sec", "Le verre"], ["النحاس", "البلاستيك", "الخشب الجاف", "الزجاج"], ["Copper", "Plastic", "Dry wood", "Glass"], 0, "Le cuivre est un conducteur électrique.", "النحاس ناقل للكهرباء.", "Copper is an electrical conductor."),
    quizQuestion("À quoi sert un interrupteur ?", "ما وظيفة القاطع؟", "What is the role of a switch?", ["Ouvrir ou fermer le circuit", "Mesurer la masse", "Colorer l'eau", "Chauffer la lampe"], ["فتح أو غلق الدارة", "قياس الكتلة", "تلوين الماء", "تسخين المصباح"], ["To open or close the circuit", "To measure mass", "To color water", "To heat the bulb"], 0, "L'interrupteur contrôle le passage du courant.", "القاطع يتحكم في مرور التيار.", "The switch controls current flow.")
  ],
  plante: [
    quizQuestion("Que montre l'expérience de l'eau colorée avec la plante ?", "ماذا تُظهر تجربة الماء الملوّن مع النبات؟", "What does the colored-water plant experiment show?", ["L'eau monte dans la tige", "La plante produit du verre", "La fleur repousse l'eau", "La tige devient métallique"], ["يصعد الماء داخل الساق", "النبات ينتج الزجاج", "الزهرة تطرد الماء", "الساق تصبح معدنية"], ["Water rises through the stem", "The plant makes glass", "The flower rejects water", "The stem becomes metallic"], 0, "La coloration montre le transport de l'eau par les vaisseaux conducteurs.", "التلوّن يوضح انتقال الماء عبر الأوعية الناقلة.", "The coloring shows water transport through conducting vessels."),
    quizQuestion("Quelle partie absorbe principalement l'eau dans une vraie plante ?", "أي جزء يمتص الماء أساسا في النبات الحقيقي؟", "Which part mainly absorbs water in a real plant?", ["Les racines", "Les pétales", "Les graines seulement", "Le fruit"], ["الجذور", "البتلات", "البذور فقط", "الثمرة"], ["The roots", "The petals", "Only the seeds", "The fruit"], 0, "Les racines absorbent l'eau et les sels minéraux.", "تمتص الجذور الماء والأملاح المعدنية.", "Roots absorb water and mineral salts."),
    quizQuestion("Comment appelle-t-on les tubes qui transportent l'eau ?", "كيف نسمي الأنابيب التي تنقل الماء؟", "What are the tubes that carry water called?", ["Vaisseaux conducteurs", "Nerfs électriques", "Cristaux", "Aimants"], ["أوعية ناقلة", "أعصاب كهربائية", "بلورات", "مغناطيسات"], ["Conducting vessels", "Electrical nerves", "Crystals", "Magnets"], 0, "Les vaisseaux conducteurs transportent la sève brute vers les feuilles.", "الأوعية الناقلة تنقل النسغ الخام نحو الأوراق.", "Conducting vessels carry raw sap toward the leaves."),
    quizQuestion("Pourquoi utilise-t-on un colorant ?", "لماذا نستعمل ملوّنا؟", "Why is dye used?", ["Pour rendre le trajet de l'eau visible", "Pour nourrir la plante uniquement", "Pour empêcher l'absorption", "Pour mesurer la masse"], ["لجعل مسار الماء مرئيا", "لتغذية النبات فقط", "لمنع الامتصاص", "لقياس الكتلة"], ["To make the water path visible", "Only to feed the plant", "To prevent absorption", "To measure mass"], 0, "Le colorant permet d'observer le chemin de l'eau.", "يسمح الملوّن بملاحظة مسار الماء.", "The dye lets us observe the path taken by water."),
    quizQuestion("Quelle observation confirme l'absorption ?", "أي ملاحظة تؤكد الامتصاص؟", "Which observation confirms absorption?", ["Les feuilles ou la fleur se colorent", "Le verre disparaît", "La plante devient plus lourde sans eau", "Le colorant reste au fond"], ["تتلوّن الأوراق أو الزهرة", "يختفي الكأس", "يزداد وزن النبات دون ماء", "يبقى الملوّن في القاع"], ["Leaves or the flower become colored", "The glass disappears", "The plant becomes heavier without water", "The dye stays at the bottom"], 0, "La couleur dans la plante prouve que l'eau a circulé.", "ظهور اللون في النبات دليل على انتقال الماء.", "Color in the plant proves water has moved."),
    quizQuestion("Pourquoi faut-il attendre pendant l'expérience ?", "لماذا يجب الانتظار أثناء التجربة؟", "Why is waiting necessary during the experiment?", ["Le transport de l'eau prend du temps", "Le verre doit sécher", "La lampe doit chauffer", "Le colorant doit disparaître"], ["انتقال الماء يحتاج إلى وقت", "يجب أن يجف الكأس", "يجب أن يسخن المصباح", "يجب أن يختفي الملوّن"], ["Water transport takes time", "The glass must dry", "The lamp must heat up", "The dye must disappear"], 0, "L'eau colorée progresse progressivement dans la tige.", "يتقدم الماء الملوّن تدريجيا في الساق.", "Colored water gradually moves through the stem.")
  ],
  masse: [
    quizQuestion("Quel instrument sert à mesurer une masse ?", "ما الأداة المستعملة لقياس الكتلة؟", "Which instrument is used to measure mass?", ["La balance", "Le voltmètre", "Le thermomètre", "La règle"], ["الميزان", "الفولتميتر", "المحرار", "المسطرة"], ["The scale", "The voltmeter", "The thermometer", "The ruler"], 0, "La balance mesure ou compare la masse d'un objet.", "الميزان يقيس أو يقارن كتلة جسم.", "A scale measures or compares an object's mass."),
    quizQuestion("Quelle est l'unité courante de la masse ?", "ما الوحدة الشائعة للكتلة؟", "What is a common unit of mass?", ["Le gramme", "Le volt", "Le litre", "Le degré"], ["الغرام", "الفولت", "اللتر", "الدرجة"], ["Gram", "Volt", "Liter", "Degree"], 0, "Le gramme et le kilogramme sont des unités de masse.", "الغرام والكيلوغرام وحدتان لقياس الكتلة.", "Gram and kilogram are units of mass."),
    quizQuestion("Que faut-il faire avant une mesure précise ?", "ماذا يجب فعله قبل قياس دقيق؟", "What should be done before an accurate measurement?", ["Mettre la balance à zéro", "Mouiller l'objet", "Cacher l'affichage", "Secouer la table"], ["تصفير الميزان", "تبليل الجسم", "إخفاء الشاشة", "هز الطاولة"], ["Set the scale to zero", "Wet the object", "Hide the display", "Shake the table"], 0, "La remise à zéro évite une erreur de mesure.", "التصفير يمنع خطأ في القياس.", "Zeroing prevents a measurement error."),
    quizQuestion("Si le plateau descend, que peut-on conclure ?", "إذا نزلت كفة الميزان، ماذا نستنتج؟", "If one pan goes down, what can we conclude?", ["Ce côté est plus lourd", "Ce côté est plus chaud", "Ce côté est vide", "La masse est nulle"], ["ذلك الجانب أثقل", "ذلك الجانب أسخن", "ذلك الجانب فارغ", "الكتلة منعدمة"], ["That side is heavier", "That side is hotter", "That side is empty", "The mass is zero"], 0, "Dans une balance à plateaux, le côté le plus lourd descend.", "في الميزان ذي الكفتين تنخفض الكفة الأثقل.", "On a balance, the heavier side moves downward."),
    quizQuestion("Quelle relation existe entre 1 kilogramme et les grammes ?", "ما العلاقة بين 1 كيلوغرام والغرامات؟", "What is the relation between 1 kilogram and grams?", ["1 kg = 1000 g", "1 kg = 10 g", "1 kg = 100 g", "1 kg = 1 g"], ["1 كغ = 1000 غ", "1 كغ = 10 غ", "1 كغ = 100 غ", "1 كغ = 1 غ"], ["1 kg = 1000 g", "1 kg = 10 g", "1 kg = 100 g", "1 kg = 1 g"], 0, "Un kilogramme contient mille grammes.", "الكيلوغرام الواحد يساوي ألف غرام.", "One kilogram equals one thousand grams."),
    quizQuestion("Pourquoi note-t-on le résultat avec une unité ?", "لماذا نكتب النتيجة مع الوحدة؟", "Why do we write the result with a unit?", ["Pour donner un sens à la valeur", "Pour décorer la réponse", "Pour cacher le nombre", "Pour changer la masse"], ["لإعطاء معنى للقيمة", "لتزيين الإجابة", "لإخفاء العدد", "لتغيير الكتلة"], ["To give meaning to the value", "To decorate the answer", "To hide the number", "To change the mass"], 0, "Sans unité, le nombre mesuré est incomplet.", "بدون وحدة تكون القيمة المقاسة غير كاملة.", "Without a unit, the measured value is incomplete.")
  ],
  chimie: [
    quizQuestion("Quel gaz est mis en évidence dans cette expérience ?", "أي غاز تبرزه هذه التجربة؟", "Which gas is identified in this experiment?", ["Le dihydrogène", "Le dioxygène", "La vapeur d'eau", "L'azote"], ["ثنائي الهيدروجين", "ثنائي الأكسجين", "بخار الماء", "الآزوت"], ["Hydrogen gas", "Oxygen gas", "Water vapor", "Nitrogen"], 0, "La réaction peut libérer du dihydrogène, un gaz inflammable.", "يمكن أن يحرر التفاعل ثنائي الهيدروجين، وهو غاز قابل للاشتعال.", "The reaction can release hydrogen, a flammable gas."),
    quizQuestion("Quel signe indique souvent la formation d'un gaz ?", "ما العلامة التي تدل غالبا على تشكل غاز؟", "Which sign often indicates gas formation?", ["Des bulles", "Un silence total", "Une masse invisible", "Un fil électrique"], ["فقاعات", "صمت تام", "كتلة غير مرئية", "سلك كهربائي"], ["Bubbles", "Complete silence", "An invisible mass", "An electrical wire"], 0, "Les bulles montrent qu'un gaz se dégage du mélange.", "تدل الفقاعات على انطلاق غاز من الخليط.", "Bubbles show that a gas is being released from the mixture."),
    quizQuestion("Pourquoi faut-il manipuler avec prudence ?", "لماذا يجب التعامل بحذر؟", "Why must we handle the experiment carefully?", ["Certains produits ou gaz peuvent être dangereux", "Le verre devient toujours mou", "L'eau colorée explose toujours", "La balance disparaît"], ["بعض المواد أو الغازات قد تكون خطيرة", "الزجاج يصبح دائما لينا", "الماء الملوّن ينفجر دائما", "الميزان يختفي"], ["Some products or gases may be dangerous", "Glass always becomes soft", "Colored water always explodes", "The scale disappears"], 0, "Les règles de sécurité protègent l'élève pendant les réactions chimiques.", "قواعد السلامة تحمي التلميذ أثناء التفاعلات الكيميائية.", "Safety rules protect the student during chemical reactions."),
    quizQuestion("Quel test simple peut indiquer la présence de dihydrogène ?", "أي اختبار بسيط قد يدل على وجود ثنائي الهيدروجين؟", "Which simple test can indicate hydrogen gas?", ["Une petite détonation avec une flamme", "Une mesure de longueur", "Un changement de police", "Une pesée de la souris"], ["فرقعة صغيرة مع لهب", "قياس طول", "تغيير الخط", "وزن الفأرة"], ["A small pop with a flame", "A length measurement", "A font change", "Weighing the mouse"], 0, "Le dihydrogène produit un petit bruit caractéristique près d'une flamme.", "ينتج ثنائي الهيدروجين صوت فرقعة مميزا قرب اللهب.", "Hydrogen makes a characteristic small pop near a flame."),
    quizQuestion("Que doit-on porter dans un laboratoire réel ?", "ماذا يجب ارتداؤه في مختبر حقيقي؟", "What should be worn in a real lab?", ["Des lunettes de protection", "Des écouteurs uniquement", "Des chaussures de plage", "Aucun équipement"], ["نظارات واقية", "سماعات فقط", "حذاء شاطئ", "لا شيء"], ["Safety goggles", "Only headphones", "Beach shoes", "No equipment"], 0, "Les lunettes protègent les yeux contre les projections.", "النظارات تحمي العينين من الرذاذ.", "Goggles protect the eyes from splashes."),
    quizQuestion("Que signifie observer dans une expérience ?", "ما معنى الملاحظة في تجربة؟", "What does observing mean in an experiment?", ["Décrire ce que l'on voit réellement", "Inventer un résultat", "Fermer les yeux", "Supprimer les étapes"], ["وصف ما نراه فعلا", "اختراع نتيجة", "إغلاق العينين", "حذف الخطوات"], ["Describe what we actually see", "Invent a result", "Close the eyes", "Delete the steps"], 0, "Une observation scientifique doit être fidèle à ce qui se produit.", "يجب أن تكون الملاحظة العلمية مطابقة لما يحدث.", "A scientific observation should match what really happens.")
  ]
};

function quizQuestion(frPrompt, arPrompt, enPrompt, frOptions, arOptions, enOptions, correct, frExplanation, arExplanation, enExplanation) {
  return {
    prompt: { fr: frPrompt, ar: arPrompt, en: enPrompt },
    options: frOptions.map((fr, index) => ({ fr, ar: arOptions[index], en: enOptions[index] })),
    correct,
    explanation: { fr: frExplanation, ar: arExplanation, en: enExplanation }
  };
}

Object.entries(EDUVIRTUEL_QUIZ_BANK).forEach(([experimentId, quiz]) => {
  if (EXPERIMENTS[experimentId]) EXPERIMENTS[experimentId].quiz = quiz;
});

function renderQuizQuestion(state) {
  const stage = document.getElementById("quiz-stage");
  const progress = document.querySelector("[data-quiz-progress]");
  const config = getExperimentConfig(state.experimentId);
  const question = state.questions[state.index];
  if (!stage || !progress || !question) return;
  progress.textContent = getText({
    fr: `Question ${state.index + 1} sur ${state.questions.length}`,
    ar: `السؤال ${state.index + 1} من ${state.questions.length}`,
    en: `Question ${state.index + 1} of ${state.questions.length}`
  });
  stage.innerHTML = `
    <div class="quiz-question">
      <h2>${escapeHtml(getText(question.prompt))}</h2>
      <div class="quiz-options">
        ${question.options.map((option, index) => `<button type="button" class="quiz-option" data-option-index="${index}">${escapeHtml(getText(option))}</button>`).join("")}
      </div>
      <div class="quiz-feedback" id="quiz-feedback">${escapeHtml(getText({
        fr: "Choisissez une réponse pour obtenir un retour immédiat.",
        ar: "اختر إجابة للحصول على ملاحظة فورية.",
        en: "Choose an answer to get instant feedback."
      }))}</div>
    </div>
  `;
  const feedback = document.getElementById("quiz-feedback");
  stage.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.optionIndex);
      const correct = selected === question.correct;
      state.answers.push({ selected, correct, question });
      if (correct) state.score += 1;
      stage.querySelectorAll(".quiz-option").forEach((optionButton) => {
        optionButton.disabled = true;
        const optionIndex = Number(optionButton.dataset.optionIndex);
        if (optionIndex === question.correct) optionButton.classList.add("correct");
        else if (optionIndex === selected && !correct) optionButton.classList.add("wrong");
      });
      feedback.innerHTML = `<strong>${escapeHtml(getText(correct
        ? { fr: "Bonne réponse.", ar: "إجابة صحيحة.", en: "Correct answer." }
        : { fr: "Réponse à revoir.", ar: "إجابة تحتاج إلى مراجعة.", en: "Answer to review." }
      ))}</strong><p>${escapeHtml(getText(question.explanation))}</p>`;
      const nextButton = document.createElement("button");
      nextButton.type = "button";
      nextButton.className = "primary-btn";
      nextButton.textContent = getText(state.index === state.questions.length - 1
        ? { fr: "Voir le résultat final", ar: "عرض النتيجة النهائية", en: "See final result" }
        : { fr: "Question suivante", ar: "السؤال التالي", en: "Next question" }
      );
      nextButton.addEventListener("click", () => {
        state.index += 1;
        if (state.index >= state.questions.length) renderQuizResult(state, config);
        else renderQuizQuestion(state);
      });
      feedback.appendChild(nextButton);
    }, { once: true });
  });
}

function renderQuizResult(state, config) {
  const stage = document.getElementById("quiz-stage");
  const progress = document.querySelector("[data-quiz-progress]");
  if (!stage || !progress) return;
  const finalScore = Math.round((state.score / Math.max(state.questions.length, 1)) * 100);
  const badge = scoreToBadge(finalScore);
  const quizScores = readJson(STORAGE.quizScores, {});
  quizScores[state.experimentId] = finalScore;
  writeJson(STORAGE.quizScores, quizScores);
  progress.textContent = getText({ fr: "Quiz terminé", ar: "تم إنهاء الاختبار", en: "Quiz completed" });
  stage.innerHTML = `
    <div class="quiz-result">
      <h2>${escapeHtml(getText(config.title))}</h2>
      <p>${escapeHtml(getText({
        fr: `Score final : ${finalScore}/100 (${state.score}/${state.questions.length} réponses justes)`,
        ar: `النتيجة النهائية: ${finalScore}/100 (${state.score}/${state.questions.length} إجابات صحيحة)`,
        en: `Final score: ${finalScore}/100 (${state.score}/${state.questions.length} correct answers)`
      }))}</p>
      <p class="result-badge">${escapeHtml(getText(badge))}</p>
      <div class="quiz-review-card">
        <h3>${escapeHtml(getText({ fr: "Mode révision", ar: "وضع المراجعة", en: "Review mode" }))}</h3>
        ${state.answers.map((answer, index) => `
          <div class="quiz-feedback">
            <strong>${escapeHtml(getText({ fr: `Question ${index + 1}`, ar: `السؤال ${index + 1}`, en: `Question ${index + 1}` }))}</strong>
            <p>${escapeHtml(getText(answer.question.prompt))}</p>
            <p>${escapeHtml(getText({
              fr: `Bonne réponse : ${getText(answer.question.options[answer.question.correct])}`,
              ar: `الإجابة الصحيحة: ${getText(answer.question.options[answer.question.correct])}`,
              en: `Correct answer: ${getText(answer.question.options[answer.question.correct])}`
            }))}</p>
            <p>${escapeHtml(getText(answer.question.explanation))}</p>
          </div>
        `).join("")}
      </div>
      <div class="hero-actions">
        <a class="primary-btn" href="dashboard.html">${escapeHtml(getText({ fr: "Retour au tableau de bord", ar: "العودة إلى اللوحة", en: "Back to dashboard" }))}</a>
        <a class="secondary-btn" href="experiences.html">${escapeHtml(getText({ fr: "Retour aux expériences", ar: "العودة إلى التجارب", en: "Back to experiments" }))}</a>
      </div>
    </div>
  `;
}

function initQuizPage() {
  const experimentId = localStorage.getItem(STORAGE.lastExperiment) || "circuit";
  const config = getExperimentConfig(experimentId);
  const questions = Array.isArray(config.quiz) && config.quiz.length ? config.quiz : EDUVIRTUEL_QUIZ_BANK.circuit;
  const title = document.querySelector("[data-quiz-title]");
  if (title) {
    title.textContent = getText({
      fr: `Quiz lié à l'expérience : ${getText(config.title)}.`,
      ar: `اختبار مرتبط بالتجربة: ${getText(config.title)}.`,
      en: `Quiz linked to the experiment: ${getText(config.title)}.`
    });
  }
  renderQuizQuestion({ experimentId, questions, index: 0, score: 0, answers: [] });
}

function initTeacherLogin() {
  const form = document.getElementById("teacher-login-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const username = String(data.get("username") || "").trim();
    const password = String(data.get("password") || "").trim();
    if (username === "admin" && password === "1234") {
      localStorage.setItem(STORAGE.teacherLogged, "true");
      window.location.href = "prof-dashboard.html";
      return;
    }
    alert(getText({ fr: "Identifiants incorrects. Utilisez admin / 1234.", ar: "بيانات غير صحيحة. استعمل admin / 1234." }));
  });
}

function getTeacherRows() {
  const rows = [...DEMO_RECORDS];
  const studentName = localStorage.getItem(STORAGE.studentName);
  const studentClass = localStorage.getItem(STORAGE.studentClass) || "CEM2026";
  const studentLevel = normalizeLevelKey(localStorage.getItem(STORAGE.currentLevel) || "cem");
  const experimentScores = readJson(STORAGE.experimentScores, {});
  const lastResult = readJson(STORAGE.lastResult, null);
  const scoreEntries = Object.entries(experimentScores);
  if (studentName && scoreEntries.length > 0) {
    scoreEntries.forEach(([experimentId, score]) => {
      rows.push({
        studentName,
        classCode: studentClass,
        level: studentLevel,
        experimentId,
        score,
        aiEvaluation: scoreToBadge(score),
        errors: lastResult && lastResult.experimentId === experimentId ? lastResult.errors : [getExperimentConfig(experimentId).defaultTip]
      });
    });
  } else if (studentName && scoreEntries.length === 0) {
    rows.push({
      studentName,
      classCode: studentClass,
      level: studentLevel,
      experimentId: null,
      score: 0,
      aiEvaluation: { fr: "En attente", ar: "في الانتظار" },
      errors: []
    });
  }
  const registeredStudents = readJson(STORAGE.students, []);
  registeredStudents.forEach((student) => {
    const alreadyListed = rows.some((r) => r.studentName === student.name && r.classCode === student.classCode);
    if (!alreadyListed) {
      rows.push({
        studentName: student.name,
        classCode: student.classCode,
        level: normalizeLevelKey(student.level || "cem"),
        experimentId: null,
        score: 0,
        aiEvaluation: { fr: "En attente", ar: "في الانتظار" },
        errors: []
      });
    }
  });
  return rows;
}

function renderTeacherDetail(record) {
  const detail = document.getElementById("student-detail");
  if (!detail) return;
  const levelLabel = LEVEL_LABELS[record.level] || LEVEL_LABELS.cem;
  const levelDisplay = getText(levelLabel);
  const scoreColor = record.score >= 80 ? "#16a34a" : record.score >= 60 ? "#d97706" : "#dc2626";
  if (!record.experimentId) {
    detail.innerHTML = `
      <h3 style="margin:0 0 10px;color:var(--navy)">${escapeHtml(record.studentName)}</h3>
      <div class="detail-stat-grid">
        <div class="detail-stat"><div class="detail-stat-label">${dualText("Classe", "القسم")}</div><div class="detail-stat-value">${escapeHtml(record.classCode)}</div></div>
        <div class="detail-stat"><div class="detail-stat-label">${dualText("Niveau", "المستوى")}</div><div class="detail-stat-value">${escapeHtml(levelDisplay)}</div></div>
      </div>
      <div class="quiz-feedback"><strong>${dualText("Statut", "الحالة")}</strong><p>${dualText("Aucune experience completee pour le moment.", "لا توجد تجربة منجزة حتى الآن.")}</p></div>
    `;
    return;
  }
  const experiment = getExperimentConfig(record.experimentId);
  detail.innerHTML = `
    <h3 style="margin:0 0 10px;color:var(--navy)">${escapeHtml(record.studentName)}</h3>
    <div class="detail-stat-grid">
      <div class="detail-stat"><div class="detail-stat-label">${dualText("Classe", "القسم")}</div><div class="detail-stat-value">${escapeHtml(record.classCode)}</div></div>
      <div class="detail-stat"><div class="detail-stat-label">${dualText("Niveau", "المستوى")}</div><div class="detail-stat-value">${escapeHtml(levelDisplay)}</div></div>
      <div class="detail-stat"><div class="detail-stat-label">${dualText("Score", "النتيجة")}</div><div class="detail-stat-value" style="color:${scoreColor}">${escapeHtml(String(record.score))}%<div class="detail-score-bar"><div class="detail-score-fill" style="width:${record.score}%;background:${scoreColor}"></div></div></div></div>
      <div class="detail-stat"><div class="detail-stat-label">${dualText("Evaluation IA", "التقييم")}</div><div class="detail-stat-value" style="font-size:0.9rem">${escapeHtml(getText(record.aiEvaluation))}</div></div>
    </div>
    <div class="quiz-feedback"><strong>${dualText("Experience", "التجربة")}</strong><p>${escapeHtml(getText(experiment.title))}</p></div>
    <div class="quiz-feedback"><strong>${dualText("Erreurs frequentes", "الأخطاء المتكررة")}</strong><p>${escapeHtml(getText(record.errors[0] || { fr: "Aucune erreur notable.", ar: "لا توجد أخطاء بارزة." }))}</p></div>
    <div class="quiz-feedback"><strong>${dualText("Analyse", "التحليل")}</strong><p>${escapeHtml(getText({ fr: "L'analyse montre une progression utile avec des points de consolidation cibles.", ar: "يظهر التحليل تقدما جيدا مع نقاط محددة تحتاج إلى تدعيم." }))}</p></div>
  `;
}

function renderTeacherInsights(rows) {
  const container = document.getElementById("teacher-insights");
  if (!container) return;
  const scoredRows = rows.filter((row) => row.experimentId);
  const average = scoredRows.length ? Math.round(scoredRows.reduce((sum, row) => sum + row.score, 0) / scoredRows.length) : 0;
  const supportCount = scoredRows.filter((row) => row.score < 70).length;
  const grouped = scoredRows.reduce((map, row) => {
    map[row.experimentId] = map[row.experimentId] || [];
    map[row.experimentId].push(row.score);
    return map;
  }, {});
  let bestExperimentId = "circuit";
  let bestAverage = 0;
  Object.entries(grouped).forEach(([experimentId, values]) => {
    const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
    if (avg > bestAverage) {
      bestAverage = avg;
      bestExperimentId = experimentId;
    }
  });
  const bestExperiment = getExperimentConfig(bestExperimentId);
  container.innerHTML = `
    <div class="insight-item"><h3>${dualText("Moyenne de la classe", "متوسط القسم")}</h3><p>${escapeHtml(getText({ fr: `${average}% de reussite moyenne.`, ar: `${average}% هو متوسط النجاح الحالي.` }))}</p></div>
    <div class="insight-item"><h3>${dualText("Experience la mieux reussie", "أفضل تجربة من حيث النتائج")}</h3><p>${escapeHtml(getText(bestExperiment.title))}</p></div>
    <div class="insight-item"><h3>${dualText("Eleves a accompagner", "التلاميذ الذين يحتاجون دعما")}</h3><p>${escapeHtml(getText({ fr: `${supportCount} eleve(s) ont un score inferieur a 70%.`, ar: `${supportCount} متعلما أو متعلمة حصلوا على أقل من 70%.` }))}</p></div>
  `;
}

function renderTeacherTable(rows) {
  const tableBody = document.getElementById("teacher-table-body");
  if (!tableBody) return;
  tableBody.innerHTML = rows.map((row, index) => {
    const levelLabel = LEVEL_LABELS[row.level] || LEVEL_LABELS.cem;
    const levelDisplay = getText(levelLabel);
    const experimentDisplay = row.experimentId ? getText(getExperimentConfig(row.experimentId).title) : getText({ fr: "Aucune experience", ar: "لا توجد تجربة" });
    const scoreDisplay = row.experimentId ? `${escapeHtml(String(row.score))}%` : "-";
    return `<tr data-row-index="${index}"><td>${escapeHtml(row.studentName)}</td><td>${escapeHtml(row.classCode)}</td><td>${escapeHtml(levelDisplay)}</td><td>${escapeHtml(experimentDisplay)}</td><td>${scoreDisplay}</td><td>${escapeHtml(getText(row.aiEvaluation))}</td></tr>`;
  }).join("");
  tableBody.querySelectorAll("tr").forEach((rowNode) => {
    rowNode.addEventListener("click", () => renderTeacherDetail(rows[Number(rowNode.dataset.rowIndex)]));
  });
  if (rows[0]) renderTeacherDetail(rows[0]);
}

function renderLabCodeList() {
  const list = document.getElementById("lab-code-list");
  if (!list) return;
  const codes = readLabCodes();
  if (!codes.length) {
    list.innerHTML = `
      <div class="empty-card">
        ${dualText("Aucun code cree. Choisissez un niveau et une activite, puis cliquez sur creer.", "لا يوجد رمز بعد. اختر المستوى والنشاط ثم اضغط على إنشاء.")}
      </div>
    `;
    return;
  }
  list.innerHTML = codes.map((item) => {
    const experiment = item.experimentId ? getExperimentConfig(item.experimentId) : null;
    const level = LEVEL_LABELS[item.level] || LEVEL_LABELS.cem;
    const allowedCount = assignmentAllowedExperiments(item).length;
    const lineOne = getAssignmentType(item) === "promo"
      ? `${level.fr} - ${allowedCount} labo(x) autorise(s)`
      : `${level.fr} - ${experiment.title.fr}`;
    const lineTwo = getAssignmentType(item) === "promo"
      ? `${level.ar} - ${allowedCount} مختبر`
      : `${level.ar} - ${experiment.title.ar}`;
    const saveNote = getText({
      fr: "Note importante : donne ce code aux eleves et demande-leur de le sauvegarder. Ils en auront besoin pour rejoindre la classe.",
      ar: "Note importante : sauvegardez ce code. Les eleves en auront besoin pour rejoindre la classe.",
      en: "Important note: give this code to students and ask them to save it. They need it to join the class."
    });
    return `
      <article class="generated-code-card">
        <div>
          <span class="code-value">${escapeHtml(item.code)}</span>
          <p class="code-meta">${escapeHtml(lineOne)}</p>
          <p class="code-meta">${escapeHtml(lineTwo)}</p>
          <p class="code-meta code-save-note">${escapeHtml(saveNote)}</p>
        </div>
        <button type="button" class="secondary-btn" data-copy-code="${escapeHtml(item.code)}">${dualText("Copier", "نسخ")}</button>
      </article>
    `;
  }).join("");
  list.querySelectorAll("[data-copy-code]").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.dataset.copyCode;
      try {
        await navigator.clipboard.writeText(code);
      } catch (error) {
        console.warn("Clipboard unavailable", error);
      }
      button.innerHTML = dualText("Code copie - a garder", "الرمز جاهز", "Code copied - save it");
    });
  });
}

function initLabCodeGenerator() {
  const form = document.getElementById("lab-code-form");
  if (!form) return;
  const typeSelect = form.querySelector('[name="codeType"]');
  const levelSelect = form.querySelector('[name="codeLevel"]');
  const experimentSelect = form.querySelector('[name="codeExperiment"]');
  const promoLabsField = document.getElementById("promo-labs-field");
  const promoLabsGrid = document.getElementById("promo-labs-grid");

  function renderPromoLabOptions() {
    if (!promoLabsGrid) return;
    const level = normalizeLevelKey(levelSelect ? levelSelect.value : "cem");
    const labs = availableLabsForLevel(level);
    promoLabsGrid.innerHTML = labs.map((item, index) => `
      <label class="promo-lab-option">
        <input type="checkbox" name="promoLabs" value="${escapeHtml(item.lab)}" ${index === 0 ? "checked" : ""}>
        <span>
          <strong>${escapeHtml(getText(item.title))}</strong>
          <span>${escapeHtml(getText(item.subject))}</span>
        </span>
      </label>
    `).join("");
  }

  function refreshGeneratorMode() {
    const isPromo = (typeSelect ? typeSelect.value : "single") === "promo";
    const experimentLabel = experimentSelect ? experimentSelect.closest("label") : null;
    if (experimentLabel) experimentLabel.hidden = isPromo;
    if (promoLabsField) promoLabsField.hidden = !isPromo;
  }

  function refreshExperimentOptions() {
    const level = levelSelect ? levelSelect.value : "cem";
    if (!experimentSelect) return;
    [...experimentSelect.options].forEach((option) => {
      const audience = EXPERIMENT_AUDIENCE[option.value];
      option.hidden = audience ? !audience.levels.includes(level) : false;
    });
    const selectedOption = experimentSelect.options[experimentSelect.selectedIndex];
    if (selectedOption && selectedOption.hidden) {
      const firstVisible = [...experimentSelect.options].find((option) => !option.hidden);
      if (firstVisible) experimentSelect.value = firstVisible.value;
    }
  }

  if (levelSelect) levelSelect.addEventListener("change", refreshExperimentOptions);
  if (levelSelect) levelSelect.addEventListener("change", renderPromoLabOptions);
  if (typeSelect) typeSelect.addEventListener("change", refreshGeneratorMode);
  refreshExperimentOptions();
  renderPromoLabOptions();
  refreshGeneratorMode();
  renderLabCodeList();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const codeType = String(data.get("codeType") || "single");
    const level = normalizeLevelKey(String(data.get("codeLevel") || "cem"));
    const experimentId = String(data.get("codeExperiment") || "plante");
    const selectedPromoLabs = data.getAll("promoLabs").map((value) => String(value));
    const audience = EXPERIMENT_AUDIENCE[experimentId];
    if (codeType === "single" && audience && !audience.levels.includes(level)) {
      alert(getText({ fr: "Cette activite ne correspond pas a ce niveau.", ar: "هذا النشاط لا يناسب هذا المستوى." }));
      return;
    }
    if (codeType === "promo" && !selectedPromoLabs.length) {
      alert(getText({
        fr: "Choisissez au moins un laboratoire pour le code promo.",
        ar: "اختر مختبرا واحدا على الأقل للرمز.",
        en: "Choose at least one lab for the promo code."
      }));
      return;
    }
    const primaryExperimentId = codeType === "promo" ? selectedPromoLabs[0] : experimentId;
    const subject = subjectForExperiment(primaryExperimentId, level);
    const code = createReadableLabCode(level, codeType === "promo" ? "PRO" : experimentId);
    const codes = readLabCodes();
    const nextCode = {
      code,
      level,
      type: codeType,
      subjectId: subject ? subject.id : "",
      createdAt: new Date().toISOString()
    };
    if (codeType === "promo") nextCode.allowedExperiments = selectedPromoLabs;
    else nextCode.experimentId = experimentId;
    codes.unshift(nextCode);
    writeLabCodes(codes.slice(0, 12));
    renderLabCodeList();
    alert(getText({
      fr: `Code cree : ${code}. Important : sauvegardez ce code et donnez-le aux eleves. Ils devront l'utiliser pour rejoindre la classe.`,
      ar: `Code cree : ${code}. Important : sauvegardez ce code et donnez-le aux eleves.`,
      en: `Code created: ${code}. Important: save this code and give it to students. They will use it to join the class.`
    }));
  });
}

function updateTeacherStats(rows) {
  const statTotal = document.getElementById("stat-total");
  const statAvg = document.getElementById("stat-avg");
  const statExp = document.getElementById("stat-exp");
  const statCodes = document.getElementById("stat-codes");
  const uniqueStudents = new Set(rows.map((r) => r.studentName)).size;
  const scoredRows = rows.filter((r) => r.experimentId && r.score > 0);
  const avg = scoredRows.length ? Math.round(scoredRows.reduce((s, r) => s + r.score, 0) / scoredRows.length) : 0;
  const codes = readLabCodes();
  if (statTotal) statTotal.textContent = uniqueStudents;
  if (statAvg) statAvg.textContent = scoredRows.length ? `${avg}%` : "-";
  if (statExp) statExp.textContent = scoredRows.length;
  if (statCodes) statCodes.textContent = codes.length;
}

function initTeacherDashboard() {
  if (localStorage.getItem(STORAGE.teacherLogged) !== "true") return (window.location.href = "prof-login.html");
  const rows = getTeacherRows();
  let descending = true;
  const filterInput = document.getElementById("class-filter");
  const sortButton = document.getElementById("sort-score-btn");

  function applyFilters() {
    const query = filterInput ? filterInput.value.trim().toLowerCase() : "";
    let filtered = rows.filter((row) => row.classCode.toLowerCase().includes(query));
    filtered = filtered.sort((a, b) => descending ? b.score - a.score : a.score - b.score);
    renderTeacherTable(filtered);
    renderTeacherInsights(filtered);
    updateTeacherStats(rows);
  }

  if (filterInput) filterInput.addEventListener("input", applyFilters);
  if (sortButton) sortButton.addEventListener("click", () => {
    descending = !descending;
    applyFilters();
  });
  initLabCodeGenerator();
  applyFilters();
}

Object.keys(SUBJECTS).forEach((key) => {
  delete SUBJECTS[key];
});
Object.assign(SUBJECTS, {
  primaire: [
    { id: "science-education", fr: "Education scientifique", ar: "التربية العلمية", en: "Science education" }
  ],
  primary: [
    { id: "science-education", fr: "Education scientifique", ar: "التربية العلمية", en: "Science education" }
  ],
  cem: [
    { id: "natural-sciences", fr: "Sciences naturelles", ar: "علوم الطبيعة", en: "Natural sciences" },
    { id: "physics", fr: "Physique", ar: "الفيزياء", en: "Physics" }
  ],
  lycee: [
    { id: "physics-chemistry", fr: "Physique", ar: "الفيزياء", en: "Physics" },
    { id: "organic-chemistry", fr: "Chimie", ar: "الكيمياء", en: "Chemistry" }
  ]
});

Object.assign(LEVEL_LABELS, {
  primaire: { fr: "Primaire", ar: "ابتدائي", en: "Primary school" },
  primary: { fr: "Primaire", ar: "ابتدائي", en: "Primary school" },
  cem: { fr: "CEM", ar: "التعليم المتوسط", en: "Middle school" },
  lycee: { fr: "Lycee", ar: "ثانوي", en: "High school" }
});

Object.keys(SUBJECT_HINTS).forEach((key) => {
  delete SUBJECT_HINTS[key];
});
Object.assign(SUBJECT_HINTS, {
  "science-education": {
    fr: "Une experience simple pour observer la nature.",
    ar: "تجربة بسيطة لملاحظة الطبيعة.",
    en: "A simple experiment to observe nature."
  },
  physics: {
    fr: "Une activite claire pour comprendre les circuits.",
    ar: "نشاط واضح لفهم الدوائر الكهربائية.",
    en: "A clear activity to understand circuits."
  },
  "natural-sciences": {
    fr: "Observation des plantes et de l'eau au niveau CEM.",
    ar: "ملاحظة النباتات والماء لمستوى CEM.",
    en: "Observe plants and water at the CEM level."
  },
  "physics-chemistry": {
    fr: "Une experience de physique au niveau lycee.",
    ar: "تجربة فيزياء لمستوى الثانوي.",
    en: "A high school physics experiment."
  },
  "organic-chemistry": {
    fr: "Une experience de chimie avec etapes de securite.",
    ar: "تجربة كيمياء مع خطوات السلامة.",
    en: "A chemistry experiment with safety steps."
  }
});

Object.keys(EXPERIMENT_AUDIENCE).forEach((key) => {
  delete EXPERIMENT_AUDIENCE[key];
});
Object.assign(EXPERIMENT_AUDIENCE, {
  plante: { levels: ["primaire", "primary"], subjects: ["science-education"] },
  circuit: { levels: ["cem"], subjects: ["physics"] },
  masse: { levels: ["lycee"], subjects: ["physics-chemistry"] },
  chimie: { levels: ["lycee"], subjects: ["organic-chemistry"] }
});

Object.assign(LEVEL_META, {
  primaire: { accent: "#3fa95c", icons: "📚🌱☀️", className: "level-primary" },
  cem: { accent: "#2588e8", icons: "🔬⚡📘", className: "level-cem" },
  lycee: { accent: "#1f4d8f", icons: "🧪📐🎓", className: "level-lycee" }
});

Object.keys(SUBJECT_ICONS).forEach((key) => {
  delete SUBJECT_ICONS[key];
});
Object.assign(SUBJECT_ICONS, {
  "science-education": "🌱",
  "natural-sciences": "🌿",
  physics: "⚡",
  "physics-chemistry": "⚖️",
  "organic-chemistry": "⚗️"
});

Object.keys(LEVEL_EXPERIENCES).forEach((key) => {
  delete LEVEL_EXPERIENCES[key];
});
Object.assign(LEVEL_EXPERIENCES, {
  primaire: [
    {
      id: "prim-01",
      status: "available",
      icon: "🌱",
      lab: "plante",
      subjectId: "science-education",
      subject: { fr: "Education scientifique", ar: "التربية العلمية", en: "Science education" },
      title: { fr: "Absorption de l'eau par la plante", ar: "امتصاص الماء عند النبات", en: "Water absorption by plants" },
      description: {
        fr: "Observe comment la plante absorbe l'eau et la transporte vers les feuilles.",
        ar: "لاحظ كيف يمتص النبات الماء وينقله نحو الأوراق.",
        en: "Observe how the plant absorbs water and carries it to the leaves."
      }
    }
  ],
  primary: [],
  cem: [
    {
      id: "cem-01",
      status: "available",
      icon: "⚡",
      lab: "circuit",
      subjectId: "physics",
      subject: { fr: "Physique", ar: "الفيزياء", en: "Physics" },
      title: { fr: "Circuit electrique simple", ar: "الدائرة الكهربائية البسيطة", en: "Simple electrical circuit" },
      description: {
        fr: "Monte une pile, une lampe et des fils pour comprendre le trajet du courant.",
        ar: "ركب بطارية ومصباحا وأسلاكا لفهم مسار التيار الكهربائي.",
        en: "Assemble a battery, a lamp, and wires to understand the path of electric current."
      }
    }
  ],
  lycee: [
    {
      id: "lyc-01",
      status: "available",
      icon: "⚖️",
      lab: "masse",
      subjectId: "physics-chemistry",
      subject: { fr: "Physique", ar: "الفيزياء", en: "Physics" },
      title: { fr: "Mesure d'une masse", ar: "قياس الكتلة", en: "Mass measurement" },
      description: {
        fr: "Utilise une balance pour determiner la masse d'un objet avec precision.",
        ar: "استعمل ميزانا لتحديد كتلة جسم بدقة.",
        en: "Use a balance to determine the mass of an object accurately."
      }
    },
    {
      id: "lyc-02",
      status: "available",
      icon: "⚗️",
      lab: "chimie",
      subjectId: "organic-chemistry",
      subject: { fr: "Chimie", ar: "الكيمياء", en: "Chemistry" },
      title: { fr: "Reaction chimique : production d'hydrogene", ar: "تفاعل كيميائي: إنتاج الهيدروجين", en: "Chemical reaction: hydrogen production" },
      description: {
        fr: "Observe la reaction entre le zinc et l'acide chlorhydrique avec rappel des regles de securite.",
        ar: "لاحظ التفاعل بين الزنك وحمض كلور الماء مع التذكير بقواعد السلامة.",
        en: "Observe the reaction between zinc and hydrochloric acid with safety guidance."
      }
    }
  ]
});

Object.assign(EXPERIMENT_AUDIENCE, {
  plante: { levels: ["cem"], subjects: ["natural-sciences"] },
  circuit: { levels: ["primaire", "primary"], subjects: ["science-education"] },
  masse: { levels: ["lycee"], subjects: ["physics-chemistry"] },
  chimie: { levels: ["lycee"], subjects: ["organic-chemistry"] }
});

LEVEL_EXPERIENCES.primaire = [
  {
    id: "prim-01",
    status: "available",
    icon: "⚡",
    lab: "circuit",
    subjectId: "science-education",
    subject: { fr: "Education scientifique", ar: "التربية العلمية", en: "Science education" },
    title: { fr: "Circuit electrique simple", ar: "الدائرة الكهربائية البسيطة", en: "Simple electrical circuit" },
    description: {
      fr: "Monte une pile, une lampe et des fils pour comprendre le trajet du courant.",
      ar: "ركب بطارية ومصباحا وأسلاكا لفهم مسار التيار الكهربائي.",
      en: "Assemble a battery, a lamp, and wires to understand the path of electric current."
    }
  }
];
LEVEL_EXPERIENCES.primary = [];
LEVEL_EXPERIENCES.cem = [
  {
    id: "cem-01",
    status: "available",
    icon: "🌱",
    lab: "plante",
    subjectId: "natural-sciences",
    subject: { fr: "Sciences naturelles", ar: "علوم الطبيعة", en: "Natural sciences" },
    title: { fr: "Absorption de l'eau par la plante", ar: "امتصاص الماء عند النبات", en: "Water absorption by plants" },
    description: {
      fr: "Observe comment la plante absorbe l'eau et la transporte vers les feuilles.",
      ar: "لاحظ كيف يمتص النبات الماء وينقله نحو الأوراق.",
      en: "Observe how the plant absorbs water and carries it to the leaves."
    }
  }
];
LEVEL_EXPERIENCES.lycee = [
  {
    id: "lyc-01",
    status: "available",
    icon: "⚖️",
    lab: "masse",
    subjectId: "physics-chemistry",
    subject: { fr: "Physique", ar: "الفيزياء", en: "Physics" },
    title: { fr: "Mesure d'une masse", ar: "قياس الكتلة", en: "Mass measurement" },
    description: {
      fr: "Utilise une balance pour determiner la masse d'un objet avec precision.",
      ar: "استعمل ميزانا لتحديد كتلة جسم بدقة.",
      en: "Use a balance to determine the mass of an object accurately."
    }
  },
  {
    id: "lyc-02",
    status: "available",
    icon: "⚗️",
    lab: "chimie",
    subjectId: "organic-chemistry",
    subject: { fr: "Chimie", ar: "الكيمياء", en: "Chemistry" },
    title: { fr: "Reaction chimique : production d'hydrogene", ar: "تفاعل كيميائي: إنتاج الهيدروجين", en: "Chemical reaction: hydrogen production" },
    description: {
      fr: "Observe la reaction entre le zinc et l'acide chlorhydrique avec rappel des regles de securite.",
      ar: "لاحظ التفاعل بين الزنك وحمض كلور الماء مع التذكير بقواعد السلامة.",
      en: "Observe the reaction between zinc and hydrochloric acid with safety guidance."
    }
  }
];

function assistantIntro(experimentId) {
  const config = getExperimentConfig(experimentId);
  return getText({
    fr: `Posez une question sur ${config.title.fr}. Je peux expliquer l'objectif, les etapes, les erreurs frequentes et le resultat.`,
    ar: `اطرح سؤالك حول ${config.title.ar}. يمكنني شرح الهدف والخطوات والأخطاء الشائعة والنتيجة بطريقة تعليمية.`
  });
}

function assistantStorageKey(experimentId) {
  return `eduvirtuel-chat:${experimentId || "general"}:${currentLanguage()}`;
}

function loadAssistantHistory(experimentId) {
  try {
    const raw = sessionStorage.getItem(assistantStorageKey(experimentId));
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry) => entry && typeof entry.role === "string" && typeof entry.text === "string")
      .slice(-12);
  } catch {
    return [];
  }
}

function saveAssistantHistory(experimentId, history) {
  try {
    sessionStorage.setItem(assistantStorageKey(experimentId), JSON.stringify(history.slice(-12)));
  } catch {
    // Keep chat usable even if storage is unavailable.
  }
}

function getAssistantPlaceholder() {
  return currentLanguage() === "ar"
    ? "اسأل عن التجربة أو الخطوات أو النتيجة"
    : currentLanguage() === "en"
      ? "Ask about the experiment, steps, or result"
      : "Posez une question sur l'experience ou les etapes";
}

function setAssistantBusyState(scope, busy) {
  if (!scope) return;
  const input = scope.querySelector("[data-assistant-input]") || document.getElementById("assistant-widget-input");
  const submit = scope.querySelector('button[type="submit"]');
  if (input) input.disabled = busy;
  if (submit) submit.disabled = busy;
  if (scope.dataset) scope.dataset.assistantBusy = busy ? "1" : "0";
}

function appendAssistantTyping(container) {
  const message = document.createElement("div");
  message.className = "assistant-message bot assistant-typing";
  message.innerHTML = "<span></span><span></span><span></span>";
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
  return message;
}

async function requestAssistantReply(message, experimentId, history) {
  const lab = getLabDetails(experimentId);
  const config = getExperimentConfig(experimentId);
  const lang = currentLanguage();
  const currentStep = currentIncompleteStep();
  const stepHint = currentStepHint(experimentId);
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      history,
      lang,
      labName: getText(lab.name),
      experimentId,
      experimentTitle: getText(config.title),
      experimentSubject: getText(config.subject),
      experimentIntro: getText(config.intro),
      experimentHelp: getText(config.help),
      experimentError: getText(config.error),
      experimentSuccess: getText(config.success),
      currentStep,
      currentStepHint: stepHint
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof data.error === "string" ? data.error : "Chat request failed.");
  }
  if (!data.reply || typeof data.reply !== "string") {
    throw new Error("Empty assistant reply.");
  }
  return data.reply.trim();
}

function getAssistantErrorMessage() {
  return getText({
    fr: "Le service de chat est indisponible pour le moment. Verifiez GEMINI_API_KEY ou reessayez dans un instant.",
    ar: "خدمة المحادثة غير متاحة الآن. تحقق من GEMINI_API_KEY أو أعد المحاولة بعد قليل."
  });
}

function assistantGreeting(experimentId) {
  const config = getExperimentConfig(experimentId);
  const lab = getLabDetails(experimentId);
  return getText({
    fr: `Bonjour. Je peux vous guider dans ${config.title.fr}. Ce parcours est relie a ${lab.name.fr}.`,
    ar: `مرحبا. يمكنني مساعدتك في تجربة ${config.title.ar}. هذا المسار مرتبط بـ ${lab.name.ar}.`
  });
}

function getAssistantReply(input, experimentId) {
  const normalized = input.trim().toLowerCase();
  const config = getExperimentConfig(experimentId);
  const lab = getLabDetails(experimentId);
  if (!normalized) return getText(assistantFallback());
  const greetingWords = ["hello", "hi", "bonjour", "salut", "مرحبا", "السلام", "salam"];
  const helpWords = ["help", "aide", "مساعدة"];
  const nextWords = ["next", "suivant", "التالي"];
  const errorWords = ["error", "wrong", "erreur", "خطأ"];
  const objectiveWords = ["objectif", "goal", "objective", "هدف"];
  const labWords = ["lab", "labo", "laboratoire", "مختبر"];
  const quizWords = ["quiz", "test", "اختبار"];
  const finishWords = ["finish", "terminer", "end", "انهاء", "إنهاء"];
  if (greetingWords.some((word) => normalized.includes(word))) return assistantGreeting(experimentId);
  if (helpWords.some((word) => normalized.includes(word))) return getText(config.help);
  if (objectiveWords.some((word) => normalized.includes(word))) return getText(config.intro);
  if (nextWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: `${config.next.fr} Et maintenant : ${currentStepHint(experimentId)}`,
      ar: `${config.next.ar} والخطوة الحالية هي: ${currentStepHint(experimentId)}`
    });
  }
  if (errorWords.some((word) => normalized.includes(word))) return getText(config.error);
  if (labWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: `${lab.summary.fr} Ouvrez-le en grand si vous voulez travailler plus confortablement.`,
      ar: `${lab.summary.ar} ويمكنك فتحه بحجم كبير إذا أردت العمل براحة أكبر.`
    });
  }
  if (quizWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: "Quand vous avez termine la manipulation, cliquez sur le bouton de fin. Le quiz apparait ensuite avec 5 questions simples.",
      ar: "عندما تنهي التجربة اضغط على زر الإنهاء. بعد ذلك يظهر الاختبار وفيه 5 أسئلة بسيطة."
    });
  }
  if (finishWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: "Validez les etapes que vous avez faites, puis utilisez le bouton de fin sous le labo pour passer au resultat.",
      ar: "أكد الخطوات التي أنجزتها ثم استعمل زر الإنهاء الموجود تحت المختبر للانتقال إلى النتيجة."
    });
  }
  return getText({
    fr: `Je peux vous aider sur l'objectif, l'etape suivante, les erreurs frequentes ou le quiz de ${config.title.fr}.`,
    ar: `يمكنني مساعدتك في الهدف والخطوة التالية والأخطاء الشائعة أو اختبار ${config.title.ar}.`
  });
}

function appendAssistantMessage(container, text, role) {
  const message = document.createElement("div");
  message.className = `assistant-message ${role}`;
  message.textContent = text;
  container.appendChild(message);
  container.scrollTop = container.scrollHeight;
  return message;
}

function createAssistantWidget() {
  if (isExperimentPage()) return;
  const root = document.getElementById("assistant-root");
  if (!root) return;
  root.innerHTML = `
    <div class="assistant-widget">
      <div class="assistant-popover" id="assistant-popover">
        <div class="assistant-header">
          <div>
            <h2>${dualText("Assistant EduVirtuel", "مساعد EduVirtuel")}</h2>
            <p>${dualText("Assistant educatif pour les experiences et les lecons.", "مساعد تعليمي للتجارب والدروس.")}</p>
          </div>
        </div>
        <div class="assistant-messages" id="assistant-widget-messages"></div>
        ${buildAssistantQuickActions()}
        <form class="assistant-form" id="assistant-widget-form">
          <input type="text" id="assistant-widget-input" data-assistant-input data-placeholder-fr="Posez une question sur l'experience ou les etapes" data-placeholder-ar="اسأل عن التجربة أو الخطوات أو النتيجة" data-placeholder-en="Ask about the experiment, steps, or result">
          <button type="submit" class="primary-btn">${dualText("Envoyer", "إرسال")}</button>
        </form>
      </div>
      <button class="assistant-launcher" id="assistant-launcher" type="button">
        <span>AI</span>
        <span>${dualText("Assistant EduVirtuel", "مساعد EduVirtuel")}</span>
      </button>
    </div>
  `;

  const popover = document.getElementById("assistant-popover");
  const launcher = document.getElementById("assistant-launcher");
  const form = document.getElementById("assistant-widget-form");
  const input = document.getElementById("assistant-widget-input");
  const messages = document.getElementById("assistant-widget-messages");
  if (!popover || !launcher || !form || !input || !messages) return;
  const experimentId = currentExperimentContextId();
  const history = loadAssistantHistory(experimentId);

  input.placeholder = getAssistantPlaceholder();
  if (history.length) {
    history.forEach((entry) => appendAssistantMessage(messages, entry.text, entry.role === "assistant" ? "bot" : "user"));
  } else {
    appendAssistantMessage(messages, assistantGreeting(experimentId), "bot");
    appendAssistantMessage(messages, assistantIntro(experimentId), "bot");
  }

  launcher.addEventListener("click", () => {
    popover.classList.toggle("open");
    if (popover.classList.contains("open")) input.focus();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    appendAssistantMessage(messages, value, "user");
    input.value = "";
    const typing = appendAssistantTyping(messages);
    setAssistantBusyState(popover, true);

    history.push({ role: "user", text: value });
    saveAssistantHistory(experimentId, history);

    try {
      const reply = await requestAssistantReply(value, experimentId, history.slice(-8));
      typing.remove();
      appendAssistantMessage(messages, reply, "bot");
      history.push({ role: "assistant", text: reply });
      saveAssistantHistory(experimentId, history);
    } catch {
      typing.remove();
      const fallbackReply = getAssistantReply(value, experimentId) || getAssistantErrorMessage();
      appendAssistantMessage(messages, fallbackReply, "bot");
      history.push({ role: "assistant", text: fallbackReply });
      saveAssistantHistory(experimentId, history);
    } finally {
      setAssistantBusyState(popover, false);
    }
  });

  root.querySelectorAll("[data-assistant-shortcut]").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = shortcutQuestion(button);
      form.dispatchEvent(new Event("submit"));
    });
  });
}

function bindEmbeddedAssistant(experimentId) {
  const form = document.querySelector("[data-assistant-form]");
  const input = document.querySelector("[data-assistant-input]");
  const messages = document.querySelector("[data-assistant-messages]");
  const scope = form ? (form.closest(".assistant-panel") || form.parentElement) : null;
  if (!form || !input || !messages || !scope) return;
  const history = loadAssistantHistory(experimentId);
  input.placeholder = getAssistantPlaceholder();

  if (history.length) {
    history.forEach((entry) => appendAssistantMessage(messages, entry.text, entry.role === "assistant" ? "bot" : "user"));
  } else {
    appendAssistantMessage(messages, assistantGreeting(experimentId), "bot");
    appendAssistantMessage(messages, getText(getLabDetails(experimentId).summary), "bot");
    appendAssistantMessage(messages, assistantIntro(experimentId), "bot");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    appendAssistantMessage(messages, value, "user");
    input.value = "";
    const typing = appendAssistantTyping(messages);
    setAssistantBusyState(scope, true);

    history.push({ role: "user", text: value });
    saveAssistantHistory(experimentId, history);

    try {
      const reply = await requestAssistantReply(value, experimentId, history.slice(-8));
      typing.remove();
      appendAssistantMessage(messages, reply, "bot");
      history.push({ role: "assistant", text: reply });
      saveAssistantHistory(experimentId, history);
    } catch {
      typing.remove();
      const fallbackReply = getAssistantReply(value, experimentId) || getAssistantErrorMessage();
      appendAssistantMessage(messages, fallbackReply, "bot");
      history.push({ role: "assistant", text: fallbackReply });
      saveAssistantHistory(experimentId, history);
    } finally {
      setAssistantBusyState(scope, false);
    }
  });

  scope.querySelectorAll("[data-assistant-shortcut]").forEach((button) => {
    button.addEventListener("click", () => {
      input.value = shortcutQuestion(button);
      form.dispatchEvent(new Event("submit"));
    });
  });
}

function experienceHeroText(level, count) {
  const label = LEVEL_LABELS[level] || LEVEL_LABELS.cem;
  return {
    fr: `${count} experience(s) pour ${label.fr}.`,
    ar: `${count} تجربة مناسبة لـ ${label.ar}.`,
    en: `${count} experiment(s) for ${label.en}.`
  };
}

function renderExperienceCard(item, level, available) {
  const meta = LEVEL_META[level] || LEVEL_META.cem;
  const title = item.title || { fr: "", ar: "", en: "" };
  const description = item.description || {
    fr: "Bientot disponible",
    ar: "قريبا",
    en: "Coming soon"
  };

  if (!available) {
    return `
      <article class="experiment-card level-experience-card coming-soon-card" aria-disabled="true">
        <div class="experience-art locked-art"><span aria-hidden="true">🔒</span></div>
        <h2>${escapeHtml(getText(title))}</h2>
        <span class="badge badge-muted">${escapeHtml(getText({ fr: "Bientot disponible", ar: "قريبا", en: "Coming soon" }))}</span>
      </article>
    `;
  }

  const visual = item.visual || item.icon || "🔬";
  return `
    <article class="experiment-card level-experience-card available-card" style="--level-accent:${meta.accent}">
      <div class="experience-art science-photo ${meta.className}">
        <span aria-hidden="true">${escapeHtml(visual)}</span>
      </div>
      <span class="badge subject-badge">${escapeHtml(getText(item.subject || { fr: "Sciences", ar: "العلوم", en: "Science" }))}</span>
      <h2>${localizedTextMarkup(title, "trilingual-card-title")}</h2>
      <p>${escapeHtml(getText(description))}</p>
      <div class="stars" aria-hidden="true">★★★</div>
      <button type="button" class="primary-btn" data-start-lab="${escapeHtml(item.lab || "circuit")}">
        <span aria-hidden="true">🚀</span>
        ${escapeHtml(getText({ fr: "Commencer", ar: "ابدأ", en: "Start" }))}
      </button>
    </article>
  `;
}

function renderLevelExperiencePage(level, list) {
  const lang = currentLanguage();
  const meta = LEVEL_META[level] || LEVEL_META.cem;
  const label = LEVEL_LABELS[level] || LEVEL_LABELS.cem;
  const grid = document.getElementById("experiment-grid");
  const banner = document.querySelector("[data-level-banner]");
  const title = document.querySelector("[data-level-title]");
  const icon = document.querySelector("[data-level-icon]");
  const backIcon = document.querySelector("[data-back-icon]");

  document.body.dataset.level = level;
  if (banner) {
    banner.style.setProperty("--level-accent", meta.accent);
    banner.classList.remove("level-primary", "level-cem", "level-lycee");
    banner.classList.add(meta.className);
  }
  if (title) title.innerHTML = localizedTextMarkup(label, "level-title-line");
  if (icon) icon.textContent = meta.icons;
  if (backIcon) backIcon.textContent = lang === "ar" ? "→" : "←";
  if (!grid) return;

  const available = list.filter((item) => item.status === "available");
  if (!available.length) {
    grid.innerHTML = `
      <article class="experiment-card level-experience-card empty-experience-card">
        <div class="experience-art">📘</div>
        <h2>${escapeHtml(getText({ fr: "Aucune experience disponible", ar: "لا توجد تجربة متاحة", en: "No available experiment" }))}</h2>
        <p>${escapeHtml(getText({
          fr: "Choisissez une autre matiere ou revenez au tableau de bord.",
          ar: "اختر مادة أخرى أو ارجع إلى لوحة التحكم.",
          en: "Choose another subject or go back to the dashboard."
        }))}</p>
      </article>
    `;
    return;
  }

  grid.innerHTML = available.map((item) => renderExperienceCard(item, level, true)).join("");
  
  grid.innerHTML += `
    <article class="experiment-card level-experience-card coming-soon-card" aria-disabled="true">
      <div class="experience-meta">
        <span class="experience-category">${escapeHtml(getText({ fr: "Plus d'expériences", ar: "تجارب أخرى", en: "More experiments" }))}</span>
        <span class="experience-status"><span class="status-dot"></span>${escapeHtml(getText({ fr: "Bientôt disponible", ar: "قريباً", en: "Coming soon" }))}</span>
      </div>
      <div class="experience-art">⏳</div>
      <h2>${escapeHtml(getText({ fr: "Autres expériences", ar: "تجارب قادمة", en: "Other experiments" }))}</h2>
      <p>${escapeHtml(getText({ fr: "De nouvelles expériences arrivent bientôt pour cette matière.", ar: "تجارب جديدة قادمة قريباً لهذه المادة.", en: "New experiments are coming soon for this subject." }))}</p>
    </article>
  `;

  grid.querySelectorAll("[data-start-lab]").forEach((button) => {
    button.addEventListener("click", () => {
      const lab = button.dataset.startLab;
      localStorage.setItem(STORAGE.lastExperiment, lab);
      window.location.href = `${lab}.html`;
    });
  });
}

function initLevelExperiences() {
  const summary = document.querySelector("[data-experiences-summary]");
  if (!summary) return;
  const params = new URLSearchParams(window.location.search);
  const assignment = findLabCodeAssignment(params.get("code")) || getActiveLabAssignment();
  const level = normalizeLevelKey(assignment ? assignment.level : (params.get("level") || localStorage.getItem(STORAGE.currentLevel) || "cem"));
  let subject = parseSavedSubject();
  const subjectId = assignment
    ? (params.get("subject") || subject?.id || defaultSubjectForAssignment(assignment)?.id || "")
    : params.get("subject");
  if (subjectId) subject = (SUBJECTS[level] || []).find((item) => item.id === subjectId) || subject;
  if (!subject) subject = defaultSubjectForAssignment(assignment) || (SUBJECTS[level] || [])[0] || { fr: "Physique", ar: "Physics", en: "Physics" };

  localStorage.setItem(STORAGE.currentLevel, level);
  localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
  if (assignment) localStorage.setItem(STORAGE.activeLabCode, assignment.code);

  const selectedSubjectId = subject.id || subjectId || "";
  const list = assignment
    ? (LEVEL_EXPERIENCES[level] || []).filter((item) => assignmentAllowsExperiment(assignment, item.lab) && (!selectedSubjectId || item.subjectId === selectedSubjectId))
    : (LEVEL_EXPERIENCES[level] || []).filter((item) => !selectedSubjectId || item.subjectId === selectedSubjectId);

  renderLevelExperiencePage(level, list);

  if (assignment && getAssignmentType(assignment) === "single") {
    const experiment = getExperimentConfig(assignment.experimentId);
    summary.innerHTML = dualText(
      `Code ${assignment.code} : une seule activite assignee par le professeur, ${experiment.title.fr}.`,
      `Code ${assignment.code}: one teacher activity, ${experiment.title.en || experiment.title.fr}.`,
      `Code ${assignment.code}: one activity assigned by the teacher, ${experiment.title.en || experiment.title.fr}.`
    );
  } else if (assignment) {
    const labCount = assignmentAllowedExperiments(assignment).length;
    summary.innerHTML = dualText(
      `Code ${assignment.code} : ${labCount} activite(s) autorisee(s) pour ${LEVEL_LABELS[level].fr}.`,
      `Code ${assignment.code}: ${labCount} available activit(ies) for ${LEVEL_LABELS[level].en || LEVEL_LABELS[level].fr}.`,
      `Code ${assignment.code}: ${labCount} allowed activity(ies) for ${LEVEL_LABELS[level].en}.`
    );
  } else {
    summary.innerHTML = dualText(
      `Voici ${list.length} experience(s) pour ${LEVEL_LABELS[level].fr} - ${subject.fr}.`,
      `Here are ${list.length} experiments for ${LEVEL_LABELS[level].en || LEVEL_LABELS[level].fr} - ${subject.en || subject.fr}.`,
      `Here are ${list.length} experiment(s) for ${LEVEL_LABELS[level].en} - ${subject.en || subject.fr}.`
    );
  }
}

function applyPageTitles() {
  const titles = {
    index: "EduVirtuel - Accueil",
    student: "EduVirtuel - Eleve",
    dashboard: "EduVirtuel - Tableau de bord",
    experiences: "EduVirtuel - Experiences",
    experiment: "EduVirtuel - Experience",
    result: "EduVirtuel - Resultat",
    quiz: "EduVirtuel - Quiz",
    "teacher-login": "EduVirtuel - Connexion enseignant",
    "teacher-dashboard": "EduVirtuel - Espace enseignant",
    "admin-dashboard": "EduVirtuel - Admin"
  };
  const pageId = document.body.dataset.page;
  if (pageId && titles[pageId]) document.title = titles[pageId];
}

function updateStudentBadge() {
  const teacherLogged = localStorage.getItem(STORAGE.teacherLogged) === "true";
  const adminLogged = localStorage.getItem(STORAGE.adminLogged) === "true";
  const studentName = localStorage.getItem(STORAGE.studentName) || "";
  const hasSession = teacherLogged || adminLogged || Boolean(studentName);
  const target = document.querySelector("[data-student-display]");
  document.querySelectorAll(".logout-btn").forEach((button) => {
    button.style.display = hasSession ? "inline-flex" : "none";
    button.setAttribute("aria-hidden", hasSession ? "false" : "true");
  });
  if (!target) return;
  if (document.body.dataset.page === "admin-dashboard") {
    target.textContent = "Admin";
    return;
  }
  if (adminLogged) {
    target.textContent = "Admin";
    return;
  }
  if (teacherLogged) {
    target.textContent = localStorage.getItem(STORAGE.currentTeacher) || "Espace enseignant";
    return;
  }
  target.textContent = studentName || "Profil prive";
}

function initStudentForm() {
  const form = document.getElementById("student-form");
  if (!form) return;
  const levelInput = form.querySelector('input[name="level"]');
  const levelButtons = form.querySelectorAll("[data-level-choice]");
  const savedLevel = normalizeLevelKey(localStorage.getItem(STORAGE.currentLevel) || "cem");
  const continueButton = form.querySelector("[data-continue-button]");

  function selectLevel(level) {
    level = normalizeLevelKey(level);
    if (levelInput) levelInput.value = level;
    levelButtons.forEach((button) => {
      button.classList.toggle("active", normalizeLevelKey(button.dataset.levelChoice) === level);
    });
    if (continueButton) continueButton.dataset.level = level;
  }

  levelButtons.forEach((button) => {
    button.addEventListener("click", () => selectLevel(button.dataset.levelChoice));
  });
  selectLevel(savedLevel);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const password = String(data.get("password") || "").trim();
    const selectedLevel = normalizeLevelKey(data.get("level") || "cem");

    if (!firstName) {
      alert(getText({ fr: "Ecris ton prenom pour continuer.", ar: "اكتب اسمك للمتابعة.", en: "Write your first name to continue." }));
      return;
    }
    if (!password) {
      alert(getText({ fr: "Choisissez un mot de passe pour creer ou ouvrir votre compte.", ar: "اختر كلمة مرور لإنشاء الحساب أو فتحه.", en: "Choose a password to create or open your account." }));
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const students = readJson(STORAGE.students, []);
    const existingIdx = students.findIndex((student) => String(student.name || "").toLowerCase() === fullName.toLowerCase());
    const existingStudent = existingIdx >= 0 ? students[existingIdx] : null;

    if (existingStudent && existingStudent.password !== password) {
      alert(getText({ fr: "Mot de passe incorrect pour cet eleve.", ar: "كلمة المرور غير صحيحة لهذا الحساب.", en: "Incorrect password for this student." }));
      return;
    }

    const nextStudent = {
      name: fullName,
      password,
      classCode: existingStudent?.classCode || "DIRECT",
      level: normalizeLevelKey(existingStudent?.level || selectedLevel),
      activeCode: "",
      createdAt: existingStudent?.createdAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    if (existingIdx === -1) students.unshift(nextStudent);
    else students[existingIdx] = { ...existingStudent, ...nextStudent };

    localStorage.setItem(STORAGE.students, JSON.stringify(students));
    localStorage.setItem(STORAGE.studentName, fullName);
    localStorage.setItem(STORAGE.studentClass, nextStudent.classCode);
    localStorage.setItem(STORAGE.currentLevel, nextStudent.level);
    localStorage.removeItem(STORAGE.currentSubject);
    localStorage.removeItem(STORAGE.activeLabCode);

    window.location.href = "dashboard.html";
  });
}

function renderRegisteredStudents() {
  const target = document.getElementById("registered-students-list");
  if (!target) return;
  const students = readJson(STORAGE.students, []);
  if (!students.length) {
    target.innerHTML = `<div class="empty-card">${dualText("Aucun compte eleve pour le moment.", "لا يوجد حساب تلميذ حاليا.", "No student account yet.")}</div>`;
    return;
  }

  target.innerHTML = students
    .slice()
    .sort((a, b) => new Date(b.lastLoginAt || b.createdAt || 0) - new Date(a.lastLoginAt || a.createdAt || 0))
    .map((student) => {
      const level = LEVEL_LABELS[normalizeLevelKey(student.level)] || LEVEL_LABELS.cem;
      const linkedAssignment = findLabCodeAssignment(student.activeCode);
      const linkedLabel = linkedAssignment
        ? getText(getExperimentConfig(linkedAssignment.experimentId).title)
        : getText({ fr: "Compte libre", ar: "حساب عادي", en: "Regular account" });
      return `
        <article class="registered-student-card">
          <div class="registered-student-head">
            <strong>${escapeHtml(student.name || "-")}</strong>
            <span class="badge badge-light">${escapeHtml(getText(level))}</span>
          </div>
          <p>${escapeHtml(student.classCode || "DIRECT")}</p>
          <p>${escapeHtml(linkedLabel)}</p>
          <div class="registered-student-secret">
            <code>${escapeHtml(student.password || "-")}</code>
            <button type="button" class="secondary-btn registered-student-copy" data-copy-student-password="${escapeHtml(student.password || "")}">
              <span aria-hidden="true">📋</span>
              <span>${getText({ fr: "Copier", ar: "نسخ", en: "Copy" })}</span>
            </button>
          </div>
        </article>
      `;
    }).join("");

  target.querySelectorAll("[data-copy-student-password]").forEach((button) => {
    button.addEventListener("click", async () => {
      const secret = button.dataset.copyStudentPassword || "";
      if (!secret) return;
      const copied = await copyTextValue(secret).catch(() => false);
      button.querySelector("span:last-child").textContent = copied
        ? getText({ fr: "Copie", ar: "تم النسخ", en: "Copied" })
        : getText({ fr: "Erreur", ar: "خطأ", en: "Error" });
      window.setTimeout(() => {
        const label = button.querySelector("span:last-child");
        if (label) label.textContent = getText({ fr: "Copier", ar: "نسخ", en: "Copy" });
      }, 1400);
    });
  });
}

function getAvailableSubjectsForLevel(level, assignment = null) {
  const experiences = LEVEL_EXPERIENCES[normalizeLevelKey(level)] || [];
  const availableSubjectIds = [...new Set(
    experiences
      .filter((item) => item.status === "available" && item.subjectId)
      .filter((item) => !assignment || assignmentAllowsExperiment(assignment, item.lab))
      .map((item) => item.subjectId)
  )];
  return (SUBJECTS[normalizeLevelKey(level)] || []).filter((subject) => availableSubjectIds.includes(subject.id));
}

function renderSubjects(level) {
  level = normalizeLevelKey(level);
  const subjectGrid = document.getElementById("subject-grid");
  if (!subjectGrid) return;
  const assignment = getActiveLabAssignment();

  if (assignment && normalizeLevelKey(assignment.level) === level && getAssignmentType(assignment) === "single") {
    const subject = subjectForExperiment(assignment.experimentId, assignment.level);
    const experiment = getExperimentConfig(assignment.experimentId);
    subjectGrid.classList.remove("empty-state");
    subjectGrid.innerHTML = `
      <button type="button" class="selection-card subject-card active" data-code="${escapeHtml(assignment.code)}">
        <strong>${dualText("Activite de ton professeur", "نشاط أستاذك", "Teacher activity")}</strong>
        <span class="subject-hint">${escapeHtml(getText(experiment.title))}</span>
        <span>${dualText(`Code : ${assignment.code}`, `الرمز: ${assignment.code}`, `Code: ${assignment.code}`)}</span>
      </button>
    `;
    const card = subjectGrid.querySelector("[data-code]");
    if (card) {
      card.addEventListener("click", () => {
        if (subject) localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
        window.location.href = `experiences.html?code=${encodeURIComponent(assignment.code)}`;
      });
    }
    return;
  }

  const subjects = assignment && normalizeLevelKey(assignment.level) === level
    ? getAvailableSubjectsForLevel(level, assignment)
    : getAvailableSubjectsForLevel(level);
  const meta = LEVEL_META[level] || LEVEL_META.cem;
  subjectGrid.classList.remove("empty-state");

  if (!subjects.length) {
    subjectGrid.innerHTML = `
      <div class="empty-card">
        ${dualText("Aucune matiere disponible pour ce niveau.", "لا توجد مادة متاحة لهذا المستوى.", "No available subject for this level.")}
      </div>
    `;
    return;
  }

  subjectGrid.innerHTML = subjects.map((subject) => {
    const hint = SUBJECT_HINTS[subject.id] || {
      fr: "Choisissez cette matiere pour continuer.",
      ar: "اختر هذه المادة للمتابعة.",
      en: "Choose this subject to continue."
    };
    const icon = SUBJECT_ICONS[subject.id] || "🔬";
    return `
      <button type="button" class="selection-card subject-card visual-subject-card" data-level="${level}" data-subject="${subject.id}" style="--level-accent:${meta.accent}">
        <span class="subject-photo" aria-hidden="true">${icon}</span>
        <strong>${dualText(subject.fr, subject.ar, subject.en || subject.fr)}</strong>
        <span class="subject-hint">${dualText(hint.fr, hint.ar, hint.en || hint.fr)}</span>
        <span class="subject-action">${dualText("Voir mes experiences", "عرض تجاربي", "See my experiments")}</span>
      </button>
    `;
  }).join("");

  subjectGrid.innerHTML += `
    <button type="button" class="selection-card subject-card visual-subject-card coming-soon-card" style="--level-accent:#94a3b8; opacity: 0.6; cursor: default;">
      <span class="subject-photo" aria-hidden="true" style="font-size: 2rem;">⏳</span>
      <strong style="margin-top: 10px;">${dualText("Autres matières", "مواد أخرى", "Other subjects")}</strong>
      <span class="subject-hint" style="color: #666; font-weight: 500;">${dualText("Bientôt disponible", "قريباً", "Coming soon")}</span>
    </button>
  `;

  subjectGrid.querySelectorAll(".subject-card[data-subject]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedSubject = subjects.find((subject) => subject.id === button.dataset.subject);
      localStorage.setItem(STORAGE.currentLevel, level);
      localStorage.setItem(STORAGE.currentSubject, JSON.stringify(selectedSubject));
      window.location.href = `experiences.html?level=${encodeURIComponent(level)}&subject=${encodeURIComponent(button.dataset.subject)}`;
    });
  });
}

function initDashboard() {
  const welcome = document.querySelector("[data-dashboard-welcome]");
  const studentName = localStorage.getItem(STORAGE.studentName) || "";
  const savedLevel = normalizeLevelKey(localStorage.getItem(STORAGE.currentLevel) || "cem");
  const levelLabel = LEVEL_LABELS[savedLevel] || LEVEL_LABELS.cem;
  const assignment = getActiveLabAssignment();
  if (welcome) {
    if (assignment && getAssignmentType(assignment) === "promo") {
      const labCount = assignmentAllowedExperiments(assignment).length;
      welcome.innerHTML = studentName
        ? dualText(
          `Bienvenue ${studentName}. Ton code promo ${assignment.code} ouvre ${labCount} laboratoire(s) pour le niveau ${levelLabel.fr}.`,
          `Promo code ${assignment.code}: ${labCount} lab(s) available for ${levelLabel.en || levelLabel.fr}.`,
          `Welcome ${studentName}. Your promo code ${assignment.code} opens ${labCount} lab(s) for ${levelLabel.en}.`
        )
        : dualText(
          `Ton code promo ${assignment.code} ouvre ${labCount} laboratoire(s) pour le niveau ${levelLabel.fr}.`,
          `Promo code ${assignment.code}: ${labCount} lab(s) available for ${levelLabel.en || levelLabel.fr}.`,
          `Your promo code ${assignment.code} opens ${labCount} lab(s) for ${levelLabel.en}.`
        );
    } else {
      welcome.innerHTML = studentName
        ? dualText(`Bienvenue ${studentName}. Ton niveau ${levelLabel.fr} est deja selectionne.`, `Your ${levelLabel.en || levelLabel.fr} level is already selected.`, `Welcome ${studentName}. Your ${levelLabel.en} level is already selected.`)
        : dualText(`Ton niveau ${levelLabel.fr} est deja selectionne.`, `Your ${levelLabel.en || levelLabel.fr} level is already selected.`, `Your ${levelLabel.en} level is already selected.`);
    }
  }
  renderDashboardLevelSummary(savedLevel);
  renderSubjects(savedLevel);
}

function initStudentForm() {
  const form = document.getElementById("student-form");
  if (!form) return;
  const levelInput = form.querySelector('input[name="level"]');
  const levelButtons = form.querySelectorAll("[data-level-choice]");
  const savedLevel = normalizeLevelKey(localStorage.getItem(STORAGE.currentLevel) || "cem");
  const continueButton = form.querySelector("[data-continue-button]");
  const codeInput = form.querySelector('input[name="classCode"]');

  function selectLevel(level) {
    level = normalizeLevelKey(level);
    if (levelInput) levelInput.value = level;
    levelButtons.forEach((button) => {
      button.classList.toggle("active", normalizeLevelKey(button.dataset.levelChoice) === level);
    });
    if (continueButton) continueButton.dataset.level = level;
  }

  levelButtons.forEach((button) => {
    button.addEventListener("click", () => selectLevel(button.dataset.levelChoice));
  });
  selectLevel(savedLevel);

  if (codeInput) {
    codeInput.addEventListener("input", () => {
      const assignment = findLabCodeAssignment(codeInput.value);
      if (assignment) selectLevel(assignment.level);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const password = String(data.get("password") || "").trim();
    const enteredCode = normalizeLabCode(data.get("classCode"));
    const assignment = findLabCodeAssignment(enteredCode);
    const selectedLevel = normalizeLevelKey(data.get("level") || "cem");

    if (!firstName) {
      alert(getText({ fr: "Ecris ton prenom pour continuer.", ar: "اكتب اسمك للمتابعة.", en: "Write your first name to continue." }));
      return;
    }
    if (!password) {
      alert(getText({ fr: "Choisissez un mot de passe pour creer ou ouvrir votre compte.", ar: "اختر كلمة مرور لإنشاء الحساب أو فتحه.", en: "Choose a password to create or open your account." }));
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const students = readJson(STORAGE.students, []);
    const existingIdx = students.findIndex((student) => String(student.name || "").toLowerCase() === fullName.toLowerCase());
    const existingStudent = existingIdx >= 0 ? students[existingIdx] : null;

    if (existingStudent && existingStudent.password !== password) {
      alert(getText({ fr: "Mot de passe incorrect pour cet eleve.", ar: "كلمة المرور غير صحيحة لهذا الحساب.", en: "Incorrect password for this student." }));
      return;
    }

    const resolvedLevel = normalizeLevelKey(assignment ? assignment.level : (existingStudent?.level || selectedLevel));
    const classCode = assignment ? assignment.code : (existingStudent?.classCode || enteredCode || "DIRECT");
    const activeCode = assignment ? assignment.code : (existingStudent?.activeCode || "");
    const nextStudent = {
      name: fullName,
      password,
      classCode,
      level: resolvedLevel,
      activeCode,
      createdAt: existingStudent?.createdAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    if (existingIdx === -1) students.unshift(nextStudent);
    else students[existingIdx] = { ...existingStudent, ...nextStudent };

    localStorage.setItem(STORAGE.students, JSON.stringify(students));
    localStorage.setItem(STORAGE.studentName, fullName);
    localStorage.setItem(STORAGE.studentClass, classCode);
    localStorage.setItem(STORAGE.currentLevel, resolvedLevel);
    localStorage.removeItem(STORAGE.currentSubject);
    localStorage.removeItem(STORAGE.activeLabCode);

    const loginAssignment = assignment || findLabCodeAssignment(activeCode);
    if (loginAssignment) {
      const subject = subjectForExperiment(loginAssignment.experimentId, loginAssignment.level);
      if (subject) localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
      localStorage.setItem(STORAGE.activeLabCode, loginAssignment.code);
      localStorage.setItem(STORAGE.currentLevel, normalizeLevelKey(loginAssignment.level));
      window.location.href = `experiences.html?code=${encodeURIComponent(loginAssignment.code)}`;
      return;
    }

    window.location.href = "dashboard.html";
  });
}

function initTeacherDashboard() {
  if (localStorage.getItem(STORAGE.teacherLogged) !== "true" && localStorage.getItem(STORAGE.adminLogged) !== "true") {
    window.location.href = "prof-login.html";
    return;
  }

  let rows = getTeacherRows();
  let descending = true;
  const filterInput = document.getElementById("class-filter");
  const sortButton = document.getElementById("sort-score-btn");

  function applyFilters() {
    rows = getTeacherRows();
    const query = filterInput ? filterInput.value.trim().toLowerCase() : "";
    let filtered = rows.filter((row) => String(row.classCode || "").toLowerCase().includes(query));
    filtered = filtered.sort((a, b) => descending ? b.score - a.score : a.score - b.score);
    renderTeacherTable(filtered);
    renderTeacherInsights(filtered);
    renderRegisteredStudents();
    updateTeacherStats(rows);
  }

  if (filterInput) filterInput.addEventListener("input", applyFilters);
  if (sortButton) {
    sortButton.addEventListener("click", () => {
      descending = !descending;
      applyFilters();
    });
  }

  initLabCodeGenerator();
  renderRegisteredStudents();
  applyFilters();
}

function prepareEmbeddedResult(experimentId) {
  if (!experimentRuntime) return;
  const frame = document.querySelector("[data-lab-frame]");
  const loaded = !frame || frame.dataset.labLoaded === "true";
  if (!loaded) return;

  for (let step = 1; step <= 5; step += 1) {
    experimentRuntime.completed.add(step);
  }

  if (experimentRuntime.seconds < 45) {
    experimentRuntime.seconds = 45;
  }
}

function finishExperiment() {
  const experimentId = experimentRuntime?.id || document.body.dataset.experiment || currentExperimentContextId();
  prepareEmbeddedResult(experimentId);
  localStorage.setItem(STORAGE.lastExperiment, experimentId);
  storeExperimentResult();
  if (experimentRuntime && experimentRuntime.timerHandle) window.clearInterval(experimentRuntime.timerHandle);
  window.location.href = "result.html";
}

function initResultPage() {
  const result = readJson(STORAGE.lastResult, null);
  if (!result) {
    window.location.href = "experiences.html";
    return;
  }

  const title = document.querySelector("[data-result-title]");
  const score = document.querySelector("[data-result-score]");
  const badge = document.querySelector("[data-result-badge]");
  const summary = document.querySelector("[data-result-summary]");
  const tip = document.querySelector("[data-result-tip]");
  const steps = document.querySelector("[data-result-steps]");
  const errors = document.querySelector("[data-result-errors]");

  if (title) title.textContent = getText(result.title);
  if (score) score.textContent = String(result.score);
  if (badge) badge.textContent = getText(result.badge);
  if (summary) {
    summary.textContent = getText({
      fr: `Vous avez termine ${result.stepsCompleted} etapes sur 5 avec un score de ${result.score}/100.`,
      ar: `أنهيت ${result.stepsCompleted} خطوات من أصل 5 بنتيجة ${result.score}/100.`,
      en: `You completed ${result.stepsCompleted} out of 5 steps with a score of ${result.score}/100.`
    });
  }
  if (tip) tip.textContent = getText(result.tip);
  if (steps) steps.textContent = String(result.stepsCompleted);
  if (errors) errors.textContent = String(result.errors.length);
}

function renderStudentResultHistory() {
  const main = document.querySelector("main");
  if (!main) return;
  const studentName = localStorage.getItem(STORAGE.studentName) || "";
  const history = readResultHistory().filter((item) => !studentName || item.studentName === studentName).slice(0, 12);
  let section = document.getElementById("student-result-history");
  if (!section) {
    section = document.createElement("section");
    section.id = "student-result-history";
    section.className = "panel-card result-history-card fade-up delay-2";
    main.appendChild(section);
  }
  section.innerHTML = `
    <div class="panel-head">
      <h2>${escapeHtml(getText({ fr: "Historique de mes resultats", ar: "Historique de mes resultats", en: "My result history" }))}</h2>
      <p>${escapeHtml(getText({ fr: "Les laboratoires termines avec quiz restent visibles ici.", ar: "Les laboratoires termines avec quiz restent visibles ici.", en: "Completed labs with quizzes stay visible here." }))}</p>
    </div>
    <div class="admin-list">
      ${history.length ? history.map((item) => `
        <article class="admin-list-card">
          <div>
            <strong>${escapeHtml(getText(item.title || getExperimentConfig(item.experimentId).title))}</strong>
            <p>${escapeHtml(item.classCode || "DIRECT")} - ${escapeHtml(new Date(item.completedAt).toLocaleString())}</p>
          </div>
          <div class="admin-score-pair">
            <span>${escapeHtml(getText({ fr: "Labo", ar: "Labo", en: "Lab" }))}: ${escapeHtml(String(item.labScore || 0))}%</span>
            <span>${escapeHtml(getText({ fr: "Quiz", ar: "Quiz", en: "Quiz" }))}: ${escapeHtml(String(item.quizScore || 0))}%</span>
          </div>
        </article>
      `).join("") : `<div class="empty-card">${escapeHtml(getText({ fr: "Aucun resultat avec quiz pour le moment.", ar: "Aucun resultat avec quiz pour le moment.", en: "No quiz result yet." }))}</div>`}
    </div>
  `;
}

function initResultPage() {
  const result = readJson(STORAGE.lastResult, null);
  if (!result) {
    window.location.href = "experiences.html";
    return;
  }

  const title = document.querySelector("[data-result-title]");
  const score = document.querySelector("[data-result-score]");
  const badge = document.querySelector("[data-result-badge]");
  const summary = document.querySelector("[data-result-summary]");
  const tip = document.querySelector("[data-result-tip]");
  const steps = document.querySelector("[data-result-steps]");
  const errors = document.querySelector("[data-result-errors]");
  const stats = document.querySelector(".result-stats");

  if (title) title.textContent = getText(result.title);
  if (score) score.textContent = String(result.score || 0);
  if (badge) badge.textContent = getText(result.badge || scoreToBadge(result.score || 0));
  if (summary) {
    summary.textContent = getText({
      fr: `Vous avez termine ${result.stepsCompleted || 0} etapes sur 5 avec un score labo de ${result.score || 0}/100 et un score quiz de ${result.quizScore ?? "-"}/100.`,
      ar: `Score labo ${result.score || 0}/100 - score quiz ${result.quizScore ?? "-"}/100.`,
      en: `You completed ${result.stepsCompleted || 0} of 5 steps with a lab score of ${result.score || 0}/100 and a quiz score of ${result.quizScore ?? "-"}/100.`
    });
  }
  if (tip) tip.textContent = getText(result.tip);
  if (steps) steps.textContent = String(result.stepsCompleted || 0);
  if (errors) errors.textContent = String((result.errors || []).length);
  if (stats && !stats.querySelector("[data-result-quiz]")) {
    stats.insertAdjacentHTML("beforeend", `
      <div class="stat-tile"><strong data-result-quiz>${escapeHtml(String(result.quizScore ?? "-"))}</strong><span>${escapeHtml(getText({ fr: "score quiz", ar: "score quiz", en: "quiz score" }))}</span></div>
    `);
  } else {
    const quiz = document.querySelector("[data-result-quiz]");
    if (quiz) quiz.textContent = String(result.quizScore ?? "-");
  }
  renderStudentResultHistory();
}

function storeExperimentResult() {
  if (!experimentRuntime) return;
  persistExperimentResult();
}

function finishExperiment() {
  const experimentId = experimentRuntime?.id || document.body.dataset.experiment || currentExperimentContextId();
  prepareEmbeddedResult(experimentId);
  localStorage.setItem(STORAGE.lastExperiment, experimentId);
  storeExperimentResult();
  if (experimentRuntime && experimentRuntime.timerHandle) window.clearInterval(experimentRuntime.timerHandle);
  window.location.href = "quiz.html";
}

function renderQuizResult(state, config) {
  const stage = document.getElementById("quiz-stage");
  const progress = document.querySelector("[data-quiz-progress]");
  if (!stage || !progress) return;
  const finalScore = Math.round((state.score / Math.max(state.questions.length, 1)) * 100);
  const badge = scoreToBadge(finalScore);
  const quizScores = readJson(STORAGE.quizScores, {});
  quizScores[state.experimentId] = finalScore;
  writeJson(STORAGE.quizScores, quizScores);

  const labResult = readJson(STORAGE.lastResult, null) || {};
  const completedAt = new Date().toISOString();
  const nextResult = {
    ...labResult,
    experimentId: state.experimentId,
    title: config.title,
    quizScore: finalScore,
    quizCorrect: state.score,
    quizTotal: state.questions.length,
    completedAt
  };
  writeJson(STORAGE.lastResult, nextResult);

  const history = readResultHistory();
  history.unshift({
    id: `${completedAt}-${state.experimentId}`,
    studentName: localStorage.getItem(STORAGE.studentName) || "",
    classCode: localStorage.getItem(STORAGE.studentClass) || "DIRECT",
    level: normalizeLevelKey(localStorage.getItem(STORAGE.currentLevel) || "cem"),
    experimentId: state.experimentId,
    title: config.title,
    labScore: Number(labResult.score || 0),
    quizScore: finalScore,
    quizCorrect: state.score,
    quizTotal: state.questions.length,
    completedAt
  });
  writeResultHistory(history.slice(0, 80));

  progress.textContent = getText({ fr: "Quiz termine", ar: "Quiz termine", en: "Quiz completed" });
  stage.innerHTML = `
    <div class="quiz-result">
      <h2>${escapeHtml(getText(config.title))}</h2>
      <p>${escapeHtml(getText({
        fr: `Score final : ${finalScore}/100 (${state.score}/${state.questions.length} reponses justes)`,
        ar: `Score final : ${finalScore}/100 (${state.score}/${state.questions.length})`,
        en: `Final score: ${finalScore}/100 (${state.score}/${state.questions.length} correct answers)`
      }))}</p>
      <p class="result-badge">${escapeHtml(getText(badge))}</p>
      <div class="quiz-review-card">
        <h3>${escapeHtml(getText({ fr: "Revision", ar: "Revision", en: "Review" }))}</h3>
        ${state.answers.map((answer, index) => `
          <div class="quiz-feedback">
            <strong>${escapeHtml(getText({ fr: `Question ${index + 1}`, ar: `Question ${index + 1}`, en: `Question ${index + 1}` }))}</strong>
            <p>${escapeHtml(getText(answer.question.prompt))}</p>
            <p>${escapeHtml(getText({
              fr: `Bonne reponse : ${getText(answer.question.options[answer.question.correct])}`,
              ar: `Bonne reponse : ${getText(answer.question.options[answer.question.correct])}`,
              en: `Correct answer: ${getText(answer.question.options[answer.question.correct])}`
            }))}</p>
            <p>${escapeHtml(getText(answer.question.explanation))}</p>
          </div>
        `).join("")}
      </div>
      <div class="hero-actions">
        <a class="primary-btn" href="result.html">${escapeHtml(getText({ fr: "Voir le resultat complet", ar: "Voir le resultat complet", en: "View full result" }))}</a>
        <a class="secondary-btn" href="dashboard.html">${escapeHtml(getText({ fr: "Retour au tableau de bord", ar: "Retour au tableau de bord", en: "Back to dashboard" }))}</a>
      </div>
    </div>
  `;
}

function initTeacherLogin() {
  const form = document.getElementById("teacher-login-form");
  if (!form) return;
  readProfessors();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const username = String(data.get("username") || "").trim();
    const password = String(data.get("password") || "").trim();
    if (username === "admin" && password === "1234") {
      localStorage.setItem(STORAGE.adminLogged, "true");
      localStorage.removeItem(STORAGE.teacherLogged);
      localStorage.removeItem(STORAGE.currentTeacher);
      window.location.href = "/admin";
      return;
    }
    const professor = readProfessors().find((item) => String(item.username || "").trim() === username && String(item.password || "") === password);
    if (professor) {
      localStorage.setItem(STORAGE.teacherLogged, "true");
      localStorage.removeItem(STORAGE.adminLogged);
      localStorage.setItem(STORAGE.currentTeacher, professor.name || professor.username);
      window.location.href = "prof-dashboard.html";
      return;
    }
    alert(getText({
      fr: "Identifiants incorrects. Admin : admin / 1234. Professeur demo : prof / 1234.",
      ar: "Identifiants incorrects. Admin : admin / 1234. Professeur demo : prof / 1234.",
      en: "Incorrect credentials. Admin: admin / 1234. Demo professor: prof / 1234."
    }));
  });
}

function renderAdminProfessors() {
  const target = document.getElementById("admin-professor-list");
  if (!target) return;
  const professors = readProfessors();
  target.innerHTML = professors.map((professor, index) => `
    <article class="admin-list-card">
      <div>
        <strong>${escapeHtml(professor.name || professor.username)}</strong>
        <p>${escapeHtml(professor.subject || "Sciences")} - ${escapeHtml(professor.classCode || "DIRECT")}</p>
        <code>${escapeHtml(professor.username || "")} / ${escapeHtml(professor.password || "")}</code>
      </div>
      <button type="button" class="secondary-btn" data-remove-professor="${index}">${escapeHtml(getText({ fr: "Supprimer", ar: "Supprimer", en: "Remove" }))}</button>
    </article>
  `).join("");
  target.querySelectorAll("[data-remove-professor]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = readProfessors().filter((_, index) => index !== Number(button.dataset.removeProfessor));
      writeProfessors(next.length ? next : defaultProfessors());
      renderAdminDashboard();
    });
  });
}

function renderAdminStudents() {
  const target = document.getElementById("admin-student-list");
  if (!target) return;
  const students = readJson(STORAGE.students, []);
  if (!students.length) {
    target.innerHTML = `<div class="empty-card">${escapeHtml(getText({ fr: "Aucun eleve inscrit.", ar: "Aucun eleve inscrit.", en: "No registered student." }))}</div>`;
    return;
  }
  target.innerHTML = students.map((student) => {
    const level = LEVEL_LABELS[normalizeLevelKey(student.level)] || LEVEL_LABELS.cem;
    return `
      <article class="admin-list-card">
        <div>
          <strong>${escapeHtml(student.name || "-")}</strong>
          <p>${escapeHtml(getText(level))} - ${escapeHtml(student.classCode || "DIRECT")}</p>
          <code>${escapeHtml(student.password || "-")}</code>
        </div>
      </article>
    `;
  }).join("");
}

function renderAdminActivity() {
  const target = document.getElementById("admin-activity-list");
  if (!target) return;
  const rows = getTeacherRows();
  target.innerHTML = rows.map((row) => {
    const experiment = row.experimentId ? getText(getExperimentConfig(row.experimentId).title) : getText({ fr: "Pas encore d'experience", ar: "Pas encore d'experience", en: "No experiment yet" });
    return `
      <article class="admin-list-card">
        <div>
          <strong>${escapeHtml(row.studentName)}</strong>
          <p>${escapeHtml(row.classCode)} - ${escapeHtml(experiment)}</p>
        </div>
        <span class="badge badge-light">${row.experimentId ? `${escapeHtml(String(row.score))}%` : "-"}</span>
      </article>
    `;
  }).join("");
}

function renderAdminDashboard() {
  const professors = readProfessors();
  const students = readJson(STORAGE.students, []);
  const codes = readLabCodes();
  const rows = getTeacherRows();
  const completed = rows.filter((row) => row.experimentId).length;
  const statProfessors = document.getElementById("admin-stat-professors");
  const statStudents = document.getElementById("admin-stat-students");
  const statCodes = document.getElementById("admin-stat-codes");
  const statExperiments = document.getElementById("admin-stat-experiments");
  if (statProfessors) statProfessors.textContent = professors.length;
  if (statStudents) statStudents.textContent = students.length;
  if (statCodes) statCodes.textContent = codes.length;
  if (statExperiments) statExperiments.textContent = completed;
  renderAdminProfessors();
  renderAdminStudents();
  renderAdminActivity();
}

function adminClassCodes() {
  const codeMap = new Map();
  readLabCodes().forEach((code) => {
    codeMap.set(code.code, {
      code: code.code,
      level: normalizeLevelKey(code.level || "cem"),
      source: getAssignmentType(code) === "promo" ? "Code promo" : "Code activite",
      labs: assignmentAllowedExperiments(code)
    });
  });
  readProfessors().forEach((professor) => {
    professorClassCodes(professor).forEach((code) => {
      if (!code) return;
      const existing = codeMap.get(code) || { code, level: "cem", source: "Code professeur", labs: [] };
      existing.professor = professor;
      codeMap.set(code, existing);
    });
  });
  readJson(STORAGE.students, []).forEach((student) => {
    const code = normalizeLabCode(student.classCode || "DIRECT") || "DIRECT";
    const existing = codeMap.get(code) || {
      code,
      level: normalizeLevelKey(student.level || "cem"),
      source: code === "DIRECT" ? "Visiteurs sans code" : "Code saisi par etudiant",
      labs: []
    };
    codeMap.set(code, existing);
  });
  if (!codeMap.has("DIRECT")) {
    codeMap.set("DIRECT", { code: "DIRECT", level: "cem", source: "Visiteurs sans code", labs: [] });
  }
  return [...codeMap.values()].sort((a, b) => a.code.localeCompare(b.code));
}

function studentsForClassCode(code) {
  const normalized = normalizeLabCode(code || "DIRECT") || "DIRECT";
  return readJson(STORAGE.students, []).filter((student) => {
    const studentCode = normalizeLabCode(student.classCode || "DIRECT") || "DIRECT";
    return studentCode === normalized;
  });
}

function professorClassCodes(professor) {
  const raw = String(professor?.classCode || "DIRECT");
  const codes = raw.split(/[,; ]+/).map((item) => normalizeLabCode(item)).filter(Boolean);
  return codes.length ? [...new Set(codes)] : ["DIRECT"];
}

function renderAdminProfessors() {
  const target = document.getElementById("admin-professor-list");
  if (!target) return;
  const professors = readProfessors();
  target.innerHTML = professors.map((professor, index) => {
    const codes = professorClassCodes(professor);
    const linkedStudents = codes.flatMap((code) => studentsForClassCode(code));
    return `
      <article class="admin-list-card admin-list-card-column">
        <div class="admin-row-main">
          <div>
            <strong>${escapeHtml(professor.name || professor.username)}</strong>
            <p>${escapeHtml(professor.subject || "Sciences")}</p>
            <code>${escapeHtml(professor.username || "")} / ${escapeHtml(professor.password || "")}</code>
          </div>
          <button type="button" class="secondary-btn" data-remove-professor="${index}">${escapeHtml(getText({ fr: "Supprimer", ar: "Supprimer", en: "Remove" }))}</button>
        </div>
        <div class="admin-linked-block">
          ${codes.map((code) => `<span class="badge badge-light">${escapeHtml(code)}</span>`).join("")}
          <span>${escapeHtml(String(linkedStudents.length))} etudiant(s) lies</span>
        </div>
      </article>
    `;
  }).join("");
  target.querySelectorAll("[data-remove-professor]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = readProfessors().filter((_, index) => index !== Number(button.dataset.removeProfessor));
      writeProfessors(next.length ? next : defaultProfessors());
      renderAdminDashboard();
    });
  });
}

function renderAdminClasses() {
  const target = document.getElementById("admin-class-list");
  if (!target) return;
  const classes = adminClassCodes();
  target.innerHTML = classes.map((item) => {
    const students = studentsForClassCode(item.code);
    const level = LEVEL_LABELS[normalizeLevelKey(item.level)] || LEVEL_LABELS.cem;
    const professorName = item.professor ? (item.professor.name || item.professor.username) : "Aucun professeur lie";
    const labs = item.labs.length ? item.labs.map((lab) => getText(getExperimentConfig(lab).title)).join(", ") : "Tous / libre";
    return `
      <article class="admin-list-card admin-list-card-column">
        <div class="admin-row-main">
          <div>
            <strong>${escapeHtml(item.code)}</strong>
            <p>${escapeHtml(item.source)} - ${escapeHtml(getText(level))}</p>
            <p>Professeur : ${escapeHtml(professorName)}</p>
            <p>Labs : ${escapeHtml(labs)}</p>
          </div>
          <span class="badge badge-light">${escapeHtml(String(students.length))} etudiant(s)</span>
        </div>
        <div class="admin-chip-list">
          ${students.length ? students.map((student) => `<span>${escapeHtml(student.name || "-")}</span>`).join("") : "<span>Aucun etudiant</span>"}
        </div>
      </article>
    `;
  }).join("");
}

function renderAdminStudents() {
  const target = document.getElementById("admin-student-list");
  if (!target) return;
  const students = readJson(STORAGE.students, []);
  if (!students.length) {
    target.innerHTML = `<div class="empty-card">${escapeHtml(getText({ fr: "Aucun eleve inscrit.", ar: "Aucun eleve inscrit.", en: "No registered student." }))}</div>`;
    return;
  }
  target.innerHTML = students
    .slice()
    .sort((a, b) => String(a.classCode || "DIRECT").localeCompare(String(b.classCode || "DIRECT")) || String(a.name || "").localeCompare(String(b.name || "")))
    .map((student) => {
      const level = LEVEL_LABELS[normalizeLevelKey(student.level)] || LEVEL_LABELS.cem;
      const code = student.classCode || "DIRECT";
      const kind = normalizeLabCode(code) === "DIRECT" ? "Visiteur sans code classe" : "Lie au code classe";
      return `
        <article class="admin-list-card">
          <div>
            <strong>${escapeHtml(student.name || "-")}</strong>
            <p>${escapeHtml(getText(level))} - ${escapeHtml(kind)}</p>
            <code>${escapeHtml(code)} | ${escapeHtml(student.password || "-")}</code>
          </div>
        </article>
      `;
    }).join("");
}

function renderAdminActivity() {
  const target = document.getElementById("admin-activity-list");
  if (!target) return;
  const history = readResultHistory();
  if (history.length) {
    target.innerHTML = history.map((item) => `
      <article class="admin-list-card">
        <div>
          <strong>${escapeHtml(item.studentName || "-")}</strong>
          <p>${escapeHtml(item.classCode || "DIRECT")} - ${escapeHtml(getText(item.title || getExperimentConfig(item.experimentId).title))}</p>
          <p>${escapeHtml(new Date(item.completedAt).toLocaleString())}</p>
        </div>
        <div class="admin-score-pair">
          <span>Labo: ${escapeHtml(String(item.labScore || 0))}%</span>
          <span>Quiz: ${escapeHtml(String(item.quizScore || 0))}%</span>
        </div>
      </article>
    `).join("");
    return;
  }
  const rows = getTeacherRows();
  target.innerHTML = rows.map((row) => {
    const experiment = row.experimentId ? getText(getExperimentConfig(row.experimentId).title) : getText({ fr: "Pas encore d'experience", ar: "Pas encore d'experience", en: "No experiment yet" });
    return `
      <article class="admin-list-card">
        <div>
          <strong>${escapeHtml(row.studentName)}</strong>
          <p>${escapeHtml(row.classCode)} - ${escapeHtml(experiment)}</p>
        </div>
        <span class="badge badge-light">${row.experimentId ? `${escapeHtml(String(row.score))}%` : "-"}</span>
      </article>
    `;
  }).join("");
}

function renderAdminDashboard() {
  const professors = readProfessors();
  const students = readJson(STORAGE.students, []);
  const codes = adminClassCodes();
  const completed = readResultHistory().length || getTeacherRows().filter((row) => row.experimentId).length;
  const statProfessors = document.getElementById("admin-stat-professors");
  const statStudents = document.getElementById("admin-stat-students");
  const statCodes = document.getElementById("admin-stat-codes");
  const statExperiments = document.getElementById("admin-stat-experiments");
  if (statProfessors) statProfessors.textContent = professors.length;
  if (statStudents) statStudents.textContent = students.length;
  if (statCodes) statCodes.textContent = codes.length;
  if (statExperiments) statExperiments.textContent = completed;
  renderAdminProfessors();
  renderAdminClasses();
  renderAdminStudents();
  renderAdminActivity();
}

function renderAdminLogin() {
  const main = document.querySelector("main");
  if (!main) return;
  main.innerHTML = `
    <section class="page-shell narrow-shell">
      <article class="form-card admin-login-card">
        <div class="panel-head">
          <h1>${escapeHtml(getText({ fr: "Connexion admin", ar: "Connexion admin", en: "Admin login" }))}</h1>
          <p>${escapeHtml(getText({
            fr: "Acces separe pour gerer les professeurs, les eleves et les details de la plateforme.",
            ar: "Acces separe pour gerer les professeurs, les eleves et les details de la plateforme.",
            en: "Separate access for managing professors, students and platform details."
          }))}</p>
        </div>
        <form id="admin-login-form" class="stack-form">
          <label>
            ${escapeHtml(getText({ fr: "Nom d'utilisateur", ar: "Nom d'utilisateur", en: "Username" }))}
            <input name="username" type="text" required value="admin">
          </label>
          <label>
            ${escapeHtml(getText({ fr: "Mot de passe", ar: "Mot de passe", en: "Password" }))}
            <input name="password" type="password" required value="1234">
          </label>
          <button class="primary-btn" type="submit">${escapeHtml(getText({ fr: "Entrer dans le dashboard admin", ar: "Entrer dans le dashboard admin", en: "Open admin dashboard" }))}</button>
          <p class="form-note">Admin : <strong>admin</strong> / <strong>1234</strong></p>
        </form>
      </article>
    </section>
  `;
  const form = document.getElementById("admin-login-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const username = String(data.get("username") || "").trim();
    const password = String(data.get("password") || "").trim();
    if (username === "admin" && password === "1234") {
      localStorage.setItem(STORAGE.adminLogged, "true");
      localStorage.removeItem(STORAGE.teacherLogged);
      localStorage.removeItem(STORAGE.currentTeacher);
      window.location.href = "/admin";
      return;
    }
    alert(getText({ fr: "Identifiants admin incorrects.", ar: "Identifiants admin incorrects.", en: "Incorrect admin credentials." }));
  });
}

function initAdminDashboard() {
  if (localStorage.getItem(STORAGE.adminLogged) !== "true") {
    renderAdminLogin();
    return;
  }
  const form = document.getElementById("admin-professor-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const username = String(data.get("username") || "").trim();
      const password = String(data.get("password") || "").trim();
      const subject = String(data.get("subject") || "").trim();
      const classCode = String(data.get("classCode") || "").trim().toUpperCase();
      if (!name || !username || !password) {
        alert(getText({ fr: "Nom, utilisateur et mot de passe sont obligatoires.", ar: "Nom, utilisateur et mot de passe sont obligatoires.", en: "Name, username and password are required." }));
        return;
      }
      const professors = readProfessors();
      if (professors.some((item) => String(item.username || "").trim() === username)) {
        alert(getText({ fr: "Ce nom d'utilisateur existe deja.", ar: "Ce nom d'utilisateur existe deja.", en: "This username already exists." }));
        return;
      }
      professors.unshift({ name, username, password, subject, classCode, createdAt: new Date().toISOString() });
      writeProfessors(professors);
      form.reset();
      renderAdminDashboard();
    });
  }
  renderAdminDashboard();
}

function normalizeStudentFullName(firstName, lastName) {
  return `${String(firstName || "").trim()} ${String(lastName || "").trim()}`
    .replace(/\s+/g, " ")
    .trim();
}

function generateStudentPassword(fullName, level, students) {
  const levelCode = (normalizeLevelKey(level) || "cem").slice(0, 3).toUpperCase();
  const baseName = String(fullName || "ELEVE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "")
    .toUpperCase()
    .slice(0, 6) || "ELEVE";
  let password = "";

  do {
    const randomCode = Math.random().toString(36).slice(2, 6).toUpperCase();
    password = `${levelCode}-${baseName}-${randomCode}`;
  } while (students.some((student) => student && student.password === password));

  return password;
}

function ensureStudentPasswordModal() {
  let modal = document.getElementById("student-password-modal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "student-password-modal";
  modal.className = "student-password-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="student-password-modal__backdrop" data-password-close></div>
    <div class="student-password-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="student-password-modal-title">
      <button type="button" class="student-password-modal__close" data-password-close aria-label="Close">×</button>
      <div class="student-password-modal__icon" aria-hidden="true">🔑</div>
      <h2 id="student-password-modal-title">${dualText("Ton code est pret", "رمزك جاهز", "Your code is ready")}</h2>
      <p id="student-password-modal-text" class="student-password-modal__text"></p>
      <div class="student-password-modal__codebox">
        <strong id="student-password-modal-code"></strong>
        <button type="button" class="secondary-btn student-password-modal__copy" id="student-password-modal-copy">
          <span aria-hidden="true">📋</span>
          <span>${getText({ fr: "Copier", ar: "نسخ", en: "Copy" })}</span>
        </button>
      </div>
      <p id="student-password-modal-status" class="student-password-modal__status" aria-live="polite"></p>
      <button type="button" class="primary-btn student-password-modal__confirm" id="student-password-modal-confirm">${getText({ fr: "Continuer", ar: "متابعة", en: "Continue" })}</button>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

async function copyTextValue(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }
  const input = document.createElement("input");
  input.value = value;
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  return copied;
}

function showStudentPasswordModal(studentName, password) {
  const modal = ensureStudentPasswordModal();
  const text = modal.querySelector("#student-password-modal-text");
  const code = modal.querySelector("#student-password-modal-code");
  const status = modal.querySelector("#student-password-modal-status");
  const confirm = modal.querySelector("#student-password-modal-confirm");
  const copyButton = modal.querySelector("#student-password-modal-copy");
  const closeButtons = modal.querySelectorAll("[data-password-close]");

  if (!text || !code || !status || !confirm || !copyButton) return Promise.resolve();

  text.innerHTML = localizedTextMarkup({
    fr: `Compte cree pour ${studentName}. Sauvegarde ce code maintenant : tu devras l'utiliser pour te connecter plus tard.`,
    ar: `تم إنشاء الحساب باسم ${studentName}. احتفظ بهذا الرمز جيدا من أجل الدخول في المرة القادمة.`,
    en: `Account created for ${studentName}. Save this code now: you will need it to log in later.`
  });
  code.textContent = password;
  status.textContent = getText({
    fr: "Important : copie ou note ce code avant de continuer. Sans ce code, tu ne pourras pas rouvrir ton compte.",
    ar: "Important: copy or write down this code before continuing. You will use it to log in again.",
    en: "Important: copy or write down this code before continuing. You will use it to log in again."
  });
  modal.hidden = false;
  document.body.classList.add("modal-open");

  return new Promise((resolve) => {
    const cleanup = () => {
      modal.hidden = true;
      document.body.classList.remove("modal-open");
      copyButton.removeEventListener("click", onCopy);
      confirm.removeEventListener("click", onConfirm);
      closeButtons.forEach((button) => button.removeEventListener("click", onConfirm));
    };

    const onCopy = async () => {
      const copied = await copyTextValue(password).catch(() => false);
      status.textContent = copied
        ? getText({ fr: "Code copie.", ar: "تم نسخ الرمز.", en: "Code copied." })
        : getText({ fr: "Impossible de copier automatiquement.", ar: "تعذر النسخ تلقائيا.", en: "Unable to copy automatically." });
    };

    const onConfirm = () => {
      cleanup();
      resolve();
    };

    copyButton.addEventListener("click", onCopy);
    confirm.addEventListener("click", onConfirm);
    closeButtons.forEach((button) => button.addEventListener("click", onConfirm));
  });
}

function initStudentForm() {
  const form = document.getElementById("student-form");
  if (!form) return;
  const levelInput = form.querySelector('input[name="level"]');
  const levelButtons = form.querySelectorAll("[data-level-choice]");
  const continueButton = form.querySelector("[data-continue-button]");
  const passwordInput = form.querySelector('input[name="password"]');
  const formNote = form.querySelector(".form-note");
  const savedLevel = normalizeLevelKey(localStorage.getItem(STORAGE.currentLevel) || "cem");

  function selectLevel(level) {
    level = normalizeLevelKey(level);
    if (levelInput) levelInput.value = level;
    levelButtons.forEach((button) => {
      button.classList.toggle("active", normalizeLevelKey(button.dataset.levelChoice) === level);
    });
    if (continueButton) continueButton.dataset.level = level;
  }

  if (passwordInput) {
    passwordInput.required = false;
    passwordInput.setAttribute("data-placeholder-fr", "Laisse vide pour un mot de passe automatique");
    passwordInput.setAttribute("data-placeholder-ar", "اترك الحقل فارغا لإنشاء كلمة مرور تلقائية");
    passwordInput.setAttribute("data-placeholder-en", "Leave empty for an automatic password");
  }

  if (formNote) {
    formNote.innerHTML = `
      <span class="lang-fr">Si tu laisses ce champ vide, EduVirtuel cree un mot de passe unique pour toi. Garde-le pour rouvrir le meme compte plus tard.</span>
      <span class="lang-ar">إذا تركت هذا الحقل فارغا، سينشئ EduVirtuel كلمة مرور فريدة لك. احتفظ بها للدخول مرة أخرى.</span>
      <span class="lang-en">If you leave this empty, EduVirtuel creates a unique password for you. Keep it so you can sign in again later.</span>
    `;
  }

  levelButtons.forEach((button) => {
    button.addEventListener("click", () => selectLevel(button.dataset.levelChoice));
  });
  selectLevel(savedLevel);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const selectedLevel = normalizeLevelKey(data.get("level") || savedLevel || "cem");
    const fullName = normalizeStudentFullName(firstName, lastName);

    if (!firstName) {
      alert(getText({
        fr: "Ecris ton prenom pour continuer.",
        ar: "اكتب اسمك للمتابعة.",
        en: "Write your first name to continue."
      }));
      return;
    }

    const students = readJson(STORAGE.students, []);
    const existingIdx = students.findIndex((student) => String(student.name || "").toLowerCase() === fullName.toLowerCase());
    const existingStudent = existingIdx >= 0 ? students[existingIdx] : null;
    let password = String(data.get("password") || "").trim();

    if (existingStudent) {
      if (!password) {
        alert(getText({
          fr: "Entre ton mot de passe pour rouvrir ce compte.",
          ar: "أدخل كلمة المرور لفتح هذا الحساب من جديد.",
          en: "Enter your password to open this account again."
        }));
        return;
      }
      if (existingStudent.password !== password) {
        alert(getText({
          fr: "Mot de passe incorrect pour cet eleve.",
          ar: "كلمة المرور غير صحيحة لهذا الحساب.",
          en: "Incorrect password for this student."
        }));
        return;
      }
    } else if (!password) {
      password = generateStudentPassword(fullName, selectedLevel, students);
      alert(getText({
        fr: `Compte cree pour ${fullName}. Ton mot de passe est : ${password}`,
        ar: `تم إنشاء حساب ${fullName}. كلمة المرور الخاصة بك هي: ${password}`,
        en: `Account created for ${fullName}. Your password is: ${password}`
      }));
    }

    const nextStudent = {
      name: fullName,
      password,
      classCode: existingStudent?.classCode || "DIRECT",
      level: normalizeLevelKey(existingStudent?.level || selectedLevel),
      activeCode: existingStudent?.activeCode || "",
      createdAt: existingStudent?.createdAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    if (existingIdx === -1) students.unshift(nextStudent);
    else students[existingIdx] = { ...existingStudent, ...nextStudent };

    localStorage.setItem(STORAGE.students, JSON.stringify(students));
    localStorage.setItem(STORAGE.studentName, fullName);
    localStorage.setItem(STORAGE.studentClass, nextStudent.classCode);
    localStorage.setItem(STORAGE.currentLevel, nextStudent.level);
    localStorage.removeItem(STORAGE.currentSubject);
    localStorage.removeItem(STORAGE.activeLabCode);
    window.location.href = "dashboard.html";
  });
}

function initStudentForm() {
  const signupForm = document.getElementById("student-signup-form");
  const promoForm = document.getElementById("student-promo-form");
  const loginForm = document.getElementById("student-login-form");
  if (!signupForm || !promoForm || !loginForm) return;
  const levelInput = signupForm.querySelector('input[name="level"]');
  const levelButtons = document.querySelectorAll("[data-level-choice]");
  const authTabs = document.querySelectorAll("[data-auth-mode]");
  const panels = document.querySelectorAll("[data-auth-panel]");
  const levelPanel = document.getElementById("student-level-panel");
  const promoCodeInput = promoForm.querySelector('input[name="promoCode"]');
  const promoLevelPreview = document.getElementById("student-promo-level");
  const savedLevel = normalizeLevelKey(localStorage.getItem(STORAGE.currentLevel) || "cem");

  function selectLevel(level) {
    level = normalizeLevelKey(level);
    if (levelInput) levelInput.value = level;
    levelButtons.forEach((button) => {
      button.classList.toggle("active", normalizeLevelKey(button.dataset.levelChoice) === level);
    });
  }

  function setMode(mode) {
    authTabs.forEach((button) => {
      button.classList.toggle("active", button.dataset.authMode === mode);
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.authPanel !== mode;
    });
    if (levelPanel) levelPanel.hidden = mode !== "signup";
  }

  function updatePromoPreview() {
    if (!promoCodeInput || !promoLevelPreview) return;
    const assignment = findLabCodeAssignment(promoCodeInput.value);
    if (!assignment || getAssignmentType(assignment) !== "promo") {
      promoLevelPreview.hidden = true;
      promoLevelPreview.innerHTML = "";
      return;
    }
    const level = LEVEL_LABELS[normalizeLevelKey(assignment.level)] || LEVEL_LABELS.cem;
    const labCount = assignmentAllowedExperiments(assignment).length;
    promoLevelPreview.hidden = false;
    promoLevelPreview.innerHTML = dualText(
      `Niveau detecte : ${level.fr}. ${labCount} labo(x) disponible(s).`,
      `Detected level: ${level.en || level.fr}. ${labCount} lab(s) available.`,
      `Detected level: ${level.en}. ${labCount} lab(s) available.`
    );
  }

  levelButtons.forEach((button) => {
    button.addEventListener("click", () => selectLevel(button.dataset.levelChoice));
  });
  selectLevel(savedLevel);
  authTabs.forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.authMode || "signup"));
  });
  if (promoCodeInput) promoCodeInput.addEventListener("input", updatePromoPreview);
  setMode("signup");
  updatePromoPreview();

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(signupForm);
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const fullName = normalizeStudentFullName(firstName, lastName);
    const selectedLevel = normalizeLevelKey(data.get("level") || savedLevel || "cem");
    const students = readJson(STORAGE.students, []);
    const existingStudent = students.find((student) => String(student.name || "").toLowerCase() === fullName.toLowerCase());

    if (!firstName) {
      alert(getText({ fr: "Ecris ton prenom pour continuer.", ar: "Write your first name to continue.", en: "Write your first name to continue." }));
      return;
    }

    if (existingStudent) {
      alert(getText({
        fr: "Ce nom a deja un compte. Utilise l'onglet connexion avec ton code personnel.",
        ar: "This name already has an account. Use the login tab with your personal code.",
        en: "This name already has an account. Use the login section with your personal code."
      }));
      setMode("login");
      return;
    }

    const password = generateStudentPassword(fullName, selectedLevel, students);
    const nextStudent = {
      name: fullName,
      password,
      classCode: "DIRECT",
      level: selectedLevel,
      activeCode: "",
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    students.unshift(nextStudent);
    localStorage.setItem(STORAGE.students, JSON.stringify(students));
    localStorage.setItem(STORAGE.studentName, fullName);
    localStorage.setItem(STORAGE.studentClass, "DIRECT");
    localStorage.setItem(STORAGE.currentLevel, selectedLevel);
    localStorage.removeItem(STORAGE.currentSubject);
    localStorage.removeItem(STORAGE.activeLabCode);

    await showStudentPasswordModal(fullName, password);
    window.location.href = "dashboard.html";
  });

  promoForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(promoForm);
    const promoCode = normalizeLabCode(data.get("promoCode"));
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const fullName = normalizeStudentFullName(firstName, lastName);
    const assignment = findLabCodeAssignment(promoCode);
    const students = readJson(STORAGE.students, []);
    const existingStudent = students.find((student) => String(student.name || "").toLowerCase() === fullName.toLowerCase());

    if (!promoCode) {
      alert(getText({ fr: "Entre le code promo de ta classe.", ar: "Enter your class promo code.", en: "Enter your class promo code." }));
      return;
    }
    if (!assignment || getAssignmentType(assignment) !== "promo") {
      alert(getText({
        fr: "Ce code promo est introuvable ou ne correspond pas a un code de classe.",
        ar: "This promo code was not found or is not a class code.",
        en: "This promo code was not found or is not a class code."
      }));
      return;
    }
    if (!firstName) {
      alert(getText({ fr: "Ecris ton prenom pour continuer.", ar: "Write your first name to continue.", en: "Write your first name to continue." }));
      return;
    }
    if (existingStudent) {
      alert(getText({
        fr: "Ce nom a deja un compte. Utilise l'onglet connexion avec ton code personnel.",
        ar: "This name already has an account. Use the login tab with your personal code.",
        en: "This name already has an account. Use the login section with your personal code."
      }));
      setMode("login");
      return;
    }

    const selectedLevel = normalizeLevelKey(assignment.level || "cem");
    const password = generateStudentPassword(fullName, selectedLevel, students);
    const subject = defaultSubjectForAssignment(assignment);
    const nextStudent = {
      name: fullName,
      password,
      classCode: assignment.code,
      level: selectedLevel,
      activeCode: assignment.code,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    students.unshift(nextStudent);
    localStorage.setItem(STORAGE.students, JSON.stringify(students));
    localStorage.setItem(STORAGE.studentName, fullName);
    localStorage.setItem(STORAGE.studentClass, assignment.code);
    localStorage.setItem(STORAGE.currentLevel, selectedLevel);
    localStorage.setItem(STORAGE.activeLabCode, assignment.code);
    if (subject) localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
    else localStorage.removeItem(STORAGE.currentSubject);

    await showStudentPasswordModal(fullName, password);
    window.location.href = "dashboard.html";
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    const password = String(data.get("loginPassword") || "").trim();
    const students = readJson(STORAGE.students, []);
    const existingIdx = students.findIndex((student) => String(student.password || "") === password);
    if (!password) {
      alert(getText({ fr: "Entre ton code de connexion.", ar: "Enter your login code.", en: "Enter your login code." }));
      return;
    }
    if (existingIdx === -1) {
      alert(getText({ fr: "Code introuvable. Verifie le code genere lors de l'inscription.", ar: "Code not found. Check the code generated during signup.", en: "Code not found. Check the code generated during signup." }));
      return;
    }
    const existingStudent = students[existingIdx];
    const nextStudent = {
      ...existingStudent,
      lastLoginAt: new Date().toISOString()
    };
    students[existingIdx] = nextStudent;
    localStorage.setItem(STORAGE.students, JSON.stringify(students));
    localStorage.setItem(STORAGE.studentName, nextStudent.name);
    localStorage.setItem(STORAGE.studentClass, nextStudent.classCode || "DIRECT");
    localStorage.setItem(STORAGE.currentLevel, normalizeLevelKey(nextStudent.level || "cem"));
    localStorage.removeItem(STORAGE.currentSubject);
    localStorage.removeItem(STORAGE.activeLabCode);
    if (nextStudent.activeCode) {
      localStorage.setItem(STORAGE.activeLabCode, nextStudent.activeCode);
      const linkedAssignment = findLabCodeAssignment(nextStudent.activeCode);
      if (linkedAssignment) {
        const subject = defaultSubjectForAssignment(linkedAssignment);
        if (subject) localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
      }
    }
    window.location.href = "dashboard.html";
  });
}

function getAssistantReply(input, experimentId) {
  const normalized = input.trim().toLowerCase();
  const config = getExperimentConfig(experimentId);
  const lab = getLabDetails(experimentId);
  if (!normalized) return getText(assistantFallback());

  const greetingWords = ["hello", "hi", "bonjour", "salut", "مرحبا", "السلام", "salam", "اهلا"];
  const helpWords = ["help", "aide", "مساعدة"];
  const nextWords = ["next", "suivant", "التالي"];
  const errorWords = ["error", "wrong", "erreur", "خطأ"];
  const objectiveWords = ["objectif", "goal", "objective", "هدف"];
  const labWords = ["lab", "labo", "laboratoire", "مختبر"];
  const quizWords = ["quiz", "test", "اختبار"];
  const finishWords = ["finish", "terminer", "end", "إنهاء", "انهاء"];
  const statusWords = ["how are you", "how r u", "comment ça va", "comment ca va", "كيف حال", "كيفك"];
  const normalTalkWords = ["talk with me normal", "speak normally", "parle normalement", "تكلم معي بشكل عادي", "احكي معي عادي"];

  if (greetingWords.some((word) => normalized.includes(word))) return assistantGreeting(experimentId);
  if (statusWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: "Je vais bien, merci. Je peux parler avec vous normalement, et je peux aussi vous aider dans votre cours ou votre experience.",
      ar: "أنا بخير، شكرا لك. يمكنني التحدث معك بشكل طبيعي، ويمكنني أيضا مساعدتك في الدرس أو في التجربة.",
      en: "I'm doing well, thank you. I can talk with you normally, and I can also help with your lesson or experiment."
    });
  }
  if (normalTalkWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: "Bien sur. Je peux parler normalement avec vous. Dites-moi simplement ce que vous voulez savoir ou discuter.",
      ar: "بالطبع. يمكنني التحدث معك بشكل طبيعي. قل لي ببساطة ماذا تريد أن تعرف أو تناقش.",
      en: "Of course. I can talk with you normally. Just tell me what you want to know or discuss."
    });
  }
  if (helpWords.some((word) => normalized.includes(word))) return getText(config.help);
  if (objectiveWords.some((word) => normalized.includes(word))) return getText(config.intro);
  if (nextWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: `${config.next.fr} Et maintenant : ${currentStepHint(experimentId)}`,
      ar: `${config.next.ar} والخطوة الحالية هي: ${currentStepHint(experimentId)}`,
      en: `${config.next.en || config.next.fr} And now: ${currentStepHint(experimentId)}`
    });
  }
  if (errorWords.some((word) => normalized.includes(word))) return getText(config.error);
  if (labWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: `${lab.summary.fr} Ouvrez-le en grand si vous voulez travailler plus confortablement.`,
      ar: `${lab.summary.ar} ويمكنك فتحه بحجم كبير إذا أردت العمل براحة أكبر.`,
      en: `${lab.summary.en || lab.summary.fr} You can open it larger if you want to work more comfortably.`
    });
  }
  if (quizWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: "Quand vous avez termine la manipulation, cliquez sur le bouton de fin. Le quiz apparait ensuite avec 5 questions simples.",
      ar: "عندما تنهي التجربة اضغط على زر الإنهاء. بعد ذلك يظهر الاختبار وفيه 5 أسئلة بسيطة.",
      en: "When you finish the experiment, click the finish button. Then the quiz appears with 5 simple questions."
    });
  }
  if (finishWords.some((word) => normalized.includes(word))) {
    return getText({
      fr: "Validez les etapes que vous avez faites, puis utilisez le bouton de fin sous le labo pour passer au resultat.",
      ar: "أكد الخطوات التي أنجزتها ثم استعمل زر الإنهاء الموجود تحت المختبر للانتقال إلى النتيجة.",
      en: "Confirm the steps you completed, then use the finish button under the lab to move to the result."
    });
  }
  return getText({
    fr: `Je peux parler avec vous normalement et aussi vous aider dans ${config.title.fr}, l'objectif, les etapes, les erreurs frequentes ou le quiz.`,
    ar: `يمكنني التحدث معك بشكل عادي، ويمكنني أيضا مساعدتك في ${config.title.ar} والهدف والخطوات والأخطاء الشائعة والاختبار.`,
    en: `I can talk with you normally and also help you with ${config.title.en || config.title.fr}, the goal, the steps, common mistakes, or the quiz.`
  });
}

 function initPage() {
  bindGlobalUi();
  applyPageTitles();
  applyLanguage(currentLanguage());
  if (!ensureStudentSession()) return;
  const pageId = document.body.dataset.page;
  if (pageId === "index") initIndex();
  if (pageId === "student") initStudentForm();
  if (pageId === "dashboard") initDashboard();
  if (pageId === "experiences") initLevelExperiences();
  if (pageId === "experiment") initExperimentPage();
  if (pageId === "result") initResultPage();
  if (pageId === "quiz") initQuizPage();
  if (pageId === "teacher-login") initTeacherLogin();
  if (pageId === "teacher-dashboard") initTeacherDashboard();
  if (pageId === "admin-dashboard") initAdminDashboard();
  createAssistantWidget();
}

document.addEventListener("DOMContentLoaded", initPage);
