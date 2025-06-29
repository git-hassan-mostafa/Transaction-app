import {
  dateOptions,
  dateOptionsWithDay,
} from "@/Shared/Constants/DateOptions";
import i18n from "@/Shared/I18n/I18n";

export function fromatLocaleDate(date: string): string {
  return new Date(date)?.toLocaleDateString(i18n.locale, dateOptions);
}

export function fromatLocaleDateWithDay(date: string): string {
  return new Date(date)?.toLocaleDateString(i18n.locale, dateOptionsWithDay);
}
