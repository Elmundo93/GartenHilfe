import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gartenhilfe – Ihr Gartenservice im Raum Braunschweig',
    short_name: 'Gartenhilfe',
    description:
      'Gartenhilfe: regionaler Gartenservice in Hordorf, Lehre und dem Raum Braunschweig. Rasenmähen, Heckenschnitt, Unkrautentfernung, Pflanzarbeiten und Gartenreinigung.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#059669',
    icons: [
      {
        src: '/GartenHilfeLogo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}
