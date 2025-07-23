import AdminLayout from "../../components/AdminLayout";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function FeesList() {
  const { data: fees, mutate } = useSWR("/api/fees", fetcher);

  async function togglePaid(id: number, paid: boolean) {
    await fetch("/api/fees", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, paid: !paid }),
    });
    mutate();
  }

  return (
    <AdminLayout>
      <h2>Składki</h2>
      <table style={{ width: "100%", background: "#fff", borderRadius: 8 }}>
        <thead>
          <tr>
            <th>Zawodnik</th>
            <th>Miesiąc</th>
            <th>Status</th>
            <th>Akcja</th>
          </tr>
        </thead>
        <tbody>
          {fees?.map((fee: any) => (
            <tr key={fee.id}>
              <td>{fee.player.firstName} {fee.player.lastName}</td>
              <td>{fee.month?.substring(0, 7)}</td>
              <td>{fee.paid ? "Opłacona" : "Nieopłacona"}</td>
              <td>
                <button onClick={() => togglePaid(fee.id, fee.paid)}>
                  {fee.paid ? "Oznacz jako nieopłaconą" : "Oznacz jako opłaconą"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
