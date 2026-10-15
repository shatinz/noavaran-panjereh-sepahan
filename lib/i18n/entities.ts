import { SupportedLocale } from './types';
import { MaterialItem, ProjectItem, ServiceItem } from '../db';

export const MATERIAL_TRANSLATIONS: Record<string, {
  en: { title: string; category: string; summary: string };
  ar: { title: string; category: string; summary: string };
}> = {
  th68: {
    en: {
      title: "TH 68 Thermal Break Hinged & Hidden Vent System",
      category: "Thermal Break Hinged Systems",
      summary: "Advanced hinged thermal break system with concealed vent capability, 24mm polyamide strips, and high acoustic insulation up to 54mm glazing.",
    },
    ar: {
      title: "نظام TH 68 المفصلي ثيرمال بريك والضلفة المخفية",
      category: "أنظمة مفصلية ثيرمال بريك",
      summary: "أحدث نظام مفصلي عازل للحرارة مع إمكانية الضلفة المخفية، وعزل حراري وصوتي فائق بشرائح بولياميد ۲۴ ملم وزجاج حتى ۵۴ ملم.",
    },
  },
  th60: {
    en: {
      title: "TH 60 Thermal Break Hinged Door & Window System",
      category: "Thermal Break Hinged Systems",
      summary: "Curved aesthetic architectural thermal break profile with Uf 2.64 W/m²K thermal transmittance and versatile multi-frame capability.",
    },
    ar: {
      title: "نظام TH 60 المفصلي ثيرمال بريك للأبواب والنوافذ",
      category: "أنظمة مفصلية ثيرمال بريك",
      summary: "نظام مفصلي ثيرمال بريك بمظهر منحنٍ أنيق وعزل حراري ۲.۶۴ واط/م²كلوين ومرونة عالية لمختلف المقاسات.",
    },
  },
  ah59: {
    en: {
      title: "AH 59 Heavy-Duty Normal Hinged System",
      category: "Standard Hinged & Sliding Systems",
      summary: "Durable non-thermal break architectural aluminium system ideal for internal partitions, office entrances, and high-traffic spaces.",
    },
    ar: {
      title: "نظام AH 59 المفصلي العادي للأبواب والنوافذ",
      category: "أنظمة مفصلية وسحب عادية",
      summary: "نظام ألمنيوم متين بدون كسر حراري، مثالي للفواصل الداخلية والمكاتب والأبواب والمشاريع التجارية الاقتصادية.",
    },
  },
  ah47: {
    en: {
      title: "AH 47 Dedicated Normal Hinged Window System",
      category: "Standard Hinged & Sliding Systems",
      summary: "Slim and optimized architectural window profile providing maximum natural light intake with robust 6063 aluminium durability.",
    },
    ar: {
      title: "نظام AH 47 المفصلي العادي للنوافذ المعمارية",
      category: "أنظمة مفصلية وسحب عادية",
      summary: "نافذة ألمنيوم بمقطع رفيع ۴۷ ملم توفر أقصى نفاذية للضوء الطبيعي مع متانة عالية ومقاومة للترهل.",
    },
  },
  ts143: {
    en: {
      title: "TS 143 Heavy-Duty Lift & Slide Thermal Break System",
      category: "Thermal Break Sliding & Lift-Slide Systems",
      summary: "Heavyweight Lift & Slide panoramic system with frame widths up to 168mm, effortlessly carrying up to 400 kg per sash across 6-meter villa openings.",
    },
    ar: {
      title: "نظام TS 143 ليفت آند سلايد ثيرمال بريك فائق التحمل",
      category: "أنظمة سحب وليفت آند سلايد ثيرمال بريك",
      summary: "أقوى نظام سحب ورفع للمباني والفلل، بعرض إطار حتى ۱۶۸ ملم وقدرة حمل حتى ۴۰۰ كغ لكل ضلفة لفتحات بانورامية عريضة.",
    },
  },
  ts115: {
    en: {
      title: "TS 115 Lift & Slide and Standard Sliding Thermal Break",
      category: "Thermal Break Sliding & Lift-Slide Systems",
      summary: "Versatile 115mm frame dual-glazed system supporting smooth conventional sliding and lift-and-slide up to 200 kg per panel.",
    },
    ar: {
      title: "نظام TS 115 سحب وليفت آند سلايد ثيرمال بريك",
      category: "أنظمة سحب وليفت آند سلايد ثيرمال بريك",
      summary: "نظام سحب ثيرمال بريك بعرض إطار ۱۱۵ ملم يدعم السحب العادي والليفت آند سلايد حتى وزن ۲۰۰ كغ لكل ضلفة.",
    },
  },
  ts77: {
    en: {
      title: "TS 77 Slim Thermal Break Sliding System",
      category: "Thermal Break Sliding & Lift-Slide Systems",
      summary: "Lightweight and sleek 77mm sliding thermal break window system engineered for modern residential apartments and balconies.",
    },
    ar: {
      title: "نظام TS 77 السحاب ثيرمال بريك الخفيف",
      category: "أنظمة سحب وليفت آند سلايد ثيرمال بريك",
      summary: "نظام نوافذ سحاب خفيف وعصري بإطار ۷۷ ملم وعزل حراري بالبولياميد للشقق السكنية والشرفات.",
    },
  },
  as90: {
    en: {
      title: "AS 90 Wide-Frame Sliding System",
      category: "Thermal Break Sliding & Lift-Slide Systems",
      summary: "Curved soft-edge 90mm wide frame sliding system engineered for exceptional mechanical stability and architectural elegance.",
    },
    ar: {
      title: "نظام AS 90 السحاب بإطار عريض ومظهر منحنٍ",
      category: "أنظمة سحب وليفت آند سلايد ثيرمال بريك",
      summary: "نظام سحاب بإطار عريض ۹۰ ملم وخطوط منحنية ناعمة، مصمم للواجهات العريضة مع ثبات ميكانيكي عالٍ.",
    },
  },
  as60: {
    en: {
      title: "AS 60 Normal Sliding Window System",
      category: "Standard Hinged & Sliding Systems",
      summary: "Cost-effective 60mm and 100mm non-thermal sliding system engineered for moderate climates and interior partitions.",
    },
    ar: {
      title: "نظام AS 60 السحاب العادي للنوافذ",
      category: "أنظمة مفصلية وسحب عادية",
      summary: "نظام سحاب اقتصادي بإطارات ۶۰ و۱۰۰ ملم، مناسب للمناخات المعتدلة والقواطع الداخلية.",
    },
  },
  mas60: {
    en: {
      title: "MAS 60 Monorail Sliding Window System (90mm)",
      category: "Standard Hinged & Sliding Systems",
      summary: "Integrated monorail sliding system with a wide 90mm flat frame, featuring one fixed pane and one sliding panel for a seamless minimalist look.",
    },
    ar: {
      title: "نظام MAS 60 مونوريل سحاب عادي (إطار 90mm)",
      category: "أنظمة مفصلية وسحب عادية",
      summary: "نظام مونوريل سحاب بإطار عريض ۹۰ ملم مع ضلفة ثابتة وأخرى متحركة لمظهر مينيمال ومحكم.",
    },
  },
  'plisse-grid': {
    en: {
      title: "Plisse Grid Magnetic Pleated Insect Screen",
      category: "Complementary Systems & Balustrades",
      summary: "Proprietary pleated accordion screen with UV-resistant mesh, magnetic sealing, and smooth zero-noise operation.",
    },
    ar: {
      title: "نظام توري بليسيه المغناطيسي للشاشات والشبابيك",
      category: "الأنظمة الإضافية وحواجز الشرفات",
      summary: "نظام شباك بليسيه أكورديوني بمقاطع ألمنيوم خاصة وشبك بوليستر مقاوم للغبار وأشعة الشمس مع إغلاق مغناطيسي هادئ.",
    },
  },
  'verandah-fence': {
    en: {
      title: "Verandah Fence In-Ground Glass Balustrade System",
      category: "Complementary Systems & Balustrades",
      summary: "Heavy-duty structural aluminium glass railing system available in flush in-ground and top-mount configurations, rated over 300 kg/m dynamic load.",
    },
    ar: {
      title: "نظام درابزين وحواجز زجاجية مدفونة للشرفات",
      category: "الأنظمة الإضافية وحواجز الشرفات",
      summary: "نظام هندسي لدرابزينات الشرفات بمقاطع ألمنيوم فائقة المتانة توضع مدفونة أو ظاهرة، مع تحمل ديناميكي يتجاوز ۳۰۰ كغ/م.",
    },
  },
};

export function getLocalizedMaterial(material: MaterialItem, locale: SupportedLocale) {
  if (locale === 'fa') {
    return {
      title: material.title,
      category: material.category,
      summary: material.summary,
    };
  }

  const trans = MATERIAL_TRANSLATIONS[material.id] || MATERIAL_TRANSLATIONS[material.code.toLowerCase().replace(/[^a-z0-9]/g, '')];
  if (trans && trans[locale]) {
    return trans[locale];
  }

  if (locale === 'en' && material.titleEn) {
    return {
      title: material.titleEn,
      category: material.categoryKey.replace('_', ' ').toUpperCase(),
      summary: material.summary,
    };
  }

  return {
    title: material.title,
    category: material.category,
    summary: material.summary,
  };
}

export const SERVICE_TRANSLATIONS: Record<string, {
  en: {
    title: string;
    titleEn: string;
    summary: string;
    features: string[];
    subcategories: { name: string; description: string }[];
    technicalSpecs?: Record<string, string>;
  };
  ar: {
    title: string;
    titleEn: string;
    summary: string;
    features: string[];
    subcategories: { name: string; description: string }[];
    technicalSpecs?: Record<string, string>;
  };
}> = {
  "aluminum-windows-doors": {
    en: {
      title: "Thermal Break & Standard Aluminium Windows and Doors",
      titleEn: "Thermal Break Aluminium Windows & Doors",
      summary: "Industrial manufacturing of high-performance thermal break aluminium systems featuring reinforced polyamide barrier strips, Lift & Slide panoramic doors, bi-fold folding walls, and multi-lock European hardware.",
      features: [
        "100% thermal and acoustic break via high-performance polyamide structural strips",
        "Heavy-duty Lift & Slide mechanisms smoothly handling 400 kg panels with finger-touch ease",
        "Premium European architectural hardware from Roto and Siegenia Germany",
        "European satin and mirror anodized finishes in champagne, bronze, gold, and textured black",
        "Acoustic noise reduction up to 42 dB with specialized laminated acoustic glass units"
      ],
      subcategories: [
        { name: "Lift & Slide Panoramic Doors", description: "Engineered for wide openings up to 6 meters without obstructing intermediate mullions" },
        { name: "Tilt & Turn Dual Action", description: "Dual horizontal and top-hung ventilation with multi-point anti-burglary perimeter locking" },
        { name: "Bi-Fold Accordion Systems", description: "Full opening capability seamlessly merging indoor living with gardens or terraces" },
        { name: "Mono-Rail & Multi-Rail Sliders", description: "Ultra-smooth sliding profiles with marine-grade stainless steel running tracks" }
      ],
      technicalSpecs: {
        "Frame Width": "60 mm to 140 mm tailored to architectural aperture dimensions",
        "Polyamide Barrier": "Technoform Bautec Germany with 25% reinforced fire-retardant fiberglass",
        "Profile Lifespan": "Exceeding 50 years with zero discoloration or structural deformation"
      }
    },
    ar: {
      title: "أبواب ونوافذ ألمنيوم ثيرمال بريك وعادي",
      titleEn: "Thermal Break Aluminium Windows & Doors",
      summary: "تصنيع صناعي لأفخم أنظمة النوافذ والأبواب المعزولة حرارياً بشرائح بولياميد مقواة، وأنظمة السحب والرفع (Lift & Slide)، والأنظمة القابلة للطي بإكسسوارات أوروبية أصلية.",
      features: [
        "عزل حراري بنسبة ۱۰۰٪ بفضل كسر الجسر الحراري بشرائح البولياميد المتطورة",
        "نظام ليفت آند سلايد بقدرة حمل أوزان تصل إلى ۴۰۰ كغ للضلفة الواحدة بسلاسة فائقة",
        "إكسسوارات ومقابض ألمانية أصلية من كبرى العلامات العالمية (Roto و Siegenia)",
        "أنودايز أوروبي فاخر بتشطيبات مطفية ولامعة بألوان الشامبانيا والبرونز والأسود الرملي",
        "عزل صوتي فائق يخفض الضجيج حتى ۴۲ ديسيبل باستخدام زجاج اللامينيت المصفح"
      ],
      subcategories: [
        { name: "أنظمة الرفع والسحب (Lift & Slide)", description: "مخصصة للفتحات البانورامية الكبيرة والفلل حتى عرض ۶ أمتار دون أعمدة عائقة" },
        { name: "أنظمة الفتح الثنائي (Tilt & Turn)", description: "فتح أفقي ورأسي مع إغلاق محكم متعدد النقاط ضد السرقة" },
        { name: "الأنظمة القابلة للطي (Accordion / Bi-Fold)", description: "إمكانية الفتح الكامل ودمج الصالة الداخلية مع الحديقة أو الشرفة" },
        { name: "أنظمة السحب بمجرى أحادي ومزدوج", description: "سحب سلس مع سكك مقاومة للتآكل من الفولاذ المقاوم للصدأ" }
      ],
      technicalSpecs: {
        "عرض مقطع الإطار": "من ۶۰ إلى ۱۴۰ ملم وفقاً للمتطلبات الإنشائية للمشروع",
        "شريط البولياميد": "تكنوفورم ألمانيا مع ۲۵٪ ألياف زجاجية مقاومة للحريق",
        "العمر الافتراضي": "أكثر من ۵۰ عاماً دون تغير في اللون أو تشوه المقطع"
      }
    }
  },
  "curtain-wall-lamella": {
    en: {
      title: "Curtain Wall (Stick Lamella Facade)",
      titleEn: "Curtain Wall / Lamella Façade",
      summary: "State-of-the-art continuous architectural glass facade, self-supporting against wind and seismic loads, utilizing vertical mullions, horizontal transoms, and insulated double/triple safety glass.",
      features: [
        "Engineered in capped (Face-Cap) and semi-capped (Semi-Cap) architectural formats",
        "Multi-tier EPDM air and water gaskets with exceptional resistance to intense UV radiation",
        "Precision structural moment of inertia calculations to resist severe wind shear on high-rise towers",
        "Compatible with Sunergy, Low-E, tempered, and laminated anti-burglary glass configurations",
        "Seamless integration with concealed outward-projecting parallel and top-hung vents"
      ],
      subcategories: [
        { name: "Face-Cap System", description: "Mechanical clamping covers in airfoil, rectangular, or concave profiles" },
        { name: "Semi-Cap System", description: "Accentuated lines along horizontal or vertical axes with silicone butt joints" }
      ],
      technicalSpecs: {
        "Mullion Depth": "50 mm to 250 mm calculated per wind pressure and floor heights",
        "Alloy Standard": "6063 T6 architectural aluminium extrusions",
        "Air & Water Tightness": "Class 4 (EN 12207) and Class 9A (EN 12208)"
      }
    },
    ar: {
      title: "واجهة كورتن وول لامل (Curtain Wall)",
      titleEn: "Curtain Wall / Lamella Façade",
      summary: "الهيكل الزجاجي الأكثر تطوراً لتغطية المباني الحديثة، ذاتي الاستناد ومقاوم للرياح والزلازل بأعمدة وتيرانسومات ألمنيوم قوية وزجاج مزدوج مصفح وسيكوريت.",
      features: [
        "تصميم بنظام الأغطية الخارجية (Face-Cap) أو النصف درپوش (Semi-Cap)",
        "جوانات EPDM متعددة الطبقات عازلة للماء والهواء ومقاومة للأشعة فوق البنفسجية",
        "حسابات استاتيكية دقيقة لعزم القصور الذاتي لتحمل أعتى ضغوط الرياح في الأبراج الشاهقة",
        "توافق كامل مع زجاج التحكم الشمسي Low-E، والعازل للصوت والمضاد للصدمات",
        "إمكانية دمج ضلف تهوية مخفية للخارج (Hidden Sash) بتناغم معماري تام"
      ],
      subcategories: [
        { name: "نظام فيس كاب (Face Cap)", description: "تغطية الفواصل بأغطية ألمنيوم خارجية بأشكال بيضاوية أو مستطيلة أنيقة" },
        { name: "نظام سيمي كاب (Semi Cap)", description: "تأكيد خطوط اتجاه واحد (أفقي أو رأسي) مع فواصل سيليكون إنشائية" }
      ],
      technicalSpecs: {
        "عمق الموليون": "من ۵۰ إلى ۲۵۰ ملم وفقاً لارتفاع الطوابق وحسابات أحمال الرياح",
        "معيار السبيكة": "ألمنيوم معماري 6063 بتعتيق T6",
        "مقاومة الهواء والماء": "الفئة 4 (EN 12207) والفئة 9A (EN 12208)"
      }
    }
  },
  "frameless-facade": {
    en: {
      title: "Frameless Glass Facade System",
      titleEn: "Frameless Structural Glazing",
      summary: "Pure minimalist all-glass curtain wall with concealed modular sub-frames and structural silicone bonding, delivering an uninterrupted monolithic reflective glass surface.",
      features: [
        "Complete elimination of exterior aluminum face plates for a mirror-like pure glass facade",
        "Heavy structural silicone bonding compliant with international safety standards",
        "Integration of invisible concealed outward vents preserving uninterrupted facade aesthetics",
        "High acoustic and thermal insulation through thermal break sub-frame cassettes",
        "Seismic expansion joints accommodating inter-story drift without glass stress"
      ],
      subcategories: [
        { name: "Full Frameless", description: "Zero exterior aluminum visible across horizontal and vertical joints" },
        { name: "U-Channel Facade", description: "Ultra-slim recessed silicone joints for seamless glass alignment" }
      ],
      technicalSpecs: {
        "Structural Silicone": "Dow Corning / Sika structural two-part silicone",
        "Glass Thickness": "Double glazed 6+12+6 mm or triple glazed laminated units",
        "Wind Load Resistance": "Tested up to 3000 Pa dynamic air pressure"
      }
    },
    ar: {
      title: "واجهة زجاجية فريملس (Frameless)",
      titleEn: "Frameless Structural Glazing",
      summary: "واجهة زجاجية معمارية نقية بدون أي إطارات ألمنيوم خارجية، حيث يتم تثبيت الزجاج ببراويز فرعية مخفية وسيليكون إنشائي فائق القوة لمظهر بلوري متصل.",
      features: [
        "حذف كامل للأغطية الخارجية للحصول على سطح زجاجي عاكس وموحد كقطعة واحدة",
        "تثبيت هيكلي بسيليكون إنشائي متخصص فائق التحمل للأحمال الديناميكية والحرارية",
        "ضلف تهوية مخفية تماماً تفتح إلى الخارج دون التأثير على بصرية الواجهة الخارجية",
        "عزل حراري وصوتي عالي مع كاسيتات فرعية معزولة حرارياً",
        "فواصل تمدد زلزالية ذكية تمتص حركة الطوابق دون أي ضغط على الزجاج"
      ],
      subcategories: [
        { name: "فريملس كامل (Full Frameless)", description: "انعدام كامل لأي مظهر للألمنيوم بين الألواح من الخارج" },
        { name: "نظام يو-تشانل (U-Channel)", description: "فواصل غائرة دقيقة مع سيليكون عازل لمظهر انسيابي فائق النقاء" }
      ],
      technicalSpecs: {
        "السيليكون الإنشائي": "سيليكون إنشائي ثنائي المكونات من داو كورنينغ أو سيكا",
        "سماكة الزجاج": "زجاج مزدوج ۶+۱۲+۶ ملم أو وحدات ثلاثية مصفحة",
        "مقاومة الرياح": "تم اختبارها حتى ۳۰۰۰ باسكال من ضغط الرياح الديناميكي"
      }
    }
  },
  "composite-panel": {
    en: {
      title: "Aluminium Composite Panel (ACP) Cladding",
      titleEn: "Aluminium Composite Panel Cladding",
      summary: "High-grade fire-retardant (FR/A2) composite aluminum facade skins with PVDF nano anti-stain coatings, available in metallic, stone, and architectural wood textures.",
      features: [
        "Class A2/B1 certified fire-retardant mineral cores complying with building safety codes",
        "Lightweight design drastically lowering structural dead load on building columns",
        "High resistance to intense UV radiation, industrial acid rains, and coastal salt fog",
        "Precision CNC grooving enabling bold parametric curves and angular geometry",
        "Modular hanging (Hanging) or fixed (Fixing) architectural sub-structure systems"
      ],
      subcategories: [
        { name: "Hanging Sub-frame System", description: "Premium sliding-joint installation allowing expansion without panel buckling" },
        { name: "Fixing Sub-frame System", description: "Fast, rigid screw fastening suitable for low-rise and renovation facades" }
      ],
      technicalSpecs: {
        "Panel Thickness": "4 mm (0.5 mm aluminium skin on both faces)",
        "Coating": "Triple-layer PVDF with Kynar 500 fluoropolymer resin",
        "Fire Rating": "Class A2 Non-Combustible per EN 13501-1"
      }
    },
    ar: {
      title: "نمای کامپوزیت آلومینیوم (ACP)",
      titleEn: "Aluminium Composite Panel Cladding",
      summary: "ألواح كلادينج ألمنيوم كومبوزيت مقاومة للحريق (A2/FR) بطبقات نانو PVDF طاردة للغبار، بألوان ميتاليك وتأثيرات خشبية ورخامية فخمة.",
      features: [
        "حشوة معدنية غير قابلة للاشتعال حاصلة على شهادات السلامة القياسية (A2/B1)",
        "وزن خفيف يقلل بشكل ملحوظ من الحمل الميت على الهيكل الإنشائي للمبنى",
        "مقاومة تامة للأشعة فوق البنفسجية، الأمطار الحمضية والظروف الجوية القاسية",
        "إمكانية القص والتشكيل بتقنية CNC للواجهات البارامترية والزوايا المعقدة",
        "أنظمة تركيب معلقة (Hanging) أو مثبتة (Fixing) بأعلى دقة هندسية"
      ],
      subcategories: [
        { name: "نظام التعليق (Hanging)", description: "أرقى أنظمة التركيب يتيح التمدد الحراري دون أي تموج في الألواح" },
        { name: "نظام التثبيت المباشر (Fixing)", description: "تثبيت ميكانيكي سريع وقوي ملائم للمشاريع وتجديد المباني" }
      ],
      technicalSpecs: {
        "سماكة اللوح": "۴ ملم (طبقتي ألمنيوم بسماكة ۰.۵ ملم لكل جهة)",
        "نوع الطلاء": "طلاء PVDF ثلاثي الطبقات بتقنية Kynar 500",
        "تصنيف الحريق": "الفئة A2 غير قابلة للاشتعال وفق معيار EN 13501-1"
      }
    }
  },
  "glass-balcony": {
    en: {
      title: "Folding & Sliding Balcony Glazing System",
      titleEn: "Folding & Sliding Balcony Glazing",
      summary: "Frameless folding and sliding tempered safety glass enclosure systems for modern balconies, penthouses, and restaurant terraces, offering 100% panoramic opening.",
      features: [
        "100% unobstructed panoramic view with panels folding neatly into the corner",
        "8mm and 10mm high-impact tempered safety glass conforming to European standards",
        "Heavy-duty stainless steel bearing wheels providing silent, effortless sliding",
        "Weatherproof sealing using anti-UV transparent polycarbonates and dense bristles",
        "Easy and safe cleaning of both exterior and interior glass faces from inside"
      ],
      subcategories: [
        { name: "Corner-Folding System", description: "Panels slide and rotate 90 degrees to stack flat against the wall" },
        { name: "Multi-Track Parallel Slider", description: "Telescopic sliding panels along 3 to 5 tracks without corner pivot" }
      ],
      technicalSpecs: {
        "Glass Thickness": "8 mm or 10 mm tempered safety glass",
        "Track Material": "6063 T5 extruded aluminium with electrostatic powder coat",
        "Max Sash Height": "Up to 2.80 meters with secure interlock seals"
      }
    },
    ar: {
      title: "شیشه بالکن تاشو و ریلی (جام‌بالکنی)",
      titleEn: "Folding & Sliding Balcony Glazing",
      summary: "أنظمة زجاج الشرفات الحديثة القابلة للطي والسحب، بزجاج سيكوريت مقوى بدون قواطع رأسية، لتوفير رؤية بانورامية كاملة واستغلال الشرفة في جميع فصول السنة.",
      features: [
        "إمكانية الفتح الكامل بنسبة ۱۰۰٪ عبر طي الألواح وتجميعها في زاوية الشرفة",
        "زجاج سيكوريت عالي المقاومة للصدمات بسماكة ۸ و ۱۰ ملم مطابق للمواصفات العالمية",
        "عجلات ورولمان بلي من الفولاذ المقاوم للصدأ لحركة انسيابية صامتة وسلسة",
        "عزل فعال ضد الغبار والأمطار والرياح والضوضاء بجوانات بولي كربونات وفرش محكم",
        "تنظيف سهل وآمن لكلا وجهي الزجاج من داخل الشرفة دون أي مخاطرة"
      ],
      subcategories: [
        { name: "نظام الطي الزاوي (Accordion)", description: "تتحرك الألواح وتدور ۹۰ درجة لتتجمع بجانب الجدار كالأكورديون" },
        { name: "نظام السحب المتوازي (Parallel Slide)", description: "ألواح سحاب متداخلة على مسارات متعددة بدون دوران" }
      ],
      technicalSpecs: {
        "سماكة الزجاج": "۸ ملم أو ۱۰ ملم زجاج سيكوريت مقوى ضد الكسر",
        "مادة السكة": "ألمنيوم مسحوب 6063 مطلي إلكتروستاتيكياً",
        "الارتفاع الأقصى": "حتى ۲.۸۰ متر مع إحكام إغلاق تام"
      }
    }
  },
  "steel-glass-railings": {
    en: {
      title: "Stainless Steel, Aluminium & Glass Railings",
      titleEn: "Architectural Glass & Steel Railings",
      summary: "Modern architectural glass balustrades with continuous shoe bases, spigots, and marine-grade AISI 304/316 stainless steel railings designed for balconies, stairwells, and swimming pools.",
      features: [
        "Heavy laminated tempered glass (8+8mm or 10+10mm) with durable PVB/SGP interlayers",
        "Continuous structural aluminum floor-shoe base with luxury anodized covers",
        "Marine-grade AISI 316 stainless steel components resistant to poolside and sea air",
        "Dynamic structural load resistance tested to withstand over 300 kg per linear meter",
        "Minimalist architectural top handrails available in aluminum, steel, or wood"
      ],
      subcategories: [
        { name: "Embedded Shoe Balustrade", description: "Flush in-floor or surface aluminum channel with zero visible fasteners" },
        { name: "Spigot Point-Supported", description: "Stainless steel clamps supporting glass above floor level for water drainage" }
      ],
      technicalSpecs: {
        "Glass Type": "Laminated Tempered 16.76 mm to 21.52 mm",
        "Stainless Steel Grade": "AISI 304 (Interior) / AISI 316 (Exterior & Coastal)",
        "Load Capacity": "Up to 3.0 kN/m per building code regulations"
      }
    },
    ar: {
      title: "حفاظ و نرده‌های استیل و شیشه‌ای (هندریل)",
      titleEn: "Architectural Glass & Steel Railings",
      summary: "حواجز ودرابزينات زجاجية فاخرة بنظام اليو-تشانل والأعمدة المدفونة، ونظم الفولاذ المقاوم للصدأ ستانلس ستيل ۳۰۴ و ۳۱۶ للشرفات والسلالم والمسابح.",
      features: [
        "زجاج مصفح سيكوريت مزدوج فائق المتانة (۸+۸ ملم أو ۱۰+۱۰ ملم) بشرائح PVB أو SGP",
        "قواعد ألمنيوم أرضية مستمرة (Shoe Base) بأغطية أنودايز فاخرة تخفي أدوات التثبيت",
        "قطع وإكسسوارات من الفولاذ المقاوم للصدأ درجة ۳۱۶ المقاومة للرطوبة والأملاح",
        "تحمل ديناميكي عالي معتمد هندسياً يتحمل قوى تفوق ۳۰۰ كغ لكل متر طولي",
        "هندريل ومقابض علوية أنيقة بخيارات الألمنيوم، الستانلس ستيل أو الخشب المعماري"
      ],
      subcategories: [
        { name: "نظام اليو-تشانل المدمج (In-Floor Shoe)", description: "تثبيت غائر في الأرضية لمظهر زجاجي شفاف نقي بدون أي عوائق" },
        { name: "نظام السبايجوت والمشابك (Spigot System)", description: "مشابك ستانلس ستيل مرتفعة عن الأرض لتسهيل تصريف مياه الأمطار" }
      ],
      technicalSpecs: {
        "نوع الزجاج": "زجاج مصفح سيكوريت ۱۶.۷۶ ملم إلى ۲۱.۵۲ ملم",
        "درجة الستانلس": "AISI 304 للمساحات الداخلية / AISI 316 للواجهات والمسابح",
        "قدرة التحمل": "حتى ۳.۰ كيلونيوتن/متر وفقاً لكودات البناء العالمية"
      }
    }
  }
};

export function getLocalizedService(service: ServiceItem, locale: SupportedLocale) {
  if (locale === 'fa') {
    return {
      title: service.title,
      titleEn: service.titleEn,
      summary: service.summary,
      features: service.features,
      subcategories: service.subcategories,
      technicalSpecs: service.technicalSpecs,
    };
  }

  const trans = SERVICE_TRANSLATIONS[service.slug] || SERVICE_TRANSLATIONS[service.id];
  if (trans && trans[locale]) {
    return {
      title: trans[locale].title,
      titleEn: trans[locale].titleEn,
      summary: trans[locale].summary,
      features: trans[locale].features,
      subcategories: trans[locale].subcategories,
      technicalSpecs: trans[locale].technicalSpecs || service.technicalSpecs,
    };
  }

  return {
    title: locale === 'en' && service.titleEn ? service.titleEn : service.title,
    titleEn: service.titleEn,
    summary: service.summary,
    features: service.features,
    subcategories: service.subcategories,
    technicalSpecs: service.technicalSpecs,
  };
}

export const PROJECT_CATEGORY_TRANSLATIONS: Record<string, { en: string; ar: string }> = {
  "بانکی و دولتی": { en: "Banking & Government", ar: "المصارف والقطاع الحكومي" },
  "تجاری و اداری": { en: "Commercial & Corporate", ar: "تجاري وإداري" },
  "مسکونی و ویلایی": { en: "Residential & Luxury Villas", ar: "سكني وفلل فاخرة" },
  "تعاونی و برج‌ها": { en: "Towers & Housing Cooperatives", ar: "أبراج وجمعيات إسكانية" },
};

export const SYSTEM_TAG_TRANSLATIONS: Record<string, { en: string; ar: string }> = {
  "پنجره دوجداره ترمال‌بریک": { en: "Thermal Break Windows", ar: "نوافذ ثيرمال بريك مزدوجة" },
  "نمای کرتین وال لامل": { en: "Stick Curtain Wall Facade", ar: "واجهة كورتن وول لامل" },
  "شیشه لمینت سکوریت": { en: "Tempered Laminated Glass", ar: "زجاج سيكوريت مصفح" },
  "نمای شیشه‌ای فریم‌لس": { en: "Frameless Glass Facade", ar: "واجهة زجاجية فريملس" },
  "جام‌بالکنی ریلی و تاشو": { en: "Balcony Glazing System", ar: "زجاج شرفات قابل للطي" },
  "کامپوزیت آلومینیوم": { en: "Aluminium Composite Panel", ar: "كلادينج ألمنيوم كومبوزيت" },
  "هندریل شیشه‌ای": { en: "Glass Handrail & Balustrade", ar: "درابزين زجاجي" },
};

export function getLocalizedProject(project: ProjectItem, locale: SupportedLocale) {
  if (locale === 'fa') {
    return {
      title: project.title,
      category: project.category,
      location: project.location,
      systemsUsed: project.systemsUsed,
      description: project.description,
    };
  }

  const catTrans = PROJECT_CATEGORY_TRANSLATIONS[project.category];
  const category = (catTrans && catTrans[locale]) || project.category;

  const systemsUsed = project.systemsUsed.map(sys => {
    const sysTrans = SYSTEM_TAG_TRANSLATIONS[sys];
    return (sysTrans && sysTrans[locale]) || sys;
  });

  const location = locale === 'en'
    ? "Isfahan & Other Metropolises"
    : (locale === 'ar' ? "أصفهان ومختلف المحافظات" : project.location);

  // Clean, professional title formatting for EN & AR:
  let title = project.title;
  let description = project.description;

  if (locale === 'en') {
    title = project.title
      .replace(/ساختمان مسکونی/g, 'Residential Building')
      .replace(/ساختمان تجاری اداری/g, 'Commercial & Office Tower')
      .replace(/ساختمان تجاری/g, 'Commercial Complex')
      .replace(/ساختمان اداری/g, 'Corporate Office')
      .replace(/ساختمان بانک/g, 'Bank Building')
      .replace(/بانک/g, 'Bank')
      .replace(/تعاونی مسکن/g, 'Housing Cooperative')
      .replace(/ویلای/g, 'Luxury Villa')
      .replace(/پروژه مسکونی/g, 'Residential Project')
      .replace(/شهرداری منطقه/g, 'Municipal Headquarters District')
      .replace(/آقای مهندس/g, 'Eng.')
      .replace(/خانم دکتر/g, 'Dr.')
      .replace(/آقای دکتر/g, 'Dr.')
      .replace(/مهندس/g, 'Eng.');

    description = `Engineering design, precision fabrication and installation of architectural glass facade and thermal break systems for ${title} by Noavaran Panjereh Sepahan.`;
  } else if (locale === 'ar') {
    title = project.title
      .replace(/ساختمان مسکونی/g, 'مبنى سكني')
      .replace(/ساختمان تجاری اداری/g, 'مجمع تجاري وإداري')
      .replace(/ساختمان تجاری/g, 'مبنى تجاري')
      .replace(/ساختمان اداری/g, 'مبنى إداري')
      .replace(/ساختمان بانک/g, 'مبنى بنك')
      .replace(/بانک/g, 'بنك')
      .replace(/تعاونی مسکن/g, 'جمعية إسكان')
      .replace(/ویلای/g, 'فيلا فاخرة')
      .replace(/پروژه مسکونی/g, 'مشروع سكني')
      .replace(/شهرداری منطقه/g, 'مبنى البلدية - المنطقة')
      .replace(/آقای مهندس/g, 'المهندس')
      .replace(/خانم دکتر/g, 'الدكتورة')
      .replace(/آقای دکتر/g, 'الدكتور')
      .replace(/مهندس/g, 'المهندس');

    description = `تصميم وهندسة وتصنيع وتركيب الواجهات الزجاجية ونوافذ الثيرمال بريك لمشروع ${title} بواسطة شركة نوآوران پنجره سباهان.`;
  }

  return {
    title,
    category,
    location,
    systemsUsed,
    description,
  };
}
