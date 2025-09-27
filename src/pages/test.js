import React, { useEffect, useMemo, useState } from "react"
import Uppy from "@uppy/core"
import XHRUpload from "@uppy/xhr-upload"
import { useUppyEvent } from "@uppy/react"

import '@uppy/core/css/style.min.css';

export default function CustomUploader() {
  const [files, setFiles] = useState([])

  const uppy = useMemo(() => {
    return new Uppy({
      id: "customUppy",
      autoProceed: false,
      restrictions: {
        maxNumberOfFiles: 5,
      },
    }).use(XHRUpload, {
      id: "xhrUpload",
      endpoint: "http://localhost:4000/upload", // backend endpoint
      fieldName: "file",
    })
  }, [])

  // Listen for file add/remove events
  useUppyEvent(uppy, "file-added", (file) => {
    setFiles((prev) => [...prev, file])
  })

  useUppyEvent(uppy, "file-removed", (file) => {
    setFiles((prev) => prev.filter((f) => f.id !== file.id))
  })

  // Clean up
  useEffect(() => {
    return () => uppy.close()
  }, [uppy])

  return (
    <div className="p-4 border rounded-lg shadow-sm max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-3">Custom Uppy Uploader</h2>

      {/* File Input */}
      <input
        type="file"
        multiple
        onChange={(e) => {
          Array.from(e.target.files).forEach((file) => uppy.addFile({
            name: file.name,
            type: file.type,
            data: file,
          }))
        }}
        className="mb-3"
      />

      {/* File List */}
      <ul className="space-y-2 mb-3">
        {files.map((file) => (
          <li key={file.id} className="flex justify-between items-center text-sm">
            <span>{file.name}</span>
            <button
              onClick={() => uppy.removeFile(file.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Upload Button */}
      <button
        onClick={() => uppy.upload()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  )
}
