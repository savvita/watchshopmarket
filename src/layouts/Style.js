import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/styleSlice';
import SalesCharts from '../components/SalesCharts';

import { getStyleAsync, selectStyle, selectStatus as selectSalesStatus } from '../app/salesSlice';

const Style = () => {
    return (
        <div>
            <PropertyTable title="Стиль" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/style" />
            <SalesCharts getValues={ getStyleAsync } selectValues={ selectStyle } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.style.id === id } />
        </div>
    );
}

export default Style;