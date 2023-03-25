

import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';

import ColorDetailView from "../components/ColorDetailView/ColorDetailView";



const ColorDetail = () => {
    const params = useParams();

    return (
        <ColorDetailView id={ params.id } />
    );
}

export default ColorDetail;