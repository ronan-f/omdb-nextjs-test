import Link from "next/link"
import { auth } from "../constants"

export const Logout = () => {
    return (
        <Link href={auth.LOGOUT}>
            <button>Logout</button>
        </Link>
    )
}
