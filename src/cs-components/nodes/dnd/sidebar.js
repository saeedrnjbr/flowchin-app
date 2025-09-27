import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { Plus } from "lucide-react";

function DraggableSidebarField(props) {

  const { field } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  });

  const style = {
    zIndex: 100000000000,
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <div  className="p-2 bg-white cursor-pointer hover:shadow-sm flex justify-between items-center border rounded-lg">
        <div className="flex items-center gap-x-3">
          <div className=" bg-indigo-100 p-2 rounded-xl">
            <img className="w-5" src={field.icon_url} />
          </div>
          <span className="font-bold text-sm">{field.name}</span>
        </div>
        <Plus size={16} className=" text-gray-400" />
      </div>
    </div>
  );
}

export default function Sidebar(props) {
  const { fieldsRegKey, elements } = props;
  return (
    <div key={fieldsRegKey} className="fle flex-col space-y-3">
      {elements && elements.data.map((f) => (
        <DraggableSidebarField key={f.id} field={f} />
      ))}
    </div>
  );
}
