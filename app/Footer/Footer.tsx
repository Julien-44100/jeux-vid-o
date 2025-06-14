"use client";
import styles from "./Footer.module.css";

export default function Footer() {
	return (
		<nav className={styles.Footer}>
             <a
          href="https://www.rockstargames.com/VI"
          target="_blank"
          rel="noopener noreferrer"
        >
			<img src="/Image/logogta6.png" alt="logo grand theft auto 6" className={styles.logofooter} />
            </a>
		</nav>
	);
}