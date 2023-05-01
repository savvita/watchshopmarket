import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/caseshapeSlice';
import SalesCharts from '../components/SalesCharts';

import { getCaseShapeAsync, selectCaseShape, selectStatus as selectSalesStatus } from '../app/salesSlice';

const CaseShape = () => {
    return (
        <div>
            <PropertyTable title="Форма корпусу" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/caseshape" />
            <SalesCharts getValues={ getCaseShapeAsync } selectValues={ selectCaseShape } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.caseShape.id === id } />
        </div>
    );
}

export default CaseShape;