import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/movementtypeSlice';
import SalesCharts from '../components/SalesCharts';

import { getMovementTypeAsync, selectMovementType, selectStatus as selectSalesStatus } from '../app/salesSlice';

const MovementType = () => {
    return (
        <div>
            <PropertyTable title="Тип механізму" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/movementtype" />
            <SalesCharts getValues={ getMovementTypeAsync } selectValues={ selectMovementType } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.movementType.id === id } />
        </div>
    );
}

export default MovementType;