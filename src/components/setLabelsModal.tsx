import React, {useState} from "react";
import "./style.css";
import "./style/modal.css";

type SetLabelsModalProps = {
    hideModal: () => void,
    labelsObj: Record<string, boolean>,
    setLabelsObj: (newLabels: Record<string, boolean>) => void
}

export const SetLabelsModal: React.FC<SetLabelsModalProps> = (props: SetLabelsModalProps) => {
    const [labels, setLabels] = useState(props.labelsObj);
    const setNewVal = (key: string, newVal: boolean): void => {
        labels[key] = newVal;
        setLabels(labels);
    }

    return (
        <>
            <div className="modal-screen" onClick={() => props.hideModal()}></div>
            <div className="modal new-boat-modal">
                Data to display:
                <div className="vertical-left">
                    <div className="horizontal-left">
                        <input
                            type="checkbox"
                            id="checked-in-checkbox"
                            className="check-checkbox"
                            checked={labels.name}
                            onChange={(e) => setNewVal("name", e.target.checked)} />
                        <div className="space"></div>
                        <div className="small-text text-gray">
                            Boat name
                        </div>
                    </div>
                    <div className="horizontal-left">
                        <input
                            type="checkbox"
                            id="checked-in-checkbox"
                            className="check-checkbox"
                            checked={labels.sailNumber}
                            onChange={(e) => setNewVal("sailNumber", e.target.checked)} />
                        <div className="space"></div>
                        <div className="small-text text-gray">
                            Sail number
                        </div>
                    </div>
                    <div className="horizontal-left">
                        <input
                            type="checkbox"
                            id="checked-in-checkbox"
                            className="check-checkbox"
                            checked={labels.class}
                            onChange={(e) => setNewVal("class", e.target.checked)} />
                        <div className="space"></div>
                        <div className="small-text text-gray">
                            Class
                        </div>
                    </div>
                    <div className="horizontal-left">
                        <input
                            type="checkbox"
                            id="checked-in-checkbox"
                            className="check-checkbox"
                            checked={labels.phrf}
                            onChange={(e) => setNewVal("phrf", e.target.checked)} />
                        <div className="space"></div>
                        <div className="small-text text-gray">
                            PHRF
                        </div>
                    </div>
                    <div className="horizontal-left">
                        <input
                            type="checkbox"
                            id="checked-in-checkbox"
                            className="check-checkbox"
                            checked={labels.boatType}
                            onChange={(e) => setNewVal("boatType", e.target.checked)} />
                        <div className="space"></div>
                        <div className="small-text text-gray">
                            Boat type
                        </div>
                    </div>
                    <div className="horizontal-left">
                        <input
                            type="checkbox"
                            id="checked-in-checkbox"
                            className="check-checkbox"
                            checked={labels.boatId}
                            onChange={(e) => setNewVal("boatId", e.target.checked)} />
                        <div className="space"></div>
                        <div className="small-text text-gray">
                            ID
                        </div>
                    </div>
                    <div className="horizontal-left">
                        <input
                            type="checkbox"
                            id="checked-in-checkbox"
                            className="check-checkbox"
                            checked={labels.finishTime}
                            onChange={(e) => setNewVal("finishTime", e.target.checked)} />
                        <div className="space"></div>
                        <div className="small-text text-gray">
                            Finish time
                        </div>
                    </div>
                    <div className="horizontal-left">
                        <input
                            type="checkbox"
                            id="checked-in-checkbox"
                            className="check-checkbox"
                            checked={labels.courseTime}
                            onChange={(e) => setNewVal("courseTime", e.target.checked)} />
                        <div className="space"></div>
                        <div className="small-text text-gray">
                            Course time
                        </div>
                    </div>
                </div>
                <div className="blue-button" onClick={props.hideModal}>
                    Done
                </div>
            </div>
        </>
    );
};