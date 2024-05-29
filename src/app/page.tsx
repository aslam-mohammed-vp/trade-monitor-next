import ManageStocks from "./components/manage-stocks/ManageStock";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Trade Monitor</h1>
      <ManageStocks />
    </main>
  );
}
