import DashboardLayout from "@/cs-components/dashboard-layout"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL, fetchDeleteFlow, fetchDuplicateFlow, fetchFlows, fetchUpdateFlow, fetchUpdateFlowWorkspace, fetchWorkspaces } from "../api"
import { ChartArea, CopyCheck, Edit, Folder, FolderPlus, MoreHorizontal, MoreVertical, Package, PackageCheck, Plus, Trash, WorkflowIcon } from "lucide-react"
import DashboardHeader from "@/cs-components/dashboard-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { NumericFormat } from 'react-number-format';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { useFormik } from "formik"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import CustomToast from "@/cs-components/custom-toast"

import { ScrollArea } from "@/components/ui/scroll-area"
import UppyUploader from "@/cs-components/uppy-uploader"


export default function () {

  const dispatch = useDispatch()
  const flows = useSelector(state => state.flows)
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [updateFlowOpen, setUpdateFlowOpen] = useState(false)
  const [updateStoreFlowOpen, setUpdateStoreFlowOpen] = useState(false)
  const [selectedFlow, setSelectedFlow] = useState()
  const [flowCover, setFlowCover] = useState()
  const workspaces = useSelector(state => state.workspaces)

  const updateFlowWorkspace = useCallback((workspace) => {
    if (!selectedFlow) return
    setSubmitted(true)
    dispatch(fetchUpdateFlowWorkspace({
      workspace_id: workspace.id,
      id: selectedFlow.unique_id
    }))
  }, [selectedFlow])

  useEffect(() => {
    if (selectedFlow) {
      Object.entries(selectedFlow).forEach(([key, val]) => {
        if (formik.values.hasOwnProperty(key)) formik.setFieldValue(key, val)
      })
    }
  }, [selectedFlow])


  const formik = useFormik({
    initialValues: {
      has_marketplace: false,
      price: 0,
      discount: 0,
      content: "",
      description: "",
      icon: "",
    },
    onSubmit: (values) => {
      setSubmitted(true)
      dispatch(fetchUpdateFlow({
        ...values,
        id: selectedFlow.unique_id ?? ""
      }))
    }
  })

  useEffect(() => {
    dispatch(fetchFlows())
    dispatch(fetchWorkspaces())
  }, [])


  const handleDeleteFlow = useCallback((id) => {
    setSubmitted(true)
    dispatch(fetchDeleteFlow({ id }))
  }, [dispatch])

  const handleDuplicateFlow = useCallback((id) => {
    setSubmitted(true)
    dispatch(fetchDuplicateFlow({ id }))
  }, [dispatch])

  const handleLogoUpload = useCallback((file) => {
    formik.setFieldValue("icon", file.file)
    setFlowCover(file)
  }, [formik])

  useEffect(() => {

    if (!submitted) return

    if (flows.flowUpdateError) {
      toast.custom(() => <CustomToast action="error" message={flows.message} />)
      setSubmitted(false)
      return
    }

    if (
      flows.flowDeleteData.length > 0 ||
      flows.flowDuplicateData.length > 0 ||
      flows.flowUpdateData.length > 0 ||
      flows.flowUpdateWorkspaceData.length > 0
    ) {
      toast.custom(() => <CustomToast action="success" message="عملیات با موفقیت انجام شد" />)
      dispatch(fetchFlows())
      dispatch(fetchWorkspaces())
      setSubmitted(false)
      setUpdateFlowOpen(false)
      setUpdateStoreFlowOpen(false)
    }
  }, [submitted, flows])

  const hasFlows = useMemo(() => flows.flowsData?.length > 0, [flows.flowsData])

  if (flows.flowsIsLoading) {
    return <DashboardLayout>

      <div className="px-8">
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-3 my-5">
              <div className="bg-gray-200 animate-pulse rounded-md h-6 w-24"></div>
              <div className="bg-gray-200 animate-pulse rounded-md h-4 w-48"></div>
            </div>
            <div className="flex gap-x-2">
              <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all shrink-0 h-9 px-4 py-2 bg-gray-200 animate-pulse rounded-md">
                <div className="w-4 h-4"></div>
                <div className="w-20 h-4"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full overflow-x-auto">
          <table className="w-full caption-bottom text-sm border">
            <thead className="[&_tr]:border-b">
              <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                <th className="h-10 px-2 align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-16 mx-auto"></div>
                </th>
                <th className="h-10 px-2 align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-12 mx-auto"></div>
                </th>
                <th className="h-10 px-2 align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-24 mx-auto"></div>
                </th>
                <th className="h-10 px-2 align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-8 mx-auto"></div>
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-24 mx-auto"></div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                  </div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-24 mx-auto"></div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-8 mx-auto"></div>
                </td>
              </tr>
              <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-24 mx-auto"></div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                  </div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-24 mx-auto"></div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-8 mx-auto"></div>
                </td>
              </tr>
              <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-24 mx-auto"></div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                  </div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-24 mx-auto"></div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-8 mx-auto"></div>
                </td>
              </tr>
              <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-24 mx-auto"></div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                  </div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-24 mx-auto"></div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-8 mx-auto"></div>
                </td>
              </tr>
              <tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-24 mx-auto"></div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
                  </div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-24 mx-auto"></div>
                </td>
                <td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-center">
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-8 mx-auto"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  }

  return <DashboardLayout>

    <DashboardHeader title="فرآیند‌ها" description=" با اشتراک‌گذاری و فروش فرآیندهای خود درآمد کسب‌ کنید">
      <div className="flex gap-x-2">
        <Button className="bg-gradient-secondary text-white  text-lg hover:text-white" size="lg" asChild variant="outline">
          <Link href="/flows/create">
            <Plus />
            <span>تعریف فرآیند</span>
          </Link>
        </Button>
      </div>
    </DashboardHeader>

    {hasFlows && <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="text-right text-gray-500 text-base">عنوان</TableHead>
          <TableHead className="text-center  text-gray-500 text-base">گر‌ه‌ها</TableHead>
          <TableHead className="text-center  text-gray-500 text-base">تاریخ بروزرسانی</TableHead>
          <TableHead className="text-center  text-gray-500 text-base"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flows.flowsData.map((flow, f) => {
          return <TableRow key={f}>
            <TableCell className="flex space-y-2 flex-col">
              <div className="flex gap-x-2">
                <Link className="font-bold text-base text-gray-700" href={`/flows/create/?flow_id=${flow.unique_id}`}>
                  {flow.name}
                </Link>
                {flow.workspace ? <div className="bg-indigo-100 rounded-2xl px-2 gap-x-1 text-indigo-500 flex items-center">
                  <Folder size={14} />
                  <span className="">{flow.workspace.name}</span>
                </div> : ""}
              </div>
              <p className=" text-sm text-gray-400">{flow.content ?? "توضیحات تکمیلی مورد نیاز جهت فروش در بازارچه"}</p>
            </TableCell>
            <TableCell className="text-center">
              <div className="flex items-center  gap-x-1 justify-center">
                {flow.nodes.map((node, n) => {
                  return <Tooltip key={n}>
                    <TooltipTrigger asChild>
                      <div className="p-2 border" style={{ background: node.integration.colors[node.integration.background][100] }}>
                        <img className="w-5" src={node.integration.icon_url} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>{node.integration.name}</p>
                    </TooltipContent>
                  </Tooltip>
                })}
              </div>
            </TableCell>
            <TableCell className="text-center">{flow.updated_at_fa}</TableCell>
            <TableCell className="text-center text-gray-700">
              <div className="flex gap-x-2 items-center">
                <AlertDialog>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertDialogTrigger asChild>
                        <Trash className="cursor-pointer text-red-400" size={20} />
                      </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>حذف</p>
                    </TooltipContent>
                  </Tooltip>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle></AlertDialogTitle>
                      <AlertDialogDescription className="text-right text-black font-bold">
                        آیا از حذف آیتم مطمن هستید؟
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>انصراف</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteFlow(flow.unique_id)} className="bg-indigo-500">بله</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Dialog onOpenChange={setUpdateFlowOpen} open={updateFlowOpen}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <FolderPlus onClick={() => {
                          setSelectedFlow(flow)
                          setUpdateFlowOpen(true)
                        }} className="cursor-pointer" />
                      </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>انتقال به پوشه</p>
                    </TooltipContent>
                  </Tooltip>
                  <DialogContent className="sm:max-w-[725px]">
                    <DialogHeader>
                      <DialogTitle className="text-right px-6">انتقال فرآیند به پوشه</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    {workspaces.workspacesData && workspaces.workspacesData.length > 0 && <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
                      {workspaces.workspacesData.map((workspace, wk) => {
                        return <div onClick={() => updateFlowWorkspace(workspace)} key={wk} className="space-y-6 cursor-pointer rounded-lg border border-slate-200 px-4 py-2 transition-shad{children}ow hover:shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`text-indigo-500 bg-indigo-100 rounded-full p-3`}>
                                <Folder size={24} />
                              </div>
                              <div className="flex flex-col space-y-2">
                                <h3 className="text-base font-semibold">{workspace.name}</h3>
                                <span className=" text-gray-400 text-xs">{workspace.flows.length} فرآیند</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      })}
                    </div>}
                  </DialogContent>
                </Dialog>

                <Dialog onOpenChange={setUpdateStoreFlowOpen} open={updateStoreFlowOpen}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <div className="relative">
                          {flow.has_marketplace == 1 && <PackageCheck className={flow.has_marketplace == 1 ? "text-teal-500 cursor-pointer" : "cursor-pointer"} onClick={() => {
                            setSelectedFlow(flow)
                            setUpdateStoreFlowOpen(true)
                          }} />}

                          {flow.has_marketplace == 0 && <Package className="cursor-pointer" onClick={() => {
                            setSelectedFlow(flow)
                            setUpdateStoreFlowOpen(true)
                          }} />}
                        </div>
                      </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>فروش فرآیند در بازارچه</p>
                    </TooltipContent>
                  </Tooltip>
                  <DialogContent className="sm:max-w-[725px]">
                    <ScrollArea className="h-[800px] rtl">
                      <DialogHeader>
                        <DialogTitle className="text-right px-6 pb-5">فروش فرآیند در بازارچه</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
                        <div className="grid gap-6">
                          <div className='flex bg-linear-to-r from-pink-400 via-red-400 to-orange-400 py-5 px-4 text-white rounded-lg  items-center ltr justify-between my-2 gap-x-1.5'>
                            <Switch checked={formik.values.has_marketplace} id="has_marketplace" className="data-[state=checked]:bg-black" onCheckedChange={(value) => formik.setFieldValue("has_marketplace", value)} />
                            <Label className=" text-base" htmlFor="has_marketplace">فرآیند در بازارچه فعال باشد</Label>
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="content">توضیح معرفی</Label>
                            <Input defaultValue={formik.values.content} onChange={formik.handleChange} id="content" />
                          </div>

                          <div className="grid gap-3">
                            <Label htmlFor="price">قیمت (ریال)</Label>
                            <NumericFormat thousandSeparator onValueChange={(value) => formik.setFieldValue("price", value.floatValue)} defaultValue={formik.values.price} customInput={Input} />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="price">درصد تخفیف</Label>
                            <Input defaultValue={formik.values.discount} onChange={formik.handleChange} id="discount" />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="description">توضیحات</Label>
                            <Textarea className="min-h-32" defaultValue={formik.values.description} onChange={formik.handleChange} id="description" />
                          </div>
                          <UppyUploader onUploaded={handleLogoUpload} id="dropzone-logo">
                            <div style={{ background: `url(${flowCover?.file_url})` }} className="text-xs uppy-centerize bg-cover bg-center bg-no-repeat flex border-2 border-indigo-500 border-dashed  h-32 w-32  cursor-pointer items-center justify-center rounded-lg">
                              <span className="text-base text-center">آپلود لوگو</span>
                            </div>
                          </UppyUploader>
                        </div>
                        <DialogFooter>
                          <Button className="mt-5 bg-indigo-500 cursor-pointer" type="submit">ذخیره</Button>
                        </DialogFooter>
                      </form>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>

                {flow.has_marketplace == 1 && <Tooltip>
                  <TooltipTrigger asChild>
                    <ChartArea className=" text-indigo-500 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>گزارش فروش</p>
                  </TooltipContent>
                </Tooltip>}

                <DropdownMenu className="text-gray-700">
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal className=" cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44">
                    <DropdownMenuRadioGroup className="rtl">
                      <DropdownMenuRadioItem value="edit" onClick={() => router.push(`/flows/create/?flow_id=${flow.unique_id}`)}>
                        <Edit />
                        <span>ویرایش</span>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem onClick={() => handleDuplicateFlow(flow.unique_id)} value="copy">
                        <CopyCheck />
                        <span>کپی</span>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>
            </TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>
    }

    {flows.flowsData && flows.flowsData.length == 0 && <div className=" text-gray-200 flex items-center space-y-2 justify-center flex-col text-base border-slate-200 py-5 rounded-lg">
        <WorkflowIcon size={50} />
        <span className="text-gray-400  text-lg">فرآیندی تعریف نشده است</span>
      </div>
    }

  </DashboardLayout >
}
