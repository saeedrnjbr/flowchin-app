import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default ({ fields }) => {
    return <div className="max-h-[450px] overflow-y-auto z-[10000] rtl">
        {fields.length > 0 && <>
            <ul className="flex flex-col space-y-5 py-5 px-2 pb-10">
                {fields.map((field, el) => {

                    let selectDefault = ""

                    if (field.type == "select") {
                        if (field.options && field.options.length > 0) {
                            field.options.map(item => {
                                if (item.id == field.default_value) {
                                    selectDefault = item.value
                                }
                            })
                        }
                    }

                    return <li key={el} className="flex flex-col space-y-3">
                        {field.type != "heading" && field.type != "description" && field.type != "divier" &&
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center gap-x-2">
                                    <span>{field.label}</span>
                                    {field.is_required && <i className="text-red-500  text-xs">الزامی</i>}
                                </div>
                                {field.guide_description ? <p className=" text-gray-400 text-xs">{field.guide_description}</p> : ""}
                            </div>
                        }
                        {field.type == "select" && <Select>
                            <SelectTrigger className="w-sm">
                                <SelectValue placeholder={selectDefault} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {field.options && field.options.map((option, op) => {
                                        if (option.value) {
                                            return <SelectItem className="rtl" value={option.id}>{option.value}</SelectItem>
                                        }
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>}
                        {field.type == "email" && <input defaultValue={field.default_value} placeholder="name@example.com" className="border w-sm border-gray-200 p-2 rounded" type="email" />}
                        {field.type == "field" && <input defaultValue={field.default_value} placeholder={field.placeholder ?? "اطلاعات را وارد نمایید"} className="border w-sm border-gray-200 p-2 rounded" type="text" />}
                        {field.type == "datepicker" && <DatePicker placeholder="۱۴۰۴/۰۷/۰۱" calendar={persian} locale={persian_fa} style={{ width: "380px", borderColor: "#e4e4e4", paddingTop: "20px", paddingBottom: "20px" }} />}
                        {field.type == "number" && <input defaultValue={field.default_value} placeholder="مقدار را وارد نمایید" className="border  w-sm border-gray-200 p-2 rounded" type="number" />}
                        {field.type == "checkbox" && <div className="ltr p-2"><Switch checked={field.checked} size="lg" /></div>}
                        {field.type == "file" && <input className="border w-sm border-gray-200 p-2 rounded" type="file" />}
                        {field.type == "heading" && <h3 className=" cursor-text text-lg placeholder-gray-900 font-bold w-full">{field.label}</h3>}
                        {field.type == "description" && <p className="cursor-text  text-gray-500 w-full">{field.label}</p>}
                        {field.type == "divier" && <div className="border-b w-full border-gray-100 border"></div>}
                    </li>
                })}
            </ul>
        </>}
    </div>
}