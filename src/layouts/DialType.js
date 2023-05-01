import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/dialtypeSlice';
import SalesCharts from '../components/SalesCharts';

import { getDialTypeAsync, selectDialType, selectStatus as selectSalesStatus } from '../app/salesSlice';

const DialType = () => {
    return (
        <div>
            <PropertyTable title="Вид циферблату" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/dialtype" />
            <SalesCharts getValues={ getDialTypeAsync } selectValues={ selectDialType } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.dialType.id === id } />
        </div>
    );
}

export default DialType;