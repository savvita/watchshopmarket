import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/waterresistanceSlice';
import SalesCharts from '../components/SalesCharts';

import { getWaterResistanceAsync, selectWaterResistance, selectStatus as selectSalesStatus } from '../app/salesSlice';

const WaterResistance = () => {

    return (
        <div>
            <PropertyTable title="Водозахист" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/waterresistance" />
            <SalesCharts getValues={ getWaterResistanceAsync } selectValues={ selectWaterResistance } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.waterResistance.id === id } />
        </div>
    );
}

export default WaterResistance;