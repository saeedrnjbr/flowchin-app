"use client";

import { fetchWorkspaceDelete, fetchWorkspaces } from "@/pages/api";
import { Edit, Folder, History, Trash, Workflow } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

const Services = ({ services, setOpen, formik }) => {

  const dispatch = useDispatch()
  const workspaces = useSelector(state => state.workspaces)
  const [deleteSubmitted, setDeleteSubmitted] = useState(false)

  const handleDelete = (id) => {
    setDeleteSubmitted(true)
    dispatch(fetchWorkspaceDelete({ id }))
  }

  if (workspaces.workspaceDeleteData.length > 0 && deleteSubmitted) {
    dispatch(fetchWorkspaces())
    setDeleteSubmitted(false)
  }

  return (
    <section>
      <div className="mt-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div key={index}  className="  space-y-6 rounded-lg border border-slate-200 p-4 transition-shad{children}ow hover:shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`text-indigo-400 bg-indigo-100 rounded-full p-3`}>
                    <Folder size={24} />
                  </div>
                  <h3 className="text-base text-gray-700 font-semibold">{service.name}</h3>
                </div>
                <div className="flex items-center gap-x-2">
                  <Edit onClick={() => {
                    setOpen(true)
                    formik.setFieldValue("name", service.name)
                    formik.setFieldValue("description", service.description)
                    formik.setFieldValue("id", service.id)
                  }} size="20" className=" cursor-pointer text-black" />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Trash className=" cursor-pointer text-red-400" size="20" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle></AlertDialogTitle>
                        <AlertDialogDescription className="text-right text-black font-bold">
                          آیا از حذف آیتم مطمئن هستید؟
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>انصراف</AlertDialogCancel>
                        <AlertDialogAction className="bg-indigo-500" onClick={() => handleDelete(service.id)}>بله</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <div className="flex items-center text-gray-400 text-sm  justify-between">
                <p className=" text-justify rtl">
                  {service.description ?? "بدون توضیح"}
                </p>
                <div className="inline-flex gap-x-4">
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="inline-flex text-indigo-500 gap-x-1"> <Workflow size="16" />{service.flows.length}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>تعداد فرآیندها</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="inline-flex text-teal-500 gap-x-1 "> <History size="16" />0</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>تاریخچه اجرا</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services
