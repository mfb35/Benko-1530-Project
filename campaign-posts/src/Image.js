import React from "react";
import ReactDOM from "react-dom"; //this file is represents an image componant in a react project

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