import AdminLayout from "../components/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1>Panel zarządzania drużyną</h1>
      <ul>
        <li>Dodawanie, edycja, podgląd zawodników</li>
        <li>Obsługa składek, statystyk i osiągnięć</li>
        <li>Planowanie i zarządzanie meczami (rozbuduj analogicznie)</li>
      </ul>
      <p>Wybierz sekcję z menu po lewej.</p>
    </AdminLayout>
  );
}