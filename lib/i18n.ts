export type Language = 'en' | 'es' | 'de'

export const languages = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
}

export const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.templates': 'Templates',
    'nav.pricing': 'Pricing',
    'nav.signIn': 'Sign In',
    'nav.getStarted': 'Get Started',
    'hero.title': 'Create Your Perfect Resume in Minutes',
    'hero.description':
      'Let AI help you write compelling content, choose from beautiful templates, and export to PDF instantly. Professional results, effortless process.',
    'footer.copyright': '© 2025 ResumeAI. All rights reserved.',
    'resume.personalInfo': 'Personal Information',
    'resume.summary': 'Professional Summary',
    'resume.experience': 'Work Experience',
    'resume.education': 'Education',
    'resume.skills': 'Skills',
    'button.save': 'Save',
    'button.download': 'Download',
    'button.next': 'Next',
    'button.back': 'Back',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.features': 'Características',
    'nav.templates': 'Plantillas',
    'nav.pricing': 'Precios',
    'nav.signIn': 'Iniciar Sesión',
    'nav.getStarted': 'Comenzar',
    'hero.title': 'Crea tu CV Perfecto en Minutos',
    'hero.description':
      'Deja que la IA te ayude a escribir contenido compelling, elige entre hermosas plantillas y exporta a PDF instantáneamente. Resultados profesionales, proceso sin esfuerzo.',
    'footer.copyright': '© 2025 ResumeAI. Todos los derechos reservados.',
    'resume.personalInfo': 'Información Personal',
    'resume.summary': 'Resumen Profesional',
    'resume.experience': 'Experiencia Laboral',
    'resume.education': 'Educación',
    'resume.skills': 'Habilidades',
    'button.save': 'Guardar',
    'button.download': 'Descargar',
    'button.next': 'Siguiente',
    'button.back': 'Atrás',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.features': 'Funktionen',
    'nav.templates': 'Vorlagen',
    'nav.pricing': 'Preise',
    'nav.signIn': 'Anmelden',
    'nav.getStarted': 'Jetzt Starten',
    'hero.title': 'Erstelle deinen perfekten Lebenslauf in Minuten',
    'hero.description':
      'Lasse die KI dir helfen, überzeugenden Inhalt zu schreiben, wähle aus schönen Vorlagen und exportiere sofort als PDF. Professionelle Ergebnisse, müheloser Prozess.',
    'footer.copyright': '© 2025 ResumeAI. Alle Rechte vorbehalten.',
    'resume.personalInfo': 'Persönliche Informationen',
    'resume.summary': 'Professionelle Zusammenfassung',
    'resume.experience': 'Berufserfahrung',
    'resume.education': 'Ausbildung',
    'resume.skills': 'Fähigkeiten',
    'button.save': 'Speichern',
    'button.download': 'Herunterladen',
    'button.next': 'Weiter',
    'button.back': 'Zurück',
  },
}

export function getLanguageFromLocale(locale?: string): Language {
  if (!locale) return 'en'
  const lang = locale.split('-')[0].toLowerCase()
  if (lang === 'es') return 'es'
  if (lang === 'de') return 'de'
  return 'en'
}

export function t(language: Language, key: string): string {
  return translations[language][key] || key
}

export function detectUserLanguage(): Language {
  if (typeof window === 'undefined') return 'en'

  // Check localStorage
  const stored = localStorage.getItem('resumeai-language')
  if (stored && (stored === 'en' || stored === 'es' || stored === 'de')) {
    return stored
  }

  // Check browser language
  const browserLang = navigator.language || 'en'
  return getLanguageFromLocale(browserLang)
}

export function setUserLanguage(language: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('resumeai-language', language)
  }
}
