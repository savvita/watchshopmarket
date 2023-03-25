

import { useParams } from "react-router-dom";
import MaterialDetailView from "../components/MaterialDetailView/MaterialDetailView";


const MaterialDetail = () => {
    const params = useParams();

    return (
        <MaterialDetailView id={ params.id } />
    );
}

export default MaterialDetail;