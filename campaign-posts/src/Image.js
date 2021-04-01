import React from "react";
import ReactDOM from "react-dom";

const Image = (props) => {
    return (
        <img
            src={props.img}
            alt="new"
        />
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Image />, rootElement);

export default Image