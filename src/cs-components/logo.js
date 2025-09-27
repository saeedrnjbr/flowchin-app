import Link from "next/link"
import CircleLogoImage from "./circle-logo-image"

export default ({ size = "w-24" }) => {
    return <Link href="/" className="flex justify-center items-center gap-2 text-center">
        <CircleLogoImage size={size}/>
    </Link>
}