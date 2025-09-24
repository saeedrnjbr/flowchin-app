
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"

export default ({ onUpdateNodes, params }) => {

    const [url, setUrl] = useState(params ? params.url : "")
    const [depth, setDepth] = useState(params ? params.depth : "")

    useEffect(() => {
        onUpdateNodes({
            url,
            depth
        })
    }, [url, depth])

    return <div className="flex flex-col space-y-3">
        <div className="gap-3 grid">
            <Label className=" font-bold  text-xs" htmlFor="url">لینک وب‌سایت</Label>
            <Input value={url} className='ltr link-font' onChange={(e) => setUrl(e.target.value)} type="text" id="url" />
        </div>
        <div className="gap-3 grid">
            <Label className=" font-bold  text-xs" htmlFor="url">عمق جستجو</Label>
            <Input value={depth} className='ltr link-font' onChange={(e) => setDepth(e.target.value)} type="text" id="url" />
        </div>
    </div>
}