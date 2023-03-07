import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/straptypeSlice';

const StrapType = () => {
    return (
        <PropertyTable title="Браслет/ремінець" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } />
    );
}

export default StrapType;