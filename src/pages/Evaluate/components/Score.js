import '../../../style/Evaluate.css';
import React from "react";

export default function ItemInfo(props) {
    return (
        <div id='Score'>
            <div id='ScoreIcon'><img id='ScoreIcon' src={props.icon} alt='아이콘'></img></div>
            <div id='ScoreTitle'>{props.title}</div>
        </div>
    )
}