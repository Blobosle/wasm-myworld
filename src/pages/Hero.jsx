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

const formatName = (name) => {
    if (!name) return "";

    const datePart = name.split("_")[0];
    const [year, month, dayStr] = datePart.split("-");
    const day = Number(dayStr);

    const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];

    const getSuffix = (n) => {
        if (n >= 11 && n <= 13) return "th";
        const last = n % 10;
        if (last === 1) return "st";
        if (last === 2) return "nd";
        if (last === 3) return "rd";
        return "th";
    };

    const suffix = getSuffix(day);
    return `${monthNames[Number(month) - 1]} ${day}${suffix}, ${year}`;
};

export default function Hero() {
    const [go_prev, setPrev] = useState(null);
    const [go_next, setNext] = useState(null);
    const [get_primary, setPrimary] = useState(null);
    const [get_secondary, setSecondary] = useState(null);
    const [peek_next, setPeek] = useState(null);
    const [version, setVersion] = useState(0);
    const [isShort, setIsShort] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsShort(window.innerHeight < 500);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        WebAsm({locateFile: (path) => `/${path}`,}).then((Module) => {
            if (Module.init) {
                Module.init(filenames);
            }

            setPrev(() => Module.go_prev);
            setNext(() => Module.go_next);
            setPrimary(() => Module.get_primary);
            setSecondary(() => Module.get_secondary);
            setPeek(() => Module.peek_next);
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

    const PRELOAD_COUNT = 3;

    useEffect(() => {
        if (!peek_next) return;

        const names = peek_next(PRELOAD_COUNT);
        if (!names) return;

        names.forEach((name) => {
            const url = screenshotMap[name];
            if (!url) return;

            const img = new Image();
            img.src = url;
        });
    }, [version, peek_next, screenshotMap]);

    const primaryName = get_primary ? get_primary() : null;
    const secondaryName = get_secondary ? get_secondary() : null;

    const primaryFile = primaryName ? screenshotMap[primaryName] : null;
    const secondaryFile = secondaryName ? screenshotMap[secondaryName] : null;

    return (
        <div
            className="bg-cover bg-center bg-no-repeat min-h-screen w-full overflow-hidden"
            style={{
                backgroundImage: `url(${BgImg})`,
                backgroundSize: isShort ? "120% auto" : "cover",
            }}
        >
            <div className="flex flex-col items-center justify-center select-none">
                <img src={MinecraftLogo} className="h-60 w-auto"/>
                <img src={MyWorld} className="-mt-25 h-22 w-auto"/>
            </div>

            <div className="pt-2 flex flex-col md:flex-row justify-center items-center gap-10">
                <div className="flex flex-col flex-shrink-0">
                    <a href={primaryFile} target="blank">
                        <img src={primaryFile} className="h-20 sm:h-40 md:h-80 lg:h-100 xl:h-130 border-4 border-white" loading="lazy"/>
                    </a>
                    <p className="pt-4 font-mc text-white text-[20px] leading-none">{formatName(primaryName)}</p>
                </div>

                <div className="flex flex-col flex-shrink-0">
                    <a href={secondaryFile} target="blank">
                        <img src={secondaryFile} className="h-20 sm:h-40 md:h-60 lg:h-70 border-4 border-white" loading="lazy"/>
                    </a>
                    <p className="pt-4 font-mc text-white text-[20px] leading-none">{formatName(secondaryName)}</p>
                </div>
            </div>

            <div className="flex gap-5 justify-center pt-7 leading-none select-none pb-7">
                <a  onClick={handlePrev}
                    className="font-mc text-white text-[15px] hover:underline hover:text-blue-200 cursor-pointer">&lt;prev&gt;</a>
                <a  onClick={handleNext}
                    className="font-mc text-white text-[15px] hover:underline hover:text-blue-200 cursor-pointer">&lt;next&gt;</a>
            </div>
        </div>
    );
}

