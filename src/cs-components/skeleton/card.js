export default () => {
    return <div className="container">
        <div className="mb-10 flex items-center justify-between">
            <div className="flex flex-col space-y-3 my-5">
                <div className="bg-gray-200 animate-pulse rounded-md h-6 w-24" />
                <div className="bg-gray-200 animate-pulse rounded-md h-4 w-64" />
            </div>
            <div className="bg-gray-200 animate-pulse rounded-md h-9 px-4 py-2" />
        </div>
        <section className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => {
                return <div key={i} className="space-y-6 rounded-lg border border-slate-200 p-4">
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
            })}
        </section>
    </div>
}