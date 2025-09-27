import React, { memo, useCallback } from 'react';
import { Handle, NodeToolbar, Position, useNodeId, useReactFlow, useStoreApi } from '@xyflow/react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { BookText, Copy, Play, TextCursor, TextIcon, Trash, Workflow } from 'lucide-react';
import NodeWrapper from './node-wrapper';
import NoteNode from './note-node';
import Interface from './nodes/interface';

export default memo(({ data }) => {

    const id = useNodeId();
    const { setNodes } = useReactFlow()
    const { meta, params } = data
    const store = useStoreApi();

    const handleDelete = useCallback(() => {
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    }, [id, setNodes]);

    const onDuplicateNodes = useCallback(() => {

        const {
            height,
            width,
            transform: [transformX, transformY, zoomLevel]
        } = store.getState();

        const zoomMultiplier = 1 / zoomLevel;

        const centerX = -transformX * zoomMultiplier + (width * zoomMultiplier) / 2;
        const centerY =
            -transformY * zoomMultiplier + (height * zoomMultiplier) / 2;

        setNodes((prevNodes) => [
            ...prevNodes,
            {
                id: `${Math.random()}`,
                type: 'reactComponent',
                position: {
                    x: centerX,
                    y: centerY
                },
                data: {
                    meta: meta,
                }
            }
        ]);

    }, [id, setNodes]);


    const onUpdateNodes = useCallback((params) => {
        setNodes((prevNodes) => prevNodes.map(function (node) {
            if (node.id === id) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        params
                    }
                };
            }
            return node;
        }));
    }, [id, setNodes]);


    if (meta.slug == "note") {
        return <NoteNode params={params} handleDelete={handleDelete} onUpdateNodes={onUpdateNodes} />
    }

    if (meta.slug == "interface") {
        return <Interface params={params} meta={meta} handleDelete={handleDelete} onUpdateNodes={onUpdateNodes} />
    }

    return <>
        <NodeToolbar position={Position.Top}>
            <div className="flex gap-2 flex-wrap">
                <div className="divide-x divide-muted-foreground text-black ">
                    <Button size="sm" onClick={handleDelete} className="rounded-none hover:bg-gray-100 cursor-pointer bg-white text-red-400 font-bold first:rounded-l-md last:rounded-r-md border-l border border-gray-200">
                        <div className='flex gap-x-2 items-center'>
                            <span>حذف</span>
                            <Trash />
                        </div>
                    </Button>
                    <Button size="sm" className="rounded-none hover:bg-gray-100 cursor-pointer bg-white text-black font-bold first:rounded-l-md last:rounded-r-md border-l border border-gray-200">
                        <div className='flex gap-x-2 items-center'>
                            <span>تست</span>
                            <Play />
                        </div>
                    </Button>
                    <Button size="sm"  className="rounded-none hover:bg-gray-100 cursor-pointer bg-white text-black font-bold first:rounded-l-md last:rounded-r-md border border-l-0 border-gray-200">
                        <div className='flex gap-x-2 items-center'>
                            <span>تنظیم ورودی</span>
                            <Workflow />
                        </div>
                    </Button>
                    <Button size="sm" onClick={() => onDuplicateNodes(meta)} className="rounded-none hover:bg-gray-100 cursor-pointer bg-white text-black font-bold first:rounded-l-md last:rounded-r-md border border-l-0 border-gray-200">
                        <div className='flex gap-x-2 items-center'>
                            <span>کپی</span>
                            <Copy />
                        </div>
                    </Button>
                </div>
            </div>
        </NodeToolbar>
        {meta.input == 1 && <Handle isConnectableStart={false} type="target" position={Position.Top} className='flex items-center justify-center text-gray-600  text-sm'></Handle>}
        <div className=" noding relative rounded-xl " style={{ borderColor: meta.colors[meta.background][100] }}>
            <div className=' bg-white flex flex-col space-y-3 text-right absolute -right-66 bottom-0 rounded-xl border w-64  shadow-sm  px-3 py-3'>
                <span className='font-bold text-gray-700  text-xs '>خروجی : {Object.keys(params).length}</span>
            </div>
            <div className="bg-white shadow-sm shadow-black/25 text-xs w-96 rounded-xl rtl p-1">
                <div style={{ background: `linear-gradient(178deg, ${meta.colors[meta.background][100]} 0%, rgba(255, 255, 255, 1) 100%)` }} className={`flex rounded-tr-xl rounded-tl-xl items-center justify-between p-4`}>
                    <div className="flex items-center gap-x-2">
                        <div style={{ background: meta.colors[meta.background][300] }} className="flex p-2 items-center rounded-lg text-sm justify-center" >
                            <img className='w-7' src={meta.icon_url} />
                        </div>
                        <div className="flex flex-col  space-y-1">
                            {meta.parent && <div className='flex items-center gap-x-1'>
                                <img className="w-4" src={meta.parent.icon_url} />
                                <span className="text-foreground/80">{meta.parent.name}</span>
                            </div>}
                            <span className="font-bold text-xs">{meta.name}</span>
                        </div>
                    </div>
                    {meta.loop == 1 && <div className='flex items-center ltr font-bold gap-x-1.5 text-xs'>
                        <span style={{ color: meta.colors[meta.background][500] }}>حلقه تکرار</span>
                        <Switch />
                    </div>}
                </div>
                {meta.slug != "interface" && <div className="py-4 px-2">
                    <p className="mb-4 text-xs line-clamp-2 max-w-sm">{meta.description}</p>
                    <NodeWrapper slug={meta.slug} params={params} onUpdateNodes={onUpdateNodes} />
                </div>}
            </div>
        </div>
        {meta.output == 1 && <Handle type="source" position={Position.Bottom} className='flex items-center justify-center font-normal text-[#6d6d6d]  text-xs'>1</Handle>}
    </>;
})
