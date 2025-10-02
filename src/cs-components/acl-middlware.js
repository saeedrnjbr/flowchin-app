import Spinner from "@/cs-components/spinner"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserCurrent } from "@/pages/api"
import { useRouter } from "next/navigation"

export default function AclMiddleware({ children }) {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchUserCurrent());
    }, [dispatch]);

    useEffect(() => {
        if (users.currentError) {
            router.push("/account");
        }
    }, [users.currentError, router]);

    if (users.currentError === undefined) {
        return <Spinner />;
    }

    return children;
}
