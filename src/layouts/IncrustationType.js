import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/incrustationtypeSlice';

const IncrustationType = () => {
    return (
        <PropertyTable title="Інкрустація" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/incrustationtype" />
    );
}

export default IncrustationType;