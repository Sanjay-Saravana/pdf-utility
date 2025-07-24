import React, { useState } from 'react';
import styles from '../styles/Components.module.css';
import { FaUnlock } from 'react-icons/fa';

function DecryptForm({ file, backendUrl }) {
  const [password, setPassword] = useState('');

  const handleDecrypt = async () => {
    if (!file.length) return alert('Please upload an encrypted PDF.');
    if (!password) return alert('Enter the password to decrypt.');

    const formData = new FormData();
    formData.append('file', file[0].file);
    formData.append('password', password);

    try {
      const res = await fetch(`${backendUrl}/decrypt/`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.detail || "Failed to decrypt PDF.");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const filename = prompt("Enter filename to save", "decrypted.pdf");
      if (!filename) return;

      const a = document.createElement("a");
      a.href = url;
      a.download = filename.endsWith(".pdf") ? filename : filename + ".pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Decryption failed.");
    }
  };

  return (
    <div className={styles.decryptForm}>
      <input
        type="password"
        placeholder="Enter password"
        className={styles.passwordInput}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.decryptBtn} onClick={handleDecrypt}>
        <FaUnlock /> Decrypt
      </button>
    </div>
  );
}

export default DecryptForm;
