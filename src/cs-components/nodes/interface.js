import { CopySlash, Edit, Layout, Trash, Upload } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useImmer } from "use-immer";

import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Canvas from "./dnd/canvas";
import Sidebar from "./dnd/sidebar";

import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@/components/ui/dialog"

import { Handle, NodeToolbar, Position } from '@xyflow/react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { BASE_URL_UI } from "@/pages/api"
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import InlineEdit from "../inline-edit"
import { Button } from "@/components/ui/button"
import FormViewer from "../form-viewer"
import UppyUploader from "../uppy-uploader";


function getData(prop) {
    return prop?.data?.current ?? {};
}

function createSpacer({ id }) {
    return {
        id,
        type: "spacer",
        title: "spacer",
    };
}


export default ({ onUpdateNodes, meta, params, handleDelete }) => {

    const elements = useSelector(state => state.elements)
    const [cover, setCover] = useState(params ? params.cover : null)
    const [icon, setIcon] = useState(params ? params.icon : null)
    const [title, setTitle] = useState(params ? params.title : "عنوان رابط کاربری")
    const [link, setLink] = useState(params ? params.link : "")
    const [description, setDescription] = useState(params ? params.description : "توضیحات مرتبط")
    const [showDialog, setShowDialog] = useState(false)
    const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
        Date.now()
    );
    useEffect(() => {
        if (link == "") {
            setLink(`${BASE_URL_UI}/interface/${meta.unique_id}`)
        }
    }, [meta])

    const spacerInsertedRef = useRef();
    const currentDragFieldRef = useRef();
    const [data, updateData] = useImmer({
        fields: params ? params.fields : [],
    });
    const [copied, setCopied] = useState(false);

    const handleCoverUpload = coverFile => setCover(coverFile.file_url)

    const handleIconUpload = iconFile => setIcon(iconFile.file_url)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // reset after 2s
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const { fields } = data

    useEffect(() => {
        onUpdateNodes({
            icon,
            cover,
            fields,
            link,
            title,
            description,
        })
    }, [icon, title, description, fields, link, cover])


    const cleanUp = () => {
        currentDragFieldRef.current = null;
        spacerInsertedRef.current = false;
    };

    const handleDragStart = (e) => {
        const { active } = e;
        const activeData = getData(active);
        if (activeData.fromSidebar) {
            const { field } = activeData;
            currentDragFieldRef.current = {
                id: active.id,
                element_id: field.id,
                label: field.label === "" ? field.name : field.label,
                type: field.type
            };
            return;
        }

        const { field, index } = activeData;

        currentDragFieldRef.current = field;

        updateData((draft) => {
            draft.fields.splice(index, 1, createSpacer({ id: active.id }));
        });
    };


    const onDeleteField = (fieldId) => updateData((draft) => {
        draft.fields = draft.fields.filter((f) => f.id !== fieldId);
    });

    const onChangeField = (field, value, {
        is_required = false,
        guide_description = "",
        default_value = "",
        min_value = "",
        placeholder = "",
        max_value = "",
        checked = false,
        options = []
    }) => {
        updateData((draft) => {
            const index = draft.fields.findIndex((f) => f.id === field.id);
            draft.fields[index].label = value
            draft.fields[index].is_required = is_required
            draft.fields[index].placeholder = placeholder
            draft.fields[index].guide_description = guide_description
            draft.fields[index].default_value = default_value
            draft.fields[index].min_value = min_value
            draft.fields[index].max_value = max_value
            draft.fields[index].options = options
            draft.fields[index].checked = checked
        });
    }

    const handleDragOver = (e) => {
        const { active, over } = e;
        const activeData = getData(active);

        if (activeData.fromSidebar) {

            const overData = getData(over);

            if (!spacerInsertedRef.current) {
                const spacer = createSpacer({
                    id: active.id + "-spacer",
                });

                updateData((draft) => {
                    if (!draft.fields.length) {
                        draft.fields.push(spacer);
                    } else {
                        const nextIndex =
                            overData.index > -1 ? overData.index : draft.fields.length;

                        draft.fields.splice(nextIndex, 0, spacer);
                    }
                    spacerInsertedRef.current = true;
                });
            } else if (!over) {
                updateData((draft) => {
                    draft.fields = draft.fields.filter((f) => f.type !== "spacer");
                });
                spacerInsertedRef.current = false;
            } else {
                // we need to make sure we're updating the spacer position to reflect where our drop will occur.
                // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
                updateData((draft) => {
                    const spacerIndex = draft.fields.findIndex(
                        (f) => f.id === active.id + "-spacer"
                    );

                    const nextIndex =
                        overData.index > -1 ? overData.index : draft.fields.length - 1;

                    if (nextIndex === spacerIndex) {
                        return;
                    }

                    draft.fields = arrayMove(draft.fields, spacerIndex, overData.index);
                });
            }
        }
    };

    const handleDragEnd = (e) => {
        const { over } = e;

        // We dropped outside of the over so clean up so we can start fresh.
        if (!over) {
            cleanUp();
            updateData((draft) => {
                draft.fields = draft.fields.filter((f) => f.type !== "spacer");
            });
            return;
        }

        let nextField = currentDragFieldRef.current;

        if (nextField) {
            const overData = getData(over);
            updateData((draft) => {
                const spacerIndex = draft.fields.findIndex((f) => f.type === "spacer");
                draft.fields.splice(spacerIndex, 1, nextField);
                draft.fields = arrayMove(
                    draft.fields,
                    spacerIndex,
                    overData.index || 0
                );
            });
        }

        setSidebarFieldsRegenKey(Date.now());
        cleanUp();
    };

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
    );

    return <>
        <NodeToolbar className='pb-3' position={Position.Top}>
            <div className="flex gap-2 flex-wrap">
                <div className="divide-x divide-muted-foreground text-black ">
                    <Button onClick={handleDelete} size="sm" className="rounded-none hover:bg-gray-100 cursor-pointer bg-white text-red-400 font-bold first:rounded-l-md last:rounded-r-md border-l border border-gray-200">
                        <div className='flex gap-x-2 items-center'>
                            <span>حذف</span>
                            <Trash />
                        </div>
                    </Button>
                    <Button onClick={() => setShowDialog(true)} size="sm" className="rounded-none hover:bg-gray-100 cursor-pointer bg-white text-black font-bold first:rounded-l-md last:rounded-r-md border-l border border-gray-200">
                        <div className='flex gap-x-2 items-center'>
                            <span>تنظیمات رابط‌ کاربری</span>
                            <Layout />
                        </div>
                    </Button>
                </div>
            </div>
        </NodeToolbar>
        <div className=" noding relative group rounded-xl">
            <div className="bg-white shadow-sm shadow-black/25 text-xs min-w-lg rounded-xl rtl py-1">
                <div className="flex flex-col space-y-2 relative">
                    <Dialog onOpenChange={() => setShowDialog(false)} open={showDialog}>
                        <DialogContent description="" className="sm:min-w-7xl">
                            <ScrollArea className="h-[750px] rtl">
                                <DndContext
                                    onDragStart={handleDragStart}
                                    onDragOver={handleDragOver}
                                    onDragEnd={handleDragEnd}
                                    sensors={sensors}
                                    autoScroll
                                >
                                    <div className=" grid grid-cols-12 gap-x-10 px-8">
                                        <div className="col-span-3">
                                            <Sidebar elements={elements} fieldsRegKey={sidebarFieldsRegenKey} />
                                        </div>
                                        <div className="col-span-9">
                                            <div style={{ background: cover != null ? `url(${cover})` : "#EEE" }} className=" relative flex uppy-centerize items-center justify-center   min-h-44 bg-gray-100 rounded-xl">
                                                <UppyUploader onUploaded={handleCoverUpload} id="dropzone-cover">
                                                    <div className="flex gap-x-2 bg-white p-2 rounded-full px-6 shadow cursor-pointer text-gray-500">
                                                        <Upload size={24} />
                                                        <p className="font-bold">آپلود تصویر کاور </p>
                                                    </div>
                                                </UppyUploader>
                                                <UppyUploader onUploaded={handleIconUpload} id="dropzone-icon">
                                                    <div style={{ background: icon != null ? `url(${icon})` : "#FFF" }} className=" absolute  uppy-centerize right-6 -bottom-8 flex h-24 w-24  z-50 cursor-pointer items-center justify-center rounded-full bg-white hover:bg-muted shadow-md ">
                                                        {icon == null ? <span>انتخاب آیکون</span> : ""}
                                                    </div>
                                                </UppyUploader>
                                            </div>
                                            <div className="flex flex-col space-y-4 pt-24">
                                                <InlineEdit value={title} onChange={setTitle} placeholder="عنوان رابط کاربری" className=" cursor-text  placeholder-gray-900 font-bold" />
                                                <InlineEdit value={description} onChange={setDescription} placeholder="توضیحات مرتبط" className="cursor-text  text-gray-500" />
                                            </div>
                                            <SortableContext
                                                strategy={verticalListSortingStrategy}
                                                items={fields.map((f) => f.id)}
                                            >
                                                <Canvas onDeleteField={onDeleteField} onChangeField={onChangeField} fields={fields} />
                                            </SortableContext>
                                        </div>
                                    </div>
                                </DndContext>
                            </ScrollArea>
                            <DialogFooter className="bg-gray-100 py-4 px-8">
                                <Button onClick={() => setShowDialog(false)} className="text-xl cursor-pointer" type="outline">تایید</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <div style={{ background: cover != null ? `url(${cover})` : "#EEE" }} onClick={() => setShowDialog(true)} className=" relative uppy-centerize flex items-center justify-center min-h-24 m-2 cursor-pointer bg-gray-100  rounded-xl">
                        {cover == null && <div className="flex gap-x-2 text-gray-500">
                            <Edit size={16} />
                            <p className="font-bold">ویرایش رابط کاربری</p>
                        </div>}
                        <div style={{ background: icon != null ? `url(${icon})` : "#FFF" }} className=" absolute uppy-centerize text-xs right-6 -bottom-8 flex h-16 w-16  cursor-pointer items-center justify-center rounded-full bg-background hover:bg-muted shadow-md ">
                            {icon == null && <span className="w-10 text-center">انتخاب آیکون</span>}
                        </div>
                    </div>
                    <div className="flex flex-col px-3 pb-4 space-y-3 pt-16">
                        <span onClick={() => setShowDialog(true)} className=" cursor-pointer hover:bg-gray-100 placeholder-gray-900 font-bold">{title}</span>
                        <p onClick={() => setShowDialog(true)} className="cursor-pointer max-w-lg hover:bg-gray-100 text-gray-400">{description}</p>
                        <FormViewer fields={fields} />
                        <div onClick={handleCopy} className="relative">
                            <div className={`cursor-pointer ${copied ? " bg-linear-to-r from-gray-500 via-green-500 to-emerald-400 text-white text-center" : "text-left  text-gray-500"} w-full border py-3 rounded-lg  text-xs ltr px-8 link-font`}>{copied ? "کپی شد" : link}</div>
                            <CopySlash className={`absolute left-3 top-3.5 ${copied ? "text-white" : "text-gray-500"}`} size={16} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-58 outputViewer bg-white rtl opacity-0 transform -translate-x-4
                  group-hover:opacity-100 group-hover:translate-x-0
                  transition-all duration-300 delay-200 text-[10px] flex-col absolute px-2 py-3 rounded-xl border bottom-0 -right-62 shadow-sm'>
                <span className=' font-bold block pb-1'>خروجی {meta.output_params?.split("-").length}</span>
                <div className='flex flex-wrap gap-x-1'>
                    {fields.map((field, p) => {
                        return <span key={p} className='border flex items-center justify-center px-1 font-extrabold  rounded-xl' style={{ background: meta.colors[meta.background][100], color: meta.colors[meta.background][600], borderColor: meta.colors[meta.background][500] }}>{field.label}</span>
                    })}
                </div>
            </div>
        </div>
        <Handle type="source" position={Position.Bottom} className='flex items-center justify-center font-normal text-[#6d6d6d]  text-xs'>1</Handle>
    </>

}