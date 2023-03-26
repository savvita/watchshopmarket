
import FormItemInput from '../FormItems/FormItemInput';
import FormItemSelect from '../FormItems/FormItemSelect';

import { createAsync as createCaseShape, getAsync as getCaseShapes } from '../../../app/caseshapeSlice';
import { createAsync as createColor, getAsync as getColors } from '../../../app/colorSlice';
import { createAsync as createMaterial, getAsync as getMaterials } from '../../../app/materialSlice';
import { useDispatch } from 'react-redux';

import validation from '../../../modules/validation';

import { TabPane } from 'reactstrap';

const CaseInfoTab = ({ item, tabId, setItem, caseShapes, colors, materials }) => {
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

    const addCaseShape = async (value) => {
        const res = await addValue(value, createCaseShape, getCaseShapes);
        setItem({ ...item, caseShape: { id: res, value: value }});
        return res;
    }

    const addColor = async (value) => {
        const res = await addValue(value, createColor, getColors);
        setItem({ ...item, caseColor: { id: res, value: value }});
        return res;
    }

    const addMaterial = async (value) => {
        const res = await addValue(value, createMaterial, getMaterials);
        setItem({ ...item, caseMaterial: { id: res, value: value }});
        return res;
    }

    if(!tabId || !setItem) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            { caseShapes && <FormItemSelect name="caseshape" title="Форма корпусу" items={ caseShapes } initialIndex={ item && item.caseShape && item.caseShape.id } onChange={ (value) => setItem({ ...item, caseShape: caseShapes.value.find(item => item.id.toString() === value) }) } onAdd={ addCaseShape } /> }

            { materials && <FormItemSelect name="casematerial" title="Матеріал корпусу" items={ materials } initialIndex={ item && item.caseMaterial && item.caseMaterial.id } onChange={ (value) => setItem({ ...item, caseMaterial: materials.value.find(item => item.id.toString() === value) }) } onAdd={ addMaterial } /> }

            <FormItemInput name="casesize" title="Розмір корпусу (мм)" initialValue={ item && item.caseSize } validation={ validation.nullOrPositiveFloatValidationRule } validationErrorText='Має бути позитивним числом' onInput={ (value) => setItem({ ...item, caseSize: value }) } />

            { colors && <FormItemSelect name="casecolor" title="Колір корпусу" items={ colors } initialIndex={ item && item.caseColor && item.caseColor.id } onChange={ (value) => setItem({ ...item, caseColor: colors.value.find(item => item.id.toString() === value) }) } onAdd={ addColor } /> }
        </TabPane>
    );
}

export default CaseInfoTab;