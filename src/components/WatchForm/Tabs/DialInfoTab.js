
import FormItemSelect from '../FormItems/FormItemSelect';

import { TabPane } from 'reactstrap';

import { createAsync as createDialType, getAsync as getDialTypes } from '../../../app/dialtypeSlice';
import { createAsync as createGlassType, getAsync as getGlassTypes } from '../../../app/glasstypeSlice';
import { createAsync as createColor, getAsync as getColors } from '../../../app/colorSlice';
import { useDispatch } from 'react-redux';

const DialInfoTab = ({ item, tabId, setItem, dialTypes, colors, glassTypes }) => {
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

    const addDialType = async (value) => {
        const res = await addValue(value, createDialType, getDialTypes);
        setItem({ ...item, dialType: { id: res, value: value }});
        return res;
    }

    const addGlassType = async (value) => {
        const res = await addValue(value, createGlassType, getGlassTypes);
        setItem({ ...item, glassType: { id: res, value: value }});
        return res;
    }

    const addColor = async (value) => {
        const res = await addValue(value, createColor, getColors);
        setItem({ ...item, dialColor: { id: res, value: value }});
        return res;
    }

    if(!tabId || !setItem) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            { dialTypes && <FormItemSelect name="dialtype" title="Тип циферблату" items={ dialTypes } initialIndex={ item && item.dialType && item.dialType.id } onChange={ (value) => setItem({ ...item, dialType: dialTypes.value.find(item => item.id.toString() === value) }) } onAdd={ addDialType } /> }

            { colors && <FormItemSelect name="dialcolor" title="Колір циферблату" items={ colors } initialIndex={ item && item.dialColor && item.dialColor.id } onChange={ (value) => setItem({ ...item, dialColor: colors.value.find(item => item.id.toString() === value) }) } onAdd={ addColor } /> }

            { glassTypes && <FormItemSelect name="glasstype" title="Скло" items={ glassTypes } initialIndex={ item && item.glassType && item.glassType.id } onChange={ (value) => setItem({ ...item, glassType: glassTypes.value.find(item => item.id.toString() === value) }) } onAdd={ addGlassType } /> }
        </TabPane>
    );
}

export default DialInfoTab;