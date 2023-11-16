import { useState } from "react";

function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const tip = bill * ((percentage1 + percentage2) / 2 / 100);
  function handleClick() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }
  return (
    <div>
      <BillInput bill={bill} setBill={setBill} />
      <SelectPrecentage
        bill={bill}
        onSelect={setPercentage1}
        percentage={percentage1}
      >
        {"How did you like the service"}
      </SelectPrecentage>
      <SelectPrecentage
        bill={bill}
        onSelect={setPercentage2}
        percentage={percentage2}
      >
        {"How did your friend like the service"}
      </SelectPrecentage>
      {bill > 0 && (
        <>
          <OutputBill bill={bill} tip={tip} />
          <Reset setBill={setBill} onClick={handleClick} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, setBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </div>
  );
}
function SelectPrecentage({ children, onSelect, percentage }) {
  return (
    <div>
      <label>{children}</label>
      <select
        onChange={(e) => onSelect(Number(e.target.value))}
        value={percentage}
      >
        <option value="0">Dissatisfied(0%)</option>
        <option value="5">it was ok(5%)</option>
        <option value="10">it was delicious(10%)</option>
      </select>
    </div>
  );
}

function OutputBill({ bill, tip }) {
  return (
    <div>
      <h3>
        you need to pay ${bill + tip}(${bill} + ${tip} tip )
      </h3>
    </div>
  );
}

function Reset({ onClick }) {
  return <button onClick={onClick}>Reset</button>;
}

export default App;
