import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handleDeleteArray, handleUpdateArray } from "@/pages/helper"
import { Plus, X } from "lucide-react"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default ({ onUpdateNodes, params }) => {

    const [outputs, setOutputs] = useState(params ? params.outputs : [
        {
            name: "",
            value: "text"
        }
    ])

    useEffect(() => {
        onUpdateNodes({
            outputs
        })
    }, [outputs])


    return <div className="flex flex-col space-y-2">
        <h3 className="font-bold">خروجی‌ها</h3>
        {outputs.map((output, i) => {
            return <div className="bg-stone-50 rounded-xl">
                <div key={i} className="flex relative flex-col space-y-3 p-4">
                    <X onClick={() => handleDeleteArray(i, setOutputs)} size={12} className=" absolute z-[5000] left-4 top-4  " />
                    <div className="gap-3 grid">
                        <Label className="text-xs">نام خروجی</Label>
                        <Input value={output.name} onChange={(e) => handleUpdateArray(i, "name", e.target.value, setOutputs)} placeholder="مثال: response" className='link-font  bg-white' type="text" />
                    </div>
                    <div className="grid gap-3 text-xs">
                        <Label className="text-xs font-bold" htmlFor="name">مقدار خروجی</Label>
                        <Select value={output.value} onValueChange={(value) => handleUpdateArray(i, "value", value, setOutputs)}>
                            <SelectTrigger className="w-full rtl">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rtl">
                                <SelectItem value="text">متن</SelectItem>
                                <SelectItem value="list">لیست</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        })}
        <div className="flex items-start justify-end">
            <Button onClick={() => {
                setOutputs(oldArray => [...oldArray, {
                    name: "",
                    value: "text"
                }]);
            }} size="sm" className="cursor-pointer text-xs" variant="outline">
                <Plus />
                افزودن
            </Button>
        </div>
    </div>
}