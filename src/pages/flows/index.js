import DashboardLayout from "@/cs-components/dashboard-layout"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFlows } from "../api"
import { Plus, WorkflowIcon } from "lucide-react"
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"

export default function Dashboard() {

  const dispatch = useDispatch()
  const flows = useSelector(state => state.flows)
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchFlows())
  }, [])


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

    <DashboardHeader title="فرآیند‌ها" description="فرآیندهای خود را مدیریت کنید">
      <div className="flex gap-x-2">
        <Button asChild variant="outline">
          <Link href="/flows/create">
            <Plus />
            <span>تعریف فرآیند</span>
          </Link>
        </Button>
      </div>
    </DashboardHeader>

    {flows.flowsData && flows.flowsData.length > 0 && <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="text-right text-stone-500 text-base">عنوان</TableHead>
          <TableHead className="text-center  text-stone-500 text-base">گر‌ه‌ها</TableHead>
          <TableHead className="text-center  text-stone-500 text-base">تاریخ بروزرسانی</TableHead>
          <TableHead className="text-center  text-stone-500 text-base"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flows.flowsData.map((flow, f) => {
          return <TableRow key={f}>
            <TableCell className="flex space-y-2 flex-col">
              <Link className="font-bold text-base" href={`/flows/create/?flow_id=${flow.unique_id}`}>
                {flow.name}
              </Link>
              <p className=" text-sm text-stone-400">توضیحات مرتبط با فرآیند</p>
            </TableCell>
            <TableCell className="text-center">
              <div className="flex items-center  gap-x-1 justify-center">
                {flow.nodes.map((node) => {
                  return <div className="p-2 border" style={{ background: node.integration.colors[node.integration.background][100] }}>
                    <img className="w-4" src={node.integration.icon_url} />
                  </div>
                })}
              </div>
            </TableCell>
            <TableCell className="text-center">{flow.updated_at_fa}</TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <svg className="w-10 cursor-pointer h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="more"> <g id="more_2"> <path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd" d="M12 28C14.2089 28 16 26.2097 16 24C16 21.7903 14.2089 20 12 20C9.79113 20 8 21.7903 8 24C8 26.2097 9.79113 28 12 28ZM24 28C26.2089 28 28 26.2097 28 24C28 21.7903 26.2089 20 24 20C21.7911 20 20 21.7903 20 24C20 26.2097 21.7911 28 24 28ZM24 22C25.1045 22 26 22.8951 26 24C26 25.1049 25.1045 26 24 26C22.8955 26 22 25.1049 22 24C22 22.8951 22.8955 22 24 22ZM14 24C14 22.8951 13.1045 22 12 22C10.8955 22 10 22.8951 10 24C10 25.1049 10.8955 26 12 26C13.1045 26 14 25.1049 14 24ZM38 24C38 22.8951 37.1045 22 36 22C34.8955 22 34 22.8951 34 24C34 25.1049 34.8955 26 36 26C37.1045 26 38 25.1049 38 24ZM36 28C38.2089 28 40 26.2097 40 24C40 21.7903 38.2089 20 36 20C33.7911 20 32 21.7903 32 24C32 26.2097 33.7911 28 36 28Z" fill="#000000"></path> </g> </g> </g></svg>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44">
                  <DropdownMenuRadioGroup className="rtl">
                    <DropdownMenuRadioItem value="edit" onClick={() => router.push(`/flows/create/?flow_id=${flow.unique_id}`)}>ویرایش</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem>قیمت‌گذاری و فروش</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem>کپی</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem>انتقال به پوشه</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem>حذف</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>}

    {flows.flowsData && flows.flowsData.length == 0 && <div className=" text-stone-400 flex items-center space-y-2 justify-center flex-col text-base border-slate-200 py-5 rounded-lg">
      <WorkflowIcon size={50} />
      <span>فرآیندی تعریف نشده است</span>
    </div>}

  </DashboardLayout>
}
