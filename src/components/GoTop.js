import { FaArrowUp } from "react-icons/fa";





const GoTop = () => {
    return (
        <a href="#" className="position-fixed d-inline-block text-white bottom-0 end-0 pt-2 ps-3 pe-3 pb-3 m-5 bg-warning rounded-circle" style={{ zIndex: 100 }}>
            <FaArrowUp />
        </a>
    );
}

export default GoTop;