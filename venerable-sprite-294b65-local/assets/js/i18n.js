// ─── i18n Translation System ───
const TRANSLATIONS = {
  ar: {
    // General
    siteName: 'منصة التعلم التفاعلية',
    siteSubtitle: 'مختبرات افتراضية · اختبارات · محاكاة',

    // Nav
    navHome: 'الرئيسية',
    navLabs: 'المختبرات',
    navQuiz: 'الاختبارات',
    navContact: 'تواصل',
    navProfLogin: 'دخول الأستاذ',

    // Hero
    heroTitle: 'منصة التعلم التفاعلية',
    heroSubtitle: 'اكتشف المختبرات الافتراضية، أجب على الاختبارات، وشاهد المحاكاة العلمية — بدون تسجيل دخول.',
    publishedLabs: 'المختبرات المنشورة',
    publishedQuizzes: 'الاختبارات المنشورة',
    studentReplies: 'ردود الطلاب',

    // Visitor
    visitorSpace: 'فضاء الزائر',
    labsSection: 'المختبرات',
    quizSection: 'الاختبارات',
    repliesSection: 'الردود الأخيرة',
    openLab: 'فتح المختبر',
    labLocked: 'غير متاح',
    filterAll: 'الكل',
    filterSubject: 'المادة',
    filterLevel: 'المستوى',
    filterAvailable: 'المتاحة فقط',
    noLabsPublished: 'لا توجد مختبرات منشورة حاليا',
    noQuizzesPublished: 'لا توجد اختبارات منشورة حاليا',
    noRepliesYet: 'لا توجد ردود بعد',

    // Quiz
    yourName: 'اسمك',
    namePlaceholder: 'مثال: أحمد',
    submitAnswer: 'إرسال الإجابة',
    correct: 'إجابة صحيحة!',
    incorrect: 'إجابة خاطئة. الجواب الصحيح هو:',

    // Replies
    answeredQuiz: 'أجاب على:',
    selectedAnswer: 'الإجابة:',

    // Lab Viewer
    labViewer: 'عرض المختبر',
    closeLab: 'إغلاق المختبر',

    // Professor
    profSpace: 'فضاء الأستاذ',
    dashboard: 'لوحة التحكم',
    login: 'تسجيل الدخول',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    loginBtn: 'دخول',
    loginError: 'اسم المستخدم أو كلمة المرور غير صحيحة',
    logout: 'خروج',

    // Dashboard tabs
    tabLabs: 'المختبرات',
    tabQuizzes: 'الاختبارات',
    tabReplies: 'الردود',

    // Lab form
    addLab: 'إضافة مختبر جديد',
    editLab: 'تعديل المختبر',
    labTitleAr: 'العنوان (عربي)',
    labTitleFr: 'العنوان (فرنسي)',
    labDescAr: 'الوصف (عربي)',
    labDescFr: 'الوصف (فرنسي)',
    labSubject: 'المادة',
    labLevel: 'المستوى',
    labType: 'نوع المختبر',
    labAvailable: 'متاح',
    labPublished: 'منشور',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    publish: 'نشر',
    unpublish: 'إلغاء النشر',
    confirmDelete: 'هل أنت متأكد من الحذف؟',

    // Quiz form
    addQuiz: 'إضافة اختبار جديد',
    editQuiz: 'تعديل الاختبار',
    quizTitleAr: 'العنوان (عربي)',
    quizTitleFr: 'العنوان (فرنسي)',
    quizQuestionAr: 'السؤال (عربي)',
    quizQuestionFr: 'السؤال (فرنسي)',
    optionAr: 'الخيار (عربي)',
    optionFr: 'الخيار (فرنسي)',
    markCorrect: 'الإجابة الصحيحة',

    // Subjects
    physics: 'الفيزياء',
    chemistry: 'الكيمياء',
    biology: 'العلوم',
    electricity: 'الكهرباء',

    // Levels
    cem: 'متوسط',
    lycee: 'ثانوي',

    // Lab types
    typePhysics: 'فيزياء',
    typeCircuit: 'دارة كهربائية',
    typeBiology: 'أحياء',
    typeChemistry: 'كيمياء',
    typeUnity: 'Unity WebGL',

    // Replies management
    clearAll: 'حذف الكل',
    confirmClearAll: 'هل أنت متأكد من حذف جميع الردود؟',

    // Chatbot
    chatbotTitle: 'مساعد المختبر',
    chatbotSubtitle: 'Gemini',
    chatbotGreeting: 'مرحبا! أنا مساعدك الذكي. اسألني عن الفيزياء، الكيمياء، الأحياء أو أي تجربة.',
    chatbotPlaceholder: 'اكتب سؤالك هنا...',
    chatbotSend: 'إرسال',
    chatbotTyping: 'جاري الكتابة...',
    chatbotError: 'حدث خطأ. حاول مرة أخرى.',

    // Footer
    footerText: 'منصة التعلم التفاعلية — جميع الحقوق محفوظة',

    // Status
    available: 'متاح',
    unavailable: 'غير متاح',
    published: 'منشور',
    draft: 'مسودة',

    // Empty states
    emptyLabsTitle: 'لا توجد مختبرات',
    emptyLabsDesc: 'لم يتم نشر أي مختبر بعد. ترقب جديدنا!',
    emptyQuizzesTitle: 'لا توجد اختبارات',
    emptyQuizzesDesc: 'لم يتم نشر أي اختبار بعد.',
    emptyRepliesTitle: 'لا توجد ردود',
    emptyRepliesDesc: 'لم يقم أحد بالإجابة على الاختبارات بعد.',

    // Default credentials
    defaultCreds: 'بيانات الدخول الافتراضية',
    defaultUser: 'اسم الدخول',
    defaultPass: 'كلمة المرور'
  },

  fr: {
    siteName: 'Plateforme d\'Apprentissage Interactif',
    siteSubtitle: 'Laboratoires virtuels · Quiz · Simulations',

    navHome: 'Accueil',
    navLabs: 'Laboratoires',
    navQuiz: 'Quiz',
    navContact: 'Contact',
    navProfLogin: 'Espace Professeur',

    heroTitle: 'Plateforme d\'Apprentissage Interactif',
    heroSubtitle: 'Explorez les laboratoires virtuels, répondez aux quiz et regardez les simulations scientifiques — sans inscription.',
    publishedLabs: 'Laboratoires publiés',
    publishedQuizzes: 'Quiz publiés',
    studentReplies: 'Réponses étudiants',

    visitorSpace: 'Espace Visiteur',
    labsSection: 'Laboratoires',
    quizSection: 'Quiz',
    repliesSection: 'Réponses récentes',
    openLab: 'Ouvrir le Labo',
    labLocked: 'Non disponible',
    filterAll: 'Tout',
    filterSubject: 'Matière',
    filterLevel: 'Niveau',
    filterAvailable: 'Disponibles uniquement',
    noLabsPublished: 'Aucun laboratoire publié pour le moment',
    noQuizzesPublished: 'Aucun quiz publié pour le moment',
    noRepliesYet: 'Aucune réponse pour le moment',

    yourName: 'Votre nom',
    namePlaceholder: 'Ex: Ahmed',
    submitAnswer: 'Soumettre',
    correct: 'Bonne réponse !',
    incorrect: 'Mauvaise réponse. La bonne réponse est :',

    answeredQuiz: 'A répondu à :',
    selectedAnswer: 'Réponse :',

    labViewer: 'Visualisation du Labo',
    closeLab: 'Fermer le Labo',

    profSpace: 'Espace Professeur',
    dashboard: 'Tableau de Bord',
    login: 'Connexion',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    loginBtn: 'Se connecter',
    loginError: 'Nom d\'utilisateur ou mot de passe incorrect',
    logout: 'Déconnexion',

    tabLabs: 'Laboratoires',
    tabQuizzes: 'Quiz',
    tabReplies: 'Réponses',

    addLab: 'Ajouter un Laboratoire',
    editLab: 'Modifier le Laboratoire',
    labTitleAr: 'Titre (Arabe)',
    labTitleFr: 'Titre (Français)',
    labDescAr: 'Description (Arabe)',
    labDescFr: 'Description (Français)',
    labSubject: 'Matière',
    labLevel: 'Niveau',
    labType: 'Type de Labo',
    labAvailable: 'Disponible',
    labPublished: 'Publié',
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    publish: 'Publier',
    unpublish: 'Dépublier',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer ?',

    addQuiz: 'Ajouter un Quiz',
    editQuiz: 'Modifier le Quiz',
    quizTitleAr: 'Titre (Arabe)',
    quizTitleFr: 'Titre (Français)',
    quizQuestionAr: 'Question (Arabe)',
    quizQuestionFr: 'Question (Français)',
    optionAr: 'Option (Arabe)',
    optionFr: 'Option (Français)',
    markCorrect: 'Réponse correcte',

    physics: 'Physique',
    chemistry: 'Chimie',
    biology: 'Sciences',
    electricity: 'Électricité',

    cem: 'CEM',
    lycee: 'Lycée',

    typePhysics: 'Physique',
    typeCircuit: 'Circuit électrique',
    typeBiology: 'Biologie',
    typeChemistry: 'Chimie',
    typeUnity: 'Unity WebGL',

    clearAll: 'Tout supprimer',
    confirmClearAll: 'Êtes-vous sûr de vouloir supprimer toutes les réponses ?',

    chatbotTitle: 'Assistant Labo',
    chatbotSubtitle: 'Gemini',
    chatbotGreeting: 'Bonjour ! Je suis votre assistant intelligent. Posez-moi des questions sur la physique, la chimie, la biologie ou toute expérience.',
    chatbotPlaceholder: 'Tapez votre question ici...',
    chatbotSend: 'Envoyer',
    chatbotTyping: 'En cours de saisie...',
    chatbotError: 'Une erreur est survenue. Veuillez réessayer.',

    footerText: 'Plateforme d\'Apprentissage Interactif — Tous droits réservés',

    available: 'Disponible',
    unavailable: 'Non disponible',
    published: 'Publié',
    draft: 'Brouillon',

    emptyLabsTitle: 'Aucun laboratoire',
    emptyLabsDesc: 'Aucun laboratoire n\'a été publié. Restez à l\'écoute !',
    emptyQuizzesTitle: 'Aucun quiz',
    emptyQuizzesDesc: 'Aucun quiz n\'a été publié.',
    emptyRepliesTitle: 'Aucune réponse',
    emptyRepliesDesc: 'Personne n\'a encore répondu aux quiz.',

    defaultCreds: 'Identifiants par défaut',
    defaultUser: 'Utilisateur',
    defaultPass: 'Mot de passe'
  }
};

let currentLang = localStorage.getItem('edu-lang') || 'ar';

function t(key) {
  return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['ar']?.[key] || key;
}

function getLang() {
  return currentLang;
}

function setLang(lang) {
  if (lang !== 'ar' && lang !== 'fr') return;
  currentLang = lang;
  localStorage.setItem('edu-lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function toggleLang() {
  setLang(currentLang === 'ar' ? 'fr' : 'ar');
}

function localizedField(obj, field) {
  if (currentLang === 'fr') {
    return obj[field + 'Fr'] || obj[field + 'Ar'] || obj[field] || '';
  }
  return obj[field + 'Ar'] || obj[field + 'Fr'] || obj[field] || '';
}

// Apply language on load
document.documentElement.lang = currentLang;
document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

export { TRANSLATIONS, t, getLang, setLang, toggleLang, localizedField, currentLang };
