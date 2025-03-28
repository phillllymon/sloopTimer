import React, { useState, useEffect } from "react";
import { ValueField } from "./valueField";

type UploadInfoAreaProps = {
    setRaceInfo: (boatsArr: Record<string, string>[]) => void,
    nameError: string
};

export const UploadInfoArea: React.FC<UploadInfoAreaProps> = (props: UploadInfoAreaProps) => {
    
    const [boatNameLabel, setBoatNameLabel] = useState("Boat name");
    const [classLabel, setClassLabel] = useState("Class");
    const [sailNumberLabel, setSailNumberLabel] = useState("Sail number");
    const [boatTypeLabel, setBoatTypeLabel] = useState("Boat type");
    const [phrfLabel, setPhrfLabel] = useState("phrf");

    const [boatsArr, setBoatsArr] = useState<false | Record<string, string>[]>(false);
    const [cleanText, setCleanText] = useState("");
    const [errorMessage, setErrorMessage] = useState<false | string>("");

    const checkForEssentialValues = (): void => {
        if (boatsArr && boatsArr.length > 0) {
            const testBoat = boatsArr[0];
            if (!testBoat["name"] || testBoat["name"].length < 1) {
                setErrorMessage("Boat name column missing");
            } else if (!testBoat["boatClass"] || testBoat["boatClass"].length < 1) {
                setErrorMessage("Class column missing");
            } else {
                setErrorMessage("");
                props.setRaceInfo(boatsArr);
            }
        }
    };

    const redoBoatsArr = (): void => {
        const boatsArr = parseCsvToBoatsArr(cleanText, {
            "name": boatNameLabel,
            "boatClass": classLabel,
            "sailNumber": sailNumberLabel,
            "boatType": boatTypeLabel,
            "phrf": phrfLabel
        });
        setBoatsArr(boatsArr);
    };

    useEffect(checkForEssentialValues, [boatsArr]);
    useEffect(redoBoatsArr, [boatNameLabel, classLabel, sailNumberLabel, boatTypeLabel, phrfLabel]);
    useEffect(() => {
        if (props.nameError.length > 0) {
            setErrorMessage(props.nameError);
        }
    }, [props.nameError]);

    const handleUpload = (e: any): void => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (readerE: any) => {
            const csvRawText = readerE.target.result;
            const theCleanText = csvRawText.startsWith('ï»¿') ? csvRawText.substring(3) : csvRawText;
            setCleanText(csvRawText.startsWith('ï»¿') ? csvRawText.substring(3) : csvRawText);
            const boatsArr = parseCsvToBoatsArr(theCleanText, {
                "name": boatNameLabel,
                "boatClass": classLabel,
                "sailNumber": sailNumberLabel,
                "boatType": boatTypeLabel,
                "phrf": phrfLabel
            });
            setBoatsArr(boatsArr);
        };
        try {
            reader.readAsBinaryString(file);
        } catch (e) {
            
        }
    };

    const handleLabelChange = (newLabel: string, setter: (s: string) => void) => {
        setter(newLabel);
    };

    return (
        <div>
            .csv Column names:
            <div className="gray-text small-text">
                <center>
                    Boat name (required)
                </center>
            </div>
            <ValueField 
                reportValue={(newLabel) => handleLabelChange(newLabel, setBoatNameLabel)}
                defaultValue="Boat name" />
            <div className="gray-text small-text">
                <center>
                    Class (required)
                </center>
            </div>
            <ValueField 
                reportValue={(newLabel) => handleLabelChange(newLabel, setClassLabel)}
                defaultValue="Class" />
            <div className="gray-text small-text">
                <center>
                    Sail number
                </center>
            </div>
            <ValueField 
                reportValue={(newLabel) => handleLabelChange(newLabel, setSailNumberLabel)}
                defaultValue="Sail number" />
            <div className="gray-text small-text">
                <center>
                    Boat type
                </center>
            </div>
            <ValueField 
                reportValue={(newLabel) => handleLabelChange(newLabel, setBoatTypeLabel)}
                defaultValue="Boat type" />
            <div className="gray-text small-text">
                <center>
                    PHRF
                </center>
            </div>
            <ValueField 
                reportValue={(newLabel) => handleLabelChange(newLabel, setPhrfLabel)}
                defaultValue="PHRF" />
            <br />
            <center>
                <input type="file" onChange={(e) => handleUpload(e)}/>
                {boatsArr ? (
                    <div className="gray-text small-text">
                        {boatsArr.length} boats found
                    </div>
                ) : (
                    <div className="gray-text small-text">
                        <br />
                    </div>
                )}
                {errorMessage ? (
                    <div className="red-text small-text">
                        {errorMessage}
                    </div>
                ) : (
                    <div className="gray-text small-text">
                        <br />
                    </div>
                )}
            </center>
        </div>
    );
};

function parseCsvToBoatsArr(csvText: string, labels: Record<string, string>): Record<string, string>[] {
    const rows = csvText.split("\r\n");
    if (rows.length < 2) {
        return [];
    }
    const colNames = rows[0].split(",");
    const labelNames = Object.keys(labels);
    const answer: Record<string, string>[] = [];
    rows.slice(1, rows.length).forEach((row) => {
        const rowData = row.split(",");
        const rowObj: Record<string, string> = {};
        colNames.forEach((colName, colIdx) => {
            labelNames.forEach((labelName) => {
                if (colName.toLowerCase() === labels[labelName].toLowerCase()) {
                    rowObj[labelName] = rowData[colIdx];
                }
            });
        });
        answer.push(rowObj);
    });
    return answer;
}