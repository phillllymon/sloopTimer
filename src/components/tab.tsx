import React from "react";
import "./style.css";

type TabProps = {
    label: string | React.ReactElement;
    active: boolean;
    setActive: () => void;
}

export const Tab: React.FC<TabProps> = (props: TabProps) => {
    return (
        <div
            className={props.active ? "tab tab-active" : "tab"}
            onClick={props.setActive}>
            <>
                {props.label}
            </>
        </div>
    );
};