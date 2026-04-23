export const TRANSLATIONS = {
      ar: {
        page: {
          title: 'مختبرات العلوم الافتراضية'
        },
        lab: {
          physics: 'فيزياء ثلاثية الأبعاد',
          circuit: 'مختبر الدوائر',
          biology: 'علوم CEM',
          chemistry: 'كيمياء ثانوي'
        },
        biology: {
          eyebrow: 'علوم CEM',
          title: 'امتصاص النبات للماء الملوّن',
          subtitle: 'أضف الماء الملوّن ثم راقب كيف تتلوّن الأوراق والزهرة تدريجياً بلون الصبغة بعد أن يمتص النبات الماء عبر الساق.',
          stageLabel: 'مشهد ثلاثي الأبعاد',
          stageTitle: 'ساق شفاف يبيّن حركة الماء',
          dropBanner: 'أسقط الأدوات هنا لتبدأ التجربة',
          stats: {
            levelLabel: 'المستوى',
            levelValue: 'علوم CEM',
            sceneLabel: 'المشهد',
            sceneValue: 'كأس ماء + نبتة بيضاء'
          },
          progress: {
            waterLabel: 'الماء',
            leafLabel: 'الأوراق'
          },
          actions: {
            addDye: 'أضف الملون',
            placePlant: 'ضع النبات',
            observe: 'ابدأ الملاحظة',
            reset: 'إعادة التجربة'
          },
          palette: {
            title: 'أدوات التجربة',
            hint: 'اسحب الأداة وأسقطها داخل المشهد'
          },
          objects: {
            dye: 'ملون غذائي أحمر',
            plant: 'نبتة بيضاء'
          },
          tools: {
            label: 'الأدوات',
            value: 'نبتة صغيرة أو زهرة بيضاء، كأس ماء، وملون غذائي أحمر.'
          },
          observation: {
            title: 'ماذا نلاحظ؟',
            idle: 'الأوراق والزهرة لا تزال بيضاء.',
            dyeAdded: 'أصبح الماء ملوّنًا، لكن النبات لم يدخل الكأس بعد.',
            plantPlaced: 'النبات داخل الماء الملوّن، والصبغة ستبدأ بالصعود عبر الساق.',
            running: 'الصبغة تصعد عبر الساق وتبدأ الأوراق والزهرة بالتلوّن تدريجيًا باللون الأحمر.',
            complete: 'تلوّنت الأوراق والزهرة بوضوح باللون الأحمر — التجربة ناجحة!'
          },
          result: {
            title: 'النتيجة',
            idle: 'أضف الملون إلى الماء ثم ضع النبتة لترى الأوراق والزهرة تتلوّن.',
            running: 'الصبغة تنتقل من الماء عبر الساق نحو الأوراق والزهرة فتتلوّن.',
            complete: 'النبات يمتص الماء الملوّن عبر أوعية ناقلة في الساق، فتصل الصبغة إلى الأوراق والزهرة وتتلوّن.'
          },
          status: {
            idle: 'جهّز الكأس ثم أضف الملون وضع النبتة لترى الأوراق تتلوّن.',
            needPlant: 'أضفت الملون، والآن ضع النبتة في الكأس لترى تلوّن الأوراق.',
            needDye: 'النبتة موجودة، أضف الملون الأحمر حتى نرى التلوّن.',
            ready: 'كل شيء جاهز. الصبغة ستبدأ بالصعود وتلوّن الأوراق.',
            running: 'الصبغة تصعد في الساق... راقب الأوراق والزهرة!',
            complete: 'التجربة اكتملت: الأوراق والزهرة تلوّنت باللون الأحمر.'
          },
          readouts: {
            waterClear: 'شفاف',
            waterColored: 'ملوّن بالأحمر',
            leafWhite: 'بيضاء',
            leafTinted: 'تلوّنت بالأحمر'
          },
          explanationHtml: '<strong>التفسير:</strong> داخل الساق أوعية ناقلة تنقل الماء من الجذور إلى الأعلى. الصبغة تصعد مع الماء وتصل إلى الأوراق والزهرة فتتلوّن تدريجياً بلون الملون.'
        },
        physics: {
          eyebrow: 'مختبر عبر المتصفح',
          title: 'مختبر الفيزياء',
          subtitle: 'حرّك الأجهزة وشغّل التجارب وشاهد نتائج مختبر ثلاثي الأبعاد تفاعلي مباشرة داخل المتصفح.',
          display: {
            label: 'العرض',
            value: 'وضع سطح المكتب'
          },
          freefall: {
            title: 'السقوط الحر',
            chip: 'البرج',
            drop: 'أفلت الكرة',
            height: 'الارتفاع',
            time: 'الزمن',
            waiting: 'جارٍ القياس...',
            impactWaiting: 'بانتظار الاصطدام'
          },
          resetLab: 'إعادة ضبط المختبر',
          incline: {
            title: 'المستوى المائل',
            chip: 'المنحدر',
            angleLabel: 'الزاوية',
            theory: 'النظرية'
          },
          scale: {
            title: 'الميزان الرقمي',
            chip: 'الكتلة',
            readingLabel: 'القراءة'
          },
          pendulum: {
            title: 'البندول',
            chip: 'التذبذب',
            reset: 'إعادة ضبط البندول',
            period: 'الزمن الدوري',
            angle: 'الزاوية'
          },
          collision: {
            title: 'تصادم المسار الهوائي',
            chip: 'الزخم',
            launch: 'إطلاق',
            status: 'الحالة',
            ready: 'جاهز لإطلاق العربتين.',
            launching: 'جارٍ إطلاق العربة أ نحو العربة ب...',
            initialMomentum: 'الزخم الابتدائي',
            finalMomentum: 'الزخم النهائي',
            velocities: 'السرعات'
          },
          controlsHtml: '<strong>التحكم</strong><br />اسحب بزر الفأرة الأيسر لتحريك الأدوات.<br />اسحب بزر الفأرة الأيمن فوق المساحة الفارغة لتدوير الكاميرا.<br />استخدم عجلة الفأرة للتكبير نحو الأجهزة.',
          hintHtml: '<strong>جرّب هذا:</strong> غيّر زاوية المستوى المائل، وضع الكتل على الميزان، ثم اسحب كرة البندول جانبياً قبل إفلاتها.',
          units: {
            meter: 'م',
            second: 'ث',
            acceleration: 'م/ث²',
            momentum: 'كغ·م/ث',
            velocity: 'م/ث'
          }
        },
        circuit: {
          eyebrow: 'محطة كهرباء',
          title: 'مختبر الدوائر الكهربائية',
          subtitle: 'اعمل كما في طاولة كهرباء حقيقية: البطارية والقاطع والمصباح موضوعات على المنصة ويمكنك إكمال التوصيلات مباشرة.',
          boardGuide: {
            title: 'لوحة شرح الطاولة',
            powerLabel: 'POWER UNIT',
            powerText: 'ابدأ من طرف البطارية ثم ارجع في النهاية إلى القطب السالب لإغلاق الدارة.',
            switchLabel: 'SWITCH',
            switchText: 'انقر على القاطع بعد التوصيل لتبديل الدارة بين الفتح والإغلاق.',
            lampLabel: 'LAMP',
            lampText: 'المصباح يضيء فقط إذا صار المسار متصلاً بالكامل من الموجب إلى السالب.',
            wireLabel: 'WIRING',
            wireText: 'انقر على منفذ ثم منفذ آخر لصنع سلك. زر الفأرة الأيمن يحذف السلك.'
          },
          briefTitle: 'المهمة العملية',
          briefText: 'كوّن دارة تسلسلية على الطاولة: صِل القطب الموجب للبطارية بالقاطع، ثم بالمصباح، وأعد المسار إلى القطب السالب.',
          kitLabel: 'خزانة الأدوات',
          kitTitle: 'مكوّنات المحطة',
          kitChip: 'دارة تسلسلية',
          battery: {
            name: 'بطارية',
            desc: '6V مع قطبين + و -',
            tip: 'اسحبها إلى اللوح لتغذية الدائرة.'
          },
          bulb: {
            name: 'مصباح',
            desc: 'يتوهج عند مرور التيار',
            tip: 'يتحرك بتأثير ضوئي نابض عندما تكتمل الدائرة.'
          },
          switch: {
            name: 'قاطع',
            desc: 'افتح واغلق المسار بالنقر',
            tip: 'بدله بين وضعية الفتح والاغلاق في الزمن الحقيقي.'
          },
          note: 'المحطة تبدأ مجهزة بعناصر أساسية على الطاولة. انقر على منفذ لبدء سلك جديد، ثم على منفذ آخر لإكماله. انقر بزر الفأرة الأيمن على أي سلك لحذفه.',
          hintHtml: '<strong>هدف التجربة:</strong> أوصل البطارية بالقاطع ثم بالمصباح وارجع إلى القطب السالب. بعد إغلاق الدائرة انقر على القاطع لتلاحظ الإضاءة كما في المختبر.',
          delete: 'حذف السلك المحدد',
          reset: 'إعادة تجهيز الطاولة',
          readouts: {
            lamp: 'المصباح',
            lampOn: 'مضاء',
            lampOff: 'غير مضاء',
            switch: 'القاطع',
            switchOpen: 'مفتوح',
            switchClosed: 'مغلق',
            wires: 'الأسلاك',
            components: 'العناصر'
          },
          status: {
            initial: 'المحطة فارغة — اسحب مكونات إلى الطاولة',
            ready: 'المحطة جاهزة — أوصل البطارية بالقاطع ثم بالمصباح',
            open: '🔴 الدائرة مفتوحة — أكمل مسار العودة إلى البطارية',
            closed: '✅ الدائرة مغلقة — المصباح يعمل كما في المختبر'
          }
        },
        chemistry: {
          eyebrow: 'كيمياء ثانوي',
          title: 'تفاعل معدن مع حمض',
          subtitle: 'أدخل الزنك ثم أضف حمض كلور الماء وشاهد تكون الفقاعات وغاز الهيدروجين في تجربة كيمياء ثانوي بأسلوب غامر.',
          stageLabel: 'مشهد تفاعلي',
          stageTitle: 'أنبوب اختبار وفقاعات غاز',
          dropBanner: 'أسقط المواد هنا لبدء التفاعل',
          stats: {
            levelLabel: 'المستوى',
            levelValue: 'كيمياء ثانوي',
            reactionLabel: 'التفاعل',
            reactionValue: 'Zn + HCl'
          },
          progress: {
            gasLabel: 'الغاز',
            flameLabel: 'اختبار اللهب'
          },
          actions: {
            addZinc: 'أدخل الزنك',
            addAcid: 'أضف الحمض',
            testGas: 'اختبر الغاز',
            reset: 'إعادة التجربة'
          },
          palette: {
            title: 'أدوات التفاعل',
            hint: 'اسحب المادة أو أداة الاختبار ثم أسقطها داخل المشهد'
          },
          objects: {
            zinc: 'شريط زنك',
            acid: 'حمض HCl',
            flame: 'لهب الاختبار'
          },
          tools: {
            label: 'الأدوات',
            value: 'قطعة زنك Zn، حمض كلور الماء HCl، وأنبوب اختبار مع حامل.'
          },
          observation: {
            title: 'ماذا نلاحظ؟',
            idle: 'لا توجد فقاعات بعد، لأن التفاعل لم يبدأ.',
            zincOnly: 'الزنك داخل الأنبوب، لكننا نحتاج الحمض لبدء التفاعل.',
            reaction: 'تظهر فقاعات كثيرة حول الزنك ثم تصعد للأعلى مع تصاعد غاز الهيدروجين.',
            gasReady: 'تراكم الغاز وأصبح جاهزًا لاختبار اللهب.',
            tested: 'عند تقريب عود ثقاب مشتعل نلاحظ لهبًا أزرق خفيفًا مع فرقعة صغيرة (pop).'
          },
          result: {
            title: 'الناتج',
            idle: 'بعد إضافة الحمض سيتكون غاز الهيدروجين H₂ وملح كلوريد الزنك ZnCl₂.',
            running: 'التفاعل جارٍ: الزنك يستهلك الحمض ويحرر فقاعات غازية.',
            complete: 'النتيجة واضحة: يتشكل غاز الهيدروجين H₂ ويتكون أيضًا محلول ZnCl₂.'
          },
          status: {
            idle: 'ابدأ بوضع الزنك داخل الأنبوب ثم أضف الحمض لمشاهدة التفاعل.',
            needZinc: 'أدخل قطعة الزنك أولاً ثم أضف الحمض.',
            needAcid: 'الزنك موجود. أضف حمض كلور الماء لبدء التفاعل.',
            reacting: 'التفاعل بدأ وتظهر الفقاعات داخل الأنبوب.',
            readyForTest: 'الغاز تكوّن. الآن قرّب اللهب لاختباره.',
            complete: 'تم تأكيد غاز الهيدروجين: لهب أزرق مع فرقعة خفيفة.'
          },
          readouts: {
            gasNone: 'غير ظاهر',
            gasEvolving: 'يتشكل',
            gasReady: 'جاهز للاختبار',
            flameWaiting: 'بانتظار الاختبار',
            flameSuccess: 'لهب أزرق'
          },
          equationHtml: '<strong>المعادلة:</strong> Zn + 2HCl → H₂ + ZnCl₂'
        },
        common: {
          error: 'خطأ',
          dragDrop: 'اسحب وأسقط'
        }
      },
      fr: {
        page: {
          title: 'Laboratoires virtuels de sciences'
        },
        lab: {
          physics: 'Physique 3D',
          circuit: 'Laboratoire électrique',
          biology: 'Sciences CEM',
          chemistry: 'Chimie lycée'
        },
        biology: {
          eyebrow: 'Sciences CEM',
          title: 'Coloration des feuilles et de la fleur',
          subtitle: 'Ajoutez de l eau coloree puis observez comment les feuilles et la fleur se colorent progressivement apres que la plante ait absorbe le colorant.',
          stageLabel: 'Scene 3D',
          stageTitle: 'Tige translucide et eau coloree',
          dropBanner: 'Deposez les objets ici pour lancer l experience',
          stats: {
            levelLabel: 'Niveau',
            levelValue: 'Sciences CEM',
            sceneLabel: 'Scene',
            sceneValue: 'Verre d eau et plante blanche'
          },
          progress: {
            waterLabel: 'Eau',
            leafLabel: 'Feuilles'
          },
          actions: {
            addDye: 'Ajouter le colorant',
            placePlant: 'Placer la plante',
            observe: 'Lancer l observation',
            reset: 'Reinitialiser'
          },
          palette: {
            title: 'Objets du TP',
            hint: 'Glissez un objet puis deposez-le dans la scene'
          },
          objects: {
            dye: 'Colorant rouge',
            plant: 'Plante blanche'
          },
          tools: {
            label: 'Materiel',
            value: 'Une petite plante ou fleur blanche, un verre d eau et un colorant alimentaire rouge.'
          },
          observation: {
            title: 'Que voit-on ?',
            idle: 'Les feuilles et la fleur sont encore blanches.',
            dyeAdded: 'L eau est coloree, mais la plante n est pas encore dans le verre.',
            plantPlaced: 'La plante est en place, le colorant va commencer a monter dans la tige.',
            running: 'Le colorant monte dans la tige et les feuilles et la fleur commencent a se teinter en rouge.',
            complete: 'Les feuilles et la fleur sont clairement colorees en rouge — experience reussie !'
          },
          result: {
            title: 'Conclusion',
            idle: 'Ajoutez le colorant puis placez la plante pour observer les feuilles se colorer.',
            running: 'Le colorant monte de l eau a travers la tige vers les feuilles et la fleur.',
            complete: 'La plante absorbe l eau coloree par des vaisseaux conducteurs dans la tige, le colorant atteint les feuilles et la fleur.'
          },
          status: {
            idle: 'Preparez le verre, ajoutez le colorant puis placez la plante pour voir les feuilles se colorer.',
            needPlant: 'Le colorant est pret. Placez la plante pour observer ses feuilles se teinter.',
            needDye: 'La plante est en place. Ajoutez le colorant rouge pour voir la coloration.',
            ready: 'Tout est pret. Le colorant va monter et teinter les feuilles.',
            running: 'Le colorant monte dans la tige... observez les feuilles et la fleur !',
            complete: 'Experience terminee : les feuilles et la fleur sont colorees en rouge.'
          },
          readouts: {
            waterClear: 'Claire',
            waterColored: 'Coloree en rouge',
            leafWhite: 'Blanches',
            leafTinted: 'Colorees en rouge'
          },
          explanationHtml: '<strong>Explication :</strong> des vaisseaux conducteurs dans la tige transportent l eau vers le haut, le colorant monte avec l eau et atteint les feuilles et la fleur qui se colorent progressivement.'
        },
        physics: {
          eyebrow: 'Labo dans le navigateur',
          title: 'Laboratoire de physique',
          subtitle: 'Déplacez les appareils, lancez les expériences et observez les résultats d’un laboratoire 3D interactif directement dans le navigateur.',
          display: {
            label: 'Affichage',
            value: 'Mode bureau'
          },
          freefall: {
            title: 'Chute libre',
            chip: 'Tour',
            drop: 'Lâcher la bille',
            height: 'Hauteur',
            time: 'Temps',
            waiting: 'Mesure en cours...',
            impactWaiting: 'Impact en attente'
          },
          resetLab: 'Réinitialiser le labo',
          incline: {
            title: 'Plan incliné',
            chip: 'Rampe',
            angleLabel: 'Angle',
            theory: 'Théorie'
          },
          scale: {
            title: 'Balance numérique',
            chip: 'Masse',
            readingLabel: 'Lecture'
          },
          pendulum: {
            title: 'Pendule',
            chip: 'Oscillation',
            reset: 'Réinitialiser le pendule',
            period: 'Période',
            angle: 'Angle'
          },
          collision: {
            title: 'Collision sur rail à air',
            chip: 'Quantité de mouvement',
            launch: 'Lancer',
            status: 'État',
            ready: 'Prêt à lancer les deux chariots.',
            launching: 'Lancement du chariot A vers le chariot B...',
            initialMomentum: 'Quantité de mouvement initiale',
            finalMomentum: 'Quantité de mouvement finale',
            velocities: 'Vitesses'
          },
          controlsHtml: '<strong>Commandes</strong><br />Faites glisser avec le clic gauche pour déplacer les instruments.<br />Faites glisser avec le clic droit sur l’espace vide pour tourner la caméra.<br />Utilisez la molette pour zoomer vers les appareils.',
          hintHtml: '<strong>Essayez ceci :</strong> modifiez l’angle du plan incliné, posez des masses sur la balance, puis tirez la bille du pendule sur le côté avant de la relâcher.',
          units: {
            meter: 'm',
            second: 's',
            acceleration: 'm/s²',
            momentum: 'kg·m/s',
            velocity: 'm/s'
          }
        },
        circuit: {
          eyebrow: 'Paillasse électrique',
          title: 'Laboratoire des circuits électriques',
          subtitle: 'Travaillez comme sur une vraie paillasse d’électricité : la batterie, l’interrupteur et l’ampoule sont posés sur la table et vous câblez le montage en direct.',
          boardGuide: {
            title: 'Tableau de la paillasse',
            powerLabel: 'POWER UNIT',
            powerText: 'Commencez à la borne positive de la batterie puis revenez à la borne négative pour fermer le circuit.',
            switchLabel: 'SWITCH',
            switchText: 'Cliquez sur l’interrupteur après le câblage pour ouvrir ou fermer le circuit.',
            lampLabel: 'LAMP',
            lampText: 'La lampe ne s’allume que si le trajet complet relie bien le positif au négatif.',
            wireLabel: 'WIRING',
            wireText: 'Cliquez sur une borne puis sur une autre pour créer un fil. Le clic droit supprime un fil.'
          },
          briefTitle: 'Manipulation',
          briefText: 'Réalisez un circuit en série sur la paillasse : reliez la borne positive de la batterie à l’interrupteur, puis à l’ampoule, et revenez à la borne négative.',
          kitLabel: 'Coffret',
          kitTitle: 'Matériel de poste',
          kitChip: 'Montage en série',
          battery: {
            name: 'Batterie',
            desc: '6 V avec bornes + et -',
            tip: 'Faites-la glisser sur la plaque pour alimenter le circuit.'
          },
          bulb: {
            name: 'Ampoule',
            desc: 'Brille quand le courant passe',
            tip: 'S’illumine avec une animation douce quand le circuit est fermé.'
          },
          switch: {
            name: 'Interrupteur',
            desc: 'Cliquez pour ouvrir ou fermer',
            tip: 'Bascule en temps réel entre l’état ouvert et fermé.'
          },
          note: 'Le poste démarre déjà équipé sur la table. Cliquez sur une borne pour démarrer un fil, puis sur une autre pour le terminer. Faites un clic droit sur un fil pour le supprimer.',
          hintHtml: '<strong>Objectif :</strong> reliez la batterie, l’interrupteur et l’ampoule comme dans un vrai TP. Une fois le circuit fermé, cliquez sur l’interrupteur pour voir la lampe réagir.',
          delete: 'Supprimer le fil choisi',
          reset: 'Réinstaller la paillasse',
          readouts: {
            lamp: 'Lampe',
            lampOn: 'Allumée',
            lampOff: 'Éteinte',
            switch: 'Interrupteur',
            switchOpen: 'Ouvert',
            switchClosed: 'Fermé',
            wires: 'Fils',
            components: 'Éléments'
          },
          status: {
            initial: 'Poste vide — ajoutez des composants sur la table',
            ready: 'Poste prêt — reliez la batterie, l’interrupteur et l’ampoule',
            open: '🔴 Circuit ouvert — complétez le retour vers la batterie',
            closed: '✅ Circuit fermé — l’ampoule fonctionne comme au labo'
          }
        },
        chemistry: {
          eyebrow: 'Chimie lycee',
          title: 'Reaction d un metal avec un acide',
          subtitle: 'Placez le zinc puis ajoutez l acide chlorhydrique pour observer les bulles et la production de dihydrogene dans une scene de chimie immersive.',
          stageLabel: 'Scene interactive',
          stageTitle: 'Tube a essai et bulles de gaz',
          dropBanner: 'Deposez les produits ici pour demarrer la reaction',
          stats: {
            levelLabel: 'Niveau',
            levelValue: 'Chimie lycee',
            reactionLabel: 'Reaction',
            reactionValue: 'Zn + HCl'
          },
          progress: {
            gasLabel: 'Gaz',
            flameLabel: 'Test de flamme'
          },
          actions: {
            addZinc: 'Ajouter le zinc',
            addAcid: 'Ajouter l acide',
            testGas: 'Tester le gaz',
            reset: 'Reinitialiser'
          },
          palette: {
            title: 'Objets du montage',
            hint: 'Glissez la matiere ou la flamme puis deposez-la dans la scene'
          },
          objects: {
            zinc: 'Bande de zinc',
            acid: 'Acide HCl',
            flame: 'Flamme test'
          },
          tools: {
            label: 'Materiel',
            value: 'Un morceau de zinc Zn, de l acide chlorhydrique HCl et un tube a essai avec support.'
          },
          observation: {
            title: 'Que voit-on ?',
            idle: 'Aucune bulle pour le moment, car la reaction n a pas commence.',
            zincOnly: 'Le zinc est dans le tube, mais il faut encore ajouter l acide.',
            reaction: 'De nombreuses bulles se forment autour du zinc puis montent, pendant que le dihydrogene se degage.',
            gasReady: 'Le gaz est maintenant assez present pour etre teste avec une flamme.',
            tested: 'Au contact de la flamme, on observe une petite flamme bleue et parfois une legere deflagration.'
          },
          result: {
            title: 'Produit forme',
            idle: 'Apres ajout de l acide, on obtiendra du dihydrogene H2 et du chlorure de zinc ZnCl2.',
            running: 'La reaction est en cours : le zinc consomme l acide et libere un gaz.',
            complete: 'Le resultat est clair : du dihydrogene H2 se forme et une solution de ZnCl2 apparait.'
          },
          status: {
            idle: 'Commencez par placer le zinc dans le tube puis ajoutez l acide pour observer la reaction.',
            needZinc: 'Ajoutez d abord le morceau de zinc avant l acide.',
            needAcid: 'Le zinc est pret. Ajoutez maintenant l acide chlorhydrique.',
            reacting: 'La reaction commence et les bulles deviennent visibles.',
            readyForTest: 'Le gaz est forme. Vous pouvez maintenant le tester.',
            complete: 'Le test confirme le dihydrogene : flamme bleue et petit pop.'
          },
          readouts: {
            gasNone: 'Absent',
            gasEvolving: 'En formation',
            gasReady: 'Pret au test',
            flameWaiting: 'En attente',
            flameSuccess: 'Flamme bleue'
          },
          equationHtml: '<strong>Equation :</strong> Zn + 2HCl → H₂ + ZnCl₂'
        },
        common: {
          error: 'Erreur',
          dragDrop: 'Glisser-deposer'
        }
      }
    };

export const LAB_QUERY_ALIASES = {
  physics: 'physics',
  circuit: 'circuit',
  electric: 'circuit',
  biology: 'biology',
  bio: 'biology',
  plant: 'biology',
  science: 'biology',
  cem: 'biology',
  chemistry: 'chemistry',
  chem: 'chemistry',
  chimie: 'chemistry',
  lycee: 'chemistry'
};

export const LAB_MODES = ['physics', 'circuit', 'biology', 'chemistry'];
