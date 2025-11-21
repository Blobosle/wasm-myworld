import { useState, useEffect } from "react"

import BgImg from "@assets/bgimgq.webp"
import MinecraftLogo from "@assets/minecraftlogo.webp"
import MyWorld from "@assets/myworld.webp"

import WebAsm from "@/wasm/image_fetcher.js"

const screenshots = import.meta.glob("/src/assets/screenshots/*", {
  eager: true,
  as: "url",
});

const screenshotMap = Object.fromEntries(
  Object.entries(screenshots).map(([path, url]) => {
    const fileName = path.split("/").pop();
    return [fileName, url];
  })
);

const filenames = Object.keys(screenshotMap);

export default function Hero() {
    const [go_prev, setPrev] = useState(null);
    const [go_next, setNext] = useState(null);
    const [get_primary, setPrimary] = useState(null);
    const [get_secondary, setSecondary] = useState(null);

    const [, setVersion] = useState(0);

    useEffect(() => {
        WebAsm({locateFile: (path) => `/${path}`,}).then((Module) => {
            if (Module.init) {
                Module.init(filenames);
            }

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

    const primaryName = get_primary ? get_primary() : null;
    const secondaryName = get_secondary ? get_secondary() : null;

    const primaryFile = primaryName ? screenshotMap[primaryName] : null;
    const secondaryFile = secondaryName ? screenshotMap[secondaryName] : null;

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
                        <img src={primaryFile} className="h-130 border-4 border-white" loading="lazy"/>
                    </a>
                    <p className="pt-4 font-mc text-white text-[20px] leading-none">{primaryName}</p>
                </div>

                <div className="flex flex-col">
                    <a href={secondaryFile} target="blank">
                        <img src={secondaryFile} className="h-70 border-4 border-white" loading="lazy"/>
                    </a>
                    <p className="pt-4 font-mc text-white text-[20px] leading-none">{secondaryName}</p>
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
