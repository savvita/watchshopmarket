import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/movementtypeSlice';

const MovementType = () => {
    return (
        <PropertyTable title="Тип механізму" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/movementtype" />
    );
}

export default MovementType;