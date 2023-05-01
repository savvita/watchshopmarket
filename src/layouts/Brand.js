import BrandPropertyTable from '../components/BrandPropertyTable/BrandPropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/brandSlice';
import SalesCharts from '../components/SalesCharts';

import { getBrandAsync, selectBrand, selectStatus as selectSalesStatus } from '../app/salesSlice';

const Brand = () => {
    return (
        <div>
            <BrandPropertyTable title="Виробник" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/brand" />
            <SalesCharts getValues={ getBrandAsync } selectValues={ selectBrand } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.brand.id === id } />
        </div>
    );
}

export default Brand;