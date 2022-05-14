import React from "react";

import i18n from "i18n-js";

import enLang from "./string-en";
import frLang from "./string-fr";
import arLang from "./string-ar";
// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: enLang,
  fr: frLang,
  ar: arLang,
};
// Set the locale once at the beginning of your app.
//i18n.locale = Localization.locale;
i18n.fallbacks = true;
//const lang = {};
//const strings = new LocalizedStrings(lang);

//export default strings;
