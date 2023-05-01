import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/functionSlice';
import SalesCharts from '../components/SalesCharts';

import { getFunctionAsync, selectFunction, selectStatus as selectSalesStatus } from '../app/salesSlice';

const Function = () => {
    return (
        <div>
            <PropertyTable title="Функції" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/function" />
            <SalesCharts getValues={ getFunctionAsync } selectValues={ selectFunction } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.functions.map(x => x.id).includes(id) } />
        </div>
    );
}

export default Function;