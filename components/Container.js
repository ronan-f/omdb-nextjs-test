import styles from "../styles/Layout.module.css"

export const Container = ({ children }) => {
    return <div className={styles.container}>{children}</div>
}
