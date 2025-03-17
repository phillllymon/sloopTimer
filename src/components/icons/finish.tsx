import React from "react";
import "../style/icons.css";

type BoatsProps = {
    color: string
}

export const Finish: React.FC<BoatsProps> = (props: BoatsProps) => {
    if (props.color === "red") {
        return (
            <div className="icon">
                <div className="start-circle start-circle-red"></div>
                <div className="start-ticks start-ticks-red"></div>
                <div className="start-ticks start-ticks-a start-ticks-red"></div>
                <div className="start-ticks start-ticks-b start-ticks-red"></div>
                <div className="start-ticks start-ticks-c start-ticks-red"></div>
                <div className="start-ticks start-ticks-d start-ticks-red"></div>
                <div className="start-ticks start-ticks-e start-ticks-red"></div>
                <div className="top-a top-a-red"></div>
                <div className="top-b top-b-red"></div>
                <div className="center-circle center-circle-red"></div>
                <div className="start-pointer start-pointer-red"></div>
            </div>
        )
    } else {
        return (
            <div className="icon">
                <div className="start-circle"></div>
                <div className="start-ticks"></div>
                <div className="start-ticks start-ticks-a"></div>
                <div className="start-ticks start-ticks-b"></div>
                <div className="start-ticks start-ticks-c"></div>
                <div className="start-ticks start-ticks-d"></div>
                <div className="start-ticks start-ticks-e"></div>
                <div className="top-a"></div>
                <div className="top-b"></div>
                <div className="center-circle"></div>
                <div className="start-pointer"></div>
            </div>
        );
    }
};