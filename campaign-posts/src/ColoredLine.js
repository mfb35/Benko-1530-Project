const ColoredLine = ({ color }) => ( //this file is represents a colored line componant in a react project
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

export default ColoredLine