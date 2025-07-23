import React from 'react';
import styles from '../styles/Footer.module.css';
import { FaGithub, FaEnvelope, FaHeart, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>
          Made with <FaHeart className={styles.heart} /> by <strong>Sanjay Saravanan</strong>
        </span>
        <div className={styles.links}>
          <a href="mailto:softdevsanjay@gmail.com" title="Email">
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/Sanjay-Saravana"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/sanjay-saravanan-951784273/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
