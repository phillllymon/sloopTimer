import React, { useContext } from "react";
import "./style.css";
import "./style/modal.css";

type FullScreenPromptProps = {
    hideModal: () => void
}

export const FullScreenPrompt: React.FC<FullScreenPromptProps> = (props: FullScreenPromptProps) => {
    const handleFullScreen = () => {
        document.getElementById("full-screen-component")?.requestFullscreen();
        props.hideModal();
    };
    return (
        <>
            <div className="modal-screen"></div>
            <div className="modal">
                <div className="blue-button" onClick={handleFullScreen}>
                    Full screen preview
                </div>
            </div>
        </>
    );
};