import React, { useEffect, useRef } from "react";
import * as THREE from "three"
import EFFECT from "vanta/dist/vanta.fog.min"

interface VantaBackgroundProps {
    children: React.ReactNode;
}

const VantaBackground: React.FC<VantaBackgroundProps> = ({ children }) => {
    const vantaRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let vantaEffect = EFFECT({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00
        })

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return (
        <div ref={vantaRef} style={{ height: "100vh" }}>
            {children}
        </div>
    );
};

export default VantaBackground;
