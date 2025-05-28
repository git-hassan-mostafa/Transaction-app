export default function formatBigNumber(number: number | undefined) {
  if (!number) return "0";
  return number > 999 ? "999+" : `${number}`;
}
