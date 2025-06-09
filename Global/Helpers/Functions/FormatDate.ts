import {
  dateOptions,
  dateOptionsWithDay,
} from "@/Global/Constants/DateOptions";
import i18n from "@/Global/I18n/I18n";

export function fromatLocaleDate(date: string): string {
  return new Date(date)?.toLocaleDateString(i18n.locale, dateOptions);
}

export function fromatLocaleDateWithDay(date: string): string {
  return new Date(date)?.toLocaleDateString(i18n.locale, dateOptionsWithDay);
}
