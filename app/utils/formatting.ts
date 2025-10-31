export function formatDateTime(date: string, format: string): string {
    const options: Intl.DateTimeFormatOptions = {};
    if (format.includes("YYYY")) options.year = "numeric";
    if (format.includes("MM")) options.month = "2-digit";
    if (format.includes("DD")) options.day = "2-digit";
    return new Date(date).toLocaleDateString("en-US", options);
}

export function humanizeEnum(value: string): string {
    return value
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}