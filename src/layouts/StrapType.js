import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/straptypeSlice';

import SalesCharts from '../components/SalesCharts';

import { getStrapTypeAsync, selectStrapType, selectStatus as selectSalesStatus } from '../app/salesSlice';

const StrapType = () => {
    return (
        <div>
            <PropertyTable title="Браслет/ремінець" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/straptype" />
            <SalesCharts getValues={ getStrapTypeAsync } selectValues={ selectStrapType } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.strapType.id === id } />
        </div>
    );
}

export default StrapType;