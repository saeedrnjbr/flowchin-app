import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Background,
  ReactFlow,
  addEdge,
  ReactFlowProvider,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  useStoreApi
} from '@xyflow/react';

import { History, PlusIcon, X } from "lucide-react";

import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { CalendarSync, Layout, Play, Plus, Save, Webhook } from 'lucide-react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import List2 from '@/components/list';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoreIntegrations, fetchCreateFlow, fetchFlow } from '../api';
import CircleLogoImage from '@/cs-components/circle-logo-image';
import CustomNode from '@/cs-components/custom-node';
import { ScrollArea } from '@/components/ui/scroll-area';
import toast from 'react-hot-toast';
import CustomToast from '@/cs-components/custom-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import SpinnerLoader from '@/cs-components/spinner-loader';


const nodeTypes = {
  reactComponent: CustomNode
}


const AddNodeOnEdgeDrop = () => {

  const flows = useSelector(state => state.flows)
  const [visibleTools, setVisibleTools] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch()
  const integrations = useSelector(state => state.integrations)
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [name, setName] = useState();
  const [rfInstance, setRfInstance] = useState(null);
  const [flowUniqueId, setFlowUniqueId] = useState();
  const [createdFlow, setCreatedFlow] = useState();
  const [viewPort, setViewPort] = useState({
    x: 0,
    y: 0,
    zoom: 0
  });
  const router = useRouter()
  const store = useStoreApi();
  const searchParams = useSearchParams()

  const addNode = (item) => {

    const {
      height,
      width,
      transform: [transformX, transformY, zoomLevel]
    } = store.getState();

    const zoomMultiplier = 1 / zoomLevel;

    const centerX = -transformX * zoomMultiplier + (width * zoomMultiplier) / 2;
    const centerY =
      -transformY * zoomMultiplier + (height * zoomMultiplier) / 2;

    setNodes([
      ...nodes,
      {
        id: `${Math.random()}`,
        type: 'reactComponent',
        position: {
          x: centerX,
          y: centerY
        },
        data: {
          meta: item,
        }
      }
    ])

  }

  const onSave = useCallback(() => {
    if (rfInstance) {
      setSubmitted(true)
      dispatch(fetchCreateFlow({
        pattern: rfInstance.toObject(),
        id: flowUniqueId ?? "",
        name
      }))
    }
  }, [rfInstance, flowUniqueId, name]);


  useEffect(() => {
    if (visibleTools) {
      dispatch(fetchCoreIntegrations())
      setTimeout(() => {
        document.body.style.pointerEvents = "all"
      }, 1000)
    }
  }, [visibleTools])


  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  useEffect(() => {

    if (window.location.href.includes("flow_id")) {
      setFlowUniqueId(searchParams.get("flow_id"))
      dispatch(fetchFlow(searchParams.get("flow_id")))
    }

    if (!window.location.href.includes("flow_id")) {
      setName("عنوان فرآیند")
    }

  }, [searchParams])

  useEffect(() => {

    if (submitted) {
      if (flows.data && flows.data.length > 0) {
        if (!flowUniqueId) {
          router.push({
            pathname: "/flows/create",
            search: `?flow_id=${flows.data[0].unique_id}`
          })
        }
        setCreatedFlow(flows.data[0])
        toast.custom((t) => <CustomToast action="success" message="تغییرات با موفقیت ذخیره شد" />)
        setSubmitted(false)
      }
    }

    if (flows.flowData) {
      if (flows.flowData.length > 0) {
        setCreatedFlow(flows.flowData[0])
        setName(flows.flowData[0].name)
      }
    }

  }, [flows])


  useEffect(() => {
    if (createdFlow && createdFlow.pattern) {
      let dbNodes = []
      let pattern = createdFlow.pattern
      pattern.nodes.map((item) => {
        dbNodes.push({
          id: item.id,
          type: 'reactComponent',
          position: { x: item.position.x, y: item.position.y },
          data: {
            meta: item.data.meta,
            params: item.data.params,
          }
        })
      })
      setNodes(dbNodes)
      setEdges(pattern.edges)
      setViewPort(pattern.viewport)
    }
  }, [createdFlow])


  return (
    <div className='flex h-[calc(100vh-64px)] flex-col md:flex-row'>
      <div className='dndflow relative flex min-h-svh min-w-svw flex-col! overflow-hidden transition-all'>
        <div className=' w-full z-100 fixed top-0 ltr'>
          <div className=' flex justify-between py-2.5 px-6 items-center'>
            <div className='flex relative p-2 gap-x-2 rounded-lg items-center bg-white border shadow'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button disabled={nodes && nodes.length == 0} className="bg-gradient cursor-pointer text-base hover:bg-gradient hover:text-white text-white" size="sm" variant="outline">
                    <span>اجرا</span>
                    <Play />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>مشاهده خروجی فرآیند</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={onSave} disabled={nodes && nodes.length == 0} className="text-base hover:bg-orange-200 cursor-pointer hover:text-orange-600" size="sm" variant="outline">
                    <span>ذخیره</span>
                    <Save />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>ذخیره تغییرات فرآیند</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button disabled={nodes && nodes.length == 0} className="bg-stone-50 cursor-pointer" size="sm" variant="outline">
                    <History />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>تاریخچه اجرا</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div onClick={() => {
                    setVisibleTools(true)
                  }} className=' absolute left-0 -bottom-14 cursor-pointer flex items-center justify-center text-white rounded-full w-10 h-10 bg-gradient'>
                    <PlusIcon />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>افزودن گره جدید</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className='flex relative w-xl p-2 rounded-lg items-center bg-white border shadow justify-between'>
              <div className='flex gap-x-2'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-stone-50 cursor-pointer" size="sm" variant="outline">
                      <Webhook />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>ارسال نتیجه (وب‌هوک)</p>
                  </TooltipContent>
                </Tooltip>

                <Button className="bg-stone-50 text-base cursor-pointer" size="sm" variant="outline">
                  <span>خودکارسازی</span>
                  <CalendarSync />
                </Button>

                <Button className="bg-stone-50 text-base cursor-pointer" size="sm" variant="outline">
                  <span>رابط کاربری</span>
                  <Layout />
                </Button>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='text-base focus:border-none text-right font-bold cursor-pointer hover:bg-gray-100 border-none py-1  rounded-lg'>
                  {name ? <input onKeyUp={(e) => {
                    if (e.keyCode == 13) {
                      e.preventDefault()
                      e.target.blur();
                    }
                  }} value={name} className='w-52 rtl' onChange={(e) => setName(e.target.value)} html={name} /> : <SpinnerLoader />}
                </div>
                <Link href="/flows">
                  <CircleLogoImage />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='z-50 flex flex-grow transition-all'>
          <div className='relative flex flex-grow transition-all'>
            <div className='relative flex flex-grow flex-col transition-all'>
              <div className='bg-background relative flex flex-grow flex-col'>
                <Sheet open={visibleTools}>
                  <SheetTrigger asChild>
                    {name && nodes && nodes.length == 0 && <div className=' min-h-screen absolute top-0 left-0 right-0 flex items-center justify-center'><Button onClick={() => {
                      setVisibleTools(true)
                    }} className={`bg-gradient text-base cursor-pointer absolute z-[1000] hover:bg-gradient hover:text-white text-white px-6`} variant="outline" size={"lg"}>
                      <span>اولین فرآیند خود را ایجاد کنید</span>
                      <Plus />
                    </Button>
                    </div>}
                  </SheetTrigger>
                  <SheetContent className="bg-white  sidebar-sheet border-0  p-5 py-20 shadow-none">
                    <div className=' hidden'>
                      <SheetTitle></SheetTitle>
                      <SheetHeader>
                        <SheetDescription></SheetDescription>
                      </SheetHeader>
                    </div>
                    <div className={` bg-white h-screen border shadow  rounded-lg min-w-sm z-50`}>
                      <ScrollArea className="h-[750px] rtl">
                        <List2 addNode={addNode} loading={integrations.isLoading} items={integrations.data} />
                        <Button variant="outline" onClick={() => {
                          setVisibleTools(false)
                        }} asChild size="icon" className="size-8 absolute -left-10 top-0 p-1 cursor-pointer text-gray-500">
                          <X />
                        </Button>
                      </ScrollArea>
                    </div>
                  </SheetContent>
                </Sheet>
                <ReactFlow
                  nodes={nodes}
                  defaultEdgeOptions={{
                    animated: true,
                    type: "smoothstep",
                    deletable: true
                  }}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onInit={setRfInstance}
                  nodeTypes={nodeTypes}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  fitViewOptions={viewPort}
                  deleteKeyCode={["Delete"]}
                  fitView
                  attributionPosition="top-right"
                >
                  <Background variant="dots" gap={44} size={2} color='#ccc' />
                  <Controls />
                  <MiniMap />
                </ReactFlow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);
