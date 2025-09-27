import React, { useMemo, useState } from "react"
import Uppy from "@uppy/core"
import XHRUpload from "@uppy/xhr-upload"

import '@uppy/core/css/style.min.css';
import { BASE_URL } from "@/pages/api";

export default function UppyUploader({ id, children, onUploaded }) {

    const uppy = useMemo(() => {
        return new Uppy({
            id: "customUppy",
            autoProceed: true,
        }).use(XHRUpload, {
            id: "xhrUpload",
            endpoint: `${BASE_URL}/uploads`, // backend endpoint
            fieldName: "file",
            async onAfterResponse(xhr) {
                if (xhr.status === 200) {
                    let afterResponse = JSON.parse(xhr.response)
                    if (afterResponse.data && afterResponse.data.length > 0) {
                        onUploaded(afterResponse.data[0])
                    }

                }
            },
        })
    }, [])

    return (
        <div>
            <label for={id}>
                {children}
            </label>
            <input onChange={(e) => {
                Array.from(e.target.files).forEach((file) => uppy.addFile({
                    name: file.name,
                    type: file.type,
                    data: file,
                }))
            }} id={id} type="file" class="hidden" />
        </div>
    )
}
