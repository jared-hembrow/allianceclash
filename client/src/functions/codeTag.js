// take a coc tag with # on front and change to %23 for placement in url
export function encodeTag(tag) {
  return tag.replace("#", "%23");
}
// take a coc tag from a url param and change the %23 to #
export function decodeTag(tag) {
  return tag.replace("%23", "#");
}
