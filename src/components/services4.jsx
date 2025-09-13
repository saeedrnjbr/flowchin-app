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
            <div
              key={index}
              className="  space-y-6 rounded-lg border border-slate-200 p-4 transition-shad{children}ow hover:shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={` bg-gradient text-white rounded-full p-3`}>
                     <Folder size={16} />
                  </div>
                  <h3 className="text-base font-semibold">{service.name}</h3>
                </div>
                <div className="flex items-center gap-x-2">
                  <Edit onClick={() => {
                    setOpen(true)
                    formik.setFieldValue("name", service.name)
                    formik.setFieldValue("description", service.description)
                    formik.setFieldValue("id", service.id)
                  }} size="16" className=" cursor-pointer text-stone-400" />
                  <Trash onClick={() => handleDelete(service.id)} className=" cursor-pointer text-stone-400" size="16" />
                </div>
              </div>
              <div className="flex items-center text-stone-400 text-sm  justify-between">
                <p className=" text-justify rtl">
                  {service.description ?? "بدون توضیح"}
                </p>
                <div className="inline-flex gap-x-4">
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="inline-flex gap-x-1 text-purple-500"> <Workflow size="16" />0</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>تعداد فرآیندها</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="inline-flex gap-x-1 text-green-500"> <History size="16" />0</span>
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
