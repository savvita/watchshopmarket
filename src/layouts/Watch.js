import WatchPropertyTable from '../components/WatchPropertyTable/WatchPropertyTable';

import { selectValues, selectStatus, getAsync, getByIdAsync, deleteAsync, createAsync, updateAsync } from '../app/watchSlice';

import db from '../db/db_access';

const Watch = () => {
    return (
        <WatchPropertyTable title="Годинники" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } getValueById={ getByIdAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } saveFiles={ db.Files.upload} />
    );
}

export default Watch;