import { Country } from "@generated/graphql";

const langCountryMap = {
  pl: Country.Poland,
  "en-US": Country.UnitedStates,
  "en-GB": Country.England,
};

export const langToCountry = (lang: string) => langCountryMap[lang];