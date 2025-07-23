import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (login === "admin" && password === "admin") {
      localStorage.setItem("isAdmin", "true");
      router.push("/dashboard");
    } else {
      setError("Nieprawidłowy login lub hasło!");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", textAlign: "center", border: "1px solid #ddd", borderRadius: 8, padding: 32 }}>
      <h2>Logowanie admina</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Login"
          value={login}
          onChange={e => setLogin(e.target.value)}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <input
          placeholder="Hasło"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
        <button type="submit" style={{ width: "100%", padding: 8 }}>Zaloguj</button>
      </form>
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
    </div>
  );
}