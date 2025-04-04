import React, { useState } from "react";
import "./style.css";
import "./style/modal.css";

type NewParamModalProps = {
    hideModal: () => void,
    addParam: (s: string) => void
}

export const NewParamModal: React.FC<NewParamModalProps> = (props: NewParamModalProps) => {
    
    const [newParamName, setNewParamName] = useState("");

    const handleAddParam = (): void => {
        props.addParam(newParamName);
        props.hideModal();
    }
    return (
        <>
            <div className="super-modal-screen" onClick={props.hideModal}></div>
            <div className="modal new-boat-modal">
                New parameter name
                <input
                    type="text"
                    className="new-boat-input"
                    placeholder="new parameter"
                    value={newParamName}
                    onChange={(e) => setNewParamName(e.target.value)}>
                </input>
                <div className="blue-button" onClick={handleAddParam}>
                    Add parameter
                </div>
            </div>
        </>
    );
};