import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'نوآوران پنجره سپاهان | طراحی و تولید نمای مدرن و پنجره ترمال‌بریک',
    short_name: 'نوآوران پنجره',
    description: 'تولیدکننده صنعتی و اختصاصی انواع درب و پنجره دوجداره آلومینیوم ترمال‌بریک، نمای شیشه‌ای کرتین‌وال، فریم‌لس، جام‌بالکنی و پنل کامپوزیت.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0002',
    theme_color: '#ab0017',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
