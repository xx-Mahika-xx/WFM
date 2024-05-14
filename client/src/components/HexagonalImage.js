import './HexagonalImage.css';
const HexagonalImage = ({
    imglink
}) => {
    return (
        <img className="hexagon" src={'http://localhost:3000/' + imglink} />
    );
};

export default HexagonalImage;