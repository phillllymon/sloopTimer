import React, { useState, useEffect } from "react";
import { ValueField } from "./valueField";
import { NewParamModal } from "./newParamModal";

type UseCsvAreaProps = {
    setRaceInfo: (boatsArr: Record<string, string>[]) => void,
    nameError: string
};

export const UseCsvArea: React.FC<UseCsvAreaProps> = (props: UseCsvAreaProps) => {
    
    const [url, setUrl] = useState("");

    // const [newParamModalOpen, setNewParamModalOpen] = useState(false);
    // const [additionalParams, setAdditionalParams] = useState<Record<string, string>>({});

    const [boatNameLabel, setBoatNameLabel] = useState("Boat name");
    const [classLabel, setClassLabel] = useState("Class");
    const [sailNumberLabel, setSailNumberLabel] = useState("Sail number");
    const [boatTypeLabel, setBoatTypeLabel] = useState("Boat type");
    const [phrfLabel, setPhrfLabel] = useState("phrf");
    const [idLabel, setIdLabel] = useState("ID");

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
        const paramObj: Record<string, string> = {};
        paramObj["name"] = boatNameLabel;
        paramObj["boatClass"] = classLabel;
        paramObj["sailNumber"] = sailNumberLabel;
        paramObj["boatType"] = boatTypeLabel;
        paramObj["phrf"] = phrfLabel;
        paramObj["id"] = idLabel;
        // Object.keys(additionalParams).forEach((label) => {
        //     paramObj[label] = additionalParams[label];
        // });
        
        const boatsArr = parseCsvToBoatsArr(cleanText, paramObj);
        setBoatsArr(boatsArr);
    };

    useEffect(checkForEssentialValues, [boatsArr]);
    useEffect(redoBoatsArr, [boatNameLabel, classLabel, sailNumberLabel, boatTypeLabel, phrfLabel, idLabel]);
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
            const paramObj: Record<string, string> = {};
            paramObj["name"] = boatNameLabel;
            paramObj["boatClass"] = classLabel;
            paramObj["sailNumber"] = sailNumberLabel;
            paramObj["boatType"] = boatTypeLabel;
            paramObj["phrf"] = phrfLabel;
            paramObj["id"] = idLabel;
            // Object.keys(additionalParams).forEach((label) => {
            //     paramObj[label] = additionalParams[label];
            // });
            const boatsArr = parseCsvToBoatsArr(theCleanText, paramObj);
            setBoatsArr(boatsArr);
        };
        try {
            reader.readAsBinaryString(file);
        } catch (e) {
            
        }
    };

    const handleFetchCsv = (): void => {
        let urlToUse = url;
        if (urlToUse.length > 0) {
            if (!urlToUse.startsWith("https://") && !urlToUse.startsWith("http://")) {
                urlToUse = "https://" + urlToUse;
            }
            fetch(urlToUse).then((res) => {
                res.text().then((textRes) => {
                    const theCleanText = textRes.startsWith('ï»¿') ? textRes.substring(3) : textRes;
                    setCleanText(textRes.startsWith('ï»¿') ? textRes.substring(3) : textRes);
                    const paramObj: Record<string, string> = {};
                    paramObj["name"] = boatNameLabel;
                    paramObj["boatClass"] = classLabel;
                    paramObj["sailNumber"] = sailNumberLabel;
                    paramObj["boatType"] = boatTypeLabel;
                    paramObj["phrf"] = phrfLabel;
                    paramObj["id"] = idLabel;
                    const boatsArr = parseCsvToBoatsArr(theCleanText, paramObj);
                    setBoatsArr(boatsArr);
                }).catch((err) => {
                    setErrorMessage("Data not valid");
                });
            }).catch((err) => {
                setErrorMessage("Unable to fetch");
            });
        }
    };

    const handleLabelChange = (newLabel: string, setter: (s: string) => void) => {
        setter(newLabel);
    };

    // const handleAdditionalLabelChange = (paramName: string, newLabel: string) => {
    //     const params = additionalParams;
    //     params[paramName] = newLabel;
    //     setAdditionalParams(params);
    // };

    return (
        <div className="class-list csv-area">
            {/* {newParamModalOpen && <NewParamModal
                hideModal={() => setNewParamModalOpen(false)}
                addParam={addParam} />} */}
            <center>
                <input type="file" onChange={(e) => handleUpload(e)}/>
                <div className="small-text text-gray">
                    or
                </div>
                <div className="horizontal-between">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="url to fetch"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        />
                    <div className="blue-button" onClick={handleFetchCsv}>
                        Fetch
                    </div>
                </div>
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
            <div className="gray-text small-text">
                <center>
                    ID
                </center>
            </div>
            <ValueField 
                reportValue={(newLabel) => handleLabelChange(newLabel, setIdLabel)}
                defaultValue="ID" />
            {/* <div className="blue-button" onClick={() => setNewParamModalOpen(true)}>
                Add boat parameter
            </div> */}
        </div>
    );
};

function parseCsvToBoatsArr(csvText: string, labels: Record<string, string>): Record<string, string>[] {
    // const rows = csvText.split("\r\n");
    let rows = csvText.split("\n");
    rows = rows.map((rowStr) => {
        return rowStr.split("\r")[0];
    });
    
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
    console.log(answer);
    return answer;
}