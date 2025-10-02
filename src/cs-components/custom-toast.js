import { Bug, Check, Info } from "lucide-react"
import toast from "react-hot-toast"

export default ({ message = '', action = "error" }) => {
    return <div className={`max-w-md w-full py-4 px-5 ${action == "error" ? "bg-red-50" : ""}  ${action == "success" ? "bg-green-50" : ""}  ${action == "info" ? "bg-blue-50" : ""} shadow-lg rounded-lg pointer-events-auto flex gap-x-2`}>
        <span className={`${action == "error" ? "text-red-500" : ""}  ${action == "success" ? "text-green-500" : ""}  ${action == "info" ? "text-blue-500" : ""} `}>
            {action == "success" && <Check />}
            {action == "error" && <Bug />}
            {action == "info" && <Info />}
        </span>
        <p className={`mt-1  text-sm ${action == "error" ? "text-red-500" : ""}  ${action == "success" ? "text-green-500" : ""}  ${action == "info" ? "text-blue-500" : ""} `}>
            {message}
        </p>
    </div>
}