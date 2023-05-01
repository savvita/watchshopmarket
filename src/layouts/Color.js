import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/colorSlice';
import SalesCharts from '../components/SalesCharts';

import { getCaseColorAsync, getDialColorAsync, getStrapColorAsync, selectCaseColor, selectDialColor, selectStrapColor, selectStatus as selectSalesStatus } from '../app/salesSlice';

const Color = () => {
    return (
        <div>
            <PropertyTable title="Колір" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/color" />
            <div className='border border-light rounded-1 p-3'>
                <h3 className="text-white">Колір корпусу</h3>
                <SalesCharts getValues={ getCaseColorAsync } selectValues={ selectCaseColor } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.caseColor.id === id } />
            </div>
            <div className='border border-light rounded-1 p-3 mt-2'>
                <h3 className="text-white">Колір циферблату</h3>
                <SalesCharts getValues={ getDialColorAsync } selectValues={ selectDialColor } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.dialColor.id === id } />
            </div>
            <div className='border border-light rounded-1 p-3 mt-2 mb-2'>
                <h3 className="text-white">Колір браслету/ремінця</h3>
                <SalesCharts getValues={ getStrapColorAsync } selectValues={ selectStrapColor } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.strapColor.id === id } />
            </div>
        </div>
    );
}

export default Color;