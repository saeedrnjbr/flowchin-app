import React, { useCallback, useEffect, useState } from 'react';
import {
  Background,
  ReactFlow,
  addEdge,
  ReactFlowProvider,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  MiniMap,
  useReactFlow,
  useStoreApi
} from '@xyflow/react';

import { History, PlusIcon, Sparkles, X } from "lucide-react";

import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { CalendarSync, Play, Plus, Save, Webhook } from 'lucide-react';
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
import { fetchCoreElements, fetchCoreIntegrationInterface, fetchCoreIntegrations, fetchCreateFlow, fetchFlow } from '../api';
import CustomNode from '@/cs-components/custom-node';
import { ScrollArea } from '@/components/ui/scroll-area';
import toast from 'react-hot-toast';
import CustomToast from '@/cs-components/custom-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import SpinnerLoader from '@/cs-components/spinner-loader';
import { DnDProvider, useDnD } from '@/cs-components/dnd-context';
import InlineEdit from '@/cs-components/inline-edit';

const nodeTypes = {
  reactComponent: CustomNode
}


const AddNodeOnEdgeDrop = () => {

  const flows = useSelector(state => state.flows)
  const [visibleTools, setVisibleTools] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch()
  const { interfaceData } = useSelector(state => state.integrations)
  const integrations = useSelector(state => state.integrations)
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [name, setName] = useState();
  const [rfInstance, setRfInstance] = useState(null);
  const [flowUniqueId, setFlowUniqueId] = useState();
  const [manualDeleted, setManualDeleted] = useState();
  const [createdFlow, setCreatedFlow] = useState();
  const [hasInterface, setHasInterface] = useState();
  const [viewPort, setViewPort] = useState({
    x: 0,
    y: 0,
    zoom: 0
  });
  const router = useRouter()
  const searchParams = useSearchParams()
  const [type] = useDnD();
  const { screenToFlowPosition } = useReactFlow();
  const [dropedNode, setDropedNode] = useState()
  const [clickedNode, setClicked] = useState()
  const store = useStoreApi();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setNodes([
        ...nodes,
        {
          id: `${Math.random()}`,
          type: 'reactComponent',
          position,
          data: {
            meta: dropedNode,
          }
        }
      ])

      setEdges(edges)

    },
    [screenToFlowPosition, type, nodes, dropedNode, edges],
  );


  useEffect(() => {

    if (edges?.length || manualDeleted) {

      const nodeMap = Object.fromEntries(nodes.map(node => [node.id, node]));
      const inputsMap = Object.fromEntries(nodes.map(node => [node.id, []]));

      edges.forEach(edge => {

        const target = nodeMap[edge.target];
        const source = nodeMap[edge.source];

        if (!target || !source) return;

        const { meta, params } = source.data;
        const colors = meta.colors[meta.background];

        if (meta.output_params === "dynamic") {
          params?.fields.forEach(pr => {
            inputsMap[target.id].push({
              key: meta.id,
              value: pr.label,
              color: colors[600],
              background: colors[100],
              border: colors[500],
            });
          });
        } else {
          inputsMap[target.id].push({
            key: meta.id,
            value: meta.output_params,
            color: colors[600],
            background: colors[100],
            border: colors[500],
          });
        }
      });

      setNodes(prevNodes =>
        prevNodes.map(node =>
          inputsMap[node.id].length
            ? { ...node, data: { ...node.data, inputs: inputsMap[node.id] } }
            : { ...node, data: { ...node.data, inputs: [] } }
        )
      );

      setManualDeleted(false)
    }

  }, [edges, manualDeleted])

  useEffect(() => {
    if (clickedNode) {
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
            meta: clickedNode,
          }
        }
      ]);

      setClicked(undefined)
    }
  }, [clickedNode])


  useEffect(() => {
    setHasInterface(nodes.some(n => n.data.meta.slug === "interface"));
  }, [nodes]);

  const onAddInterface = () => dispatch(fetchCoreIntegrationInterface())

  const onSave = useCallback(() => {
    if (!rfInstance) return;
    setSubmitted(true);
    const result = rfInstance.toObject();
    result.nodes?.forEach((n) => { n.data.meta = n.data.meta.id; });
    dispatch(fetchCreateFlow({ pattern: result, id: flowUniqueId ?? "", name }));
  }, [rfInstance, flowUniqueId, name]);

  useEffect(() => {
    dispatch(fetchCoreElements())
    dispatch(fetchCoreIntegrations())
  }, [])

  useEffect(() => {
    if (visibleTools) {
      setTimeout(() => {
        document.body.style.pointerEvents = "all"
      }, 1000)
    }
  }, [visibleTools])

  useEffect(() => {

    if (interfaceData && interfaceData.length > 0) {

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
            meta: interfaceData[0],
          }
        }
      ]);

      setHasInterface(true)
    }

  }, [interfaceData])


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

  const onNodesDelete = useCallback(
    (deletedNodes) => {
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            !deletedNodes.some(
              (node) => edge.source === node.id || edge.target === node.id
            )
        )
      );
      setManualDeleted(true)
    },
    []
  );

  useEffect(() => {

    if (window.location.href.includes("flow_id")) {
      if (searchParams.get("flow_id") != null) {
        setFlowUniqueId(searchParams.get("flow_id"))
        dispatch(fetchFlow(searchParams.get("flow_id")))
      }
    }

    if (!window.location.href.includes("flow_id")) {
      setName("عنوان فرآیند")
    }

  }, [searchParams])


  useEffect(() => {
    if (!flows) return;

    // Handle submitted case
    if (submitted && flows.data?.length > 0) {
      const firstFlow = flows.data[0];

      // Redirect if it's a new flow
      if (!flowUniqueId) {
        router.push({
          pathname: "/flows/create",
          search: `?flow_id=${firstFlow.unique_id}`,
        });
      }

      setCreatedFlow(firstFlow);
      toast.custom(() => (
        <CustomToast action="success" message="تغییرات با موفقیت ذخیره شد" />
      ));
      setSubmitted(false);
    }

    // Handle flowData (loaded from backend)
    if (flows.flowData?.length > 0) {
      const flow = flows.flowData[0];
      setCreatedFlow(flow);
      setName(flow.name);
    } else if (flows.flowData === null) {
      setHasInterface(false);
    }
  }, [flows, submitted, flowUniqueId, router]);



  useEffect(() => {
    if (!createdFlow?.pattern) return;

    const { nodes: patternNodes, edges, viewport } = createdFlow.pattern;
    let hasInterface = false;

    const dbNodes = patternNodes.map((item) => {
      if (item.data.meta.slug === "interface") {
        hasInterface = true;
      }
      return {
        id: item.id,
        type: "reactComponent",
        position: { x: item.position.x, y: item.position.y },
        data: {
          meta: item.data.meta,
          params: item.data.params,
        },
      };
    });

    setHasInterface(hasInterface);
    setNodes(dbNodes);
    setEdges(edges);
    setViewPort(viewport);
  }, [createdFlow]);

  return (
    <div className='flex h-[calc(100vh-64px)] flex-col md:flex-row'>
      <div className='dndflow relative flex min-h-svh min-w-svw flex-col! overflow-hidden transition-all'>
        <div className=' w-full z-60 fixed top-0 ltr'>
          <div className=' flex justify-between py-2.5 px-6 items-center'>
            <div className='flex relative px-2 py-1.5 gap-x-2 rounded-lg items-center bg-white border shadow'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button disabled={nodes && nodes.length == 0} className="bg-gradient-secondary cursor-pointer text-base hover:bg-gradient hover:text-white text-white" size="sm" variant="outline">
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
                  <Button onClick={onSave} disabled={nodes && nodes.length == 0} className="text-base bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white hover:text-white cursor-pointer" size="sm" variant="outline">
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
                  <Button disabled={nodes && nodes.length == 0} className="bg-gray-50 cursor-pointer" size="sm" variant="outline">
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
                  }} className=' absolute left-0 -bottom-20 cursor-pointer flex items-center justify-center text-white rounded-full w-14 h-14 bg-gradient'>
                    <PlusIcon />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>افزودن گره جدید</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className='flex relative w-xl px-2 py-1.5 rounded-lg items-center bg-white border shadow justify-between'>
              <div className='flex gap-x-2'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="bg-gray-50 cursor-pointer" size="sm" variant="outline">
                      <Webhook />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>ارسال نتیجه (وب‌هوک)</p>
                  </TooltipContent>
                </Tooltip>
                <Button className="bg-gray-50 text-base cursor-pointer" size="sm" variant="outline">
                  <span>خودکارسازی</span>
                  <CalendarSync />
                </Button>
                {hasInterface != undefined && !hasInterface && <Button onClick={onAddInterface} className="bg-linear-to-r from-pink-400 via-red-400 to-orange-400  text-white hover:text-white text-base cursor-pointer" size="sm" variant="outline">
                  <span>رابط کاربری</span>
                  <Sparkles />
                </Button>}
                {hasInterface != undefined && hasInterface && <Button disabled className="bg-gray-300 text-base text-gray-400" size="sm" variant="outline">
                  <span>رابط کاربری</span>
                  <Sparkles />
                </Button>}
              </div>
              <div className='flex items-center space-x-3'>
                <div className='text-base focus:border-none text-right font-bold cursor-pointer hover:bg-gray-100 border-none py-1  rounded-lg'>
                  {name ? <InlineEdit value={name} onChange={setName} className="rtl" /> : <SpinnerLoader />}
                </div>
                <Link href="/flows">
                  <img className="object-contain w-10" src="/images/fav.png" />
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
                    <div className={`bg-white h-screen border shadow  rounded-lg min-w-sm z-50`}>
                      <ScrollArea className="h-[750px] rtl">
                        <List2 setDropedNode={setDropedNode} setClicked={setClicked} loading={integrations.isLoading} items={integrations.data} />
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
                  onNodesDelete={onNodesDelete}
                  nodeTypes={nodeTypes}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  fitViewOptions={viewPort}
                  deleteKeyCode={["Delete"]}
                  fitView
                  onDrop={onDrop}
                  onDragOver={onDragOver}
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
    <DnDProvider>
      <AddNodeOnEdgeDrop />
    </DnDProvider>
  </ReactFlowProvider>
);
