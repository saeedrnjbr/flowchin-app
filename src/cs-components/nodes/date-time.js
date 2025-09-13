import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

export default ({ onUpdateNodes }) => {

    const [format, setFormat] = useState("Y/m/d")
    const [timezone, setTimezone] = useState("asiaTehran")
    const [customFormat, setCustomFormat] = useState()

    useEffect(() => {
        onUpdateNodes({
            format,
            customFormat,
            timezone
        })
    }, [format, customFormat, timezone])

    return <div className="flex flex-col space-y-3 pt-5">
        <div className="grid gap-3 text-xs">
            <Label className=" text-stone-500  text-xs"  htmlFor="name">فرمت نمایش</Label>
            <Select value={format} onValueChange={setFormat}>
                <SelectTrigger className="w-full rtl">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="rtl">
                    <SelectItem value="Y/m/d">روز/ماه/سال</SelectItem>
                    <SelectItem value="Y/m/d H:i:s">ثانیه:دقیقه:ساعت روز/ماه/سال</SelectItem>
                    <SelectItem value="format">فرمت خاص</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className={`gap-3 ${format == "format" ? "grid": "hidden"}`}>
            <Label className=" text-stone-500  text-xs" htmlFor="custom_format">فرمت خاص</Label>
            <Input onChange={(e) => setCustomFormat(e.target.value)} type="text" id="custom_format" />
        </div>
        <div className="grid gap-3 text-xs">
            <Label className=" text-stone-500 text-xs" htmlFor="description">منطقه جغرافیایی</Label>
            <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="w-full rtl">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="rtl">
                    <SelectItem value="asiaTehran">Asia/Tehran</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="gmt">Gmt</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
}