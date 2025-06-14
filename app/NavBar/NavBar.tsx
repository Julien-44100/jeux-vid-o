"use client";
import styles from "./NavBar.module.css";

export default function NavBar() {
	return (
		<nav className={styles.navbar}>
			  <a
          href="https://www.rockstargames.com/VI"
          target="_blank"
          rel="noopener noreferrer"
        >
			<img src="/Image/logogta6.png" alt="logo grand theft auto 6" className={styles.logo} />
        </a>

		</nav>
	);
}