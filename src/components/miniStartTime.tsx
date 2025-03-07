import React, { useState, useContext } from "react";
import { Edit } from "./icons/edit";
import "./style/startTab.css";
import "./style.css";

type MiniStartTimeProps = {
    hours: number | boolean,
    minutes: number | boolean,
    seconds: number | boolean
};

export const MiniStartTime: React.FC<MiniStartTimeProps> = (props: MiniStartTimeProps) => {
    let hours: string | false = false;
    let minutes: string | false = false;
    let seconds: string | false = false;
    if (props.hours !== false && props.minutes !== false && props.seconds !== false) {
        if (props.hours < 10) {
            hours = `0${props.hours}`;
        } else {
            hours = props.hours.toString();
        }
        if (props.minutes < 10) {
            minutes = `0${props.minutes}`;
        } else {
            minutes = props.minutes.toString();
        }
        if (props.seconds < 10) {
            seconds = `0${props.seconds}`;
        } else {
            seconds = props.seconds.toString();
        }
    }
    
    
    return (
        <div>
            {hours !== false && minutes !== false && seconds !== false ? (
                <div className="horizontal-left">
                    <div className="mini-digit-box">
                        {hours[0]}
                    </div>
                    <div className="mini-digit-box">
                        {hours[1]}
                    </div>
                    <div>:</div>
                    <div className="mini-digit-box">
                        {minutes[0]}
                    </div>
                    <div className="mini-digit-box">
                        {minutes[1]}
                    </div>
                    <div>:</div>
                    <div className="mini-digit-box">
                        {seconds[0]}
                    </div>
                    <div className="mini-digit-box">
                        {seconds[1]}
                    </div>
                </div>
            ) : (
                <div>
                    <i>no start time</i>
                </div>
            )}
        </div>
    );
};