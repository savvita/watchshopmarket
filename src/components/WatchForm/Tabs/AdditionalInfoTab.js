
import FormItemSelect from '../FormItems/FormItemSelect';
import FormItemSelectInto from '../FormItems/FormItemSelectInto';

import { TabPane } from 'reactstrap';

import { createAsync as createWaterResistance, getAsync as getWaterResistances } from '../../../app/waterresistanceSlice';
import { createAsync as createIncrustationType, getAsync as getIncrustationTypes } from '../../../app/incrustationtypeSlice';
import { createAsync as createFunction, getAsync as getFunctions } from '../../../app/functionSlice';
import { useDispatch } from 'react-redux';

const AdditionalInfoTab = ({ item, tabId, setItem, waterResistances, incrustationTypes, functions }) => {
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

    const addWaterResistance = async (value) => {
        const res = await addValue(value, createWaterResistance, getWaterResistances);
        setItem({ ...item, waterResistance: { id: res, value: value }});
        return res;
    }

    const addIncrustationType = async (value) => {
        const res = await addValue(value, createIncrustationType, getIncrustationTypes);
        setItem({ ...item, incrustationType: { id: res, value: value }});
        return res;
    }

    const addFunction = async (value) => {
        return await addValue(value, createFunction, getFunctions);
    }

    if(!tabId || !setItem) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            { waterResistances && <FormItemSelect name="waterresistance" title="Водозахист" items={ waterResistances } initialIndex={ item && item.waterResistance && item.waterResistance.id } onChange={ (value) => setItem({ ...item, waterResistance: waterResistances.value.find(item => item.id.toString() === value) }) } onAdd={ addWaterResistance } /> }

            { incrustationTypes && <FormItemSelect name="incrustationtype" title="Інкрустація" items={ incrustationTypes } initialIndex={ item && item.incrustationType && item.incrustationType.id } onChange={ (value) => setItem({ ...item, incrustationType: incrustationTypes.value.find(item => item.id.toString() === value) }) } onAdd={ addIncrustationType } /> }

            { functions && <FormItemSelectInto name="function" title="Функції" items={ functions } initialValues={ item && item.functions } onChange={ (value) => setItem({ ...item, functions: [...value] }) } onAdd={ addFunction } /> }
        </TabPane>
    );
}

export default AdditionalInfoTab;