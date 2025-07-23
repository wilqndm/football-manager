import AdminLayout from "../../components/AdminLayout";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function MatchesList() {
  const { data: matches, mutate } = useSWR("/api/matches", fetcher);

  return (
    <AdminLayout>
      <h2>Mecze</h2>
      <Link href="/matches/add"><button>➕ Dodaj mecz</button></Link>
      <button onClick={() => mutate()} style={{ marginLeft: 8 }}>Odśwież</button>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Przeciwnik</th>
            <th>Miejsce</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {matches?.length === 0 && <tr><td colSpan={4}>Brak meczów.</td></tr>}
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
