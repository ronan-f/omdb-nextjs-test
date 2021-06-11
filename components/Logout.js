import Link from "next/link"
import { auth } from "../constants"
import { Button } from "@material-ui/core"
import styles from "../styles/Logout.module.css"

export const Logout = () => {
    return (
        <Link href={auth.LOGOUT} >
            <Button variant="contained"
                color="primary"
                className={styles.button}>
                Logout
            </Button>
        </Link >
    )
}
