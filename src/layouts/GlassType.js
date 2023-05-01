import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/glasstypeSlice';
import SalesCharts from '../components/SalesCharts';

import { getGlassTypeAsync, selectGlassType, selectStatus as selectSalesStatus } from '../app/salesSlice';

const GlassType = () => {
    return (
        <div>
            <PropertyTable title="Скло" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/glasstype" />
            <SalesCharts getValues={ getGlassTypeAsync } selectValues={ selectGlassType } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.glassType.id === id } />
        </div>
    );
}

export default GlassType;