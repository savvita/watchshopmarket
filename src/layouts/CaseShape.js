import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/caseshapeSlice';

const CaseShape = () => {
    return (
        <PropertyTable title="Форма корпусу" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/caseshape" />
    );
}

export default CaseShape;