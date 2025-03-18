import React from "react";
import "../style/icons.css";

type BoatsProps = {
    color: string
}

export const Finish: React.FC<BoatsProps> = (props: BoatsProps) => {
    if (props.color === "red") {
        return (
            <div className="icon">
                <div className="finish-container">
                    <div className="finish-pole finish-pole-red"></div>
                    <div className="finish-flag">
                        <div className="finish-squares-b finish-squares-b-red"></div>
                        <div className="finish-squares-a finish-squares-a-red"></div>
                        <div className="finish-squares-b finish-squares-b-red"></div>
                        <div className="finish-squares-a finish-squares-a-red"></div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="icon">
                <div className="finish-container">
                    <div className="finish-pole"></div>
                    <div className="finish-flag">
                        <div className="finish-squares-b"></div>
                        <div className="finish-squares-a"></div>
                        <div className="finish-squares-b"></div>
                        <div className="finish-squares-a"></div>
                    </div>
                </div>
            </div>
        );
    }
};