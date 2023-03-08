
import FormItemSelect from '../FormItems/FormItemSelect';
import FormItemSelectInto from '../FormItems/FormItemSelectInto';

import { TabPane } from 'reactstrap';

const AdditionalInfoTab = ({ item, tabId, setItem, waterResistances, incrustationTypes, functions }) => {
    if(!tabId || !setItem) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            { waterResistances && <FormItemSelect name="waterresistance" title="Водозахист" items={ waterResistances } initialIndex={ item && item.waterResistance && item.waterResistance.id } onChange={ (value) => setItem({ ...item, waterResistance: waterResistances.value.find(item => item.id.toString() === value) }) } /> }

            { incrustationTypes && <FormItemSelect name="incrustationtype" title="Інкрустація" items={ incrustationTypes } initialIndex={ item && item.incrustationType && item.incrustationType.id } onChange={ (value) => setItem({ ...item, incrustationType: incrustationTypes.value.find(item => item.id.toString() === value) }) } /> }

            { functions && <FormItemSelectInto name="function" title="Функції" items={ functions } initialValues={ item && item.functions } onChange={ (value) => setItem({ ...item, functions: [...value] }) } /> }
        </TabPane>
    );
}

export default AdditionalInfoTab;