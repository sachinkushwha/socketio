import { useEffect, useRef } from "react";
import { FormateMessageAndTime } from "./lib/utils";

export const ChatContainer = ({ selecteduser, setselecteduser }) => {
    const scrollend=useRef();
    useEffect(()=>{
if(scrollend.current){
    scrollend.current.scrollIntoView({behavior:"smooth"})
}
    },[])
    const messagedata = [
        {
            image: 'image',
            text: "hello ji",
            createdAt:'2025-08-08T18:30:00Z',
            senderId: '456123789'
        },
        {
            image: '',
            text: "kya hall hai",
            senderId: '',
            createdAt:'2025-08-08T18:30:00Z'
        }
    ]
    console.log(selecteduser);
    return selecteduser ? (
        <div className="h-full overflow-scroll relative backdrop-blur-lg">
            <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
                <img src="" alt="user" className="w-8 rounded-full" />
                <p className="flex-1 text-lg text-white flex items-center gap-2">
                    sachin
                    <span className="w-2 h-2 rounded-full bg-green-500"></span></p>
                <img onClick={() => setselecteduser(null)} src="" alt="info" className="md:hidden w-7" />
                <img src="" alt="help" className="max-md:hidden w-5" />
            </div>
            <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
                {messagedata.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== '456123789' && 'flex-row-reverse'}`}>
                        {msg.image ? (
                            <img src={msg.image} alt="img" className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8" />
                        ) : (
                            <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === '456123789' ? 'rounded-br-none' : 'rounded-bl-none'}`}>{msg.text}</p>
                        )}
                        <div className="text-center text-xs">
                            <img src="" alt="" className="w-7 rounded-full" />
                            <p className="text-gray-500">{FormateMessageAndTime(msg.createdAt)}</p>
                        </div>
                    </div>
                ))}
                <div ref={scrollend}></div>
            </div>
            <div className="absolute bottom-0 left-0 flex right-0 items-center gap-3">
                <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
                   <input type="text" name="" id="" placeholder="send the msg" className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400" />
                   <input type="file" name="" id="image" accept="image/png, image/jpeg" hidden />
                   <label htmlFor="image"><img src={''} alt="gicon" className="w-5 mr-2 cursor-pointer"/></label>
                </div>
                <div>
                    <img src="" alt="send" className="w-7 coursor-pointer" />
                </div>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
            <img src="" alt="logo" className="max-w-16" />
            <p className="text-lg font-medium text-white ">chat anytime any where</p>
        </div>
    )
}