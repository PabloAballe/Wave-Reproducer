// Dependencies.
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

// Languages.
import en from '../lang/en.json'
import es from '../lang/es.json'


// Configuring translations.
i18n.fallbacks = true
i18n.translations = { en, es }
i18n.defaultLocale = 'en'
i18n.locale = Localization.locale

// Exports translations lib.
export default i18n;