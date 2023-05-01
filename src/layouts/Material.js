import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/materialSlice';
import SalesCharts from '../components/SalesCharts';

import { getCaseMaterialAsync, selectCaseMaterial, selectStatus as selectSalesStatus } from '../app/salesSlice';

const Material = () => {
    return (
        <div>
            <PropertyTable title="Матеріал" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/material" />
            <div className='border border-light rounded-1 p-3 mb-2'>
                <h3 className="text-white">Матеріал корпусу</h3>
                <SalesCharts getValues={ getCaseMaterialAsync } selectValues={ selectCaseMaterial } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.caseMaterial.id === id } />
            </div>
        </div>
    );
}

export default Material;