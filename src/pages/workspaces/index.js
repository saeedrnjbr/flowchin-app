import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { FolderClosed, FolderPlus } from "lucide-react"
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import DashboardLayout from "@/cs-components/dashboard-layout"
import DashboardHeader from "@/cs-components/dashboard-header"
import CustomToast from "@/cs-components/custom-toast"
import Services from "@/components/services4"
import { fetchCreateWorkspace, fetchWorkspaces } from "../api"

function SkeletonCard() {
  return (
    <div className="space-y-6 rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 animate-pulse rounded-full p-3" />
          <div className="bg-gray-200 animate-pulse rounded-md h-6 w-24" />
        </div>
        <div className="flex items-center gap-x-2">
          <div className="bg-gray-200 animate-pulse rounded-md h-4 w-4" />
          <div className="bg-gray-200 animate-pulse rounded-md h-4 w-4" />
        </div>
      </div>
      <div className="bg-gray-200 animate-pulse rounded-md h-4 w-48" />
    </div>
  )
}

function WorkspaceDialog({ open, setOpen, formik }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-gradient-secondary cursor-pointer text-lg text-white hover:text-white">
          <FolderPlus /> پوشه جدید
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-right">
        <DialogHeader>
          <DialogTitle className="text-center">تعریف پوشه</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">عنوان</Label>
              <Input
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">توضیحات</Label>
              <Input
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="mt-5 bg-indigo-500 cursor-pointer" type="submit">
              ذخیره
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function Dashboard() {
  const dispatch = useDispatch()
  const workspaces = useSelector(state => state.workspaces)

  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false)

  const formik = useFormik({
    initialValues: { id: "", name: "", description: "" },
    onSubmit: (values) => {
      setSubmitted(true)
      dispatch(fetchCreateWorkspace(values))
    },
  })

  useEffect(() => {
    dispatch(fetchWorkspaces())
  }, [dispatch])

  // reset form when modal closes
  useEffect(() => {
    if (!open) {
      formik.resetForm()
    }
  }, [open])


  if (workspaces.data?.length > 0 && submitted) {
    toast.custom(() => <CustomToast action="success" message="عملیات با موفقیت انجام شد" />)
    setOpen(false)
    dispatch(fetchWorkspaces())
    setSubmitted(false)
  }

  if (workspaces.error && submitted) {
    toast.custom(() => <CustomToast action="error" message={workspaces.message} />)
    setSubmitted(false)
  }

  if (workspaces.workspacesIsLoading) {
    return (
      <DashboardLayout>
        <div className="container">
          <div className="mb-10 flex items-center justify-between">
            <div className="flex flex-col space-y-3 my-5">
              <div className="bg-gray-200 animate-pulse rounded-md h-6 w-24" />
              <div className="bg-gray-200 animate-pulse rounded-md h-4 w-64" />
            </div>
            <div className="bg-gray-200 animate-pulse rounded-md h-9 px-4 py-2" />
          </div>
          <section className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </section>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="پوشه‌ها" description="با پوشه‌بندی، مدیریت فرآیندهای خود را آسان کنید">
        <WorkspaceDialog open={open} setOpen={setOpen} formik={formik} />
      </DashboardHeader>

      {workspaces.workspacesData?.length > 0 && (
        <Services formik={formik} setOpen={setOpen} services={workspaces.workspacesData} />
      )}

      {workspaces.workspacesData?.length === 0 && (
        <div className="text-gray-200 flex flex-col items-center justify-center space-y-2 py-5 rounded-lg border-slate-200">
          <FolderClosed size={50} />
          <span className="text-gray-400 text-lg">پوشه‌ای تعریف نشده است</span>
        </div>
      )}
      
    </DashboardLayout>
  )
}
