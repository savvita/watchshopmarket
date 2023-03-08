
import FormItemInput from '../FormItems/FormItemInput';
import FormItemSelect from '../FormItems/FormItemSelect';


import validation from '../../../modules/validation';

import { TabPane } from 'reactstrap';

const CaseInfoTab = ({ item, tabId, setItem, caseShapes, colors, materials }) => {
    if(!tabId || !setItem) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            { caseShapes && <FormItemSelect name="caseshape" title="Форма корпусу" items={ caseShapes } initialIndex={ item && item.caseShape && item.caseShape.id } onChange={ (value) => setItem({ ...item, caseShape: caseShapes.value.find(item => item.id.toString() === value) }) } /> }

            { materials && <FormItemSelect name="casematerial" title="Матеріал корпусу" items={ materials } initialIndex={ item && item.caseMaterial && item.caseMaterial.id } onChange={ (value) => setItem({ ...item, caseMaterial: materials.value.find(item => item.id.toString() === value) }) } /> }

            <FormItemInput name="casesize" title="Розмір корпусу" initialValue={ item && item.caseSize } validation={ validation.nullOrPositiveFloatValidationRule } validationErrorText='Має бути позитивним числом' onInput={ (value) => setItem({ ...item, caseSize: value }) } />

            { colors && <FormItemSelect name="casecolor" title="Колір корпусу" items={ colors } initialIndex={ item && item.caseColor && item.caseColor.id } onChange={ (value) => setItem({ ...item, caseColor: colors.value.find(item => item.id.toString() === value) }) } /> }
        </TabPane>
    );
}

export default CaseInfoTab;