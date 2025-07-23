import { useState } from "react";

export default function FeeForm({ players }) {
  const [playerId, setPlayerId] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId,
        paymentDate,
        amount: parseFloat(amount)
      })
    });
    if (res.ok) {
      setMessage("Składka dodana!");
      setPlayerId("");
      setPaymentDate("");
      setAmount("");
    } else {
      const err = await res.json();
      setMessage("Błąd: " + (err.error || "nieznany"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Zawodnik:
        <select value={playerId} onChange={e => setPlayerId(e.target.value)} required>
          <option value="">Wybierz</option>
          {players.map(p => (
            <option value={p.id} key={p.id}>{p.firstName} {p.lastName}</option>
          ))}
        </select>
      </label>
      <label>
        Data płatności:
        <input type="date" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} required />
      </label>
      <label>
        Kwota wpłacona (zł):
        <input type="number" min="0" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required />
      </label>
      <button type="submit">Dodaj składkę</button>
      {message && <div>{message}</div>}
    </form>
  );
}
