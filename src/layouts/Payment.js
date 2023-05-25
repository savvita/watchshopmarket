import AdminPropertyTable from '../components/AdminPropertyTable/AdminPropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/paymentSlice';

const Payment = () => {
    return (
        <AdminPropertyTable title="Оплата" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } />
    );
}

export default Payment;