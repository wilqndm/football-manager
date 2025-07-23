import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isAdmin") !== "true") {
      router.replace("/login");
    }
  }, [router]);

  function logout() {
    localStorage.removeItem("isAdmin");
    router.push("/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav style={{ background: "#004080", color: "#fff", width: 220, padding: 24, display: "flex", flexDirection: "column" }}>
        <h2>Drużyna Admin</h2>
        <Link href="/dashboard" style={{ color: "#fff", margin: "10px 0" }}>🏠 Panel główny</Link>
        <Link href="/players" style={{ color: "#fff", margin: "10px 0" }}>👥 Zawodnicy</Link>
        {/* Możesz dodać kolejne sekcje tu */}
        <button style={{ marginTop: "auto", background: "#c00", color: "#fff", border: 0, padding: 8, borderRadius: 4 }} onClick={logout}>Wyloguj</button>
      </nav>
      <main style={{ flex: 1, padding: 32, background: "#f8f9fa" }}>{children}</main>
    </div>
  );
}