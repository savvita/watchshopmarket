import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/collectionSlice';
import SalesCharts from '../components/SalesCharts';

import { getCollectionAsync, selectCollection, selectStatus as selectSalesStatus } from '../app/salesSlice';

const Collection = () => {
    return (
        <div>
            <PropertyTable title="Колекція" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/collection" />
            <SalesCharts getValues={ getCollectionAsync } selectValues={ selectCollection } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.collection.id === id } />
        </div>
    );
}

export default Collection;