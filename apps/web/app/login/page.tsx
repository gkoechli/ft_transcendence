"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Gradient } from "../../components/gradient/gradient";
import { useEffect } from "react";


export default function Home() {
	useEffect(() => {
		const gradient = new Gradient();
		gradient.initGradient("#gradient-canvas");
	}, []);

	return (
		<AnimatePresence>
			<div className="min-h-[100vh] sm:min-h-screen w-screen flex flex-col relative bg-gray-950 font-inter overflow-hidden">
				<svg
					style={{ filter: "contrast(125%) brightness(100%)" }}
					className="fixed z-[1] w-full h-full opacity-[35%]"
				>
					<filter id="noise">
						<feTurbulence
							type="fractalNoise"
							baseFrequency=".7"
							numOctaves="3"
							stitchTiles="stitch"
						></feTurbulence>
						<feColorMatrix type="saturate" values="0"></feColorMatrix>
					</filter>
					<rect width="100%" height="100%" filter="url(#noise)"></rect>
				</svg>
				<main className="flex flex-col justify-center h-[90%] static md:fixed w-screen overflow-hidden grid-rows-[1fr_repeat(3,auto)_1fr] z-[100] pt-[30px] pb-[320px] px-4 md:px-20 md:py-0">

				</main>
				<div
					className="fixed top-0 right-0 w-[80%] md:w-1/2 h-screen bg-[#1F2B3A]/20"
					style={{
						clipPath:
							"polygon(100px 0,100% 0,calc(100% + 225px) 100%, 480px 100%)",
					}}
				></div>

				<motion.canvas
					initial={{
						filter: "blur(20px)",
					}}
					animate={{
						filter: "blur(30px)",
					}}
					transition={{
						duration: 1,
						ease: [0.075, 0.82, 0.965, 1],
					}}
					style={{
						clipPath:
							"polygon(100px 0,100% 0,calc(100% + 225px) 100%, 480px 100%)",
					}}
					id="gradient-canvas"
					data-transition-in
					className="z-50 fixed top-0 right-[-2px] w-[80%] md:w-1/2 h-screen bg-gray-950"
				></motion.canvas>
			</div>
		</AnimatePresence>
	);
}
