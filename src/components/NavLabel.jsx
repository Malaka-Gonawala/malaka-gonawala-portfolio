export default function NavLabel({ section }) {
  return (
    <div>
      <p>Malaka Gonawala</p>
      {section && <p>/ {section}</p>}
    </div>
  );
}
