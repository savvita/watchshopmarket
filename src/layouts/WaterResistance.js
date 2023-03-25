import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/waterresistanceSlice';

const WaterResistance = () => {

    return (
        <PropertyTable title="Водозахист" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/waterresistance" />
    );
}

export default WaterResistance;