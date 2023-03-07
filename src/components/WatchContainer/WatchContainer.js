
import WatchCard from './WatchCard';

const WatchContainer = ({ items }) => {
    return (
        <div className="bg-dark d-flex flex-wrap justify-content-around">
            { items && items.map(item => <WatchCard key={ item.id } item={ item } />)}
        </div>
    );
}

export default WatchContainer;