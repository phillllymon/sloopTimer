import React from "react";
import "../style/icons.css";

type BoatsProps = {
    color: string
}

export const Start: React.FC<BoatsProps> = (props: BoatsProps) => {
    if (props.color === "red") {
        return (
            <div className="icon">
                <div className="main-sail main-sail-a main-sail-red"></div>
                <div className="jib-sail jib-sail-a jib-sail-red"></div>
                <div className="hull hull-a hull-red"></div>
                <div className="main-sail main-sail-b main-sail-red"></div>
                <div className="jib-sail jib-sail-b jib-sail-red"></div>
                <div className="hull hull-b hull-red"></div>
            </div>
        )
    } else {
        return (
            <div className="icon">
                <div className="main-sail main-sail-a"></div>
                <div className="jib-sail jib-sail-a"></div>
                <div className="hull hull-a"></div>
                <div className="main-sail main-sail-b"></div>
                <div className="jib-sail jib-sail-b"></div>
                <div className="hull hull-b"></div>
            </div>
        );
    }
};