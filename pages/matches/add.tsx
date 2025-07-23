import AdminLayout from "../../components/AdminLayout";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddMatch() {
  const [form, setForm] = useState({ date: "", opponent: "", location: "" });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/matches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/matches");
  }

  return (
    <AdminLayout>
      <h2>Dodaj mecz</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 440 }}>
        <input type="date" placeholder="Data" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
        <input placeholder="Przeciwnik" value={form.opponent} onChange={e => setForm(f => ({ ...f, opponent: e.target.value }))} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
        <input placeholder="Miejsce" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
        <button type="submit" style={{ padding: 8 }}>Dodaj</button>
      </form>
    </AdminLayout>
  );
}
