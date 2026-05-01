const STORAGE = {
  language: "virtulabLanguage",
  studentName: "studentName",
  studentClass: "studentClass",
  currentLevel: "currentLevel",
  currentSubject: "currentSubject",
  experimentScores: "experimentScores",
  quizScores: "quizScores",
  lastExperiment: "lastExperiment",
  lastResult: "virtulabLastResult",
  teacherLogged: "virtulabTeacherLogged",
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
    if (key !== STORAGE.language && key !== STORAGE.labCodes && key !== STORAGE.students) localStorage.removeItem(key);
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

function findLabCodeAssignment(code) {
  const normalized = normalizeLabCode(code);
  if (!normalized) return null;
  return readLabCodes().find((item) => normalizeLabCode(item.code) === normalized) || null;
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
  const subjectId = assignment ? (subjectForExperiment(assignment.experimentId, level)?.id || "") : params.get("subject");
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
      if (frame && frame.dataset.labLoaded !== "true") {
        setStatus(getText({
          fr: "Chargez et utilisez d'abord le labo 3D avant de terminer l'experience.",
          ar: "قم أولا بتحميل واستعمال المختبر الثلاثي الأبعاد قبل إنهاء التجربة."
        }));
        return;
      }
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

function initQuizPage() {
  const experimentId = localStorage.getItem(STORAGE.lastExperiment) || "circuit";
  const config = getExperimentConfig(experimentId);
  const title = document.querySelector("[data-quiz-title]");
  if (title) title.textContent = getText({ fr: `Quiz lie a l'experience : ${config.title.fr}.`, ar: `اختبار مرتبط بالتجربة: ${config.title.ar}.` });
  renderQuizQuestion({ experimentId, questions: config.quiz, index: 0, score: 0, answers: [] });
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
    const experiment = getExperimentConfig(item.experimentId);
    const level = LEVEL_LABELS[item.level] || LEVEL_LABELS.cem;
    return `
      <article class="generated-code-card">
        <div>
          <span class="code-value">${escapeHtml(item.code)}</span>
          <p class="code-meta">${escapeHtml(level.fr)} - ${escapeHtml(experiment.title.fr)}</p>
          <p class="code-meta">${escapeHtml(level.ar)} - ${escapeHtml(experiment.title.ar)}</p>
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
      button.innerHTML = dualText("Code pret", "الرمز جاهز");
    });
  });
}

function initLabCodeGenerator() {
  const form = document.getElementById("lab-code-form");
  if (!form) return;
  const levelSelect = form.querySelector('[name="codeLevel"]');
  const experimentSelect = form.querySelector('[name="codeExperiment"]');

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
  refreshExperimentOptions();
  renderLabCodeList();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const level = String(data.get("codeLevel") || "cem");
    const experimentId = String(data.get("codeExperiment") || "plante");
    const audience = EXPERIMENT_AUDIENCE[experimentId];
    if (audience && !audience.levels.includes(level)) {
      alert(getText({ fr: "Cette activite ne correspond pas a ce niveau.", ar: "هذا النشاط لا يناسب هذا المستوى." }));
      return;
    }
    const subject = subjectForExperiment(experimentId, level);
    const code = createReadableLabCode(level, experimentId);
    const codes = readLabCodes();
    codes.unshift({
      code,
      level,
      subjectId: subject ? subject.id : "",
      experimentId,
      createdAt: new Date().toISOString()
    });
    writeLabCodes(codes.slice(0, 12));
    renderLabCodeList();
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
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      history,
      labName: lab.name.fr
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
      input.value = button.textContent.trim();
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
      input.value = button.textContent.trim();
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
  const subjectId = assignment ? (subjectForExperiment(assignment.experimentId, level)?.id || "") : params.get("subject");
  if (subjectId) subject = (SUBJECTS[level] || []).find((item) => item.id === subjectId) || subject;
  if (!subject) subject = (SUBJECTS[level] || [])[0] || { fr: "Physique", ar: "الفيزياء", en: "Physics" };

  localStorage.setItem(STORAGE.currentLevel, level);
  localStorage.setItem(STORAGE.currentSubject, JSON.stringify(subject));
  if (assignment) localStorage.setItem(STORAGE.activeLabCode, assignment.code);

  const selectedSubjectId = subject.id || subjectId || "";
  const list = assignment
    ? (LEVEL_EXPERIENCES[level] || []).filter((item) => item.lab === assignment.experimentId)
    : (LEVEL_EXPERIENCES[level] || []).filter((item) => !selectedSubjectId || item.subjectId === selectedSubjectId);

  renderLevelExperiencePage(level, list);

  if (assignment) {
    const experiment = getExperimentConfig(assignment.experimentId);
    summary.innerHTML = dualText(
      `Code ${assignment.code} : une seule activite assignee par le professeur, ${experiment.title.fr}.`,
      `الرمز ${assignment.code}: نشاط واحد فقط حدده الأستاذ، ${experiment.title.ar}.`,
      `Code ${assignment.code}: one activity assigned by the teacher, ${experiment.title.en || experiment.title.fr}.`
    );
  } else {
    summary.innerHTML = dualText(
      `Voici ${list.length} experience(s) pour ${LEVEL_LABELS[level].fr} - ${subject.fr}.`,
      `هذه ${list.length} تجربة مناسبة لـ ${LEVEL_LABELS[level].ar} - ${subject.ar}.`,
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
    "teacher-dashboard": "EduVirtuel - Espace enseignant"
  };
  const pageId = document.body.dataset.page;
  if (pageId && titles[pageId]) document.title = titles[pageId];
}

function updateStudentBadge() {
  const teacherLogged = localStorage.getItem(STORAGE.teacherLogged) === "true";
  const studentName = localStorage.getItem(STORAGE.studentName) || "";
  const hasSession = teacherLogged || Boolean(studentName);
  const target = document.querySelector("[data-student-display]");
  document.querySelectorAll(".logout-btn").forEach((button) => {
    button.style.display = hasSession ? "inline-flex" : "none";
    button.setAttribute("aria-hidden", hasSession ? "false" : "true");
  });
  if (!target) return;
  if (teacherLogged) {
    target.textContent = "Espace enseignant";
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

function getAvailableSubjectsForLevel(level) {
  const experiences = LEVEL_EXPERIENCES[normalizeLevelKey(level)] || [];
  const availableSubjectIds = [...new Set(
    experiences
      .filter((item) => item.status === "available" && item.subjectId)
      .map((item) => item.subjectId)
  )];
  return (SUBJECTS[normalizeLevelKey(level)] || []).filter((subject) => availableSubjectIds.includes(subject.id));
}

function renderSubjects(level) {
  level = normalizeLevelKey(level);
  const subjectGrid = document.getElementById("subject-grid");
  if (!subjectGrid) return;
  const assignment = getActiveLabAssignment();

  if (assignment && normalizeLevelKey(assignment.level) === level) {
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

  const subjects = getAvailableSubjectsForLevel(level);
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

  subjectGrid.querySelectorAll(".subject-card").forEach((button) => {
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
  if (welcome) {
    welcome.innerHTML = studentName
      ? dualText(`Bienvenue ${studentName}. Ton niveau ${levelLabel.fr} est deja selectionne.`, `مرحبا ${studentName}. مستوى ${levelLabel.ar} محدد مسبقا.`, `Welcome ${studentName}. Your ${levelLabel.en} level is already selected.`)
      : dualText(`Ton niveau ${levelLabel.fr} est deja selectionne.`, `مستوى ${levelLabel.ar} محدد مسبقا.`, `Your ${levelLabel.en} level is already selected.`);
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
  if (localStorage.getItem(STORAGE.teacherLogged) !== "true") {
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
    fr: `Compte cree pour ${studentName}. Garde bien ce code pour la prochaine connexion.`,
    ar: `تم إنشاء الحساب باسم ${studentName}. احتفظ بهذا الرمز جيدا من أجل الدخول في المرة القادمة.`,
    en: `Account created for ${studentName}. Keep this code for your next login.`
  });
  code.textContent = password;
  status.textContent = "";
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
  const loginForm = document.getElementById("student-login-form");
  if (!signupForm || !loginForm) return;
  const levelInput = signupForm.querySelector('input[name="level"]');
  const levelButtons = document.querySelectorAll("[data-level-choice]");
  const authTabs = document.querySelectorAll("[data-auth-mode]");
  const panels = document.querySelectorAll("[data-auth-panel]");
  const levelPanel = document.getElementById("student-level-panel");
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

  levelButtons.forEach((button) => {
    button.addEventListener("click", () => selectLevel(button.dataset.levelChoice));
  });
  selectLevel(savedLevel);
  authTabs.forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.authMode || "signup"));
  });
  setMode("signup");

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
      alert(getText({
        fr: "Ecris ton prenom pour continuer.",
        ar: "اكتب اسمك للمتابعة.",
        en: "Write your first name to continue."
      }));
      return;
    }

    if (existingStudent) {
      alert(getText({
        fr: "Ce nom a deja un compte. Utilise l'onglet connexion avec ton code personnel.",
        ar: "هذا الاسم لديه حساب بالفعل. استعمل قسم الدخول مع رمزك الشخصي.",
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

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    const password = String(data.get("loginPassword") || "").trim();
    const students = readJson(STORAGE.students, []);
    const existingIdx = students.findIndex((student) => String(student.password || "") === password);
    if (!password) {
      alert(getText({
        fr: "Entre ton code de connexion.",
        ar: "أدخل رمز الدخول الخاص بك.",
        en: "Enter your login code."
      }));
      return;
    }
    if (existingIdx === -1) {
      alert(getText({
        fr: "Code introuvable. Verifie le code genere lors de l'inscription.",
        ar: "الرمز غير موجود. تحقق من الرمز الذي تم إنشاؤه عند التسجيل.",
        en: "Code not found. Check the code generated during signup."
      }));
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
        const subject = subjectForExperiment(linkedAssignment.experimentId, linkedAssignment.level);
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
  createAssistantWidget();
}

document.addEventListener("DOMContentLoaded", initPage);
