import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handleDeleteArray, handleUpdateArray } from "@/pages/helper"
import { Plus, X } from "lucide-react"
import { useEffect, useState } from "react"

export default ({ onUpdateNodes, params }) => {

    const [inputs, setInputs] = useState(params ? params.inputs : [
        {
            name: "",
            value: ""
        }
    ])

    useEffect(() => {
        onUpdateNodes({
            inputs
        })
    }, [inputs])


    return <div className="flex flex-col space-y-2">
        <h3 className="font-bold">ورودی‌ها</h3>
        {inputs.map((input, i) => {
            return <div className="bg-stone-50 rounded-xl">
                <div key={i} className="flex relative flex-col space-y-3 p-4">
                    <X onClick={() => handleDeleteArray(i, setInputs)} size={12} className=" absolute z-[5000] left-4 top-4  " />
                    <div className="gap-3 grid">
                        <Label className="text-xs">نام ورودی</Label>
                        <Input value={input.name} onChange={(e) => handleUpdateArray(i, "name", e.target.value, setInputs)} placeholder="مثال: email" className='link-font  bg-white' type="text" />
                    </div>
                    <div className="gap-3 grid">
                        <Label className=" text-xs">مقدار پیش‌فرض</Label>
                        <Input value={input.value} onChange={(e) => handleUpdateArray   (i, "value", e.target.value, setInputs)} placeholder="مقدار پیش‌فرض برای فیلد را وارد نمایید" className='rtl link-font bg-white' type="text" />
                    </div>
                </div>
            </div>
        })}
        <div className="flex items-start justify-end">
            <Button onClick={() => {
                setInputs(oldArray => [...oldArray, {
                    name: "",
                    value: ""
                }]);
            }} size="sm" className="cursor-pointer text-xs" variant="outline">
                <Plus />
                افزودن
            </Button>
        </div>
    </div>
}