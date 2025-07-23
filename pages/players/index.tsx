import AdminLayout from "../../components/AdminLayout";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function PlayersList() {
  const { data: players, mutate } = useSWR("/api/players", fetcher);
  const router = useRouter();

  // Odśwież listę po powrocie z /players/add
  useEffect(() => {
    if (router.query.refresh) {
      mutate();
      router.replace("/players", undefined, { shallow: true });
    }
  }, [router, mutate]);

  return (
    <AdminLayout>
      <h2>Zawodnicy</h2>
      <Link href="/players/add">
        <button style={{ marginBottom: 16 }}>➕ Dodaj zawodnika</button>
      </Link>
      <table style={{ width: "100%", background: "#fff", borderRadius: 8 }}>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Pozycja</th>
            <th>Data ur.</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {players?.map((p: any) => (
            <tr key={p.id}>
              <td>{p.firstName}</td>
              <td>{p.lastName}</td>
              <td>{p.position}</td>
              <td>{p.birthDate?.substring(0, 10)}</td>
              <td>
                <Link href={`/players/${p.id}`}><button>Podgląd</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
