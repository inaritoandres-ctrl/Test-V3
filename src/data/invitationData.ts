import { InvitationData } from '../types';
import heroCoupleImg from '../assets/images/wedding-couple.jpg';
import gallery1 from '../assets/images/gallery-1.jpg';
import gallery2 from '../assets/images/gallery-2.jpg';
import gallery3 from '../assets/images/gallery-3.jpg';
import gallery4 from '../assets/images/gallery-4.jpg';
import gallery5 from '../assets/images/gallery-5.jpg';
import gallery6 from '../assets/images/gallery-6.jpg';
import weddingMusicAudio from '../assets/audio/wedding-music.mp3';
import envelopeVideoSrc from '../assets/videos/envelope-open.mp4';

export const defaultInvitationData: InvitationData = {
  id: 'invitation-sara-radin-1404',
  envelope: {
    videoSrc: envelopeVideoSrc,
    helperText: 'برای باز کردن کارت، مهر را لمس کنید',
    ariaLabel: 'باز کردن پاکت دعوت با لمس مهر موم',
  },
  modules: {
    hero: { enabled: true, order: 1 },
    timeline: { enabled: true, order: 2 },
    dressCode: { enabled: true, order: 3 },
    location: { enabled: true, order: 4 },
    gallery: { enabled: true, order: 5 },
    rsvp: { enabled: true, order: 6 },
    guestbook: { enabled: true, order: 7 },
  },
  couple: {
    brideName: 'سارا',
    groomName: 'رادین',
    latinNames: 'Radin & Sara',
    heroPhoto: heroCoupleImg,
    dateBadge: '25 . 12 . 12',
    sparkleQuote: 'جادوی عشق آغاز می‌شود',
    invitationVerse: 'با نهایت احترام و صمیمیت شما را به آغاز این پیوند پر از مهر و شادمانی دعوت می‌کنیم. حضور گرم شما روشنایی‌بخش زیباترین شب زندگی ما خواهد بود.',
    story: 'آغاز قصه‌ای که با یک لبخند جان گرفت و اکنون در سایه‌سار عشق و همراهی، به پیوندی ابدی می‌پیوندد.',
  },
  wedding: {
    dateSolar: '۲۵ اسفند ۱۴۰۴',
    dateGregorian: '15 March 2026',
    time: '۱۶:۳۰',
    dayOfWeek: 'یکشنبه',
    // Set a date in the future for realistic countdown
    countdownTarget: '2026-03-15T16:30:00',
  },
  timeline: [
    {
      id: 'welcome',
      time: '۱۶:۳۰',
      title: 'استقبال و پذیرایی اولیه',
      description: 'گردهمایی مهمانان گرامی، نوشیدنی‌های خنک تابستانی و شیرینی در آلاچیق ورودی باغ',
      iconType: 'drink',
    },
    {
      id: 'ceremony',
      time: '۱۷:۳۰',
      title: 'مراسم عقد و پیوند آسمانی',
      description: 'عقد باشکوه در فضای باز رو به دریاچه با همراهی نوای زنده ویولن و گل‌آرایی سفید',
      iconType: 'heart',
    },
    {
      id: 'photography',
      time: '۱۸:۴۵',
      title: 'عکاسی یادگاری با زوج',
      description: 'ثبت زیباترین لحظات در قاب تصویر با حضور تک‌تک شما عزیزان در لوکیشن اختصاصی عمارت',
      iconType: 'camera',
    },
    {
      id: 'reception',
      time: '۲۰:۰۰',
      title: 'پذیرایی عصرانه و فینگرفود',
      description: 'اجرای ارکستر زنده، پذیرایی فینگرفودهای لوکس و گپ‌وگفت صمیمانه',
      iconType: 'music',
    },
    {
      id: 'dinner',
      time: '۲۱:۳۰',
      title: 'صرف شام مجلل و کیک عروسی',
      description: 'پذیرایی شام سلف‌سرویس تشریفاتی به همراه بریدن کیک عروسی، آتش‌بازی و پایکوبی شبانه',
      iconType: 'dinner',
    },
  ],
  dressCode: {
    title: 'کد پوشش و استایل جشن',
    subtitle: 'حضور باوقار و آراسته شما جلوه‌بخش جشن ما خواهد بود',
    palette: [
      { name: 'مشکی کلاسیک', color: '#1a1f2c', textColor: '#ffffff' },
      { name: 'سورمه‌ای تیره', color: '#2c3e50', textColor: '#ffffff' },
      { name: 'آبی دودی', color: '#4a6572', textColor: '#ffffff' },
      { name: 'کرم طلایی', color: '#d4af37', textColor: '#1a1f2c' },
      { name: 'رز پودری', color: '#e8c4c4', textColor: '#2c3e50' },
    ],
    notes: [
      'آقایان: کت و شلوار رسمی و تیره همراه با کراوات یا پاپیون',
      'بانوان گرامی: لباس شب بلند و رسمی در پالت رنگی هماهنگ',
      'خواهشمندیم با احترام به عروس خانم، از انتخاب پیراهن تماماً سفید خودداری فرمایید',
    ],
  },
  location: {
    venueName: 'باغ تالار عمارت بهشت',
    hallName: 'سالن اختصاصی آیین و مهر',
    city: 'تهران - گرمدره',
    address: 'کیلومتر ۲۲ جاده مخصوص کرج، خیابان تاج‌بخش، کوچه بهشت، عمارت مجلل بهشت',
    parkingInfo: 'دارای پارکینگ اختصاصی مسقف و رایگان با ظرفیت ۳۰۰ خودرو و راهنمای پارک',
    googleMapsUrl: 'https://maps.google.com/?q=35.7321,51.0542',
    wazeUrl: 'https://waze.com/ul?ll=35.7321,51.0542&navigate=yes',
    neshanUrl: 'https://nshn.ir',
    baladUrl: 'https://balad.ir',
    coordinates: {
      lat: 35.7321,
      lng: 51.0542,
    },
  },
  gallery: [
    { id: '1', src: gallery1, caption: 'لحظه پیوند دست‌هایمان در طلوع عشق', span: 'tall' },
    { id: '2', src: gallery2, caption: 'حلقه‌های عهد و وفاداری جاودان' },
    { id: '3', src: gallery3, caption: 'شکوه آلاچیق گل‌آرایی شده کنار برکه' },
    { id: '4', src: gallery4, caption: 'ضیافت شیرین‌ترین لحظات زندگی' },
    { id: '5', src: gallery5, caption: 'نگاهی پر از امید به فرداهای مشترک', span: 'wide' },
    { id: '6', src: gallery6, caption: 'رقص تور سپید در نسیم زمستانی' },
  ],
  guestbook: [
    {
      id: 'w1',
      name: 'پدر و مادر سارا',
      message: 'دختر نازنینم و رادین عزیزم، پیوند پاکتان مبارک. آرزومندیم کانون گرم خانواده‌تان همواره پر از آرامش، برکت و خنده‌های بی‌پایان باشد.',
      date: '۲ روز پیش',
    },
    {
      id: 'w2',
      name: 'امیرحسین و نیلوفر',
      message: 'سارا و رادین گل، خیلی براتون خوشحالیم! مشتاقانه منتظر دیدنتون در این جشن با شکوه هستیم. عشقتون پایدار و جاودانه باشه.',
      date: 'دیروز',
    },
    {
      id: 'w3',
      name: 'دکتر علیرضا رضایی (دایی رادین)',
      message: 'شادباش صمیمانه من را پذیرا باشید. امید است گام‌های استوارتان در مسیر زندگی، سرشار از تندرستی و سربلندی باشد.',
      date: 'امروز',
    },
  ],
  music: {
    title: 'پیوند عشق (Romance Theme)',
    artist: 'نوای پیانو و ویولن رمانتیک',
    src: weddingMusicAudio,
    autoPlayOnOpen: true,
  },
  share: {
    title: 'کارت دعوت عروسی سارا و رادین',
    text: 'شما به جشن پیوند آسمانی سارا و رادین دعوت شده‌اید',
  },
  footer: {
    signature: 'Sara & Radin',
    wishesText: 'با آرزوی روزهایی سرشار از شادمانی و عشق برای تک‌تک شما عزیزان',
    badgeText: '✨ دعوت‌نامه دیجیتال هوشمند عروسی • اسفند ۱۴۰۴ ✨',
  },
  rsvp: {
    notePlaceholder: 'تبریک صمیمانه به سارا و رادین...',
  },
  guestbookConfig: {
    messagePlaceholder: 'شادباش صمیمانه خود را برای سارا و رادین بنویسید...',
  },
};
