import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Plus, SlidersHorizontal, X, XCircle } from "lucide-react";
import InlineEdit from "@/cs-components/inline-edit";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { Switch } from "@/components/ui/switch"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { nanoid } from "@reduxjs/toolkit";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function SortableField(props) {

  const { id, index, field, onChangeField, onDeleteField } = props;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id,
      data: {
        index,
        id,
        field,
      },
    });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  const handleInputEdit = (value) => onChangeField(field, value, {})

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative bg-white">

      {field.type == "spacer" && <div className="bg-indigo-50 z-0 h-24"></div>}

      {field.type != "heading" && field.type != "description" && field.type != "divier" && field.type != "spacer" && <div className="flex hover:cursor-pointer border  px-3  flex-col space-y-3 py-5 rounded-xl">
        <div className=" flex items-center justify-between">
          <div className="flex gap-x-1 w-full items-center">
            <svg className="size-4 text-gray-300 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10,4A2,2,0,1,1,8,2,2,2,0,0,1,10,4ZM8,10a2,2,0,1,0,2,2A2,2,0,0,0,8,10Zm0,8a2,2,0,1,0,2,2A2,2,0,0,0,8,18ZM16,6a2,2,0,1,0-2-2A2,2,0,0,0,16,6Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,14Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,22Z"></path></g></svg>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-x-2">
                <InlineEdit onChange={(value) => {
                  onChangeField(field, value, { ...field })
                }} placeholder="عنوان" value={field.label ?? "عنوان"} className="w-full" />
                {field.is_required && <i className="text-red-500 text-xs">الزامی</i>}
              </div>
              {field.guide_description ? <p className=" text-gray-400 text-xs">{field.guide_description}</p> : ""}
            </div>
          </div>
          <X onClick={() => onDeleteField(id)} size={16} />
        </div>
        <div className="flex justify-between items-center p-2">
          {field.type == "select" && <select className="border border-gray-200 w-sm p-2 rounded">
            {field.options && field.options.map((option, op) => {
              if (option.value) {
                return <option selected={field.default_value == option.id ? true : false} value={option.id} key={op}>{option.value}</option>
              }
            })}
          </select>}
          {field.type == "email" && <input defaultValue={field.default_value ?? ""} placeholder="name@example.com" className="border w-sm border-gray-200 p-2 rounded" type="email" />}
          {field.type == "field" && <input defaultValue={field.default_value ?? ""} placeholder={field.placeholder ?? "اطلاعات را وارد نمایید"}  className="border w-sm border-gray-200 p-2 rounded" type="text" />}
          {field.type == "datepicker" && <DatePicker placeholder="۱۴۰۴/۰۷/۰۱" calendar={persian} locale={persian_fa} style={{ width: "380px", borderColor: "#e4e4e4", paddingTop: "20px", paddingBottom: "20px" }} />}
          {field.type == "number" && <input defaultValue={field.default_value ?? ""} placeholder="مقدار را وارد نمایید" className="border  w-sm border-gray-200 p-2 rounded" type="number" />}
          {field.type == "checkbox" && <div className="ltr p-2"><Switch checked={field.checked} size="lg" /></div>}
          {field.type == "file" && <input className="border w-sm border-gray-200 p-2 rounded" type="file" />}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className=" text-gray-500 bg-gray-100 hover:bg-gray-200 p-2 rounded-lg">
                <SlidersHorizontal />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ zIndex: 100000 }} className=" flex text-gray-600 flex-col py-6 px-4 space-y-3 w-96" align="start">
              <DropdownMenuLabel>
                <div className="flex  items-center justify-between">
                  <Switch onCheckedChange={(value) => onChangeField(field, field.label, {
                    ...field,
                    is_required: value,
                  })} checked={field.is_required ?? false} />
                  <span>الزامی</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuLabel>
                <div className="grid gap-3">
                  <Label className="block text-right" htmlFor="name">توضیح راهنما</Label>
                  <Input className="rtl" value={field.guide_description ?? ""} onChange={(e) => onChangeField(field, field.label, {
                    ...field,
                    guide_description: e.target.value
                  })} id="guide_description" />
                </div>
              </DropdownMenuLabel>
              {field.type == "field" && <DropdownMenuLabel>
                <div className="grid gap-3">
                  <Label className="block text-right" htmlFor="name">متن جایگزین</Label>
                  <Input className="rtl" value={field.placeholder ?? ""} onChange={(e) => onChangeField(field, field.label, {
                    ...field,
                    placeholder: e.target.value
                  })} id="placeholder" />
                </div>
              </DropdownMenuLabel>}
              {field.type == "select" && <DropdownMenuLabel>
                <div className="grid gap-3">
                  <Label className="block text-right font-bold pb-3" htmlFor="name">گزینه‌ها</Label>
                  {field.options && field.options.map((option, op) => {
                    return <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between">
                        <XCircle onClick={() => {
                          let newFields = field.options.filter((_, i) => op !== i)
                          onChangeField(field, field.label, {
                            ...field,
                            options: newFields
                          })
                        }} className=" text-gray-400" />
                        <Label htmlFor="description" className="rtl">گزینه {op + 1}</Label>
                      </div>
                      <Input value={option.value} className="rtl" onChange={(e) => {
                        let newFields = field.options.map((item, i) => {
                          if (i == op) {
                            return {
                              ...item,
                              value: e.target.value
                            }
                          }
                          return item
                        })
                        onChangeField(field, field.label, {
                          ...field,
                          options: newFields
                        })

                      }} default_value={option.value} />
                    </div>
                  })}
                  <Button onClick={() => {
                    onChangeField(field, field.label, {
                      ...field,
                      options: [...field.options ?? [], { "value": "", "id": nanoid() }]
                    })
                  }} variant="outline">
                    <Plus /> گزینه‌ جدید
                  </Button>
                </div>
              </DropdownMenuLabel>}
              {field.type != "file" && field.type != "datepicker" && field.type != "checkbox" && <DropdownMenuLabel>
                <div className="grid gap-3">
                  <Label className="block text-right" htmlFor="name">مقدار پیشفرض</Label>
                  {field.type != "select" ? <Input className="rtl" value={field.default_value ?? ""} onChange={(e) => onChangeField(field, field.label, {
                    ...field,
                    default_value: e.target.value,
                  })} id="default_value" /> : <select onChange={(e) => onChangeField(field, field.label, {
                    ...field,
                    default_value: e.target.value,
                  })} className="border border-gray-200 text-right p-2 rounded">
                    {field.options && field.options.map((option, op) => {
                      if (option.value) {
                        return <option selected={field.default_value == option.id ? true : false} value={option.id} key={op}>{option.value}</option>
                      }
                    })}
                  </select>}
                </div>
              </DropdownMenuLabel>}
              {field.type == "number" && <div className="flex items-center gap-x-2">
                <DropdownMenuLabel>
                  <div className="grid gap-3">
                    <Label className="block text-right" htmlFor="name">بیشترین مقدار</Label>
                    <Input className="rtl" value={field.max_value ?? ""} onChange={(e) => onChangeField(field, field.label, {
                      ...field,
                      max_value: e.target.value
                    })} id="max_value" />
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuLabel>
                  <div className="grid gap-3">
                    <Label className="block text-right" htmlFor="name">کمترین مقدار</Label>
                    <Input className="rtl" value={field.min_value ?? ""} onChange={(e) => onChangeField(field, field.label, {
                      ...field,
                      min_value: e.target.value
                    })} id="min_value" />
                  </div>
                </DropdownMenuLabel>
              </div>}
              {field.type == "checkbox" && <DropdownMenuLabel>
                <div className="flex  items-center justify-between">
                  <Switch onCheckedChange={(value) => onChangeField(field, field.label, {
                    ...field,
                    checked: value
                  })} checked={field.checked ?? false} />
                  <span>انتخاب شده</span>
                </div>
              </DropdownMenuLabel>}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>}
      {(field.type == "heading" || field.type == "description" || field.type == "divier") && <div className="flex hover:cursor-pointer border  px-3  flex-col space-y-2 py-5 rounded-xl">
        <div className="relative">
          <div className="flex gap-x-1 items-center">
            <svg className="size-4 text-gray-300 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10,4A2,2,0,1,1,8,2,2,2,0,0,1,10,4ZM8,10a2,2,0,1,0,2,2A2,2,0,0,0,8,10Zm0,8a2,2,0,1,0,2,2A2,2,0,0,0,8,18ZM16,6a2,2,0,1,0-2-2A2,2,0,0,0,16,6Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,14Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,22Z"></path></g></svg>
            {field.type == "heading" && <InlineEdit onChange={handleInputEdit} placeholder="عنوان" value={field.label ?? "عنوان"} className=" cursor-text text-2xl placeholder-gray-900 font-bold w-full" />}
            {field.type == "description" && <InlineEdit onChange={handleInputEdit} placeholder="توضیحات را وارد نمایید" value={field.label ?? "توضیحات"} className="cursor-text  text-gray-500 w-full" />}
            {field.type == "divier" && <div className="border-b w-full border-gray-100 border"></div>}
          </div>
          <X size={16} onClick={() => handleDelete(id)} className=" absolute left-0 -top-3" />
        </div>
      </div>}
    </div>
  );
}

export default function Canvas(props) {
  const { fields, onChangeField, onDeleteField } = props;

  const { listeners, setNodeRef, transform, transition } = useDroppable({
    id: "canvas_droppable",
    data: {
      parent: null,
      isContainer: true,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} className={`canvas  ${fields.length === 0 ? "border border-dashed" : ""} mt-10`} style={style} {...listeners}>
      {!fields.length && <div className="min-h-44 flex items-center justify-center text-gray-400">لطفا فیلدها را در این قسمت بکشید</div>}
      <div className="flex flex-col space-y-4">
        {fields?.map((f, i) => (
          <SortableField onDeleteField={onDeleteField} onChangeField={onChangeField} key={f.id} id={f.id} field={f} index={i} />
        ))}
      </div>
    </div>
  );
}
