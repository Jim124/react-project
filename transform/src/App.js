import { useEffect, useState } from "react";

function App() {
  const [money, setMoney] = useState(1);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [cash, setCash] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      const controller = new AbortController();

      async function getTransformMoney() {
        setError("");
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${money}&from=${from}&to=${to}`,
            { signal: controller.signal }
          );
          const data = await res.json();
          setCash(data.rates[to]);
          setError("");
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        }
      }
      if (from === to) {
        setCash(money);
        setIsLoading(false);
        return;
      }
      getTransformMoney();
      return function () {
        controller.abort();
      };
    },

    [money, from, to]
  );
  return (
    <div className="App">
      <input
        type="text"
        value={money}
        onChange={(e) => setMoney(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{cash ? `${cash}:${to}` : "OUTPUT"}</p>
    </div>
  );
}

export default App;
