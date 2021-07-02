import Link from "next/link"
import { auth } from "../constants"
import { Button } from "@material-ui/core"

export const Logout = () => {
    return (
        <Link href={auth.LOGOUT}>
            <Button color="inherit">Logout</Button>
        </Link>
    )
}
