import {
  dateOptions,
  dateOptionsWithDay,
} from "@/Shared/Constants/DateOptions";
import i18n from "@/Shared/I18n/I18n";

export function fromatLocaleDate(
  date: string | number | null | undefined
): string {
  if (!date) return "";
  return new Date(date)?.toLocaleDateString(i18n.locale, dateOptions);
}

export function fromatLocaleDateWithDay(
  date: string | number | null | undefined
): string {
  if (!date) return "";
  return new Date(date)?.toLocaleDateString(i18n.locale, dateOptionsWithDay);
}
