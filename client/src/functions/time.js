// take time string from COC api response and convert it to a format to work with new Date()
export function parseTime(time) {
  const letter = time.split("");
  const isoString =
    letter[0] +
    letter[1] +
    letter[2] +
    letter[3] +
    "-" +
    letter[4] +
    letter[5] +
    "-" +
    letter[6] +
    letter[7] +
    letter[8] +
    letter[9] +
    letter[10] +
    ":" +
    letter[11] +
    letter[12] +
    ":" +
    letter[13] +
    letter[14] +
    letter[15] +
    letter[16] +
    letter[17] +
    letter[18] +
    letter[19];
  return isoString;
}
// find difference in two times
export function parseDifference(d1, d2) {
  const diff = d2 - d1;
  if (diff < 0) {
    return { end: "end" };
  }
  if (diff > 60e3)
    return { hours: Math.floor(diff / 60e3), seconds: Math.floor(diff / 1e3) };
}
