import React, { useState } from "react";
import { Tab } from "./tab";
import { BoatsTab } from "./boatsTab";
import { StartTab } from "./startTab";
import { FinishTab } from "./finishTab";
import { ResultsTab } from "./resultsTab";
import { Boats } from "./icons/boats";
import { Start } from "./icons/start";


import "./style.css";

export const Pages: React.FC = () => {
    const [activeTab, setActiveTab] = useState("boats");
    const handleTabSelect = (tabToSelect: string) => {
        setActiveTab(tabToSelect);
    };
    return (
        <div className="pages">
            {activeTab === "boats" && <BoatsTab />}
            {activeTab === "start" && <StartTab />}
            {activeTab === "finish" && <FinishTab />}
            {activeTab === "results" && <ResultsTab />}
            <div className="tab-container">
                <Tab label={(<Boats color={activeTab === "boats" ? "red" : "gray"} />)} active={activeTab === "boats"} setActive={() => handleTabSelect("boats")} />
                <Tab label={(<Start color={activeTab === "start" ? "red" : "gray"} />)} active={activeTab === "start"} setActive={() => handleTabSelect("start")} />
                <Tab label="finish" active={activeTab === "finish"} setActive={() => handleTabSelect("finish")} />
                <Tab label="results" active={activeTab === "results"} setActive={() => handleTabSelect("results")} />
            </div>
        </div>
    );
};