import React, { useState } from 'react';
import styles from '../styles/Components.module.css';
import { FaLock } from 'react-icons/fa';

function EncryptForm({ files }) {
  const [password, setPassword] = useState('');

  const handleEncrypt = async () => {
    if (files.length === 0) {
      alert('Please upload a PDF file first.');
      return;
    }

    if (!password) {
      alert('Please enter a password.');
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0].file);
    formData.append('password', password);

    try {
      const response = await fetch('http://127.0.0.1:8000/encrypt/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Encryption failed.');

      const blob = await response.blob();
      const defaultFilename = 'encrypted.pdf';
      const filename = prompt('Enter filename to save', defaultFilename);
      if (!filename) return alert('Download cancelled.');

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename.endsWith('.pdf') ? filename : filename + '.pdf';
      a.click();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert('Failed to encrypt PDF.');
    }
  };

  return (
    <div className={styles.encryptForm}>
      <input
        type="password"
        placeholder="Enter password"
        className={styles.passwordInput}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.encryptBtn} onClick={handleEncrypt}>
        <FaLock /> Encrypt
      </button>
    </div>
  );
}

export default EncryptForm;
