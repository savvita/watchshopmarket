

import WatchContainer from "../components/TopWatchContainer/WatchContainer";

import Carousel from "../components/Carousel/Carousel";
import GoTop from "../components/GoTop";






const Index = () => {
    return (
        <div>
            <Carousel />
            <div className="mt-3">
                <WatchContainer />
            </div>
            <GoTop />
        </div>
    );
}

export default Index;