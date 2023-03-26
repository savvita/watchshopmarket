
import FormItemInput from '../FormItems/FormItemInput';
import FormItemSelect from '../FormItems/FormItemSelect';


import validation from '../../../modules/validation';

import { TabPane } from 'reactstrap';
import { useDispatch } from 'react-redux';

import { createAsync as createCollection, getAsync as getCollections } from '../../../app/collectionSlice';
import { createAsync as createBrand, getAsync as getBrands } from '../../../app/brandSlice';
import { createAsync as createStyle, getAsync as getStyles } from '../../../app/styleSlice';
import { createAsync as createGender, getAsync as getGenders } from '../../../app/genderSlice';
import { createAsync as createMovementType, getAsync as getMovementTypes } from '../../../app/movementtypeSlice';

const GeneralInfoTab = ({ item, tabId, setItem, brands, collections, styles, genders, movementTypes }) => {
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

    const addCollection = async (value) => {
        const res = await addValue(value, createCollection, getCollections);
        setItem({ ...item, collection: { id: res, value: value } });
        return res;
    }

    const addBrand = async (value) => {
        const res = await addValue(value, createBrand, getBrands);
        setItem({ ...item, brand: { id: res, value: value }});
        return res;
    }

    const addStyle = async(value) => {
        const res = await addValue(value, createStyle, getStyles);
        setItem({ ...item, style: { id: res, value: value }});
        return res;
    }

    const addGender = async(value) => {
        const res = await addValue(value, createGender, getGenders);
        setItem({ ...item, gender: { id: res, value: value }});
    }

    const addMovementType = async(value) => {
        const res = await addValue(value, createMovementType, getMovementTypes);
        setItem({ ...item, movementType: { id: res, value: value }});
        return res;
    }

    if(!tabId || !setItem) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            <FormItemInput name="title" title="Назва" initialValue={ item && item.title } validation={ validation.notEmptyValidationRule } validationErrorText='Обов’язкове поле' onInput={ (value) => setItem({ ...item, title: value }) } />

            <FormItemInput name="model" title="Модель" initialValue={ item && item.model } validation={ validation.notEmptyValidationRule } validationErrorText='Обов’язкове поле' onInput={ (value) => setItem({ ...item, model: value }) } />

            { brands &&
            <FormItemSelect name="brand" title="Виробник" items={ brands } initialIndex={ item && item.brand && item.brand.id } onChange={ (value) => setItem({ ...item, brand: brands.value.find(item => item.id.toString() === value) }) } onAdd={ addBrand } /> }

            { collections && <FormItemSelect name="collection" title="Колекція" items={ collections } initialIndex={ item && item.collection && item.collection.id } onChange={ (value) => setItem({ ...item, collection: collections.value.find(item => item.id.toString() === value) }) } onAdd={ addCollection } /> }

            { styles && 
            <FormItemSelect name="style" title="Стиль" items={ styles } initialIndex={ item && item.style && item.style.id } onChange={ (value) => setItem({ ...item, style: styles.value.find(item => item.id.toString() === value) }) } onAdd={ addStyle }/> }

            { genders && <FormItemSelect name="gender" title="Стать" items={ genders } initialIndex={ item && item.gender && item.gender.id } onChange={ (value) => setItem({ ...item, gender: genders.value.find(item => item.id.toString() === value) }) } onAdd={ addGender } /> }

            { movementTypes && 
            <FormItemSelect name="movementtype" title="Тип механізму" items={ movementTypes } initialIndex={ item && item.movementType && item.movementType.id } onChange={ (value) => setItem({ ...item, movementType: movementTypes.value.find(item => item.id.toString() === value) }) } onAdd={ addMovementType } /> }

            <FormItemInput name="weight" title="Вага (г)" initialValue={ item && item.weight } validation={ validation.nullOrPositiveFloatValidationRule } validationErrorText='Має бути позитивним числом'  onInput={ (value) => setItem({ ...item, weight: value }) } />
        </TabPane>
    );
}

export default GeneralInfoTab;