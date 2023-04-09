import React from "react";

interface MetronomeBeatsProps {
    beatsPerMeasure: number;
    currentBeat: number;
}

const MetronomeBeats: React.FC<MetronomeBeatsProps> = ({
                                                           beatsPerMeasure,
                                                           currentBeat,
                                                       }) => {
    const circles = [];
    for (let i = 0; i < beatsPerMeasure; i++) {
        circles.push(
            <div
                key={i}
                style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    margin: "5px",
                    backgroundColor: i < currentBeat ? "#e53935" : "#ccc",
                }}
            />
        );
    }
    return <div>{circles}</div>;
};

export default MetronomeBeats;