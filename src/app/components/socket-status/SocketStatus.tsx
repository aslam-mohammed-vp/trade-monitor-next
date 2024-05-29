import styles from './socket-status.module.scss';

export function SocketStatus({ status }: { status: boolean }) {
  return (
    <div className={styles.socketStatus}>
      <span className={status ? styles.online : styles.offline} />
      <div className={styles.text}>
        {' '}
        Socket is {status ? 'connected' : 'disconnected'}
      </div>
    </div>
  );
}
