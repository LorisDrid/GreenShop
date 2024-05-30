import Link from "next/link";
import styles from "../styles/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/pages/page.js</code>
        </p>
      </div>

      <div className={styles.grid}>
        <Link href="/signup">
          <a className={styles.card}>
            <h2>Sign Up &rarr;</h2>
            <p>Register a new account.</p>
          </a>
        </Link>
        <Link href="/login">
          <a className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>Access your account.</p>
          </a>
        </Link>
      </div>
    </main>
  );
}
