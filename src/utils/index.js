export function getRelTimeString(date) {
  if ((new Date() - date) / 3600000 >= 24) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
  return `${date.getHours()}:${date.getMinutes()}`;
}
