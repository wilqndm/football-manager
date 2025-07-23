import AdminLayout from "../../components/AdminLayout";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function PlayerDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data: player } = useSWR(id ? `/api/players/${id}` : null, fetcher);

  if (!player) return <AdminLayout>Ładowanie...</AdminLayout>;

  return (
    <AdminLayout>
      <h2>{player.firstName} {player.lastName}</h2>
      <p>Pozycja: <b>{player.position}</b></p>
      <p>Data urodzenia: {player.birthDate?.substring(0, 10)}</p>
      <h3>Metryczka osiągnięć:</h3>
      <ul>
        <li>Gole: {player.stats?.reduce((acc: number, s: any) => acc + s.goals, 0)}</li>
        <li>Asysty: {player.stats?.reduce((acc: number, s: any) => acc + s.assists, 0)}</li>
        <li>Żółte kartki: {player.stats?.reduce((acc: number, s: any) => acc + s.yellowCards, 0)}</li>
        <li>Czerwone kartki: {player.stats?.reduce((acc: number, s: any) => acc + s.redCards, 0)}</li>
      </ul>
      <h3>Historia składek:</h3>
      <ul>
        {player.fees?.map((fee: any) => (
          <li key={fee.id}>
            {fee.month?.substring(0, 7)} — {fee.paid ? "opłacona" : "brak wpłaty"}
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
}