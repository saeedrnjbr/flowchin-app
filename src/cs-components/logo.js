import Link from "next/link"
import CircleLogoImage from "./circle-logo-image"

export default ({ size = "text-3xl" }) => {
    return <Link href="/" className="flex justify-center items-center gap-2 text-center">
        <CircleLogoImage />
        <h1 className={`${size} text-black font-extrabold`}>فلوچین</h1>
    </Link>
}