import { useState, useEffect } from "react"

import BgImg from "@assets/bgimgq.webp"
import MinecraftLogo from "@assets/minecraftlogo.webp"
import MyWorld from "@assets/myworld.webp"
import FirstImg from "@assets/img1.webp"
import SecondImg from "@assets/img2.webp"

import WebAsm from "@/wasm/image_fetcher.js"

export default function Hero() {
    const [calc, setCalc] = useState(null);
    const [go_prev, setPrev] = useState(null);
    const [go_next, setNext] = useState(null);
    const [get_primary, setPrimary] = useState(null);
    const [get_secondary, setSecondary] = useState(null);

    const [version, setVersion] = useState(0);

    useEffect(() => {
        WebAsm().then((Module) => {
            if (Module.init) {
                Module.init("/screenshots");
            }

            setCalc(() => Module.calc);
            setPrev(() => Module.go_prev);
            setNext(() => Module.go_next);
            setPrimary(() => Module.get_primary);
            setSecondary(() => Module.get_secondary);
        })
    }, []);

    const handlePrev = () => {
        if (!go_prev) return;
        go_prev();
        setVersion((v) => v + 1);
    };

    const handleNext = () => {
        if (!go_next) return;
        go_next();
        setVersion((v) => v + 1);
    };

    const primaryFile = get_primary ? ("/src/assets/screenshots/" + get_primary()) : null;
    const secondaryFile = get_secondary ? ("/src/assets/screenshots/" + get_secondary()) : null;

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
                    <a href={primaryFile} target="blank">
                        <img src={primaryFile} className="h-130 border-4 border-white" />
                    </a>
                    <p className="pt-4 font-mc text-white text-[20px] leading-none">Calc out: {calc ? calc(1, 3) : "loading"}</p>
                </div>

                <div className="flex flex-col">
                    <a href={secondaryFile} target="blank">
                        <img src={secondaryFile} className="h-70 border-4 border-white" />
                    </a>
                    <p className="pt-4 font-mc text-white text-[20px] leading-none">This is something</p>
                </div>
            </div>

            <div className="flex gap-5 justify-center pt-7 leading-none select-none">
                <a  onClick={handlePrev}
                    className="font-mc text-white text-[15px] hover:underline hover:text-blue-200 cursor-pointer">&lt;prev&gt;</a>
                <a  onClick={handleNext}
                    className="font-mc text-white text-[15px] hover:underline hover:text-blue-200 cursor-pointer">&lt;next&gt;</a>
            </div>
        </div>
    );
}
