import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState("10");
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (lowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (upperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (symbols) charset += "!@#$%^&*()";
    if (numbers) charset += "0123456789";

    if (charset === "") {
      alert("Please select at least one character type!");
      return;
    }

    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    if (passwordLength < 4 || passwordLength > 24) {
      alert("Please choose between 4 and 24 characters");
      return;
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (!password) {
      return;
    }
    const el = document.createElement("textarea");
    el.value = password;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setSuccessMessage("Password copied to clipboard!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return (
    <div className="container">
      <h1>Random Password Generator</h1>
      <div>
        <label>Password Length:</label>
        <input
          type="number"
          minLength={4}
          maxLength={24}
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={lowerCase}
            onChange={() => setLowerCase(!lowerCase)}
          />
          Lowercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={upperCase}
            onChange={() => setUpperCase(!upperCase)}
          />
          Uppercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={symbols}
            onChange={() => setSymbols(!symbols)}
          />
          Symbols
        </label>
        <label>
          <input
            type="checkbox"
            checked={numbers}
            onChange={() => setNumbers(!numbers)}
          />
          Numbers
        </label>
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      <div>
        <label>Generated Password:</label>
        <input type="text" value={password} readOnly />
        <button onClick={copyToClipboard} disabled={!password}>
          Copy
        </button>
      </div>
      {successMessage && (
        <p
          style={{
            color: "green",
            textAlign: "center",
          }}
        >
          {successMessage}
        </p>
      )}
    </div>
  );
}

export default App;
