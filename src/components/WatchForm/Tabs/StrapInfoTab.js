
import FormItemSelect from '../FormItems/FormItemSelect';

import { TabPane } from 'reactstrap';

import { createAsync as createStrapType, getAsync as getStrapTypes } from '../../../app/straptypeSlice';
import { createAsync as createColor, getAsync as getColors } from '../../../app/colorSlice';
import { useDispatch } from 'react-redux';

const StrapInfoTab = ({ item, tabId, setItem, strapTypes, colors }) => {
    const dispatch = useDispatch();

    const addValue = async(value, create, get) => {
        if(!value || !create || !get) {
            return;
        }

        const res = await dispatch(create({ value: value }));

        if(res && res.payload && res.payload.value) {
            await dispatch(get());
            return res.payload.value.id;
        }

        return undefined;
    }

    const addStrapType = async (value) => {
        const res = await addValue(value, createStrapType, getStrapTypes);
        setItem({ ...item, strapType: { id: res, value: value }});
        return res;
    }

    const addColor = async (value) => {
        const res = await addValue(value, createColor, getColors);
        setItem({ ...item, strapColor: { id: res, value: value }});
        return res;
    }

    if(!tabId || !setItem) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            { strapTypes && <FormItemSelect name="straptype" title="Браслет/ремінець" items={ strapTypes } initialIndex={ item && item.strapType && item.strapType.id } onChange={ (value) => setItem({ ...item, strapType: strapTypes.value.find(item => item.id.toString() === value) }) } onAdd={ addStrapType } /> }

            { colors && <FormItemSelect name="strapcolor" title="Колір браслету/ремінця" items={ colors } initialIndex={ item && item.strapColor && item.strapColor.id } onChange={ (value) => setItem({ ...item, strapColor: colors.value.find(item => item.id.toString() === value) }) } onAdd={ addColor } /> }
        </TabPane>
    );
}

export default StrapInfoTab;