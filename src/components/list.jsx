import { useDnD } from "@/cs-components/dnd-context";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default ({ items, loading = false, title = "", setDropedNode, setClicked }) => {

    const [depth, setDepth] = useState(0)
    const [action, setAction] = useState("inc")
    const [parent, setParent] = useState()
    const [selectedNav, setSelectedNav] = useState()
    const [listItems, setListItems] = useState()
    const [_, setType] = useDnD();

    const IntegrationItem = ({ item, onClick }) => <div onClick={ () => onClick(item)} className="rtl bg-white p-2 px-4 cursor-pointer">
        <div className="order-2 w-full flex items-center gap-2 md:order-none">
            <span style={{ background: item.colors[item.background][100] }} className={`flex p-3 shrink-0 border items-center justify-center rounded-md`}>
                <img className="w-7" src={item.icon_url} />
            </span>
            <div className="flex  justify-between items-center w-full">
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-xs line-clamp-3 text-gray-400">
                        {item.description}
                    </p>
                </div>
                {item.children && <ChevronLeft size={"16"} className="text-gray-500" />}
            </div>
        </div>
    </div>

    const onDragStart = (event, nodeType, item) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
        setDropedNode(item)
    };

    useEffect(() => {
        setListItems(items)
    }, [items])

    const handleItemClick = (item) => {
        if (item.children && item.children.length > 0) {
            setAction("inc")
            setParent(listItems)
            setListItems(item.children)
            setSelectedNav(item)
            setDepth((prevValue) => prevValue + 1)
        }
        if(!item.children){
            setClicked(item)
        }
    }

    const onBackArrow = () => {
        setAction("dec")
        setDepth((prevValue) => prevValue - 1)
    }

    useEffect(() => {
        if (action == "dec") {
            if (depth == 0) {
                setListItems(items)
            } else {
                setSelectedNav(selectedNav.parent)
                setListItems(parent)
            }
        }
    }, [depth])

    if (loading) {

        return <div className="relative">
            <div>
                <section>
                    <div className="py-2">
                        <div className="flex flex-col">
                            <div className="rtl p-2 px-4 cursor-pointer">
                                <div className="order-2 w-full flex items-center gap-2 md:order-none">
                                    <div className="flex p-2 shrink-0 items-center justify-center rounded-md bg-gray-200 w-11 h-11">
                                        <div className="w-7 h-7 animate-pulse bg-gray-200 rounded-md"></div>
                                    </div>
                                    <div className="flex  justify-between items-center w-full">
                                        <div className="flex flex-col gap-1">
                                            <div className="animate-pulse bg-gray-200 rounded-md h-4 w-24"></div>
                                            <div className="animate-pulse bg-gray-200 rounded-md h-3 w-16"></div>
                                        </div>
                                        <div className="animate-pulse bg-gray-200 rounded-full w-6 h-6"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="rtl p-2 px-4 cursor-pointer">
                                <div className="order-2 w-full flex items-center gap-2 md:order-none">
                                    <div className="flex p-2 shrink-0 items-center justify-center rounded-md bg-gray-200 w-11 h-11">
                                        <div className="w-7 h-7 animate-pulse bg-gray-200 rounded-md"></div>
                                    </div>
                                    <div className="flex  justify-between items-center w-full">
                                        <div className="flex flex-col gap-1">
                                            <div className="animate-pulse bg-gray-200 rounded-md h-4 w-24"></div>
                                            <div className="animate-pulse bg-gray-200 rounded-md h-3 w-16"></div>
                                        </div>
                                        <div className="animate-pulse bg-gray-200 rounded-full w-6 h-6"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="rtl p-2 px-4 cursor-pointer">
                                <div className="order-2 w-full flex items-center gap-2 md:order-none">
                                    <div className="flex p-2 shrink-0 items-center justify-center rounded-md bg-gray-200 w-11 h-11">
                                        <div className="w-7 h-7 animate-pulse bg-gray-200 rounded-md"></div>
                                    </div>
                                    <div className="flex  justify-between items-center w-full">
                                        <div className="flex flex-col gap-1">
                                            <div className="animate-pulse bg-gray-200 rounded-md h-4 w-24"></div>
                                            <div className="animate-pulse bg-gray-200 rounded-md h-3 w-16"></div>
                                        </div>
                                        <div className="animate-pulse bg-gray-200 rounded-full w-6 h-6"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="rtl p-2 px-4 cursor-pointer">
                                <div className="order-2 w-full flex items-center gap-2 md:order-none">
                                    <div className="flex p-2 shrink-0 items-center justify-center rounded-md bg-gray-200 w-11 h-11">
                                        <div className="w-7 h-7 animate-pulse bg-gray-200 rounded-md"></div>
                                    </div>
                                    <div className="flex  justify-between items-center w-full">
                                        <div className="flex flex-col gap-1">
                                            <div className="animate-pulse bg-gray-200 rounded-md h-4 w-24"></div>
                                            <div className="animate-pulse bg-gray-200 rounded-md h-3 w-16"></div>
                                        </div>
                                        <div className="animate-pulse bg-gray-200 rounded-full w-6 h-6"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="rtl p-2 px-4 cursor-pointer">
                                <div className="order-2 w-full flex items-center gap-2 md:order-none">
                                    <div className="flex p-2 shrink-0 items-center justify-center rounded-md bg-gray-200 w-11 h-11">
                                        <div className="w-7 h-7 animate-pulse bg-gray-200 rounded-md"></div>
                                    </div>
                                    <div className="flex  justify-between items-center w-full">
                                        <div className="flex flex-col gap-1">
                                            <div className="animate-pulse bg-gray-200 rounded-md h-4 w-24"></div>
                                            <div className="animate-pulse bg-gray-200 rounded-md h-3 w-16"></div>
                                        </div>
                                        <div className="animate-pulse bg-gray-200 rounded-full w-6 h-6"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="rtl p-2 px-4 cursor-pointer">
                                <div className="order-2 w-full flex items-center gap-2 md:order-none">
                                    <div className="flex p-2 shrink-0 items-center justify-center rounded-md bg-gray-200 w-11 h-11">
                                        <div className="w-7 h-7 animate-pulse bg-gray-200 rounded-md"></div>
                                    </div>
                                    <div className="flex  justify-between items-center w-full">
                                        <div className="flex flex-col gap-1">
                                            <div className="animate-pulse bg-gray-200 rounded-md h-4 w-24"></div>
                                            <div className="animate-pulse bg-gray-200 rounded-md h-3 w-16"></div>
                                        </div>
                                        <div className="animate-pulse bg-gray-200 rounded-full w-6 h-6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    }

    return (
        <section>
            {listItems && listItems.length > 0 && <div className="py-2">

                {depth > 0 && <div className="flex items-center gap-x-2 p-2 px-4 pb-5 font-bold">
                    <ArrowRight onClick={onBackArrow} className=" cursor-pointer text-gray-500" />
                    <span style={{ background: selectedNav.colors[selectedNav.background][100] }} className={`flex p-2 shrink-0 items-center justify-center rounded-md`}>
                        <img className="w-6" src={selectedNav.icon_url} />
                    </span>
                    <span className='text-right text-sm'>{selectedNav ? selectedNav.name : title}</span>
                </div>}

                <div className="flex flex-col">

                    {listItems.map((item, index) => {
                        if (item.type == "core" && item.slug != "interface") {
                            if (item.slug == null) {
                                return <div  key={index} >
                                    <IntegrationItem  onClick={handleItemClick} item={item} />
                                </div>
                            } else {
                                return <div onDragStart={(event) => onDragStart(event, 'input', item)} draggable key={index} >
                                    <IntegrationItem  onClick={handleItemClick} item={item} />
                                </div>
                            }
                        }
                    })}

                    {depth == 0 && <span className="block p-4 text-gray-500">ابزارها</span>}

                    {listItems.map((item, index) => {
                        if (item.type == "tools") {
                            if (item.slug == null) {
                                return <div key={index} >
                                    <IntegrationItem onClick={handleItemClick} item={item} />
                                </div>
                            } else {
                                return <div onDragStart={(event) => onDragStart(event, 'input', item)} draggable key={index} >
                                    <IntegrationItem onClick={handleItemClick} item={item} />
                                </div>
                            }
                        }
                    })}

                </div>
            </div>}
        </section>
    );
};
