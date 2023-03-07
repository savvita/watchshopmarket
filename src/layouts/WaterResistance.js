import PropertyTable from '../components/PropertyTable/PropertyTable';

import { selectValues, selectStatus, getAsync, deleteAsync, createAsync, updateAsync } from '../app/waterresistanceSlice';

const WaterResistance = () => {
    // const columns = [
    //     { 
    //         header: 'Id', 
    //         value: 'id', 
    //         type: 'text',
    //         width: 'auto'
    //     },
    //     { 
    //         header: 'Значення', 
    //         value: 'value', 
    //         type: 'input',
    //         width: '100%' 
    //     },
    // ];

    return (
        <PropertyTable title="Водозахист" selectValues={ selectValues } selectStatus={ selectStatus } get={ getAsync } update={ updateAsync } create={ createAsync} remove={ deleteAsync } />
    );
}

export default WaterResistance;