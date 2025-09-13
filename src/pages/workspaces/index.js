import Services from "@/components/services4"
import DashboardLayout from "@/cs-components/dashboard-layout"
import { FolderClosed, FolderPlus, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { fetchCreateWorkspace, fetchWorkspaces } from "../api"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Link from "next/link"
import CustomToast from "@/cs-components/custom-toast"
import DashboardHeader from "@/cs-components/dashboard-header"

export default function Dashboard() {

  const dispatch = useDispatch()
  const workspaces = useSelector(state => state.workspaces)
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchWorkspaces())
  }, [])

  useEffect(() => {
    if (!open) {
      formik.setFieldValue("name", "")
      formik.setFieldValue("description", "")
      formik.setFieldValue("id", "")
    }
  }, [open])

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: ""
    },
    onSubmit: (values) => {
      setSubmitted(true)
      dispatch(fetchCreateWorkspace(values))
    }
  })

  if (submitted && workspaces.data.length > 0) {
    setSubmitted(false)
    setOpen(false)
    dispatch(fetchWorkspaces())
  }


  if (submitted && workspaces.error) {
    toast.custom((t) => <CustomToast action="error" message={workspaces.message} />)
    setSubmitted(false)
  }

  if (workspaces.workspacesIsLoading) {
    return (
      <DashboardLayout>
        <div className="container">
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-3 my-5">
                <div className="bg-gray-200 animate-pulse rounded-md h-6 w-24"></div>
                <div className="bg-gray-200 animate-pulse rounded-md h-4 w-64"></div>
              </div>
              <div className="bg-gray-200 animate-pulse rounded-md h-9 px-4 py-2"></div>
            </div>
          </div>
          <section>
            <div className="mt-5">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="space-y-6 rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 animate-pulse rounded-full p-3"></div>
                      <div className="bg-gray-200 animate-pulse rounded-md h-6 w-24"></div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <div className="bg-gray-200 animate-pulse rounded-md h-4 w-4"></div>
                      <div className="bg-gray-200 animate-pulse rounded-md h-4 w-4"></div>
                    </div>
                  </div>
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-48"></div>
                </div>
                <div className="space-y-6 rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 animate-pulse rounded-full p-3"></div>
                      <div className="bg-gray-200 animate-pulse rounded-md h-6 w-24"></div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <div className="bg-gray-200 animate-pulse rounded-md h-4 w-4"></div>
                      <div className="bg-gray-200 animate-pulse rounded-md h-4 w-4"></div>
                    </div>
                  </div>
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-48"></div>
                </div>
                <div className="space-y-6 rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 animate-pulse rounded-full p-3"></div>
                      <div className="bg-gray-200 animate-pulse rounded-md h-6 w-24"></div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <div className="bg-gray-200 animate-pulse rounded-md h-4 w-4"></div>
                      <div className="bg-gray-200 animate-pulse rounded-md h-4 w-4"></div>
                    </div>
                  </div>
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-48"></div>
                </div>
                <div className="space-y-6 rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 animate-pulse rounded-full p-3"></div>
                      <div className="bg-gray-200 animate-pulse rounded-md h-6 w-24"></div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <div className="bg-gray-200 animate-pulse rounded-md h-4 w-4"></div>
                      <div className="bg-gray-200 animate-pulse rounded-md h-4 w-4"></div>
                    </div>
                  </div>
                  <div className="bg-gray-200 animate-pulse rounded-md h-4 w-48"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DashboardLayout>
    )
  }

  return <DashboardLayout>

    <DashboardHeader title="پوشه‌ها" description="با پوشه‌بندی فرآیندهای خود را آسانتر مدیریت کنید">
      <div className="flex gap-x-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <FolderPlus /> پوشه جدید
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]  text-right">
            <DialogHeader>
              <DialogTitle className={"text-center"}>تعریف پوشه</DialogTitle>
            </DialogHeader>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name">عنوان</Label>
                  <Input defaultValue={formik.values.name} onChange={formik.handleChange} id="name" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">توضیحات</Label>
                  <Input defaultValue={formik.values.description} onChange={formik.handleChange} id="description" />
                </div>
              </div>
              <DialogFooter >
                <Button className="mt-5" type="submit">ذخیره</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardHeader>

    {workspaces.workspacesData && workspaces.workspacesData.length > 0 && <Services formik={formik} setOpen={setOpen} services={workspaces.workspacesData} />}

    {workspaces.workspacesData && workspaces.workspacesData.length == 0 && <div className=" text-stone-400 flex items-center space-y-2 justify-center flex-col text-base border-slate-200 py-5 rounded-lg">
      <FolderClosed size={50} />
      <span>پوشه‌ای تعریف نشده است</span>
    </div>}

  </DashboardLayout>
}
