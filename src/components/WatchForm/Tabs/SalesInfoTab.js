
import FormItemInput from '../FormItems/FormItemInput';
import FormItemCheckbox from '../FormItems/FormItemCheckbox';
import FormItemNumber from '../FormItems/FormItemNumber';


import validation from '../../../modules/validation';

import { TabPane } from 'reactstrap';

const SalesInfoTab = ({ item, tabId, setItem }) => {
    if(!tabId || !setItem) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            <FormItemInput name="price" title="Ціна" initialValue={ item && item.price } validation={ validation.positiveFloatValidationRule } validationErrorText='Обов’язкове поле' onInput={ (value) => setItem({ ...item, price: value }) } />

            <FormItemInput name="discount" title="Знижка (%)" initialValue={ item && item.discount } validation={ validation.discountValidation } validationErrorText='Має бути позитивним числом менше 100' onInput={ (value) => setItem({ ...item, discount: value }) } />

            <FormItemCheckbox name="onsale" title="В продажі" initialState={ item && item.onSale } onChange={ (value) => setItem({ ...item, onSale: !value }) } />

            <FormItemCheckbox name="istop" title="Популярний товар" initialState={ item && item.isTop } onChange={ (value) => setItem({ ...item, isTop: !value }) } />

            <FormItemNumber name="available" title="В наявності" initialValue={ item && item.available } validation={ validation.positiveIntValidationRule } validationErrorText='Має бути цілим позитивним числом' min="0" onChange={ (value) => setItem({ ...item, available: value }) } />
        </TabPane>
    );
}

export default SalesInfoTab;