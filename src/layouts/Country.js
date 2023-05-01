import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/countrySlice';
import SalesCharts from '../components/SalesCharts';

import { getCountryAsync, selectCountry, selectStatus as selectSalesStatus } from '../app/salesSlice';

const Country = () => {
    return (
        <div>
            <PropertyTable title="Країна" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } link="/manager/country" />
            <SalesCharts getValues={ getCountryAsync } selectValues={ selectCountry } selectStatus={ selectSalesStatus } selectProps={ selectValues } saleFilter={ (item, id) => item.watch.brand.country.id === id } />
        </div>
    );
}

export default Country;