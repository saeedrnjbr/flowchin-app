import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"


export default ({ onUpdateNodes, params }) => {

    const [prompt, setPrompt] = useState(params ? params.prompt : "")
    const [ai, setAi] = useState(params ? params.ai : "gemma3:4b")

    useEffect(() => {
        onUpdateNodes({
            prompt,
            ai
        })
    }, [prompt, ai])

    return <div className="flex flex-col space-y-3 pt-5">
        <div className="gap-3 grid">
            <Label className=" font-bold  text-xs" htmlFor="prompt">Prompt (دستور)</Label>
            <Textarea value={prompt}  placeholder="خلاصه‌ای از سند زیر را به صورت فهرست‌وار ارائه دهید" className='rtl min-h-8' onChange={(e) => setPrompt(e.target.value)} type="text" id="prompt" />
        </div>
        <div className="grid gap-3 text-xs">
            <Label className="text-xs font-bold" htmlFor="name">مدل هوش‌ مصنوعی</Label>
            <Select value={ai} onValueChange={setAi}>
                <SelectTrigger className="w-full rtl">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="rtl">
                    <SelectItem value="gemma3:4b">gemma3:4b</SelectItem>
                    <SelectItem value="llama3.2:latest">llama3.2:latest</SelectItem>
                    <SelectItem value="qwen3:1.7b">qwen3:1.7b</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
}