import fs from 'fs';
import path from 'path';

const projectTitles = {
  'proj-1': {
    titleEn: 'Bank Mehr Eqtesad Building',
    titleAr: 'مبنى بنك مهر اقتصاد',
    employerEn: 'Mehr Eqtesad Bank',
    employerAr: 'بنك مهر اقتصاد'
  },
  'proj-2': {
    titleEn: 'Eng. Daryabeigi Residential Complex',
    titleAr: 'مبنى المهندس دريابيغي السكني',
    employerEn: 'Eng. Daryabeigi',
    employerAr: 'المهندس دريابيغي'
  },
  'proj-3': {
    titleEn: 'Alavijeh Business & Technology Center',
    titleAr: 'مبنى الأعمال والتكنولوجيا علويجه',
    employerEn: 'Alavijeh Tech Park',
    employerAr: 'مؤسسة علويجه للتكنولوجيا'
  },
  'proj-4': {
    titleEn: 'District 13 Municipality Headquarters',
    titleAr: 'مبنى بلدية المنطقة 13',
    employerEn: 'Isfahan District 13 Municipality',
    employerAr: 'بلدية المنطقة 13 أصفهان'
  },
  'proj-5': {
    titleEn: 'Shahin Shahr City Center',
    titleAr: 'سيتي سنتر شاهين شهر',
    employerEn: 'City Center Development Board',
    employerAr: 'مجلس تطوير سيتي سنتر'
  },
  'proj-6': {
    titleEn: 'Eng. Tavoosi Commercial Center',
    titleAr: 'مجمع المهندس طاووسي التجاري',
    employerEn: 'Eng. Tavoosi',
    employerAr: 'المهندس طاووسي'
  },
  'proj-7': {
    titleEn: 'Ahmadian Commercial Building',
    titleAr: 'مبنى أحمديان التجاري',
    employerEn: 'Mr. Ahmadian',
    employerAr: 'السيد أحمديان'
  },
  'proj-8': {
    titleEn: 'Eng. Alirezaei Commercial Tower',
    titleAr: 'برج المهندس عليرضائي التجاري',
    employerEn: 'Eng. Alirezaei',
    employerAr: 'المهندس عليرضائي'
  },
  'proj-9': {
    titleEn: 'Dr. Boveiri Residential Complex',
    titleAr: 'مبنى الدكتورة بويري السكني',
    employerEn: 'Dr. Boveiri',
    employerAr: 'الدكتورة بويري'
  },
  'proj-10': {
    titleEn: 'Dr. Etesami Residential Building',
    titleAr: 'مبنى الدكتور اعتصامي السكني',
    employerEn: 'Dr. Etesami',
    employerAr: 'الدكتور اعتصامي'
  },
  'proj-11': {
    titleEn: 'Eng. Mohammadi Commercial Complex',
    titleAr: 'مجمع المهندس محمدي التجاري',
    employerEn: 'Eng. Mohammadi',
    employerAr: 'المهندس محمدي'
  },
  'proj-12': {
    titleEn: 'Jey Street Residential Project',
    titleAr: 'مشروع شارع جي السكني',
    employerEn: 'Jey Street Development',
    employerAr: 'تطوير مشروع شارع جي'
  },
  'proj-13': {
    titleEn: 'Bank Saderat Yasuj Branch',
    titleAr: 'فرع بنك صادرات ياسوج',
    employerEn: 'Bank Saderat Iran',
    employerAr: 'بنك صادرات إيران'
  },
  'proj-14': {
    titleEn: 'Bank Ghavamin Building',
    titleAr: 'مبنى بنك قوامين',
    employerEn: 'Bank Ghavamin',
    employerAr: 'بنك قوامين'
  },
  'proj-15': {
    titleEn: 'Mehestan Naqsh-e Jahan Commercial Complex',
    titleAr: 'مجمع مهستان نقش جهان التجاري والإداري',
    employerEn: 'Naqsh-e Jahan Real Estate',
    employerAr: 'شركة نقش جهان العقارية'
  },
  'proj-16': {
    titleEn: 'Bagh-e Rezvan Forensic Medicine Center',
    titleAr: 'مركز الطب الشرعي باغ رضوان',
    employerEn: 'Isfahan Forensic Medical Organization',
    employerAr: 'دائرة الطب الشرعي أصفهان'
  },
  'proj-17': {
    titleEn: 'Soordan Jey Deeds Registration Office',
    titleAr: 'دائرة تسجيل العقارات سودان جي',
    employerEn: 'State Organization for Registration of Deeds',
    employerAr: 'دائرة تسجيل العقارات والوثائق'
  },
  'proj-18': {
    titleEn: 'Eng. Haj Heydari Commercial Building',
    titleAr: 'مبنى المهندس حاج حيدري التجاري',
    employerEn: 'Eng. Haj Heydari',
    employerAr: 'المهندس حاج حيدري'
  },
  'proj-19': {
    titleEn: 'Eng. Aberouei Commercial Building',
    titleAr: 'مبنى المهندس آبرويي التجاري',
    employerEn: 'Eng. Aberouei',
    employerAr: 'المهندس آبرويي'
  },
  'proj-20': {
    titleEn: 'Jey Deeds & Land Registration Office',
    titleAr: 'إدارة تسجيل الأراضي والعقارات جي',
    employerEn: 'Isfahan Land Deeds Organization',
    employerAr: 'دائرة السجل العقاري جي'
  },
  'proj-21': {
    titleEn: 'Nezhad Sattari School',
    titleAr: 'مدرسة نجاد ستاري',
    employerEn: 'School Renovation & Development Agency',
    employerAr: 'هيئة تجديد وتطوير المدارس'
  },
  'proj-22': {
    titleEn: 'District 4 Educators Housing Cooperative',
    titleAr: 'جمعية إسكان المعلمين - المنطقة 4',
    employerEn: 'Educators Housing Cooperative #4',
    employerAr: 'جمعية إسكان المعلمين'
  },
  'proj-23': {
    titleEn: 'Eng. Hamidi Residential Building',
    titleAr: 'مبنى المهندس حميدي السكني',
    employerEn: 'Eng. Hamidi',
    employerAr: 'المهندس حميدي'
  },
  'proj-24': {
    titleEn: 'Eng. Aghadadi Commercial & Corporate Center',
    titleAr: 'مجمع المهندس آقادادي التجاري والإداري',
    employerEn: 'Eng. Aghadadi',
    employerAr: 'المهندس آقادادي'
  },
  'proj-25': {
    titleEn: 'Bank Melli Housing Cooperative',
    titleAr: 'جمعية إسكان موظفي بنك ملي',
    employerEn: 'Bank Melli Iran Cooperative',
    employerAr: 'جمعية إسكان بنك ملي'
  },
  'proj-26': {
    titleEn: 'Persia Felez Housing Cooperative',
    titleAr: 'جمعية إسكان برشيا فلز',
    employerEn: 'Persia Felez Industrial Group',
    employerAr: 'مجموعة برشيا فلز الصناعية'
  },
  'proj-27': {
    titleEn: 'Eng. Arfa Residential Complex',
    titleAr: 'مبنى المهندس أرفع السكني',
    employerEn: 'Eng. Arfa',
    employerAr: 'المهندس أرفع'
  },
  'proj-28': {
    titleEn: 'District 1 Educators Housing Cooperative',
    titleAr: 'جمعية إسكان المعلمين - المنطقة 1',
    employerEn: 'District 1 Education Cooperative',
    employerAr: 'جمعية إسكان المعلمين المنطقة 1'
  },
  'proj-29': {
    titleEn: 'Agricultural Jihad Housing Cooperative',
    titleAr: 'جمعية إسكان جهاد الزراعة',
    employerEn: 'Ministry of Agriculture Jihad Cooperative',
    employerAr: 'جمعية إسكان جهاد الزراعة'
  },
  'proj-30': {
    titleEn: 'District 4 Teachers Housing Complex',
    titleAr: 'جمعية إسكان التربويين - المنطقة 4',
    employerEn: 'Education Cooperative #4',
    employerAr: 'جمعية إسكان التربويين'
  },
  'proj-31': {
    titleEn: 'Mollabashi Residential Complex',
    titleAr: 'مجمع ملاباشي السكني',
    employerEn: 'Mollabashi Development Board',
    employerAr: 'مجلس إدارة مجمع ملاباشي'
  },
  'proj-32': {
    titleEn: 'Merato Army Housing Cooperative',
    titleAr: 'جمعية إسكان الجيش مراتو',
    employerEn: 'Merato Military Housing Cooperative',
    employerAr: 'تعاونية مراتو العسكرية'
  },
  'proj-33': {
    titleEn: 'Eng. Farhang Commercial Center',
    titleAr: 'مجمع المهندس فرهنگ التجاري',
    employerEn: 'Eng. Farhang',
    employerAr: 'المهندس فرهنگ'
  },
  'proj-34': {
    titleEn: 'Eng. Akhtarian Residential Complex',
    titleAr: 'مبنى المهندس اختريان السكني',
    employerEn: 'Eng. Akhtarian',
    employerAr: 'المهندس اختريان'
  },
  'proj-35': {
    titleEn: 'Eng. Fasihi Commercial Building',
    titleAr: 'مبنى المهندس فصيحي التجاري',
    employerEn: 'Eng. Fasihi',
    employerAr: 'المهندس فصيحي'
  },
  'proj-36': {
    titleEn: 'Eng. Hajian Corporate Office',
    titleAr: 'مبنى المهندس حاجيان الإداري',
    employerEn: 'Eng. Hajian',
    employerAr: 'المهندس حاجيان'
  },
  'proj-37': {
    titleEn: 'Hosseinzadeh Residential Building',
    titleAr: 'مبنى حسين زاده السكني',
    employerEn: 'Mr. Hosseinzadeh',
    employerAr: 'السيد حسين زاده'
  },
  'proj-38': {
    titleEn: 'Eng. Javidan Residential Complex',
    titleAr: 'مبنى المهندس جاودان السكني',
    employerEn: 'Eng. Javidan',
    employerAr: 'المهندس جاودان'
  },
  'proj-39': {
    titleEn: 'Eng. Hatampour Residential Building',
    titleAr: 'مبنى المهندس حاتم بور السكني',
    employerEn: 'Eng. Hatampour',
    employerAr: 'المهندس حاتم بور'
  },
  'proj-40': {
    titleEn: 'Eng. Abbasi Commercial Building',
    titleAr: 'مجمع المهندس عباسي التجاري',
    employerEn: 'Eng. Abbasi',
    employerAr: 'المهندس عباسي'
  },
  'proj-41': {
    titleEn: 'Eng. Tavassoli Residential Complex',
    titleAr: 'مبنى المهندس توسلي السكني',
    employerEn: 'Eng. Tavassoli',
    employerAr: 'المهندس توسلي'
  },
  'proj-42': {
    titleEn: 'Eng. Harandi Residential Building',
    titleAr: 'مبنى المهندس هرندي السكني',
    employerEn: 'Eng. Harandi',
    employerAr: 'المهندس هرندي'
  },
  'proj-43': {
    titleEn: 'Eng. Nasr & Dr. Karimi Fard Commercial Complex',
    titleAr: 'مجمع المهندس نصر والدكتور كريمي فرد التجاري',
    employerEn: 'Eng. Nasr & Dr. Karimi Fard',
    employerAr: 'المهندس نصر والدكتور كريمي فرد'
  },
  'proj-44': {
    titleEn: 'Eng. Mousavi Luxury Villa, Zeytoun Village',
    titleAr: 'فيلا المهندس موسوي الفاخرة - قرية الزيتون',
    employerEn: 'Eng. Mousavi',
    employerAr: 'المهندس موسوي'
  },
  'proj-45': {
    titleEn: 'Spadana Design & Build, Bank Mehr',
    titleAr: 'شركة تصميم وتنفيذ اسبادانا - بنك مهر',
    employerEn: 'Spadana Design Co. & Bank Mehr',
    employerAr: 'شركة اسبادانا وبنك مهر'
  },
  'proj-46': {
    titleEn: 'Nasr Residential Complex',
    titleAr: 'مبنى نصر السكني',
    employerEn: 'Mr. Nasr',
    employerAr: 'السيد نصر'
  },
  'proj-47': {
    titleEn: 'Eng. Farhang Residential Complex',
    titleAr: 'مبنى المهندس فرهنگ السكني',
    employerEn: 'Eng. Farhang',
    employerAr: 'المهندس فرهنگ'
  },
  'proj-48': {
    titleEn: 'Eng. Zarean Commercial Complex',
    titleAr: 'مجمع المهندس زارعان التجاري',
    employerEn: 'Eng. Zarean',
    employerAr: 'المهندس زارعان'
  },
  'proj-49': {
    titleEn: 'Eng. Aghadadi Commercial Building',
    titleAr: 'مبنى المهندس آقادادي التجاري',
    employerEn: 'Eng. Aghadadi',
    employerAr: 'المهندس آقادادي'
  },
  'proj-50': {
    titleEn: 'Eng. Bagher Hadi Building',
    titleAr: 'مبنى المهندس باقر هادي',
    employerEn: 'Eng. Bagher Hadi',
    employerAr: 'المهندس باقر هادي'
  },
  'proj-51': {
    titleEn: 'Hazrat Abolfazl Medical Center',
    titleAr: 'مجمع حضرة أبو الفضل الطبي',
    employerEn: 'Hazrat Abolfazl Charity Foundation',
    employerAr: 'مؤسسة حضرة أبو الفضل الخيرية'
  },
  'proj-52': {
    titleEn: 'Eng. Bagheri Residential Building',
    titleAr: 'مبنى المهندس باقري السكني',
    employerEn: 'Eng. Bagheri',
    employerAr: 'المهندس باقري'
  },
  'proj-53': {
    titleEn: 'Eng. Yaramiri Residential Complex',
    titleAr: 'مبنى المهندس ياراميري السكني',
    employerEn: 'Eng. Yaramiri',
    employerAr: 'المهندس ياراميري'
  }
};

const filePath = path.join(process.cwd(), 'data', 'projects.json');
const projects = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let updatedCount = 0;
for (const p of projects) {
  const trans = projectTitles[p.id];
  if (trans) {
    p.titleEn = trans.titleEn;
    p.titleAr = trans.titleAr;
    p.employer = p.employer || p.client;
    p.employerEn = trans.employerEn;
    p.employerAr = trans.employerAr;
    p.executor = p.executor || 'شرکت نوآوران پنجره سپاهان';
    p.executorEn = p.executorEn || 'Noavaran Panjereh Sepahan';
    p.executorAr = p.executorAr || 'شركة نوآوران پنجره سباهان';
    p.images = p.images || [];
    updatedCount++;
  }
}

fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), 'utf8');
console.log(`Successfully updated ${updatedCount} projects in ${filePath}`);
