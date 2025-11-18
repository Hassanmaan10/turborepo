export default function csvToArray(s: string) {
  return s
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
