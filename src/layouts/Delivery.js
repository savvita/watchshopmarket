import AdminPropertyTable from '../components/AdminPropertyTable/AdminPropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/deliverySlice';

const Delivery = () => {
    return (
        <AdminPropertyTable title="Доставка" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } />
    );
}

export default Delivery;