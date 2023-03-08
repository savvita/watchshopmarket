
import FormItemSelect from '../FormItems/FormItemSelect';

import { TabPane } from 'reactstrap';

const DialInfoTab = ({ item, tabId, setItem, dialTypes, colors, glassTypes }) => {
    if(!tabId || !setItem) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            { dialTypes && <FormItemSelect name="dialtype" title="Тип циферблату" items={ dialTypes } initialIndex={ item && item.dialType && item.dialType.id } onChange={ (value) => setItem({ ...item, dialType: dialTypes.value.find(item => item.id.toString() === value) }) } /> }

            { colors && <FormItemSelect name="dialcolor" title="Колір циферблату" items={ colors } initialIndex={ item && item.dialColor && item.dialColor.id } onChange={ (value) => setItem({ ...item, dialColor: colors.value.find(item => item.id.toString() === value) }) } /> }

            { glassTypes && <FormItemSelect name="glasstype" title="Скло" items={ glassTypes } initialIndex={ item && item.glassType && item.glassType.id } onChange={ (value) => setItem({ ...item, glassType: glassTypes.value.find(item => item.id.toString() === value) }) } /> }
        </TabPane>
    );
}

export default DialInfoTab;