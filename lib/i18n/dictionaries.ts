import { SupportedLocale } from './types';

export interface Dictionary {
  nav: {
    brandName: string;
    brandSub: string;
    home: string;
    services: string;
    materials: string;
    projects: string;
    videos: string;
    articles: string;
    about: string;
    contact: string;
    consultationCta: string;
    mobileMenuTitle: string;
    close: string;
  };
  hero: {
    headline: string;
    subtitle: string;
    abilities: string[];
    ctaConsultation: string;
    ctaProjects: string;
    scrollAria: string;
  };
  proofStrip: {
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
  services: {
    headingTitle: string;
    headingSubtitle: string;
    viewMore: string;
    highlights: string;
    intro: string;
    items: Array<{
      id: string;
      title: string;
      summary: string;
      features: string[];
    }>;
  };
  systems: {
    headingTitle: string;
    headingSubtitle: string;
    viewAll: string;
    specsLabels: {
      frameWidth: string;
      sashWidth: string;
      wallThickness: string;
      polyamideSize: string;
      glassThickness: string;
      thermalUf: string;
      appearance: string;
      cornerFixture: string;
      gaskets: string;
      hardware: string;
      openings: string;
    };
  };
  featuredProjects: {
    headingTitle: string;
    headingSubtitle: string;
    galleryBtn: string;
    viewProject: string;
  };
  process: {
    headingTitle: string;
    headingSubtitle: string;
    steps: Array<{
      title: string;
      desc: string;
    }>;
  };
  distribution: {
    heading: string;
    subtitle: string;
    hubName: string;
    hubLabel: string;
    directShipment: string;
    safePackaging: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    cities: Record<string, { name: string; province: string; projects: string; systemTypes: string }>;
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  ctaBand: {
    tag: string;
    title: string;
    desc: string;
    btnConsultation: string;
    btnProjects: string;
  };
  footer: {
    quickLinks: string;
    contactInfo: string;
    freeConsultation: string;
    consultationDesc: string;
    submitRequest: string;
    workingHoursLabel: string;
    workingHoursVal: string;
    legalRegistration: string;
    copyright: string;
    poweredBy: string;
  };
  about: {
    pageTitle: string;
    pageSubtitle: string;
    intro: string;
    legalBannerTitle: string;
    legalMember: string;
    nationalIdLabel: string;
    companyNameLabel: string;
    regNumberLabel: string;
    postalCodeLabel: string;
    phoneLabel: string;
    factoryTitle: string;
    factoryDesc: string;
    engDeptTitle: string;
    engDeptDesc: string;
    qcTitle: string;
    qcDesc: string;
    timelineTitle: string;
    timeline: Array<{
      year: string;
      title: string;
      description: string;
    }>;
  };
  contact: {
    pageTitle: string;
    pageSubtitle: string;
    directContacts: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    systemLabel: string;
    systemOptions: {
      curtainWall: string;
      frameless: string;
      thermalBreak: string;
      balcony: string;
      composite: string;
      other: string;
    };
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    sendAnother: string;
    nameRequired: string;
    phoneRequired: string;
    mapTitle: string;
    mapAddress: string;
    directRoutes: string;
    phoneBranchLabel: string;
    centralOfficeAddressLabel: string;
    workingHoursLabel: string;
  };
  projectsPage: {
    pageTitle: string;
    pageSubtitle: string;
    filterAll: string;
    filterBanking: string;
    filterCommercial: string;
    filterResidential: string;
    filterCoop: string;
    viewImages: string;
  };
  materialsPage: {
    pageTitle: string;
    pageSubtitle: string;
    viewSpecs: string;
  };
  videosPage: {
    pageTitle: string;
    pageSubtitle: string;
    allVideos: string;
    searchPlaceholder: string;
  };
  articlesPage: {
    pageTitle: string;
    pageSubtitle: string;
    readArticle: string;
  };
  common: {
    home: string;
    back: string;
    learnMore: string;
    loading: string;
    allRightsReserved: string;
  };
}

export const dictionaries: Record<SupportedLocale, Dictionary> = {
  fa: {
    nav: {
      brandName: "نوآوران پنجره سپاهان",
      brandSub: "Noavaran Panjereh",
      home: "خانه",
      services: "خدمات",
      materials: "محصولات",
      projects: "پروژه‌ها",
      videos: "ویدیوها",
      articles: "مقالات",
      about: "درباره ما",
      contact: "ارتباط با ما",
      consultationCta: "درخواست مشاوره",
      mobileMenuTitle: "منوی دسترسی",
      close: "بستن منو",
    },
    hero: {
      headline: "نوآوران پنجره سپاهان",
      subtitle: "طراحی و تولید کننده صنعتی",
      abilities: [
        "انواع درب و پنجره‌های دوجداره آلومینیوم ترمال‌بریک و نرمال",
        "نماهای مدرن شیشه‌ای کرتین‌وال (لامل و فریم‌لس)",
        "سیستم مدرن جام‌بالکنی (شیشه بالکن ریلی و تاشو آکاردئونی)",
        "نمای پانل کامپوزیت آلومینیوم و لوورهای دوکی شیدری",
        "سازه‌های مهندسی شیشه‌ای اسپایدر و اسکای‌لایت نورگیر",
        "نرده و هندریل‌های اختصاصی تمام‌شیشه‌ای و حفاظ استیل ضدزنگ",
      ],
      ctaConsultation: "درخواست مشاوره",
      ctaProjects: "مشاهده پروژه‌ها",
      scrollAria: "رفتن به بخش خدمات",
    },
    proofStrip: {
      stat1Value: "+۳۰",
      stat1Label: "سال تجربه درخشان",
      stat2Value: "+۲۰۰۰",
      stat2Label: "پروژه اجرایی موفق",
      stat3Value: "+۲۵",
      stat3Label: "پروژه در دست اجرا",
    },
    services: {
      headingTitle: "خدمات و راهکارهای مهندسی",
      headingSubtitle: "تخصص ما در صنعت آلومینیوم",
      viewMore: "مشاهده مشخصات کامل و مقاطع",
      highlights: "ویژگی‌های فنی برجسته:",
      intro: "طراحی محاسباتی، نقشه‌کشی فاز ۲، ساخت دقیق کارخانه‌ای و اجرای در محل با استفاده از مرغوب‌ترین بیلت‌های آلومینیوم ۶۰۶۳ و یراق‌آلات اصیل اروپایی.",
      items: [
        {
          id: "aluminum-windows-doors",
          title: "درب و پنجره آلومینیوم ترمال‌بریک و نرمال",
          summary: "تولید صنعتی انواع پنجره‌های لوکس عایق حرارتی با تیغه‌های پلی‌آمید تقویت‌شده، سیستم‌های لیفت اند اسلاید، آکاردئونی و بازشوهای چندحالته با یراق‌آلات اصیل اروپایی.",
          features: [
            "عایق‌بندی صددرصدی حرارت با شکست پل حرارتی (Thermal Break) توسط تیغه پلی‌آمید",
            "سیستم لیفت اند اسلاید با توان جابجایی لنگه‌های ۴۰۰ کیلوگرمی با فشار یک انگشت",
            "استفاده از یراق‌آلات برندهای تراز اول روتو (Roto) و زیگینیا (Siegenia) آلمان",
            "پوشش آنادایز مات و براق اروپایی در رنگ‌های شامپاینی، دودی، طلایی و مشکی سنباده‌ای",
            "کاهش صوت محیطی تا ۴۲ دسی‌بل با شیشه‌های آکوستیک لمینت تخصصی"
          ],
        },
        {
          id: "curtain-wall-lamella",
          title: "نمای کرتین وال / لامل (Curtain Wall)",
          summary: "پیشرفته‌ترین ساختار پوشش شیشه‌ای پیوسته ساختمان، خودایستا در برابر بارهای باد و زلزله، با بهره‌گیری از پروفیل‌های آلومینیومی لامل عمودی و افقی و شیشه‌های دوجداره لمینت سکوریت.",
          features: [
            "طراحی به دو روش درپوش‌دار (Face-Cap) و نیمه‌درپوش‌دار (Semi-Cap)",
            "استفاده از گسکت‌های هوا و آب‌بندی EPDM چند لایه با مقاومت در برابر تابش شدید خورشید",
            "محاسبات استاتیکی دقیق ممان اینرسی برای مهار طوفان و فشارهای باد در طبقات مرتفع",
            "سازگار با انواع شیشه‌های سان‌انرژی، لو-ای (Low-E)، سکوریت و لمینت ضدسرقت",
            "انعطاف در تلفیق با بازشوهای مخفی به سمت بیرون (Hidden Sash)"
          ],
        },
        {
          id: "frameless-facade",
          title: "نمای شیشه‌ای فریم‌لس (Frameless)",
          summary: "نمایی تمام‌شیشه و یکنواخت بدون خطوط آلومینیومی برجسته از دید ناظر خارجی، با چسبندگی ساختاری سیلیکون استراکچرال به فریم‌های مدولار آلومینیومی مخفی.",
          features: [
            "جلوه بصری فوق‌مدرن و یکپارچگی هندسی کامل سطح نما",
            "امکان تعبیه پنجره‌های بازشو بدون تغییر در فرم خارجی و ظاهر نما",
            "سهولت فوق‌العاده در نظافت و عدم تجمع گرد و غبار بر روی لبه‌ها",
            "ایزولاسیون کامل صوت و حرارت با گاز آرگون با خلوص بیش از ۹۰ درصد",
            "سرعت نصب بسیار بالا به دلیل پیش‌ساخته بودن کاست‌های شیشه‌ای در کارخانه"
          ],
        },
        {
          id: "composite-facade",
          title: "نمای کامپوزیت آلومینیوم (ACP)",
          summary: "طراحی و اجرای پوسته‌های مدرن و پویا با ورق‌های کامپوزیت آلومینیومی نسوز FR، نانو ضدلک، طرح‌های سنگ و چوب طبیعی با سیستم‌های نصب پیشرفته هنگینگ و فیکسینگ.",
          features: [
            "مقاومت فوق‌العاده در برابر شرایط جوی، اسیدی و تابش مستقیم اشعه فرابنفش (UV)",
            "وزن سبک و کاهش چشمگیر بار مرده وارد بر اسکلت سازه ساختمان",
            "تنوع رنگ نامحدود همراه با قابلیت اجرای احجام پیچیده هندسی و قوس‌های منحنی",
            "قابلیت تعویض آسان هر پنل بدون نیاز به باز کردن کل سیستم نما",
            "هسته‌های معدنی مقاوم در برابر آتش سوزی (FR / A2 Fire Retardant)"
          ],
        },
        {
          id: "glass-balcony",
          title: "سیستم شیشه بالکن ریلی و تاشو (جام‌بالکنی)",
          summary: "طراحی و اجرای مدرن شیشه‌های بالکنی تاشو و ریلی با شیشه‌های سکوریت ایمن ۸ و ۱۰ میلی‌متری، پروفیل‌های آلومینیومی مقاوم آنودایز، عایق‌بندی صوت، گردوغبار و باران.",
          features: [
            "امکان جمع‌شدن کامل تمامی لنگه‌ها در یک گوشه جهت بازشو ۱۰۰ درصدی دید و جریان هوا",
            "استفاده از شیشه‌های سکوریت نشکن و مقاوم در برابر بادهای شدید و ضربه",
            "درزبندی و هوابندی عالی با درزگیرهای آلومینیومی و نوارهای مویی ضدگردوغبار",
            "چرخ‌ها و بلبرینگ‌های استنلس استیل ضدزنگ و روان با طول عمر فوق‌العاده بالا",
            "شستشو و نظافت فوق‌العاده آسان هر دو سمت شیشه از داخل فضای بالکن بدون خطر"
          ],
        },
        {
          id: "steel-glass-railings",
          title: "نرده استیل، آلومینیوم و نرده شیشه‌ای",
          summary: "طراحی و اجرای هندریل‌های شیشه‌ای اسپیگوت و دفنی، نرده‌های تمام‌استنلس استیل ۳۰۴ و ۳۱۶، حفاظ‌های بانکی ضدسرقت با لوله‌های توپر و اتصالات ماشین‌کاری‌شده CNC.",
          features: [
            "استفاده از شیشه‌های دولایه لمینت سکوریت نشکن ۱۰+۱۰ و ۸+۸ میلی‌متری",
            "پایه‌های اختصاصی آلومینیومی دفنی (Shoe Base) با کاورهای آندایز لوکس",
            "استیل ضدزنگ با گرید دریایی ۳۱۶ مناسب محیط‌های استخری و اسیدی",
            "تحمل ضربه دینامیکی بیش از ۳۰۰ کیلوگرم بر متر طول بر اساس استاندارد ساختمان",
            "هندریل‌های مینی‌مال روی شیشه از جنس استیل، آلومینیوم و چوب راش"
          ],
        },
      ],
    },
    systems: {
      headingTitle: "سیستم‌ها و پروفیل‌های اختصاصی",
      headingSubtitle: "محصولات ترمال‌بریک و نرمال",
      viewAll: "مشاهده همه سیستم‌ها",
      specsLabels: {
        frameWidth: "عرض فریم",
        sashWidth: "عرض لنگه",
        wallThickness: "ضخامت دیواره",
        polyamideSize: "پلی‌آمید",
        glassThickness: "ضخامت شیشه",
        thermalUf: "عایق حرارتی Uf",
        appearance: "نمای ظاهری",
        cornerFixture: "اتصال گوشه",
        gaskets: "هوابندی و آب‌بندی",
        hardware: "یراق‌آلات",
        openings: "انواع بازشو",
      },
    },
    featuredProjects: {
      headingTitle: "پروژه‌های شاخص",
      headingSubtitle: "نمونه کارهای اجرایی در سراسر کشور",
      galleryBtn: "گالری پروژه‌ها",
      viewProject: "مشاهده تصاویر پروژه",
    },
    process: {
      headingTitle: "فرآیند مهندسی و اجرای پروژه‌ها",
      headingSubtitle: "از طراحی معماری تا نصب نهایی",
      steps: [
        {
          title: "طراحی و محاسبات",
          desc: "تهیه نقشه‌های شاپ‌دراوینگ، محاسبات استاتیکی ممان اینرسی و انتخاب سیستم مناسب.",
        },
        {
          title: "ساخت و تولید",
          desc: "تولید صنعتی و مونتاژ دقیق در کارخانه ۱۵۰۰ متری مجهز به ماشین‌آلات پیشرفته دیجیتال.",
        },
        {
          title: "نصب و تحویل",
          desc: "حمل ایمن، نصب مهندسی، رگلاژ دقیق، تست هوابندی و آب‌بندی و تحویل رسمی پروژه.",
        },
        {
          title: "پشتیبانی و گارانتی",
          desc: "ارائه خدمات پس از فروش مداوم، تامین قطعات و ضمانت‌نامه کتبی کیفیت اجرا.",
        },
      ],
    },
    distribution: {
      heading: "توزیع و لجستیک سراسری",
      subtitle: "طراحی مهندسی و ساخت صنعتی در کارخانه اصفهان؛ ارسال و اجرای تخصصی در سراسر ایران",
      hubName: "اصفهان",
      hubLabel: "کارخانه مرکزی و دفتر مهندسی",
      directShipment: "ارسال مستقیم از کارخانه نجف‌آباد",
      safePackaging: "بسته‌بندی ایمن بر پالت چوبی استاندارد",
      pillar1Title: "مرکز ثقل تولید",
      pillar1Desc: "کارخانه ۱۵۰۰ متری مجهز به ماشین‌آلات برش دقیق و خط مونتاژ صنعتی",
      pillar2Title: "لجستیک اختصاصی سراسری",
      pillar2Desc: "حمل ایمن شیشه‌های دوجداره جام‌ویژه و پروفیل‌های آنودایز بدون کوچکترین خط و خش",
      pillar3Title: "تیم‌های نصب آموزش‌دیده",
      pillar3Desc: "اعزام نصاب‌های متخصص جهت اجرای محاسباتی کرتین‌وال و پنجره‌های ترمال‌بریک",
      cities: {
        tehran: {
          name: "تهران و البرز",
          province: "استان تهران و البرز",
          projects: "بیش از ۱۸ برج اداری، سفارت و مجتمع مسکونی لوکس",
          systemTypes: "کرتین‌وال لامل، پنجره‌های ترمال‌بریک TH 68 و فریم‌لس",
        },
        mashhad: {
          name: "مشهد",
          province: "خراسان رضوی",
          projects: "۸ مجتمع بزرگ هتلی و مراکز تجاری شاخص",
          systemTypes: "نمای شیشه‌ای یکپارچه، ترمال‌بریک لیفت‌اند‌اسلاید",
        },
        tabriz: {
          name: "تبریز",
          province: "آذربایجان شرقی و غربی",
          projects: "سیستم‌های دوجداره مهندسی مقاوم در برابر برودت کوهستانی",
          systemTypes: "پروفیل‌های اختصاصی با پلی‌آمید ۲۴ میلی‌متری و گاز آرگون",
        },
        shiraz: {
          name: "شیراز",
          province: "فارس و بوشهر",
          projects: "ویلاهای لوکس اختصاصی و مجتمع‌های اداری مدرن",
          systemTypes: "درب و پنجره‌های کشویی TS 143، هندریل شیشه‌ای",
        },
        ahvaz: {
          name: "اهواز",
          province: "خوزستان",
          projects: "پروژه‌های صنعتی و ساختمانی با عایق‌بندی فوق‌العاده حرارتی",
          systemTypes: "پنجره‌های هوابند و گردوغبار‌بند با گسکت‌های EPDM اصل",
        },
        bandar_abbas: {
          name: "بندرعباس و کیش",
          province: "هرمزگان",
          projects: "هتل‌های ساحلی و مجموعه‌های توریستی جزایر خلیج فارس",
          systemTypes: "آنودایز شامپاین و ضدشوره‌زدگی با مقاومت در برابر نمک دریایی",
        },
        north: {
          name: "مازندران و گیلان",
          province: "سواحل شمالی",
          projects: "ویلاهای مدرن جنگلی و ساحلی رامسر، نوشهر و رشت",
          systemTypes: "پنجره‌های قدی لیفت‌اند‌اسلاید با تلفیق ترموود فنلاندی",
        },
        kerman: {
          name: "کرمان",
          province: "کرمان و جنوب شرق",
          projects: "مجتمع‌های اداری، بانکی و صنعتی",
          systemTypes: "کامپوزیت آلومینیوم ضدحریق و پنجره‌های نرمال آکپای",
        },
        yazd: {
          name: "یزد",
          province: "یزد",
          projects: "ساختمان‌های همساز با اقلیم گرم و خشک کویری",
          systemTypes: "شیشه‌های کنترل‌کننده تابش Low-E و عایق آکوستیک",
        },
        kermanshah: {
          name: "کرمانشاه و غرب",
          province: "کرمانشاه، همدان و کردستان",
          projects: "شعب مرکزی بانک‌ها و پروژه‌های مسکونی",
          systemTypes: "حفاظ و نرده‌های استیل و پنجره‌های لولایی دوحالته",
        },
      },
    },
    faq: {
      badge: "راهنمای مشتریان و مهندسان",
      title: "سوالات متداول درباره نوآوران پنجره",
      subtitle: "پاسخ به پرتکرارترین پرسش‌های کارفرمایان پیرامون هویت برند، سیستم‌های در و پنجره دوجداره، استانداردهای عایق‌بندی و مراحل سفارش.",
      items: [
        {
          question: "نام رسمی و برند کارخانه نوآوران پنجره چیست؟",
          answer: "نام رسمی و ثبت‌شده این مجموعه صنعتی، «شرکت نوآوران پنجره سپاهان» (شماره ثبت ۳۸۹۲ و شناسه ملی ۱۴۰۱۵۰۲۶۲۳۰) است که در بازار تخصصی ساختمان و نزد معماران با نام «نوآوران پنجره» (و گاهی به صورت املایی نواروان پنجره) شناخته می‌شود. این شرکت در زمینه طراحی مهندسی، تولید کارخانه‌ای و اجرای انواع پنجره‌های آلومینیوم ترمال‌بریک و نماهای مدرن کرتین‌وال فعالیت دارد.",
        },
        {
          question: "پنجره آلومینیوم ترمال‌بریک چیست و چه مزیتی نسبت به پنجره‌های معمولی دارد؟",
          answer: "پنجره آلومینیوم ترمال‌بریک (Thermal Break) مجهز به یک تیغه پلی‌آمید تقویت‌شده میان لایه‌های داخلی و خارجی پروفیل آلومینیوم است. این ساختار انتقال حرارت و صوت را به حداقل رسانده و از هدررفت انرژی تا ۴۵٪ جلوگیری می‌کند؛ در نتیجه کاملاً ضد تعریق، عایق صوتی و عایق سرما و گرما می‌باشد.",
        },
        {
          question: "تفاوت نمای کرتین‌وال (Curtain Wall) لامل با نمای فریم‌لس چیست؟",
          answer: "نمای کرتین‌وال لامل یک سیستم سازه‌ای خودایستا با ستون‌ها (Mullion) و تیرهای افقی (Transom) آلومینیومی مستحکم است که بارهای باد و زلزله را دفع می‌کند. در مدل فریم‌لس، شیشه‌ها بدون درپوش‌های خارجی آلومینیومی در کنار هم قرار گرفته و نمای خارجی یکدست تمام‌شیشه‌ای را پدید می‌آورند.",
        },
        {
          question: "سیستم شیشه بالکن تاشو (جام‌بالکنی) چگونه عمل می‌کند؟",
          answer: "سیستم جام‌بالکنی متشکل از پنل‌های شیشه سکوریت ۸ تا ۱۰ میلی‌متری است که روی ریل‌های آلومینیومی حرکت کرده و در گوشه بالکن به صورت آکاردئونی جمع می‌شوند. این سیستم عایق گرد و غبار، برف، باران و آلودگی صوتی بوده و هیچ مانع دیداری در حالت باز یا بسته ایجاد نمی‌کند.",
        },
        {
          question: "نحوه استعلام قیمت و صدور پیش‌فاکتور به چه صورت است؟",
          answer: "کارفرمایان و مهندسان محترم می‌توانند با ارسال نقشه‌های اجرایی فاز ۲ و ابعاد دهانه‌ها به شماره همراه شرکت یا تماس با دفتر فروش (۳۳۶۸۷۷۵۵-۰۳۱)، پیشنهاد قیمت دقیق و نقشه‌های اولیه شاپ دراوینگ را ظرف ۲۴ ساعت دریافت کنند.",
        },
        {
          question: "آیا نوآوران پنجره سپاهان امکان اجرای پروژه‌ها در سایر شهرهای ایران را دارد؟",
          answer: "بله؛ کارخانه نوآوران پنجره سپاهان با ناوگان لجستیک اختصاصی و تیم‌های مجرب نصب، پروژه‌های نما و پنجره را در تمامی کلان‌شهرها از جمله تهران، مشهد، شیراز، تبریز، کرج، اهواز، بوشهر و بنادر جنوبی به صورت کلیدتحویل اجرا و پشتیبانی می‌نماید.",
        },
      ],
    },
    ctaBand: {
      tag: "شروع پروژه ساختمانی",
      title: "آماده شروع پروژه جدید هستید؟",
      desc: "تیم مهندسی نوآوران پنجره سپاهان آماده ارائه مشاوره تخصصی، برآورد دقیق متراژ و پیش‌فاکتور برای پروژه‌های ساختمانی شماست.",
      btnConsultation: "درخواست مشاوره",
      btnProjects: "مشاهده نمونه‌پروژه‌ها",
    },
    footer: {
      quickLinks: "دسترسی سریع",
      contactInfo: "اطلاعات تماس",
      freeConsultation: "مشاوره رایگان",
      consultationDesc: "برای دریافت مشاوره تخصصی و استعلام قیمت با کارشناسان ما در ارتباط باشید.",
      submitRequest: "ثبت درخواست",
      workingHoursLabel: "ساعات کاری:",
      workingHoursVal: "شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰ | پنج‌شنبه‌ها: ۸:۰۰ الی ۱۳:۰۰",
      legalRegistration: "شماره ثبت: ۳۸۹۲ | سهامی خاص",
      copyright: "کلیه حقوق محفوظ است.",
      poweredBy: "قدرت گرفته از",
    },
    about: {
      pageTitle: "نوآوران پنجره سپاهان",
      pageSubtitle: "رزومه، تاریخچه و مشخصات ثبتی کارخانه",
      intro: "بیش از سه دهه تجربه در طراحی محاسباتی، نقشه‌کشی فاز ۲، ساخت دقیق کارخانه‌ای و اجرای در محل پروژه‌های مدرن نما و درب و پنجره‌های اختصاصی.",
      legalBannerTitle: "مشخصات ثبتی و حقوقی شرکت",
      legalMember: "عضو رسمی اتحادیه صنایع آلومینیوم ایران",
      nationalIdLabel: "شناسه ملی:",
      companyNameLabel: "نام رسمی و برند تجاری:",
      regNumberLabel: "شماره ثبت رسمی:",
      postalCodeLabel: "کد پستی ثبتی:",
      phoneLabel: "تلفن کارخانه و دفتر:",
      factoryTitle: "کارخانه تولیدی ۱۵۰۰ متری",
      factoryDesc: "خط تولید کاملاً ایزوله با بهره‌گیری از اره‌های دوکله دیجیتال، دستگاه‌های پرس زاویه بادی، کپی‌فرز و سیستم‌های پولیش جهت حفظ کیفیت آنودایز و رنگ.",
      engDeptTitle: "تیم مهندسی و دپارتمان فنی",
      engDeptDesc: "تیم مجرب متشکل از مهندسین معماری و عمران جهت تهیه نقشه‌های شاپ‌دراوینگ (فاز ۲)، متره دقیق و محاسبات ممان اینرسی پروفیل‌ها.",
      qcTitle: "کنترل کیفیت (QC) سه‌مرحله‌ای",
      qcDesc: "تست دقیق برش، بازبینی کیفیت اسمبل و کنترل نهایی آب‌بندی پیش از ارسال. بسته‌بندی با فوم و سلفون جهت جلوگیری از آسیب در حمل و نصب.",
      timelineTitle: "مسیر توسعه و پیشرفت ما",
      timeline: [
        {
          year: "۱۳۹۰",
          title: "تاسیس کارگاه طراحی نصب و پیمانکاری",
          description: "شروع به عنوان یک گروه کوچک در زمینه مشاوره، طراحی و نصب پروژه‌های نما و پنجره.",
        },
        {
          year: "۱۳۹۳",
          title: "خرید دستگاه‌های نیمه‌اتوماتیک",
          description: "ورود به عرصه تولید کارگاهی و مجهز شدن به دستگاه‌های برش دقیق و پرس‌های کارگاهی.",
        },
        {
          year: "۱۴۰۰",
          title: "احداث کارخانه در منطقه صنعتی",
          description: "توسعه فاز تولید و انتقال به فضای صنعتی بزرگتر با تجهیز به خط مونتاژ پیشرفته.",
        },
        {
          year: "اکنون",
          title: "نوآوران پنجره سپاهان؛ مجری پروژه‌های ملی",
          description: "ثبت رسمی شرکت، استقرار سیستم تضمین کیفیت و انجام موفقیت‌آمیز پروژه‌های شاخص کشوری.",
        },
      ],
    },
    contact: {
      pageTitle: "ارتباط با مهندسی فروش",
      pageSubtitle: "مشاوره رایگان، برآورد قیمت و بازدید از پروژه",
      directContacts: "راه‌های ارتباطی مستقیم",
      formTitle: "ارسال درخواست مشاوره و پیش‌فاکتور",
      nameLabel: "نام و نام خانوادگی / نام شرکت",
      namePlaceholder: "مثال: شرکت عمران سازان",
      phoneLabel: "شماره تماس (موبایل یا تلفن ثابت)",
      phonePlaceholder: "0912...",
      systemLabel: "نوع سیستم درخواستی",
      systemOptions: {
        curtainWall: "نمای شیشه‌ای کرتین‌وال (لامل)",
        frameless: "نمای شیشه‌ای فریم‌لس",
        thermalBreak: "پنجره آلومینیوم ترمال‌بریک",
        balcony: "شیشه بالکن تاشو و ریلی (جام‌بالکنی)",
        composite: "نمای ورق کامپوزیت آلومینیوم",
        other: "سایر موارد (هندریل، حفاظ و ...)",
      },
      messageLabel: "توضیحات تکمیلی پروژه (اختیاری)",
      messagePlaceholder: "حدود متراژ، شهر محل اجرا، یا سایر جزئیات...",
      submitBtn: "ارسال درخواست مشاوره",
      submitting: "در حال ارسال درخواست...",
      successTitle: "درخواست شما با موفقیت ثبت شد",
      successDesc: "کارشناسان مهندسی فروش ما در اسرع وقت با شما تماس خواهند گرفت.",
      sendAnother: "ارسال درخواست جدید",
      nameRequired: "لطفا نام خود را وارد کنید.",
      phoneRequired: "لطفا شماره تماس خود را وارد کنید.",
      mapTitle: "موقعیت مکانی و مسیریابی کارخانه",
      mapAddress: "اصفهان، خیابان امام خمینی، خیابان بسیج، کوچه ۱۳۵",
      directRoutes: "مسیریابی مستقیم با اپلیکیشن:",
      phoneBranchLabel: "تلفن کارخانه و دفتر فروش",
      centralOfficeAddressLabel: "آدرس کارخانه و دفتر مرکزی",
      workingHoursLabel: "ساعات کاری مهندسی فروش",
    },
    projectsPage: {
      pageTitle: "پروژه‌های شاخص و نمونه‌کارهای اجرایی",
      pageSubtitle: "نمونه‌کارهای نما و پنجره در سراسر ایران",
      filterAll: "همه پروژه‌ها",
      filterBanking: "بانکی و دولتی",
      filterCommercial: "تجاری و اداری",
      filterResidential: "مسکونی و ویلایی",
      filterCoop: "تعاونی و برج‌ها",
      viewImages: "مشاهده تصاویر پروژه",
    },
    materialsPage: {
      pageTitle: "کاتالوگ محصولات و سیستم‌های اختصاصی",
      pageSubtitle: "پروفیل‌های ترمال‌بریک و نرمال",
      viewSpecs: "مشاهده مشخصات فنی",
    },
    videosPage: {
      pageTitle: "کتابخانه ویدیوهای تخصصی و انیمیشن مقاطع",
      pageSubtitle: "آموزش‌های فنی و رندرهای سه‌بعدی سیستم‌ها",
      allVideos: "همه ویدیوها",
      searchPlaceholder: "جستجو در عناوین ویدیوها...",
    },
    articlesPage: {
      pageTitle: "دانشنامه و مقالات تخصصی",
      pageSubtitle: "دانش فنی مهندسی نما و پنجره",
      readArticle: "مطالعه کامل مقاله",
    },
    common: {
      home: "صفحه اصلی",
      back: "بازگشت",
      learnMore: "بیشتر بدانید",
      loading: "در حال بارگذاری...",
      allRightsReserved: "کلیه حقوق محفوظ است.",
    },
  },

  en: {
    nav: {
      brandName: "Noavaran Panjereh Sepahan",
      brandSub: "Architectural Facades & Windows",
      home: "Home",
      services: "Services",
      materials: "Products",
      projects: "Projects",
      videos: "Videos",
      articles: "Articles",
      about: "About Us",
      contact: "Contact Us",
      consultationCta: "Request Consultation",
      mobileMenuTitle: "Navigation Menu",
      close: "Close Menu",
    },
    hero: {
      headline: "Noavaran Panjereh Sepahan",
      subtitle: "Engineering Design & Industrial Manufacturing",
      abilities: [
        "Thermal Break & Standard Aluminium Double-Glazed Doors & Windows",
        "Modern Glass Curtain Wall Facades (Stick, Lamella & Frameless)",
        "Folding & Sliding Balcony Glazing Systems (Glass Curtains)",
        "Aluminium Composite Panel (ACP) Facades & Solar Louver Systems",
        "Structural Glass Skylights & Spider Glazing Architectural Enclosures",
        "All-Glass Balustrades, Structural Handrails & Stainless Steel Railings",
      ],
      ctaConsultation: "Request Consultation",
      ctaProjects: "Explore Projects",
      scrollAria: "Scroll to services section",
    },
    proofStrip: {
      stat1Value: "+30",
      stat1Label: "Years of Proven Excellence",
      stat2Value: "+2,000",
      stat2Label: "Completed Projects",
      stat3Value: "+25",
      stat3Label: "Ongoing Projects",
    },
    services: {
      headingTitle: "Engineering Services & Solutions",
      headingSubtitle: "Our Expertise in Architectural Aluminium",
      viewMore: "View Full Specs & Profiles",
      highlights: "Key Technical Highlights:",
      intro: "Computational engineering, Phase-2 shop drawings, precision factory fabrication, and certified site installation using prime 6063-T6 aluminum alloys and genuine European hardware.",
      items: [
        {
          id: "aluminum-windows-doors",
          title: "Thermal Break & Normal Aluminium Doors & Windows",
          summary: "Industrial manufacturing of luxury energy-efficient architectural windows with reinforced polyamide barrier strips, Lift & Slide systems, accordion folding, and multi-lock European hardware.",
          features: [
            "100% thermal bridge elimination with reinforced polyamide barrier strips",
            "Heavy-duty Lift & Slide system moving 400 kg sashes effortlessly with fingertip ease",
            "German precision hardware from premier manufacturers Roto and Siegenia",
            "Architectural anodized and powder-coat finishes in champagne, bronze, gold, and textured black",
            "Acoustic noise reduction up to 42 dB with specialized laminated soundproof IGUs"
          ],
        },
        {
          id: "curtain-wall-lamella",
          title: "Curtain Wall Facade / Stick & Lamella",
          summary: "State-of-the-art continuous architectural glass building envelopes, self-supporting against wind and seismic loads, utilizing vertical and horizontal mullions and safety laminated double glazing.",
          features: [
            "Engineered in both Face-Cap and Semi-Cap architectural configurations",
            "Multi-stage high-grade EPDM weather seals resistant to harsh UV and weather extremes",
            "Precise structural moment of inertia calculations for high-rise wind loads",
            "Fully compatible with solar control, Low-E, tempered, and security laminated glazing",
            "Seamless integration of concealed project-out outward opening vents"
          ],
        },
        {
          id: "frameless-facade",
          title: "Frameless Structural Glass Facade",
          summary: "Monolithic, all-glass exterior appearance with zero exterior metal capping, featuring structural silicone bonding to concealed internal modular aluminum cassettes.",
          features: [
            "Ultra-modern minimalist aesthetic with complete exterior geometric continuity",
            "Concealed operable vent integration without disrupting facade symmetry",
            "Superior cleanability with flush glass surfaces preventing dust buildup",
            "Comprehensive acoustic and thermal insulation with 90%+ pure argon gas fills",
            "Rapid on-site installation enabled by factory-prefabricated modular cassettes"
          ],
        },
        {
          id: "composite-facade",
          title: "Aluminium Composite Panel (ACP) Cladding",
          summary: "Dynamic architectural skins crafted with fire-retardant (FR/A2) aluminum composite panels, nano anti-stain coatings, natural stone and wood textures with hanging or fixing systems.",
          features: [
            "Exceptional durability against extreme weathering, pollution, and intense UV rays",
            "Ultra-lightweight construction drastically reducing building structural dead load",
            "Limitless color choices with CNC routing capability for complex geometric shapes",
            "Modular panel replacement capability without dismantling adjacent sections",
            "Certified non-combustible mineral cores conforming to international fire codes"
          ],
        },
        {
          id: "glass-balcony",
          title: "Folding & Sliding Balcony Glazing System",
          summary: "Modern frameless panoramic folding and sliding glass balcony enclosures with 8mm and 10mm tempered safety glass, weather sealing against dust and rain for all-season enjoyment.",
          features: [
            "Complete 100% opening capability with panels folding neatly into the corner",
            "High-impact tempered safety glass resistant to strong gusts and physical shock",
            "Airtight and watertight sealing with UV-resistant polycarbonates and brush gaskets",
            "Heavy-duty stainless steel bearing rollers offering silent, ultra-smooth movement",
            "Safe and convenient cleaning of both glass faces directly from inside the balcony"
          ],
        },
        {
          id: "steel-glass-railings",
          title: "Stainless Steel, Aluminium & Glass Railings",
          summary: "Architectural in-ground and spigot glass balustrades, marine-grade AISI 304/316 stainless steel railings, and anti-cut high-security institutional barrier systems.",
          features: [
            "Tough dual-layer laminated tempered safety glass (10+10mm and 8+8mm)",
            "Heavy structural aluminum shoe base profiles with luxury anodized fascia covers",
            "Marine-grade AISI 316 stainless steel resistant to poolside and coastal environments",
            "Dynamic load tolerance exceeding 300 kg per linear meter per building codes",
            "Sleek minimalist top handrails in stainless steel, aluminum, or architectural wood"
          ],
        },
      ],
    },
    systems: {
      headingTitle: "Proprietary Systems & Profiles",
      headingSubtitle: "Thermal Break & Standard Aluminium Systems",
      viewAll: "View All Systems",
      specsLabels: {
        frameWidth: "Frame Width",
        sashWidth: "Sash Width",
        wallThickness: "Wall Thickness",
        polyamideSize: "Polyamide Strip",
        glassThickness: "Glass Thickness",
        thermalUf: "Thermal Uf",
        appearance: "Profile Style",
        cornerFixture: "Corner Joint",
        gaskets: "Weatherseals",
        hardware: "Hardware Compatibility",
        openings: "Opening Variants",
      },
    },
    featuredProjects: {
      headingTitle: "Featured Projects",
      headingSubtitle: "Nationwide Architectural Landmarks",
      galleryBtn: "Projects Gallery",
      viewProject: "View Project Gallery",
    },
    process: {
      headingTitle: "Engineering Workflow & Execution",
      headingSubtitle: "From Architectural Conception to Final Commissioning",
      steps: [
        {
          title: "Design & Calculations",
          desc: "Phase-2 shop drawings drafting, static moment of inertia calculations, wind load simulations, and optimal profile selection.",
        },
        {
          title: "Precision Manufacturing",
          desc: "Industrial fabrication and high-precision assembly in our 1,500 m² factory equipped with CNC machinery.",
        },
        {
          title: "Installation & Delivery",
          desc: "Safe palletized logistics, certified engineering installation, precise alignment, and EPDM weatherproofing certification.",
        },
        {
          title: "Support & Warranty",
          desc: "Continuous post-handover customer support, authentic spare parts inventory, and comprehensive written warranties.",
        },
      ],
    },
    distribution: {
      heading: "Nationwide Logistics & Distribution",
      subtitle: "Engineered and manufactured at our Isfahan plant; expertly shipped and installed throughout Iran and neighboring regions",
      hubName: "Isfahan",
      hubLabel: "Central Plant & Engineering HQ",
      directShipment: "Direct shipment from central industrial plant",
      safePackaging: "Secure packaging on heavy-duty export pallets",
      pillar1Title: "Industrial Manufacturing Hub",
      pillar1Desc: "1,500 m² modern factory equipped with dual-head digital saws and automated assembly line",
      pillar2Title: "Dedicated Logistics Network",
      pillar2Desc: "Scratch-free specialized transit of large-format double-glazed glass units and anodized extrusions",
      pillar3Title: "Certified Installation Teams",
      pillar3Desc: "Skilled facade specialists dispatched for precision installation of curtain walls and thermal break systems",
      cities: {
        tehran: {
          name: "Tehran & Alborz",
          province: "Tehran & Alborz Province",
          projects: "Over 18 office towers, embassies, and luxury residential complexes",
          systemTypes: "Stick curtain wall, TH 68 thermal break windows, and frameless glazing",
        },
        mashhad: {
          name: "Mashhad",
          province: "Razavi Khorasan",
          projects: "8 major hotel developments and landmark commercial shopping malls",
          systemTypes: "Monolithic structural glass facades, Lift & Slide thermal break doors",
        },
        tabriz: {
          name: "Tabriz",
          province: "East & West Azerbaijan",
          projects: "Sub-zero climate resistant engineered thermal insulation systems",
          systemTypes: "Proprietary systems with 24mm polyamide thermal breaks and argon gas",
        },
        shiraz: {
          name: "Shiraz",
          province: "Fars & Bushehr",
          projects: "Bespoke luxury private villas and contemporary corporate headquarters",
          systemTypes: "TS 143 sliding systems and glass balustrades",
        },
        ahvaz: {
          name: "Ahvaz",
          province: "Khuzestan",
          projects: "Industrial and commercial projects with extreme heat and dust insulation",
          systemTypes: "Airtight and dustproof windows with original multi-tier EPDM gaskets",
        },
        bandar_abbas: {
          name: "Bandar Abbas & Kish",
          province: "Hormozgan",
          projects: "Coastal resorts, beachfront hotels, and Persian Gulf island developments",
          systemTypes: "Marine-grade champagne anodizing resistant to salty coastal atmospheres",
        },
        north: {
          name: "Mazandaran & Guilan",
          province: "Caspian Sea Coast",
          projects: "Modern forest and waterfront luxury villas in Ramsar, Nowshahr, and Rasht",
          systemTypes: "Floor-to-ceiling Lift & Slide panoramic doors paired with Finnish thermowood",
        },
        kerman: {
          name: "Kerman",
          province: "Kerman & Southeast",
          projects: "Corporate headquarters, banking institutions, and industrial offices",
          systemTypes: "Fireproof ACP cladding and heavy-duty architectural profiles",
        },
        yazd: {
          name: "Yazd",
          province: "Yazd Province",
          projects: "Climate-responsive buildings engineered for arid desert solar radiation",
          systemTypes: "Low-E solar control double glazing and acoustic insulation systems",
        },
        kermanshah: {
          name: "Kermanshah & West",
          province: "Kermanshah, Hamadan & Kurdistan",
          projects: "Central commercial banks and luxury multi-family developments",
          systemTypes: "Stainless steel protective barriers and Tilt & Turn hinged windows",
        },
      },
    },
    faq: {
      badge: "Architects & Contractors Guide",
      title: "Frequently Asked Questions",
      subtitle: "Answers to the most common inquiries regarding corporate credentials, thermal performance standards, facade engineering, and quotations.",
      items: [
        {
          question: "What is the official registered corporate identity of the company?",
          answer: "Our registered corporate identity is 'Noavaran Panjereh Sepahan Co.' (Registration No. 3892, National ID 14015026230), widely recognized by leading architects and builders as 'Noavaran Panjereh'. We specialize in computational facade design, automated plant manufacturing, and certified installation of thermal break aluminium windows and modern glass curtain walls.",
        },
        {
          question: "What is a Thermal Break aluminium window and why is it superior?",
          answer: "A Thermal Break aluminium profile features a reinforced polyamide structural barrier separating the interior and exterior aluminium shells. This physical break eliminates thermal bridging, saving up to 45% of HVAC energy consumption, eliminating surface condensation, and providing exceptional sound insulation.",
        },
        {
          question: "What is the difference between a Stick Curtain Wall (Lamella) and a Frameless Facade?",
          answer: "A Stick Curtain Wall is a self-supporting structural grid of vertical mullions and horizontal transoms engineered to withstand high wind and seismic loads. In a Frameless facade, glass panes are bonded structurally to hidden modular frames, leaving zero exterior aluminum capping for a pure, monolithic all-glass appearance.",
        },
        {
          question: "How does the Folding Glass Balcony system work?",
          answer: "The glass balcony system consists of 8mm to 10mm tempered safety glass panels sliding along extruded aluminum guide rails and folding like an accordion at the balcony corner. It seals against dust, wind, rain, and street noise while providing a 100% unobstructed view when opened.",
        },
        {
          question: "How can I request a price estimate or formal quotation?",
          answer: "Architects, developers, and homeowners can submit their Phase-2 drawings and window opening schedules via our contact form, direct phone (+98 31 33687755), or sales mobile. Our engineering department delivers a comprehensive takeoff and quotation within 24 hours.",
        },
        {
          question: "Does Noavaran Panjereh execute projects across other cities?",
          answer: "Yes; Noavaran Panjereh Sepahan operates a dedicated logistics fleet and certified installation teams executing turnkey facade and window projects across all major metropolises including Tehran, Mashhad, Shiraz, Tabriz, Ahvaz, and southern port cities.",
        },
      ],
    },
    ctaBand: {
      tag: "START YOUR PROJECT",
      title: "Ready to Start Your Architectural Project?",
      desc: "Our engineering team at Noavaran Panjereh Sepahan is ready to provide expert technical consultation, quantity takeoffs, and project quotations.",
      btnConsultation: "Request Consultation",
      btnProjects: "Explore Projects",
    },
    footer: {
      quickLinks: "Quick Links",
      contactInfo: "Contact Information",
      freeConsultation: "Free Consultation",
      consultationDesc: "Get in touch with our engineering team for specialized consultation and precise price estimates.",
      submitRequest: "Submit Inquiry",
      workingHoursLabel: "Working Hours:",
      workingHoursVal: "Sat to Wed: 08:00 - 17:00 | Thu: 08:00 - 13:00",
      legalRegistration: "Reg. No: 3892 | Private Joint Stock",
      copyright: "All rights reserved.",
      poweredBy: "Powered by",
    },
    about: {
      pageTitle: "Noavaran Panjereh Sepahan",
      pageSubtitle: "Corporate Heritage, Factory Specifications & Legal Credentials",
      intro: "Over three decades of excellence in computational engineering, phase-2 shop drawings, automated plant manufacturing, and on-site certified execution of premium modern facades and thermal break systems.",
      legalBannerTitle: "Official Corporate & Legal Registration",
      legalMember: "Certified Member of the Iran Aluminium Industry Association",
      nationalIdLabel: "National ID:",
      companyNameLabel: "Official Corporate Name:",
      regNumberLabel: "Registration Number:",
      postalCodeLabel: "Postal Code:",
      phoneLabel: "Factory & HQ Phone:",
      factoryTitle: "1,500 m² Industrial Manufacturing Plant",
      factoryDesc: "Isolated production environment equipped with digital dual-head CNC mitre saws, pneumatic corner crimpers, copy routers, and precision handling systems to maintain flawless anodized finishes.",
      engDeptTitle: "Engineering & Technical Department",
      engDeptDesc: "Highly experienced team of civil and architectural facade engineers preparing shop drawings, accurate quantity takeoffs, and static moment of inertia calculations.",
      qcTitle: "3-Stage Quality Control Protocol (QC)",
      qcDesc: "Strict cut-angle verification, assembly alignment inspection, and EPDM weather-seal verification prior to dispatch. Multi-layered protective wrapping prevents transit damage.",
      timelineTitle: "Our Evolutionary Milestones",
      timeline: [
        {
          year: "2011",
          title: "Founding of Design & Contracting Workshop",
          description: "Initiated as a focused engineering group consulting, designing, and installing facade and window projects.",
        },
        {
          year: "2014",
          title: "Acquisition of Semi-Automated Machinery",
          description: "Expanded into specialized fabrication with high-precision cutting machines and industrial crimping presses.",
        },
        {
          year: "2021",
          title: "Establishment of Industrial Factory",
          description: "Scaled production to an expansive 1,500 m² facility with automated assembly lines and digital QC stations.",
        },
        {
          year: "Now",
          title: "Noavaran Panjereh Sepahan; Landmark National Projects",
          description: "Formal corporate incorporation, certified ISO quality assurance, and execution of major nationwide landmarks.",
        },
      ],
    },
    contact: {
      pageTitle: "Contact Sales & Engineering",
      pageSubtitle: "Complimentary Consultation, Cost Estimation & Project Site Surveys",
      directContacts: "Direct Contact Channels",
      formTitle: "Submit Consultation & Quotation Request",
      nameLabel: "Full Name / Company Name",
      namePlaceholder: "e.g. Skyline Architecture Group",
      phoneLabel: "Contact Phone (Mobile or Landline)",
      phonePlaceholder: "+98 912...",
      systemLabel: "Requested System Type",
      systemOptions: {
        curtainWall: "Glass Curtain Wall Facade (Stick / Lamella)",
        frameless: "Frameless Glass Facade",
        thermalBreak: "Thermal Break Aluminium Windows & Doors",
        balcony: "Folding & Sliding Balcony Glazing (Glass Curtains)",
        composite: "Aluminium Composite Panels (ACP Cladding)",
        other: "Other Systems (Railings, Spider Glazing, Louvers)",
      },
      messageLabel: "Project Details & Scope (Optional)",
      messagePlaceholder: "Approximate area, project location city, architectural requirements...",
      submitBtn: "Send Consultation Request",
      submitting: "Submitting inquiry...",
      successTitle: "Request Submitted Successfully",
      successDesc: "Our sales engineering team will review your specifications and contact you shortly.",
      sendAnother: "Submit Another Request",
      nameRequired: "Please enter your name.",
      phoneRequired: "Please enter your contact phone number.",
      mapTitle: "Factory Location & Live Navigation",
      mapAddress: "No. 100, Ferdowsi (Bahar) Alley, Alley 135, Basij St, Imam Khomeini St, Isfahan",
      directRoutes: "Direct routing with navigation apps:",
      phoneBranchLabel: "Factory & Sales Department",
      centralOfficeAddressLabel: "Factory & Central Headquarters",
      workingHoursLabel: "Sales Engineering Working Hours",
    },
    projectsPage: {
      pageTitle: "Featured Projects & Completed Portfolio",
      pageSubtitle: "Architectural Glass & Window Projects Across Iran",
      filterAll: "All Projects",
      filterBanking: "Banking & Government",
      filterCommercial: "Commercial & Office",
      filterResidential: "Residential & Luxury Villas",
      filterCoop: "Towers & Cooperatives",
      viewImages: "View Project Gallery",
    },
    materialsPage: {
      pageTitle: "Proprietary Products & Systems Catalog",
      pageSubtitle: "Thermal Break & Standard Architectural Profiles",
      viewSpecs: "View Technical Specs",
    },
    videosPage: {
      pageTitle: "Technical Video Library & 3D Profile Animations",
      pageSubtitle: "Assembly Demonstrations & Structural System Renders",
      allVideos: "All Videos",
      searchPlaceholder: "Search video titles...",
    },
    articlesPage: {
      pageTitle: "Engineering Knowledge Base & Technical Articles",
      pageSubtitle: "Facade Engineering, Thermal Insulation & Building Physics",
      readArticle: "Read Full Article",
    },
    common: {
      home: "Home",
      back: "Back",
      learnMore: "Learn More",
      loading: "Loading...",
      allRightsReserved: "All rights reserved.",
    },
  },

  ar: {
    nav: {
      brandName: "نوآوران پنجره سباهان",
      brandSub: "الواجهات المعمارية والنوافذ",
      home: "الرئيسية",
      services: "الخدمات",
      materials: "المنتجات",
      projects: "المشاريع",
      videos: "الفيديوهات",
      articles: "المقالات",
      about: "من نحن",
      contact: "اتصل بنا",
      consultationCta: "طلب استشارة",
      mobileMenuTitle: "قائمة التصفح",
      close: "إغلاق القائمة",
    },
    hero: {
      headline: "نوآوران پنجره سباهان",
      subtitle: "التصميم والتصنيع الصناعي للواجهات",
      abilities: [
        "أبواب ونوافذ ألمنيوم عازلة للحرارة (ثيرمال بريك) وعادية",
        "واجهات زجاجية كورتن وول ستائرية حديثة (لامل وفريملس)",
        "أنظمة زجاج الشرفات القابل للطي والسحب الأكورديوني (جام بلكوني)",
        "تكسية واجهات الألمنيوم كومبوزيت (كلادينج) وكواسر الشمس",
        "قباب وإنارات سماوية زجاجية وهياكل سبايدر هندسية",
        "درابزينات زجاجية بالكامل وحواجز ستانلس ستيل مقاومة للصدأ",
      ],
      ctaConsultation: "طلب استشارة",
      ctaProjects: "استعراض المشاريع",
      scrollAria: "الانتقال إلى قسم الخدمات",
    },
    proofStrip: {
      stat1Value: "+٣٠",
      stat1Label: "عاماً من الخبرة والتميز",
      stat2Value: "+٢٠٠٠",
      stat2Label: "مشروع منفذ بنجاح",
      stat3Value: "+٢٥",
      stat3Label: "مشروع قيد التنفيذ",
    },
    services: {
      headingTitle: "الخدمات والحلول الهندسية",
      headingSubtitle: "خبرتنا الرائدة في صناعة الألمنيوم والزجاج",
      viewMore: "عرض المواصفات الفنية والمقاطع",
      highlights: "أبرز المواصفات الفنية:",
      intro: "التصميم الحسابي، إعداد المخططات التنفيذية، والتصنيع الصناعي الدقيق والتركيب الميداني بأجود سبائك الألمنيوم 6063 وإكسسوارات أوروبية أصلية.",
      items: [
        {
          id: "aluminum-windows-doors",
          title: "أبواب ونوافذ ألمنيوم عازلة للحرارة (ثيرمال بريك) وعادية",
          summary: "تصنيع صناعي لأفخم النوافذ العازلة للحرارة المعززة بشرائح البولياميد، وأنظمة الرفع والسحب (Lift & Slide)، والأنظمة القابلة للطي بإكسسوارات أوروبية أصلية.",
          features: [
            "عزل حراري تام ۱۰۰٪ بفضل كسر الجسر الحراري عبر شرائح البولياميد المتطورة",
            "نظام Lift & Slide بقدرة تحريك ضلف بوزن ٤٠٠ كغ بلمسة إصبع واحدة بسلاسة",
            "إكسسوارات ومفصلات ألمانية فاخرة من شركتي Roto و Siegenia",
            "طلاء أنودايز وإلكتروستاتيك فاخر بألوان الشامبانيا، البرونزي، الذهبي والأسود الملمسي",
            "عزل صوتي فائق يصل حتى ٤٢ ديسيبل باستخدام زجاج مزدوج ومصفح آمن"
          ],
        },
        {
          id: "curtain-wall-lamella",
          title: "واجهات زجاجية كورتن وول (ستائرية / لامل)",
          summary: "أحدث أنظمة الواجهات الزجاجية المستمرة للمباني الشاهقة، ذاتية الإسناد لمقاومة الرياح والزلازل مع مقاطع ألمنيوم راسية وأفقية وزجاج سيكوريت مزدوج مصفح.",
          features: [
            "تصميم بنظامي الغطاء الخارجي (Face-Cap) والنصف غطاء (Semi-Cap)",
            "عوازل وجوانات EPDM متعددة الطبقات مقاومة لأشعة الشمس الشديدة والحرارة",
            "حسابات دقيقة لعزم القصور الذاتي لتحمل أعتى العواصف في الأدوار العليا",
            "توافق تام مع زجاج Low-E العاكس، الموفر للطاقة والمضاد للكسر والسرقة",
            "إمكانية دمج فتحات تهوية مخفية غير ظاهرة في التصميم الخارجي للواجهة"
          ],
        },
        {
          id: "frameless-facade",
          title: "واجهات زجاجية فريملس (بدون إطار ظاهر)",
          summary: "إطلالة زجاجية نقية وموحدة بالكامل دون أي مقاطع ألمنيوم بارزة من الخارج، وتثبيت هيكلي باستخدام سيليكون إنشائي عالي المتانة على إطارات ألمنيوم داخلية.",
          features: [
            "مظهر بصري فائق العصرية وانسجام هندسي متكامل لكامل الواجهة",
            "إمكانية دمج نوافذ قابلة للفتح دون التأثير على الشكل الهندسي الخارجي",
            "سهولة استثنائية في التنظيف ومنع تراكم الغبار والأتربة على الحواف",
            "عزل صوتي وحراري متكامل مع غاز الأرجون بنقاوة تتجاوز ٩٠٪",
            "سرعة فائقة في التركيب بالموقع بفضل تصنيع الكاسيتات الزجاجية مسبقاً بالمصنع"
          ],
        },
        {
          id: "composite-facade",
          title: "تكسية واجهات كلادينج ألمنيوم كومبوزيت (ACP)",
          summary: "تصميم وتنفيذ أغلفة معمارية عصرية بألواح ألمنيوم كومبوزيت مقاومة للحريق FR/A2 مع طلاء نانو مانع للاتساخ، ونماذج حجرية وخشبية بأنظمة تثبيت متطورة.",
          features: [
            "مقاومة استثنائية للعوامل الجوية والأمطار الحمضية وأشعة الشمس فوق البنفسجية",
            "خفة وزن استثنائية تقلل الأحمال الإنشائية الميتة على الهيكل الخرساني للمبنى",
            "تنوع لوني غير محدود مع إمكانية تشكيل مجسمات هندسية معقدة ومنحنيات بدقة CNC",
            "سهولة صيانة واستبدال أي لوح منفرد دون الحاجة لتفكيك الألواح المجاورة",
            "حشوات معدنية مقاومة للحرائق متوافقة مع معايير السلامة الدولية (Class A2 / B1)"
          ],
        },
        {
          id: "glass-balcony",
          title: "نظام زجاج الشرفات القابل للطي والسحب (جام بلكوني)",
          summary: "تصميم وتنفيذ أنظمة زجاجية بانورامية للشرفات والترابيزات بزجاج سيكوريت ٨ و١٠ ملم، ومقاطع ألمنيوم مؤكسدة متينة لعزل الغبار والأمطار واستغلال الشرفة طوال العام.",
          features: [
            "إمكانية فتح وطي كافة الألواح بنسبة ۱۰۰٪ في زاوية الشرفة لتدفق الهواء والرؤية",
            "زجاج سيكوريت عالي المقاومة للصدمات والرياح القوية (٨ و۱۰ ملم)",
            "عزل وإحكام ممتاز بفضل فواصل البولي كربونات الشفافة وأشرطة الفرش المانعة للغبار",
            "محامل ورولمان بلي من الستانلس ستيل المقاوم للصدأ لحركة انسيابية فائقة الهدوء",
            "سهولة وأمان فائق في تنظيف وجهي الزجاج من داخل الشرفة بدون أي مخاطرة"
          ],
        },
        {
          id: "steel-glass-railings",
          title: "درابزينات زجاجية وحواجز ستانلس ستيل وألمنيوم",
          summary: "تصميم وتنفيذ درابزينات زجاجية مدفونة (Shoe Base) وحواجز ستانلس ستيل بحرية AISI 304/316 وحواجز أمنية بنكية بأنابيب مصمتة ومخروطة بدقة CNC.",
          features: [
            "استخدام زجاج مصفح سيكوريت مزدوج فائق الأمان (۱۰+۱۰ ملم و ۸+۸ ملم)",
            "قواعد ألمنيوم مدفونة عالية التحمل مع أغطية أنودايز معمارية فاخرة",
            "ستانلس ستيل بحري فئة AISI 316 مقاوم للملوحة وبيئات المسابح",
            "تحمل أحمال ديناميكية تزيد عن ۳۰۰ كغ لكل متر طولي وفق اشتراطات كود البناء",
            "مساند يد أنيقة ميني مال تثبت على الزجاج من الستانلس ستيل أو الألمنيوم أو الخشب"
          ],
        },
      ],
    },
    systems: {
      headingTitle: "الأنظمة والقطاعات الحصرية",
      headingSubtitle: "أنظمة الثيرمال بريك والأنظمة العادية",
      viewAll: "عرض كافة الأنظمة",
      specsLabels: {
        frameWidth: "عرض الإطار",
        sashWidth: "عرض الضلفة",
        wallThickness: "سماكة الجدار",
        polyamideSize: "شريط البولياميد",
        glassThickness: "سماكة الزجاج",
        thermalUf: "العزل الحراري Uf",
        appearance: "المظهر الخارجي",
        cornerFixture: "تثبيت الزوايا",
        gaskets: "عوازل التسريب",
        hardware: "توافق الإكسسوارات",
        openings: "أنواع الفتحات",
      },
    },
    featuredProjects: {
      headingTitle: "المشاريع المميزة",
      headingSubtitle: "نماذج من أعمالنا المنفذة في مختلف المدن",
      galleryBtn: "معرض المشاريع",
      viewProject: "عرض صور المشروع",
    },
    process: {
      headingTitle: "مراحل الهندسة وتنفيذ المشاريع",
      headingSubtitle: "من التصميم المعماري حتى التركيب النهائي",
      steps: [
        {
          title: "التصميم والحسابات",
          desc: "إعداد المخططات التنفيذية وحسابات عزم القصور الذاتي الاستاتيكية واختيار النظام الأنسب.",
        },
        {
          title: "التصنيع والإنتاج",
          desc: "التصنيع الصناعي والتجميع عالي الدقة في مصنعنا بمساحة ١٥٠٠ م² بأحدث آلات CNC.",
        },
        {
          title: "التركيب والتسليم",
          desc: "النقل الآمن، التركيب الهندسي المتقن، اختبارات العزل الهوائي والمائي، والتسليم الرسمي.",
        },
        {
          title: "الضمان والدعم الفني",
          desc: "خدمات ما بعد البيع المستمرة، توفير قطع الغيار الأصلية، وشهادة ضمان خطية معتمدة.",
        },
      ],
    },
    distribution: {
      heading: "شبكة التوزيع واللوجستيات",
      subtitle: "التصميم الهندسي والتصنيع بمصنع أصفهان؛ الشحن والتركيب الاحترافي في كافة المدن",
      hubName: "أصفهان",
      hubLabel: "المصنع المركزي والمقر الهندسي",
      directShipment: "شحن مباشر من المنشأة الصناعية",
      safePackaging: "تغليف آمن على طبالي خشبية معيارية",
      pillar1Title: "مركز الإنتاج الصناعي",
      pillar1Desc: "مصنع متكامل بمساحة ١٥٠٠ م² مجهز بمناشير رقمية دقيقة وخطوط تجميع صناعية",
      pillar2Title: "لوجستيات مخصصة شاملة",
      pillar2Desc: "نقل آمن للزجاج المزدوج الكبير وقطاعات الألمنيوم المؤكسدة دون أي خدوش",
      pillar3Title: "فرق تركيب هندسية معتمدة",
      pillar3Desc: "إيفاد فنيين متخصصين لتركيب الواجهات الستائرية وأنظمة الثيرمال بريك بدقة متناهية",
      cities: {
        tehran: {
          name: "طهران والبرز",
          province: "محافظة طهران والبرز",
          projects: "أكثر من ۱۸ برجاً إدارياً وسفارة ومجمعاً سكنياً فاخراً",
          systemTypes: "واجهات كورتن وول لامل، نوافذ ثيرمال بريك TH 68 وفريملس",
        },
        mashhad: {
          name: "مشهد",
          province: "خراسان الرضوية",
          projects: "۸ مجمعات فندقية كبرى ومراكز تجارية رئيسية",
          systemTypes: "واجهات زجاجية هيكلية، وأنظمة ليفت آند سلايد عازلة",
        },
        tabriz: {
          name: "تبريز",
          province: "أذربيجان الشرقية والغربية",
          projects: "أنظمة زجاجية مقاومة للمناخ الجبلي شديد البرودة",
          systemTypes: "قطاعات متطورة مع بولياميد ۲۴ ملم وغاز الأرجون العازل",
        },
        shiraz: {
          name: "شيراز",
          province: "فارس وبوشهر",
          projects: "فلل خاصة فاخرة ومجمعات مكاتب معمارية عصرية",
          systemTypes: "أبواب ونوافذ سحب TS 143 ودرابزينات زجاجية",
        },
        ahvaz: {
          name: "الأهواز",
          province: "خوزستان",
          projects: "مشاريع صناعية وعمرانية بعزل حراري وغباري فائق",
          systemTypes: "نوافذ محكمة العزل مزودة بجوانات EPDM الأصلية",
        },
        bandar_abbas: {
          name: "بندر عباس وكيش",
          province: "هرمزغان",
          projects: "منتجعات ساحلية وفنادق سياحية في جزر الخليج",
          systemTypes: "أنودايز شامبانيا مقاوم للملوحة والرطوبة البحرية العالية",
        },
        north: {
          name: "مازندران وجيلان",
          province: "سواحل بحر قزوين",
          projects: "فلل عصرية فاخرة وسط الغابات وعلى الشواطئ",
          systemTypes: "نوافذ ليفت آند سلايد بانورامية مدمجة مع خشب الثرموود",
        },
        kerman: {
          name: "كرمان",
          province: "كرمان والجنوب الشرقي",
          projects: "مجمعات إدارية ومصرفية ومباني صناعية",
          systemTypes: "تكسية كلادينج ألمنيوم مقاوم للحريق وقطاعات معمارية",
        },
        yazd: {
          name: "يزد",
          province: "محافظة يزد",
          projects: "مباني متوافقة مع المناخ الصحراوي الجاف وشديد الحرارة",
          systemTypes: "زجاج Low-E العاكس للحرارة وأنظمة عزل صوتي متطورة",
        },
        kermanshah: {
          name: "كرمانشاه والغرب",
          province: "كرمانشاه، همدان وكردستان",
          projects: "فروع بنكية رئيسية ومشاريع سكنية راقية",
          systemTypes: "حواجز ستانلس ستيل ونوافذ مفصلية بفتح ثنائي الاتجاه",
        },
      },
    },
    faq: {
      badge: "دليل العملاء والمهندسين",
      title: "الأسئلة الشائعة حول نوآوران پنجره",
      subtitle: "إجابات على الأسئلة الشائعة حول الهوية المؤسسية، معايير العزل، أنظمة الواجهات، ومراحل تقديم العروض.",
      items: [
        {
          question: "ما هو الاسم الرسمي والمسجل لشركة نوآوران پنجره؟",
          answer: "الاسم الرسمي والمسجل هو «شركة نوآوران پنجره سباهان» (رقم السجل: ۳۸۹۲، الرقم الوطني: ۱۴۰۱۵۰۲۶۲۳۰)، والمعروفة لدى المعماريين والمهندسين باسم «نوآوران پنجره». وتختص الشركة في التصميم الهندسي والتصنيع والتركيب لواجهات الكورتن وول والأبواب والنوافذ العازلة للحرارة.",
        },
        {
          question: "ما هي نوافذ الألمنيوم ثيرمال بريك وما ميزتها عن النوافذ العادية؟",
          answer: "نوافذ الثيرمال بريك مزودة بشريط بولياميد مقوى يعزل بين الطبقة الداخلية والخارجية للألمنيوم. هذا الهيكل يمنع انتقال الحرارة والصوت ويوفر حتى ٤٥٪ من استهلاك الطاقة للتكييف، ويمنع تماماً تعرق الزجاج ويوفر عزلاً صوتياً وحرارياً ممتازاً.",
        },
        {
          question: "ما الفرق بين واجهات كورتن وول (لامل) والواجهات الفريملس؟",
          answer: "واجهات كورتن وول لامل هي هيكل ذاتي الإسناد بأعمدة وروافد ألمنيوم مصممة لتبديد أحمال الرياح والزلازل. أما في نظام فريملس، فيتم تركيب الزجاج دون أغطية ألمنيوم خارجية بارزة، مما يمنح المبنى مظهراً زجاجياً موحداً وخالصاً.",
        },
        {
          question: "كيف يعمل نظام زجاج الشرفات القابل للطي (جام بلكوني)؟",
          answer: "يتكون نظام جام بلكوني من ألواح زجاج سيكوريت بسماكة ٨ إلى ۱۰ ملم تتحرك على مجارٍ ألمنيوم وتُطوى كالأكورديون في زاوية الشرفة. النظام عازل للغبار والرياح والأمطار ويوفر رؤية مفتوحة ۱۰۰٪ عند فتحه.",
        },
        {
          question: "كيف يمكنني طلب عرض سعر أو استشارة فنية لمشروعي؟",
          answer: "يمكن للمهندسين والعملاء إرسال المخططات المعمارية التنفيذية وجداول النوافذ عبر نموذج التواصل أو الاتصال المباشر بهواتف الشركة (۳۳۶۸۷۷۵۵-۰۳۱). سيقوم فريقنا الهندسي بإعداد دراسة وحساب كميات وعرض سعر تفصيلي خلال ۲۴ ساعة.",
        },
        {
          question: "هل تقوم شركة نوآوران پنجره سباهان بتنفيذ مشاريع خارج مدينة أصفهان؟",
          answer: "نعم؛ تمتلك الشركة أسطولاً لوجستياً خاصاً وفرق تركيب متخصصة لتنفيذ وتسليم المشاريع في كافة المحافظات والمدن بما في ذلك طهران، مشهد، شيراز، تبريز، الأهواز، بوشهر والموانئ الجنوبية بنظام تسليم مفتاح.",
        },
      ],
    },
    ctaBand: {
      tag: "ابدأ مشروعك الآن",
      title: "هل أنت مستعد لبدء مشروعك القادم؟",
      desc: "فريق نوآوران پنجره سباهان الهندسي على أتم الاستعداد لتقديم الاستشارات الفنية وحساب الكميات وإعداد عروض الأسعار لمشروعكم.",
      btnConsultation: "طلب استشارة",
      btnProjects: "استعراض المشاريع",
    },
    footer: {
      quickLinks: "روابط سريعة",
      contactInfo: "معلومات الاتصال",
      freeConsultation: "استشارة مجانية",
      consultationDesc: "تواصل مع خبرائنا للحصول على استشارة متخصصة وعرض أسعار فني لمشروعكم.",
      submitRequest: "إرسال الطلب",
      workingHoursLabel: "ساعات العمل:",
      workingHoursVal: "السبت إلى الأربعاء: ٠٨:٠٠ - ١٧:٠٠ | الخميس: ٠٨:٠٠ - ١٣:٠٠",
      legalRegistration: "رقم السجل: ۳۸۹۲ | شركة مساهمة خاصة",
      copyright: "جميع الحقوق محفوظة.",
      poweredBy: "مدعوم بواسطة",
    },
    about: {
      pageTitle: "نوآوران پنجره سباهان",
      pageSubtitle: "نبذة عن الشركة، التاريخ الصناعي والاعتمادات الرسمية للمصنع",
      intro: "أكثر من ثلاثة عقود من الخبرة في التصميم الحسابي للواجهات، إعداد المخططات التنفيذية، والتصنيع الصناعي والتركيب الميداني المعتمد لأفخم الواجهات والنوافذ.",
      legalBannerTitle: "البيانات الرسمية والقانونية للشركة",
      legalMember: "عضو رسمي في اتحاد صناعات الألمنيوم",
      nationalIdLabel: "الرقم الوطني:",
      companyNameLabel: "الاسم التجاري المسجل:",
      regNumberLabel: "رقم السجل التجاري:",
      postalCodeLabel: "الرمز البريدي:",
      phoneLabel: "هاتف المصنع والمكتب:",
      factoryTitle: "مصنع إنتاجي بمساحة ١٥٠٠ م²",
      factoryDesc: "بيئة إنتاج معزولة ومجهزة بمناشير رقمية مزدوجة الرأس، ومكابس زوايا هوائية، ومخارط تفريز، ومعدات بوليمرية لحماية طلاء الأنودايز والألوان الفاخرة.",
      engDeptTitle: "الفريق الهندسي والقسم الفني",
      engDeptDesc: "فريق هندسي متخصص في إعداد المخططات التنفيذية فاز ۲، وحساب الكميات الدقيقة، وحسابات عزم القصور الذاتي لمقاومة أحمال الرياح.",
      qcTitle: "مراقبة الجودة الثلاثية (QC)",
      qcDesc: "فحص دقيق لزوايا القص، ومراجعة جودة التجميع، واختبار العزل قبل الشحن، مع تغليف متعدد الطبقات لحماية المنتجات أثناء النقل والتركيب.",
      timelineTitle: "مسار التطور والنمو",
      timeline: [
        {
          year: "٢٠١١",
          title: "تأسيس ورشة التصميم والمقاولات",
          description: "البداية كفريق هندسي متخصص في استشارات وتصميم وتركيب مشاريع الواجهات والنوافذ.",
        },
        {
          year: "٢٠١٤",
          title: "تحديث الآلات النصف أوتوماتيكية",
          description: "التوسع نحو الإنتاج الصناعي وتجهيز الورشة بآلات القص الدقيقة والمكابس الصناعية.",
        },
        {
          year: "٢٠٢١",
          title: "إنشاء المصنع في المدينة الصناعية",
          description: "توسيع الإنتاج والانتقال إلى منشأة بمساحة ١٥٠٠ م² مع خطوط تجميع متقدمة.",
        },
        {
          year: "الآن",
          title: "نوآوران پنجره سباهان؛ ريادة المشاريع الكبرى",
          description: "التسجيل الرسمي للشركة، وتطبيق معايير ضمان الجودة، وإنجاز مشاريع كبرى في مختلف المحافظات.",
        },
      ],
    },
    contact: {
      pageTitle: "التواصل مع هندسة المبيعات",
      pageSubtitle: "استشارات مجانية، تقدير التكلفة ومعاينة المشاريع",
      directContacts: "قنوات الاتصال المباشر",
      formTitle: "إرسال طلب استشارة وعرض أسعار",
      nameLabel: "الاسم الكامل / اسم الشركة",
      namePlaceholder: "مثال: شركة التطوير المعماري",
      phoneLabel: "رقم الهاتف للتواصل (موبايل أو هاتف ثابت)",
      phonePlaceholder: "0912...",
      systemLabel: "نوع النظام المطلوب",
      systemOptions: {
        curtainWall: "واجهات زجاجية كورتن وول (لامل)",
        frameless: "واجهات زجاجية فريملس",
        thermalBreak: "نوافذ وأبواب ثيرمال بريك عازلة",
        balcony: "زجاج الشرفات القابل للطي والسحب (جام بلكوني)",
        composite: "تكسية واجهات كلادينج ألمنيوم كومبوزيت",
        other: "أنظمة أخرى (درابزين، حواجز وغيرها)",
      },
      messageLabel: "ملاحظات وتفاصيل إضافية عن المشروع (اختياري)",
      messagePlaceholder: "المساحة التقريبية، مدينة التنفيذ، أو متطلبات خاصة...",
      submitBtn: "إرسال طلب الاستشارة",
      submitting: "جاري إرسال الطلب...",
      successTitle: "تم استلام طلبكم بنجاح",
      successDesc: "سيتواصل معكم مهندسو المبيعات في أقرب وقت لمناقشة التفاصيل وتقديم عرض السعر.",
      sendAnother: "إرسال طلب استشارة جديد",
      nameRequired: "يرجى إدخال الاسم.",
      phoneRequired: "يرجى إدخال رقم الهاتف للتواصل.",
      mapTitle: "موقع المصنع والوصول الميداني",
      mapAddress: "أصفهان، شارع الإمام الخميني، شارع بسيج، زقاق ۱۳۵",
      directRoutes: "الملاحة المباشرة عبر التطبيقات:",
      phoneBranchLabel: "هاتف المصنع ومكتب المبيعات",
      centralOfficeAddressLabel: "عنوان المصنع والمقر الرئيسي",
      workingHoursLabel: "ساعات عمل هندسة المبيعات",
    },
    projectsPage: {
      pageTitle: "المشاريع المنفذة والأعمال البارزة",
      pageSubtitle: "نماذج الواجهات والنوافذ المنفذة في مختلف المدن",
      filterAll: "كافة المشاريع",
      filterBanking: "المصارف والقطاع الحكومي",
      filterCommercial: "المباني التجارية والإدارية",
      filterResidential: "المباني السكنية والفلل الفاخرة",
      filterCoop: "الأبراج والجمعيات الإسكانية",
      viewImages: "عرض صور المشروع",
    },
    materialsPage: {
      pageTitle: "دليل المنتجات والأنظمة الحصرية",
      pageSubtitle: "قطاعات الثيرمال بريك والأنظمة العادية",
      viewSpecs: "عرض المواصفات الفنية",
    },
    videosPage: {
      pageTitle: "مكتبة الفيديوهات التخصصية والرسوم ثلاثية الأبعاد",
      pageSubtitle: "شروحات التركيب الفني ورندرات الأنظمة",
      allVideos: "جميع الفيديوهات",
      searchPlaceholder: "البحث في عناوين الفيديوهات...",
    },
    articlesPage: {
      pageTitle: "الموسوعة المعمارية والمقالات التخصصية",
      pageSubtitle: "المعايير الفنية لهندسة الواجهات والنوافذ",
      readArticle: "قراءة المقال كاملاً",
    },
    common: {
      home: "الرئيسية",
      back: "رجوع",
      learnMore: "اعرف المزيد",
      loading: "جاري التحميل...",
      allRightsReserved: "جميع الحقوق محفوظة.",
    },
  },
};
