import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/genderSlice';
import SalesCharts from '../components/SalesCharts';

import { getGenderAsync, selectGender, selectStatus as selectSalesStatus } from '../app/salesSlice';

const Gender = () => {
    return (
        <div>
            <PropertyTable title="Стать" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/gender" />
            <SalesCharts getValues={ getGenderAsync } selectValues={ selectGender } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.gender.id === id } />
        </div>
    );
}

export default Gender;