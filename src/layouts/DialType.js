import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/dialtypeSlice';

const DialType = () => {
    return (
        <PropertyTable title="Вид циферблату" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/dialtype" />
    );
}

export default DialType;