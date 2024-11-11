import React from "react";
import { IntlProvider } from "react-intl";
import EnglishMessages from "./Locales/English.json";
import GermanMessages from "./Locales/German.json";
import DutchMessages from "./Locales/Dutch.json";
import FrenchMessages from "./Locales/French.json";
import ItalianMessages from "./Locales/Italian.json";
import SpanishMessages from "./Locales/Spanish.json";

const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const userLocale = "en";
  const messages = {
    en: EnglishMessages,
    de: GermanMessages,
    nl: DutchMessages,
    fr: FrenchMessages,
    it: ItalianMessages,
    es: SpanishMessages,
  };

  return (
    <IntlProvider
      locale={userLocale}
      messages={messages[userLocale] || EnglishMessages}
      defaultLocale="en"
    >
      {children}
    </IntlProvider>
  );
};

export default LocaleProvider;
