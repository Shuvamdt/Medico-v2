import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import Capsule from "../Models/Capsule";
import { calculateSizes } from "../Constants/index";
import HeroCamera from "./HeroCamera";

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);
  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3 relative z-10">
        <p className="sm:text-[50px] text-3xl font-medium text-center font-generalsans">
          We<span className="homemade-apple-regular text-[#93B1A6]"> Care</span>
          , We{"  "}
          <span className="homemade-apple-regular text-[#93B1A6]"> Cure</span>
        </p>
      </div>
      <div className="w-full h-full mt-auto absolute inset-0 z-0">
        <Canvas className="w-full h-full">
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <HeroCamera isMobile={isMobile}>
              <Capsule
                position={sizes.position}
                rotation={[Math.PI, Math.PI, 0]}
                scale={sizes.scale}
              />
            </HeroCamera>
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>
      <div className="w-full mx-auto flex flex-col sm:mt-50 mt-20 c-space gap-3 relative z-10">
        <p className="text-center text-gray_gradient">
          This is a medical store management system where you can buy, sell and
          <br />
          find accurate medicines according to your problems.
        </p>
      </div>
    </section>
  );
};

export default Hero;
