import React, {useState} from "react";
import "./style.css";
import "./style/modal.css";

type CsvModalProps = {
    hideModal: () => void,
    csvString: string
}

export const CsvModal: React.FC<CsvModalProps> = (props: CsvModalProps) => {
    const [fileName, setFileName] = useState("");

    const download = (): void => {
        if (fileName.length > 0) {
            let fileNameToUse = fileName;
            if (!fileName.endsWith(".csv")) {
                fileNameToUse = fileName + ".csv";
            }
            const csvBlob = new Blob([props.csvString], { type: "text/csv" });
            const url = URL.createObjectURL(csvBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileNameToUse;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            props.hideModal();
        }
    };

    return (
        <>
            <div className="modal-screen" onClick={() => props.hideModal()}></div>
            <div className="modal new-boat-modal">
                Enter file name:
                <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)} />
                <br />
                <div className="blue-button" onClick={download}>
                    Download
                </div>
                <br />
                <div className="blue-button" onClick={props.hideModal}>
                    Done
                </div>
            </div>
        </>
    );
};