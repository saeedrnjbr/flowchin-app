import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFlow } from "../api"
import Spinner from "@/cs-components/spinner"

export default () => {

    const flows = useSelector(state => state.flows)
    const dispatch = useDispatch()
    const params = useParams()
    const [userInterface, setUserInterface] = useState()

    useEffect(() => {
        if (params) {
            dispatch(fetchFlow(params.id))
        }
    }, [params])


    useEffect(() => {
        if(flows.flowData && flows.flowData.length > 0) {
           let nodes = flows.flowData[0].nodes
           console.log(flows.flowData[0])
        }
    }, [flows])

    if (!userInterface || flows.flowIsLoading) {
        return <Spinner />
    }

    console.log(userInterface)

    return <div className="container h-24 bg-red-100 mx-auto">

    </div>
}