import React, { useState, useEffect, useCallback } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let allChars = lowerCaseChars + upperCaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSpecialChars) allChars += specialChars;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }
    setPassword(generatedPassword);
  }, [length, includeNumbers, includeSpecialChars]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
    });
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Random Password Generator</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Password Length: {length}
        </label>
        <input
          type="range"
          min="8"
          max="20"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="mr-2"
          />
          Include Numbers
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={(e) => setIncludeSpecialChars(e.target.checked)}
            className="mr-2"
          />
          Include Special Characters
        </label>
      </div>
      <button
        onClick={generatePassword}
        className="w-full bg-blue-500 text-white py-2 rounded-md mb-4"
      >
        Generate Password
      </button>
      {password && (
        <div className="mt-4 p-2 bg-gray-100 rounded-md">
          <strong>Generated Password:</strong>
          <p className="break-words">{password}</p>
          <button
            onClick={copyToClipboard}
            className="w-full mt-2 bg-green-500 text-white py-2 rounded-md"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
