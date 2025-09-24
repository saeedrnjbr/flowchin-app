import { Edit, Link, Plus, Upload, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"

import { Handle, Position } from '@xyflow/react';
import { CSS } from '@dnd-kit/utilities';

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    KeyboardSensor,
    useDraggable,
    useDroppable,
} from "@dnd-kit/core";

import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { BASE_URL_UI } from "@/pages/api"
import { useSearchParams } from "next/navigation"
import InlineEdit from "../inline-edit"

function SortableItem({ id, element, handleDelete, onUpdateItems }) {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : "auto",
    };

    const handleInputEdit = (value) => {
        onUpdateItems( prevValues => prevValues.map( item => 
            item.id == element.id ? {
                ...item,
                data: {
                    ...item.data,
                    current: {
                        ...item.data.current,
                        label: value 
                    }
                }
            } : item
        ))
    }

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative bg-white"
        >

            {element.type != "heading" && element.type != "description" && element.type != "divier" && <div className="flex hover:cursor-pointer border  px-3  flex-col space-y-3 py-5 rounded-xl">
                <div className=" flex items-center justify-between">
                    <div className="flex gap-x-1 w-full items-center">
                        <svg className="size-4 text-stone-300 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10,4A2,2,0,1,1,8,2,2,2,0,0,1,10,4ZM8,10a2,2,0,1,0,2,2A2,2,0,0,0,8,10Zm0,8a2,2,0,1,0,2,2A2,2,0,0,0,8,18ZM16,6a2,2,0,1,0-2-2A2,2,0,0,0,16,6Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,14Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,22Z"></path></g></svg>
                        <InlineEdit placeholder="عنوان" onChange={handleInputEdit} value={element.label ?? "عنوان"} className="w-full" />
                    </div>
                    <X onClick={() => handleDelete(element.id)} size={16} />
                </div>
                {element.type == "select" && <select className="border border-stone-200 w-sm p-2 rounded">
                    <option>Option1</option>
                    <option>Option2</option>
                </select>}
                {element.type == "email" && <input placeholder="name@example.com" className="border w-sm border-stone-200 p-2 rounded" type="email" />}
                {element.type == "field" && <input placeholder="اطلاعات را وارد نمایید" className="border w-sm border-stone-200 p-2 rounded" type="text" />}
                {element.type == "datepicker" && <DatePicker placeholder="۱۴۰۴/۰۷/۰۱" calendar={persian} locale={persian_fa} style={{ width: "50%", borderColor: "#e4e4e4", paddingTop: "20px", paddingBottom: "20px" }} />}
                {element.type == "number" && <input placeholder="مقدار را وارد نمایید" className="border  w-sm border-stone-200 p-2 rounded" type="number" />}
                {element.type == "checkbox" && <div className="ltr p-2"><Switch size="lg" /></div>}
                {element.type == "file" && <input className="border w-sm border-stone-200 p-2 rounded" type="file" />}
            </div>}
            {(element.type == "heading" || element.type == "description" || element.type == "divier") && <div className="flex hover:cursor-pointer border  px-3  flex-col space-y-2 py-5 rounded-xl">
                <div className="relative">
                    <div className="flex gap-x-1 items-center">
                        <svg className="size-4 text-stone-300 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M10,4A2,2,0,1,1,8,2,2,2,0,0,1,10,4ZM8,10a2,2,0,1,0,2,2A2,2,0,0,0,8,10Zm0,8a2,2,0,1,0,2,2A2,2,0,0,0,8,18ZM16,6a2,2,0,1,0-2-2A2,2,0,0,0,16,6Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,14Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,22Z"></path></g></svg>
                        {element.type == "heading" && <InlineEdit placeholder="عنوان" onChange={handleInputEdit} value={element.label ?? "عنوان"} className=" cursor-text text-2xl placeholder-gray-900 font-bold w-full" />}
                        {element.type == "description" && <InlineEdit placeholder="توضیحات را وارد نمایید" onChange={handleInputEdit} value={element.label ?? "توضیحات"} className="cursor-text  w-full" />}
                        {element.type == "divier" && <div className="border-b w-full border-stone-200 border"></div>}
                    </div>
                    <X size={16} onClick={() => handleDelete(element.id)} className=" absolute left-0 -top-3" />
                </div>
            </div>}
        </li>
    );
}

export default ({ onUpdateNodes, params }) => {

    const elements = useSelector(state => state.elements)
    const [icon, setIcon] = useState(params ? params.icon : "")
    const [title, setTitle] = useState(params ? params.title : "عنوان رابط کاربری")
    const [link, setLink] = useState(params ? params.link : "")
    const [description, setDescription] = useState(params ? params.description : "توضیحات مرتبط")
    const [showDialog, setShowDialog] = useState(false)
    const [items, setItems] = useState(params ? params.items : []);
    const [dropped, setDropped] = useState(false);
    const [flowId, setFlowId] = useState();
    const searchParams = useSearchParams()

    useEffect(() => {
        onUpdateNodes({
            icon,
            title,
            description,
            items
        })
    }, [icon, title, description, items])

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    useEffect(() => {
        setFlowId(searchParams.get("flow_id"))
    }, [searchParams])

    const handleSortDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        setItems((prev) => arrayMove(prev, oldIndex, newIndex));

    }

    const DraggableItem = ({ id, children, meta }) => {

        const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id,
            data: meta,
        });

        const style = {
            transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        };

        return (
            <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
                {children}
            </div>
        );
    }

    const DroppableArea = ({ id, children }) => {
        const { setNodeRef, isOver } = useDroppable({ id });
        return (
            <div ref={setNodeRef}
                className={`
                    ${isOver ? "border-2 pb-40 bg-sky-50 p-4 border-sky-400 border-dashed" : ""}
                    ${!dropped ? "border-2 border-stone-200 border-dashed" : ""}
                `} >
                {children}
            </div>
        );
    }

    const handleDelete = id => setItems((prevNodes) => prevNodes.filter((node) => node.id !== id))

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setDropped(true)
            setItems((prev) => {
                const updatedItems = [...prev];
                updatedItems.push(active)
                return updatedItems;
            });
        }
    }


    return <>
        <div className=" noding rounded-xl">
            <div className="bg-white shadow-sm shadow-black/25 text-xs min-w-lg rounded-xl rtl py-1">
                <div className="flex flex-col space-y-2 relative">
                    <Dialog onOpenChange={() => setShowDialog(false)} open={showDialog}>
                        <DialogContent className="sm:min-w-7xl">
                            <ScrollArea className="h-[750px] rtl">
                                <DndContext onDragEnd={handleDragEnd}>
                                    <div className=" grid grid-cols-12 p-8  gap-x-4">
                                        <div className="col-span-3">
                                            {elements.data.length > 0 && <div className="flex space-y-3 flex-col">
                                                {elements.data.map((element, el) => {
                                                    return <DraggableItem meta={element} id={element.id} index={el}>
                                                        <div key={el} style={{ zIndex: 10000 }} className="p-2 bg-white cursor-pointer hover:shadow-sm flex justify-between items-center border rounded-lg">
                                                            <div className="flex items-center gap-x-3">
                                                                <div className=" bg-sky-100 p-2 rounded-xl">
                                                                    <img className="w-5" src={element.icon_url} />
                                                                </div>
                                                                <span className="font-bold text-sm">{element.name}</span>
                                                            </div>
                                                            <Plus size={16} className=" text-stone-400" />
                                                        </div>
                                                    </DraggableItem>
                                                })}
                                            </div>}
                                        </div>
                                        <div className="col-span-9 px-8">
                                            <div className=" relative flex items-center justify-center    cursor-pointer min-h-44 bg-stone-100 rounded-xl">
                                                <div className="flex gap-x-2 text-stone-500">
                                                    <Upload size={24} />
                                                    <p className="font-bold">آپلود تصویر کاور </p>
                                                </div>
                                                <div className=" absolute right-6 -bottom-16 flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg bg-background hover:bg-muted shadow-md ">
                                                    انتخاب آیکون
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-4 pt-24">
                                                <InlineEdit value={title} onChange={setTitle} placeholder="عنوان رابط کاربری" className=" cursor-text  placeholder-gray-900 font-bold" />
                                                <InlineEdit value={description} onChange={setDescription} placeholder="توضیحات مرتبط" className="cursor-text  text-stone-500" />
                                            </div>
                                            <div className="my-10 dropable-items">
                                                <DroppableArea id="drop-zone">
                                                    <DndContext
                                                        sensors={sensors}
                                                        collisionDetection={closestCenter}
                                                        onDragEnd={handleSortDragEnd}
                                                    >
                                                        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                                                            {items.length > 0 && <ul className="space-y-3">
                                                                {items.map((it) => <SortableItem onUpdateItems={setItems} handleDelete={handleDelete} key={it.id} id={it.id} element={it.data.current} />)}
                                                            </ul>}
                                                            {items.length == 0 && <div className=" flex items-center  text-stone-400 h-[200px] justify-center">فیلد مورد نظر را در اینجا بکشید</div>}
                                                        </SortableContext>
                                                    </DndContext>
                                                </DroppableArea>
                                            </div>
                                        </div>
                                    </div>
                                </DndContext>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                    <div onClick={() => setShowDialog(true)} className=" relative flex items-center justify-center min-h-24 m-2 cursor-pointer bg-stone-100  rounded-xl">
                        <div className="flex gap-x-2 text-stone-500">
                            <Edit size={16} />
                            <p className="font-bold">ویرایش رابط کاربری</p>
                        </div>
                        <div className=" absolute text-xs right-6 -bottom-12 flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg bg-background hover:bg-muted shadow-md ">
                            <span className="w-10 text-center">انتخاب آیکون</span>
                        </div>
                    </div>
                    <div className="flex flex-col px-3 pb-4 space-y-3 pt-16">
                        <span onClick={() => setShowDialog(true)} className=" cursor-pointer hover:bg-gray-100 placeholder-gray-900 font-bold">{title}</span>
                        <p onClick={() => setShowDialog(true)} className="cursor-pointer hover:bg-gray-100 text-stone-400">{description}</p>
                        {items.length > 0 && <>
                            <ul className="flex flex-col space-y-5 py-5 px-2 pb-10">
                                {items.map((item, el) => {
                                    let element = item.data.current
                                    return <li key={el} className="flex flex-col space-y-3">
                                        {element.type != "heading" && element.type != "description" && element.type != "divier" && <span>{element.label}</span>}
                                        {element.type == "select" && <select className="border border-stone-200 w-sm p-2 rounded">
                                            <option>Option1</option>
                                            <option>Option2</option>
                                        </select>}
                                        {element.type == "email" && <input placeholder="name@example.com" className="border w-sm border-stone-200 p-2 rounded" type="email" />}
                                        {element.type == "field" && <input placeholder="اطلاعات را وارد نمایید" className="border w-sm border-stone-200 p-2 rounded" type="text" />}
                                        {element.type == "datepicker" && <DatePicker placeholder="۱۴۰۴/۰۷/۰۱" calendar={persian} locale={persian_fa} style={{ width: "50%", borderColor: "#e4e4e4", paddingTop: "20px", paddingBottom: "20px" }} />}
                                        {element.type == "number" && <input placeholder="مقدار را وارد نمایید" className="border  w-sm border-stone-200 p-2 rounded" type="number" />}
                                        {element.type == "checkbox" && <div className="ltr p-2"><Switch size="lg" /></div>}
                                        {element.type == "file" && <input className="border w-sm border-stone-200 p-2 rounded" type="file" />}
                                        {element.type == "heading" && <h3 className=" cursor-text text-lg placeholder-gray-900 font-bold w-full">{element.label}</h3>}
                                        {element.type == "description" && <p className="cursor-text  w-full">{element.label}</p>}
                                        {element.type == "divier" && <div className="border-b w-full border-stone-200 border"></div>}
                                    </li>
                                })}
                            </ul>
                        </>}
                        <div className="relative">
                            <div className="cursor-pointer hover:bg-gray-100 w-full border py-3 rounded-lg text-left text-xs ltr px-8 link-font text-stone-400">{BASE_URL_UI}/interface/${flowId}</div>
                            <Link className=" absolute left-4 top-4 text-stone-500 " size={12} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Handle type="source" position={Position.Bottom} className='flex items-center justify-center font-normal text-[#6d6d6d]  text-xs'>1</Handle>
    </>

}