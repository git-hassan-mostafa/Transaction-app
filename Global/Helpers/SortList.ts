export default function SortList<T, K>(
  array: T[],
  selector: (item: T) => K
): T[] {
  return array?.sort((a, b) => {
    const valueA = selector(a);
    const valueB = selector(b);

    // If both values are strings, use localeCompare
    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB, undefined, { sensitivity: "base" });
    }

    if (valueA == null) return 1;
    if (valueB == null) return -1;

    // Fallback for number or other types
    return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
  });
}
