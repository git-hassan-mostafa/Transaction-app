const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour12: true,
  hour: "2-digit",
  minute: "2-digit",
};

const dateOptionsWithDay: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
export { dateOptions, dateOptionsWithDay };
