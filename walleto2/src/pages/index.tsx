import { useRouter } from "next/router";
import styles from "../../src/styles/HomePage.module.css";

export default function HomePage() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/home");
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <h1 className={styles.h1}>Welcome to Walleto</h1>
        <p className={styles.p}>
          Your One-Stop Solution for All Your Financial Needs
        </p>
        <button onClick={handleButtonClick} className={styles.button}>
          Access your walleto
        </button>
      </div>
    </div>
  );
}
