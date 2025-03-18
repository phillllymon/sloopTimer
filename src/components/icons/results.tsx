import React from "react";
import "../style/icons.css";

type BoatsProps = {
    color: string
}

export const Results: React.FC<BoatsProps> = (props: BoatsProps) => {
    if (props.color === "red") {
        return (
            <div className="icon">
                <div className="results-base results-base-red"></div>
                <div className="results-base-b results-base-b-red"></div>
                <div className="results-shaft results-shaft-red"></div>
                <div className="results-bowl-left results-bowl-left-red"></div>
                <div className="results-bowl-right results-bowl-right-red"></div>
                <div className="results-handles results-handles-red"></div>
            </div>
        )
    } else {
        return (
            <div className="icon">
                <div className="results-base"></div>
                <div className="results-base-b"></div>
                <div className="results-shaft"></div>
                <div className="results-bowl-left"></div>
                <div className="results-bowl-right"></div>
                <div className="results-handles"></div>
            </div>
        );
    }
};