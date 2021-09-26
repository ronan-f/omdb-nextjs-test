import { useUser } from "@auth0/nextjs-auth0"
import { useRouter } from "next/router"
import { pages, auth } from "../constants"
import { LoadingIndicator } from "../components/LoadingIndicator"

export default function Main() {
    const router = useRouter()

    const { user, error, isLoading } = useUser()
    if (error) return <p>Oh no...{error.message}</p>
    if (isLoading) return <LoadingIndicator fullScreen />

    const destination = user ? pages.HOME : auth.LOGIN

    router.push(destination)

    return null
}
