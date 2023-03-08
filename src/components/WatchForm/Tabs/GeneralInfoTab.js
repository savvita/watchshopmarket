
import FormItemInput from '../FormItems/FormItemInput';
import FormItemSelect from '../FormItems/FormItemSelect';


import validation from '../../../modules/validation';

import { TabPane } from 'reactstrap';

const GeneralInfoTab = ({ item, tabId, setItem, brands, collections, styles, genders, movementTypes }) => {
    if(!tabId || !setItem) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            <FormItemInput name="title" title="Назва" initialValue={ item && item.title } validation={ validation.notEmptyValidationRule } validationErrorText='Обов’язкове поле' onInput={ (value) => setItem({ ...item, title: value }) } />

            <FormItemInput name="model" title="Модель" initialValue={ item && item.model } validation={ validation.notEmptyValidationRule } validationErrorText='Обов’язкове поле' onInput={ (value) => setItem({ ...item, model: value }) } />

            { brands &&
            <FormItemSelect name="brand" title="Виробник" items={ brands } initialIndex={ item && item.brand && item.brand.id } onChange={ (value) => setItem({ ...item, brand: brands.value.find(item => item.id.toString() === value) }) } /> }

            { collections && <FormItemSelect name="collection" title="Колекція" items={ collections } initialIndex={ item && item.collection && item.collection.id } onChange={ (value) => setItem({ ...item, collection: collections.value.find(item => item.id.toString() === value) }) } /> }

            { styles && 
            <FormItemSelect name="style" title="Стиль" items={ styles } initialIndex={ item && item.style && item.style.id } onChange={ (value) => setItem({ ...item, style: styles.value.find(item => item.id.toString() === value) }) } /> }

            { genders && <FormItemSelect name="gender" title="Стать" items={ genders } initialIndex={ item && item.gender && item.gender.id } onChange={ (value) => setItem({ ...item, gender: genders.value.find(item => item.id.toString() === value) }) } /> }

            { movementTypes && 
            <FormItemSelect name="movementtype" title="Тип механізму" items={ movementTypes } initialIndex={ item && item.movementType && item.movementType.id } onChange={ (value) => setItem({ ...item, movementType: movementTypes.value.find(item => item.id.toString() === value) }) } /> }

            <FormItemInput name="weight" title="Вага" initialValue={ item && item.weight } validation={ validation.nullOrPositiveFloatValidationRule } validationErrorText='Має бути позитивним числом'  onInput={ (value) => setItem({ ...item, weight: value }) } />
        </TabPane>
    );
}

export default GeneralInfoTab;