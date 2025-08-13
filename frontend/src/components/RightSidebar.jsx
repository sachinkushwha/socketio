export const RightSidebar = ({ selecteduser, setselecteduser }) => {
    const imagedummydata = [
        { url: 'new image' }, { url: 'new image' }
    ]
    return selecteduser && (
        <div className={`bg-[#818582]/10 text-white w-full relative overflow-y-scroll ${selecteduser ? 'max-md:hidden' : ''}`}>
            <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
                <img src="" alt="profpic" className="w-20 aspect-[1/]1] rounded-full" />
                <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2"><p className="w-2 h-2 rounded-full bg-green-500"></p>
                    sachin</h1>
                <p className="px-10 mx-auto">sachinbio</p>
            </div>
            <hr className="border-[#ffffff50] my-4" />
            <div className="px-5 text-xs">
                <p>media</p>
                <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
                    {imagedummydata.map((urls, index) => (
                        <div key={index} onClick={() => window.open(urls.url)} className="cursor-pointer rounded">
                            <img src={urls.url} alt="url" />
                        </div>
                    ))}
                </div>
            </div>
            <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer">logout

            </button>
        </div>
    )
}