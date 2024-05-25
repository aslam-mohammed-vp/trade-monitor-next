import styles from "./page.module.scss";
import ManageStocks from "./components/manage-stocks/ManageStock";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Trade Monitor</h1>
      <ManageStocks />
    </main>
  );
}
