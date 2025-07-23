import AdminLayout from "../../components/AdminLayout";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddPlayer() {
  const [form, setForm] = useState({ firstName: "", lastName: "", birthDate: "", position: "" });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/players?refresh=1");
  }

  return (
    <AdminLayout>
      <h2>Dodaj zawodnika</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 440 }}>
        <input placeholder="Imię" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
        <input placeholder="Nazwisko" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
        <input type="date" placeholder="Data urodzenia" value={form.birthDate} onChange={e => setForm(f => ({ ...f, birthDate: e.target.value }))} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
        <input placeholder="Pozycja" value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
        <button type="submit" style={{ padding: 8 }}>Dodaj</button>
      </form>
    </AdminLayout>
  );
}
