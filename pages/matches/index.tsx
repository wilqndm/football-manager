import AdminLayout from "../../components/AdminLayout";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function MatchesList() {
  const { data: matches } = useSWR("/api/matches", fetcher);

  return (
    <AdminLayout>
      <h2>Mecze</h2>
      <Link href="/matches/add"><button style={{ marginBottom: 16 }}>➕ Dodaj mecz</button></Link>
      <table style={{ width: "100%", background: "#fff", borderRadius: 8 }}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Przeciwnik</th>
            <th>Miejsce</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {matches?.map((m: any) => (
            <tr key={m.id}>
              <td>{m.date?.substring(0, 10)}</td>
              <td>{m.opponent}</td>
              <td>{m.location}</td>
              <td>
                <Link href={`/matches/${m.id}`}><button>Podgląd</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
