export default function formatDate(isoString) {
  const d = new Date(isoString);
  return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`;
}
