import WatchPropertyTable from '../components/WatchPropertyTable/WatchPropertyTable';

import { selectValues, selectCurrent, selectStatus, getAsync, getByIdAsync, deleteAsync, createAsync, updateAsync, setCurrentValue, restoreAsync } from '../app/watchSlice';

import db from '../db/db_access';

const Watch = () => {
    return (
        <WatchPropertyTable title="Годинники" selectValues={ selectValues } selectCurrent={ selectCurrent } selectStatus={ selectStatus } get={ getAsync } getValueById={ getByIdAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } saveFiles={ db.Files.upload} setCurrent={ setCurrentValue } restore={ restoreAsync } />
    );
}

export default Watch;