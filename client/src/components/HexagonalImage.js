import './HexagonalImage.css';
const HexagonalImage = ({
    imglink
}) => {
    return (
        <img className="hexagon" src={'/' + imglink} />
    );
};

export default HexagonalImage;