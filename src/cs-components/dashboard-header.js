export default ({ title = "", description = "", children }) => {
    return <div className="mb-5">
        <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-3 my-5">
                <span className="text-2xl font-bold">{title}</span>
                {description && <p className=" text-stone-400 text-base text-justify rtl">{description}</p>}
            </div>
            {children}
        </div>
    </div>
}