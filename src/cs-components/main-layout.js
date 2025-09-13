export default ({ children, background="bg-white" }) => {
    return <div className={`relative  rtl ${background} min-h-screen py-16 px-2 max-w-[450px] mx-auto`}>
        {children}
    </div>
}