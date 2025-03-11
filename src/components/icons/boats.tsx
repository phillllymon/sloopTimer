import React from "react";
import "../style/icons.css";

type BoatsProps = {
    color: string
}

export const Boats: React.FC<BoatsProps> = (props: BoatsProps) => {
    return (
        <div className="edit">
            <div className="edit-combined">
                <div className="edit-point"></div>
                <div className="edit-box"></div>
            </div>
        </div>
    );
};