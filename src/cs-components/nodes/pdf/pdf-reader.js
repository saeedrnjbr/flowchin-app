
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default ({ onUpdateNodes, params }) => {

    const [fromLink, setFromLink] = useState(params ? params.fromLink : false)
    const [link, setLink] = useState(params ? params.link ?? "" : "")
    const [file, setFile] = useState(params ? params.file : "")

    useEffect(() => {
        onUpdateNodes({
            link,
            file
        })
    }, [link, file])

    return <div className="flex flex-col space-y-5">
        {fromLink ? <div className="gap-3 grid">
            <Label className=" font-bold  text-xs" htmlFor="url">لینک فایل</Label>
            <Input value={link} className='ltr link-font' onChange={(e) => setUrl(e.target.value)} type="text" id="url" />
        </div> : <div className="gap-3 grid">
            <div className="flex items-center justify-between">
                <Label className=" font-bold  text-xs" htmlFor="url">انتخاب فایل</Label>
            </div>
            <Select value={file} onValueChange={setFile}>
                <SelectTrigger className="w-full rtl">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="rtl">
                    <SelectItem value="Y/m/d">روز/ماه/سال</SelectItem>
                </SelectContent>
            </Select>
        </div>}
        <div className="flex items-center ltr justify-between">
            <Switch checked={fromLink} onCheckedChange={value => setFromLink(value)} />
            <Label className=" font-bold  text-xs" htmlFor="url">انتخاب از لینک</Label>
        </div>
    </div>
}