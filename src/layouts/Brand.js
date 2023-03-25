import BrandPropertyTable from '../components/BrandPropertyTable/BrandPropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/brandSlice';

const Brand = () => {
    return (
        <BrandPropertyTable title="Виробник" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/brand" />
    );
}

export default Brand;