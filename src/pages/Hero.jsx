import BgImg from "../assets/bgimgq.webp"
import MinecraftLogo from "../assets/minecraftlogo.webp"
import MyWorld from "../assets/myworld.webp"

import FirstImg from "../assets/img1.webp"
import SecondImg from "../assets/img2.webp"

export default function Hero() {
    return (
        <div className="bg-cover bg-center bg-no-repeat h-screen w-full"
            style={{ backgroundImage: `url(${BgImg})` }}
        >
            <div className="flex flex-col items-center justify-center select-none">
                <img src={MinecraftLogo} className="h-60 w-auto"/>
                <img src={MyWorld} className="-mt-25 h-22 w-auto"/>
            </div>

            <div className="pt-2 flex justify-center items-center gap-10">
                <div className="flex flex-col">
                    <img src={FirstImg} className="h-130 border-4 border-white" />
                    <p className="pt-4 font-mc text-white text-[20px] leading-none">This is something</p>
                </div>

                <div className="flex flex-col">
                    <img src={SecondImg} className="h-70 border-4 border-white" />
                    <p className="pt-4 font-mc text-white text-[20px] leading-none">This is something</p>
                </div>
            </div>

            <div className="flex gap-5 justify-center pt-7 leading-none">
                <a className="font-mc text-white text-[15px] hover:underline hover:text-blue-200 cursor-pointer">&lt;prev&gt;</a>
                <a className="font-mc text-white text-[15px] hover:underline hover:text-blue-200 cursor-pointer">&lt;next&gt;</a>
            </div>
        </div>
    );
}
