import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/incrustationtypeSlice';
import SalesCharts from '../components/SalesCharts';

import { getIncrustationTypeAsync, selectIncrustationType, selectStatus as selectSalesStatus } from '../app/salesSlice';

const IncrustationType = () => {
    return (
        <div>
            <PropertyTable title="Інкрустація" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/incrustationtype" />
            <SalesCharts getValues={ getIncrustationTypeAsync } selectValues={ selectIncrustationType } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.incrustationType.id === id } />
        </div>
    );
}

export default IncrustationType;