import AdminLayout from "../../components/AdminLayout";
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function AddFee() {
  const { data: players } = useSWR("/api/players", fetcher);
  const [form, setForm] = useState({ playerId: "", month: "", paid: false });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, playerId: Number(form.playerId) }),
    });
    router.push("/fees");
  }

  return (
    <AdminLayout>
      <h2>Dodaj składkę</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 440 }}>
        <select required value={form.playerId} onChange={e => setForm(f => ({ ...f, playerId: e.target.value }))} style={{ width: "100%", marginBottom: 8, padding: 8 }}>
          <option value="">Wybierz zawodnika</option>
          {players?.map((p: any) => (
            <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
          ))}
        </select>
        <input type="month" required value={form.month} onChange={e => setForm(f => ({ ...f, month: e.target.value }))} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
        <label>
          <input type="checkbox" checked={form.paid} onChange={e => setForm(f => ({ ...f, paid: e.target.checked }))} />
          Opłacona
        </label>
        <br />
        <button type="submit" style={{ padding: 8, marginTop: 12 }}>Dodaj składkę</button>
      </form>
    </AdminLayout>
  );
}
