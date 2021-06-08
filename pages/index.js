import { useUser } from "@auth0/nextjs-auth0"
import { useRouter } from "next/router"
import { pages } from "../constants"

export default function Main() {
    const router = useRouter()

    const { user, error, isLoading } = useUser()
    if (error) return <p>Oh no...{error.message}</p>
    if (isLoading) return <p>Loading..</p>

    const destination = user ? pages.HOME : pages.LOGIN

    router.push(destination)

    return null
}
