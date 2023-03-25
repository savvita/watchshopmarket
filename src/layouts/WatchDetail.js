

import { useParams } from "react-router-dom";
import WatchDetailView from "../components/WatchDetailView/WatchDetailView";



const WatchDetail = () => {
    const params = useParams();

    return (
        <WatchDetailView id={ params.id } />
    );
}

export default WatchDetail;