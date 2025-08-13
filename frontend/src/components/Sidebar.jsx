import { useNavigate } from "react-router-dom"

export const Sidebar = ({ selecteduser, setselecteduser }) => {
    const user = [
        { username: 'sachin' },
        { username: 'sachin' },
        { username: 'sachin' },
        { username: 'sachin' },
    ]
    const navigate = useNavigate();
    return (
        <div className={`bg-[#818582]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selecteduser ? "max-md:hidden" : ''}`}>
            <div className="pb-5">
                <div className="flex justify-between items-center">
                    <img src="" alt="logo" className="max-w-40" />
                    <div className="relative py-2 group">
                        <img src="" alt="..." className="max-h-5 cursor-pointer" />
                        <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
                            <p onClick={() => navigate('/profile')} className="cursor-pointer text-sm">Edit Profile</p>
                            <hr className="my-2 border-t border-gray-500" />
                            <p className="cursor-pointer text-sm">logout</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#f282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
                    <img src="" alt="search" className="w-3" />
                    <input type="text" name="" id="" className="bg-transparent border-non outline-none text-white text-xs placeholder-[#c8c8c8] flex-1" placeholder="search user..." />
                </div>
            </div>
            <div className="flex flex-col">
                {user.map((user, index) => (
                    <div onClick={() => setselecteduser(user)} key={index} className={`relative flex items-center gap-2 p-2`}>
                        <img src="" alt="user1" className="w-[35px] aspect-[1/1] rounded-fill" />
                        <div className="cursor-pointer flex flex-col leading-5">
                            <p>{user.username}</p>
                            {
                                index < 3 ? <span className="text-green-400 text-xs">online</span> : <span className="text-neutral-400 text-xs">ofline</span>
                            }
                        </div>
                        {index > 2 && <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded -full bg-violet-500/50">{index}</p>}
                    </div>))}
            </div>
        </div>
    )
}