import Spinner from "@/cs-components/spinner"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserCurrent } from "@/pages/api"
import { useRouter } from "next/navigation"

export default function AclMiddleware({ children }) {

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const router = useRouter()

    useEffect(() => {
        dispatch(fetchUserCurrent())
    }, [])

    if (users.currentError == undefined) {
        return <Spinner />
    }

    if (users.currentError) {
        return router.push("/account")
    }

    return children
}
