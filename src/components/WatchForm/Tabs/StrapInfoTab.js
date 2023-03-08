
import FormItemSelect from '../FormItems/FormItemSelect';

import { TabPane } from 'reactstrap';

const StrapInfoTab = ({ item, tabId, setItem, strapTypes, colors }) => {
    if(!tabId || !setItem) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            { strapTypes && <FormItemSelect name="straptype" title="Браслет/ремінець" items={ strapTypes } initialIndex={ item && item.strapType && item.strapType.id } onChange={ (value) => setItem({ ...item, strapType: strapTypes.value.find(item => item.id.toString() === value) }) } /> }

            { colors && <FormItemSelect name="strapcolor" title="Колір браслету/ремінця" items={ colors } initialIndex={ item && item.strapColor && item.strapColor.id } onChange={ (value) => setItem({ ...item, strapColor: colors.value.find(item => item.id.toString() === value) }) } /> }
        </TabPane>
    );
}

export default StrapInfoTab;