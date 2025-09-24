import { Textarea } from '@/components/ui/textarea';
import { useNodeId, useReactFlow } from '@xyflow/react';
import { X } from 'lucide-react';
import React, { memo, useCallback, useEffect, useState } from 'react';


export default memo(({ onUpdateNodes, params }) => {

    const id = useNodeId();
    const { setNodes } = useReactFlow()
    const [note, setNote] = useState(params ? params.note : "")

    useEffect(() => {
        onUpdateNodes({
            note
        })
    }, [note])


    const handleDelete = useCallback(() => {
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
    }, [id, setNodes]);


    return <div className='bg-gray-50 relative border text-neutral-400 min-w-96 rounded-xl py-4 px-3'>
        <X onClick={handleDelete} size={16} className="absolute z-[5000] left-4 top-7" />
        <Textarea  onChange={e => setNote(e.target.value)} value={note} placeholder="افزودن یادداشت ..." className="rtl  min-h-72 focus:border-0 focus:shadow-none border-0 shadow-none" />
    </div>;
})
