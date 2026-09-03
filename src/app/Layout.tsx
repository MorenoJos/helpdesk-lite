import { Outlet } from 'react-router-dom'
import styles from './Layout.module.css'

function Layout() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.logo}>HelpDesk Lite</span>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout