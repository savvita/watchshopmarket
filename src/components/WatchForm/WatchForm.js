import FormItemInput from './FormItemInput';
import FormItemSelect from './FormItemSelect';
import FormItemCheckbox from './FormItemCheckbox';
import FormItemTextArea from './FormItemTextArea';
import FormItemNumber from './FormItemNumber';
import FormItemSelectInto from './FormItemSelectInto';
import FormItemImageFile from './FormItemImageFile';
import InfoModal from '../InfoModal';

import validation from '../../modules/validation';

import { selectValues as selectDialTypes, getAsync as getDialTypes } from '../../app/dialtypeSlice';
import { selectValues as selectBrands, getAsync as getBrands } from '../../app/brandSlice';
import { selectValues as selectCollections, getAsync as getCollections } from '../../app/collectionSlice';
import { selectValues as selectStyles, getAsync as getStyles } from '../../app/styleSlice';
import { selectValues as selectGenders, getAsync as getGenders } from '../../app/genderSlice';
import { selectValues as selectMovementTypes, getAsync as getMovementTypes } from '../../app/movementtypeSlice';
import { selectValues as selectColors, getAsync as getColors } from '../../app/colorSlice';
import { selectValues as selectCaseShapes, getAsync as getCaseShapes } from '../../app/caseshapeSlice';
import { selectValues as selectGlassTypes, getAsync as getGlassTypes } from '../../app/glasstypeSlice';
import { selectValues as selectIncrustationTypes, getAsync as getIncrustationTypes } from '../../app/incrustationtypeSlice';
import { selectValues as selectMaterials, getAsync as getMaterials } from '../../app/materialSlice';
import { selectValues as selectStrapTypes, getAsync as getStrapTypes } from '../../app/straptypeSlice';
import { selectValues as selectWaterResistances, getAsync as getWaterResistances } from '../../app/waterresistanceSlice';
import { selectValues as selectFunctions, getAsync as getFunctions } from '../../app/functionSlice';
import { useSelector, useDispatch } from 'react-redux';

import { TabPane, TabContent, NavLink, NavItem, Nav, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

import { useEffect, useState } from 'react';

import './WatchForm.css';

const WatchForm = ({ isOpen, item, onAccept, onCancel }) => {
    const dialtypes = useSelector(selectDialTypes);
    const brands = useSelector(selectBrands);
    const collections = useSelector(selectCollections);
    const styles = useSelector(selectStyles);
    const genders = useSelector(selectGenders);
    const movementTypes = useSelector(selectMovementTypes);
    const colors = useSelector(selectColors);
    const caseShapes = useSelector(selectCaseShapes);
    const glassTypes = useSelector(selectGlassTypes);
    const incrustationTypes = useSelector(selectIncrustationTypes);
    const materials = useSelector(selectMaterials);
    const straptypes = useSelector(selectStrapTypes);
    const waterResistances = useSelector(selectWaterResistances);
    const functions = useSelector(selectFunctions);
    const dispatch = useDispatch();

    const [watch, setWatch] = useState({});
    const [imgs, setImgs] = useState({});

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');

    const [errorMsg, setErrorMsg] = useState([]);

    useEffect(() => {

        if(isOpen) {
            dispatch(getDialTypes());
            dispatch(getBrands());
            dispatch(getCollections());
            dispatch(getStyles());
            dispatch(getGenders());
            dispatch(getMovementTypes());
            dispatch(getColors());
            dispatch(getCaseShapes());
            dispatch(getGlassTypes());
            dispatch(getIncrustationTypes());
            dispatch(getMaterials());
            dispatch(getStrapTypes());
            dispatch(getWaterResistances());
            dispatch(getFunctions());
        }

        if(item) {
            setWatch(item);
        }
    }, [isOpen]);

    const [activeTab, setActiveTab] = useState('1');

    const positiveFloadValidation = (value) => {
        if(!value) {
            return true;
        }

        return validation.positiveFloatValidationRule(value);
    }

    const discountValidation = (value) => {
        if(!value) {
            return true;
        }

        return validation.positiveFloatValidationRule(value) && parseFloat(value) < 100;
    }

    const positiveIntValidation = (value) => {
        if(!value) {
            return true;
        }
        return validation.positiveIntValidationRule(value);
    }

    const accept = () => { 
        errorMsg.splice(0, errorMsg.length);

        if(!watch.title || !watch.model || !watch.price || !watch.available) {
            errorMsg.push('Не всі обов’язкові поля заповнені');
        }

        if(watch.weight && !validation.positiveFloatValidationRule(watch.weight)) {
            errorMsg.push('Значення поля Вага має бути позитивним числом');
        }

        if(watch.caseSize && !validation.positiveFloatValidationRule(watch.caseSize)) {
            errorMsg.push('Значення поля Розмір корпусу має бути позитивним числом');
            console.log(watch);
        }

        if(!validation.positiveFloatValidationRule(watch.price)) {
            errorMsg.push('Значення поля Ціна має бути позитивним числом');
        }

        if(!discountValidation(watch.discount)) {
            errorMsg.push('Значення поля Знижка має бути позитивним числом');
        }

        if(!validation.positiveIntValidationRule(watch.available)) {
            errorMsg.push('Значення поля В наявності має бути позитивним числом');
        }

        if(errorMsg.length > 0) {
            setErrorMsg([ "Одно чи більше полей заповнені невірно:", ...errorMsg ]);
            showError('Некоректні дані');
            return;
        }

        onAccept && onAccept(watch, imgs.map(img => img.file));
    }

    const showError = (title) => {
        setInfoHeader(title ?? 'Інформація');
        setInfoModal(true);
    }
    
    return (
        <>
            <Modal isOpen={ isOpen } size="xl">
                <ModalHeader>{ item && item.id ? 'Редагування товару' : 'Додати новий товар'}</ModalHeader>
                <ModalBody>
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={activeTab === '1' ? 'watch-form__tab active' : 'watch-form__tab'} onClick={() => setActiveTab('1')}>
                                Загальні дані
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={activeTab === '2' ? 'watch-form__tab active' : 'watch-form__tab'} onClick={() => setActiveTab('2')}>
                                Корпус
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={activeTab === '3' ? 'watch-form__tab active' : 'watch-form__tab'} onClick={() => setActiveTab('3')}>
                                Циферблат
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={activeTab === '4' ? 'watch-form__tab active' : 'watch-form__tab'} onClick={() => setActiveTab('4')}>
                                Браслет/ремінець
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={activeTab === '5' ? 'watch-form__tab active' : 'watch-form__tab'} onClick={() => setActiveTab('5')}>
                                Додаткові дані
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={activeTab === '6' ? 'watch-form__tab active' : 'watch-form__tab'} onClick={() => setActiveTab('6')}>
                                Опис
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={activeTab === '7' ? 'watch-form__tab active' : 'watch-form__tab'} onClick={() => setActiveTab('7')}>
                                Зображення
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={activeTab === '8' ? 'watch-form__tab active' : 'watch-form__tab'} onClick={() => setActiveTab('8')}>
                                Продаж
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={ activeTab }>
                        <TabPane tabId="1">
                            <FormItemInput name="title" title="Назва" inititalValue={ item && item.title } validation={ validation.notEmptyValidationRule } validationErrorText='Обов’язкове поле' onInput={ (value) => setWatch({ ...watch, title: value }) } />
                            <FormItemInput name="model" title="Модель" inititalValue={ item && item.model } validation={ validation.notEmptyValidationRule } validationErrorText='Обов’язкове поле' onInput={ (value) => setWatch({ ...watch, model: value }) } />
                            <FormItemSelect name="brand" title="Виробник" items={ brands } inititalValue={ item && item.brand && item.brand.id } onChange={ (value) => setWatch({ ...watch, brand: brands.value.find(item => item.id == value) }) } />
                            <FormItemSelect name="collection" title="Колекція" items={ collections } onChange={ (value) => setWatch({ ...watch, collection: collections.value.find(item => item.id == value) }) } />
                            <FormItemSelect name="style" title="Стиль" items={ styles } onChange={ (value) => setWatch({ ...watch, style: styles.value.find(item => item.id == value) }) } />
                            <FormItemSelect name="gender" title="Стать" items={ genders} onChange={ (value) => setWatch({ ...watch, gender: genders.value.find(item => item.id == value) }) } />
                            <FormItemSelect name="movementtype" title="Тип механізму" items={ movementTypes } onChange={ (value) => setWatch({ ...watch, movementType: movementTypes.value.find(item => item.id == value) }) } />
                            <FormItemInput name="weight" title="Вага" inititalValue={ item && item.weight } validation={ positiveFloadValidation } validationErrorText='Має бути позитивним числом'  onInput={ (value) => setWatch({ ...watch, weight: value }) } />
                        </TabPane>
                        <TabPane tabId="2">
                            <FormItemSelect name="caseshape" title="Форма корпусу" items={ caseShapes} onChange={ (value) => setWatch({ ...watch, caseShape: caseShapes.value.find(item => item.id == value) }) } />
                            <FormItemSelect name="casematerial" title="Матеріал корпусу" items={ materials} onChange={ (value) => setWatch({ ...watch, caseMaterial: materials.value.find(item => item.id == value) }) } />
                            <FormItemInput name="casesize" title="Розмір корпусу" validation={ positiveFloadValidation } validationErrorText='Має бути позитивним числом' onInput={ (value) => setWatch({ ...watch, caseSize: value }) } />
                            <FormItemSelect name="casecolor" title="Колір корпусу" items={ colors } onChange={ (value) => setWatch({ ...watch, caseColor: colors.value.find(item => item.id == value) }) } />
                        </TabPane>
                        <TabPane tabId="3">
                            <FormItemSelect name="dialtype" title="Тип циферблату" items={ dialtypes } onChange={ (value) => setWatch({ ...watch, dialType: dialtypes.value.find(item => item.id == value) }) } />
                            <FormItemSelect name="dialcolor" title="Колір циферблату" items={ colors } onChange={ (value) => setWatch({ ...watch, dialColor: colors.value.find(item => item.id == value) }) } />
                            <FormItemSelect name="glasstype" title="Скло" items={ glassTypes } onChange={ (value) => setWatch({ ...watch, glassType: glassTypes.value.find(item => item.id == value) }) } />
                        </TabPane>
                        <TabPane tabId="4">
                            <FormItemSelect name="straptype" title="Браслет/ремінець" items={ straptypes } onChange={ (value) => setWatch({ ...watch, strapType: straptypes.value.find(item => item.id == value) }) } />
                            <FormItemSelect name="strapcolor" title="Колір браслету/ремінця" items={ colors } onChange={ (value) => setWatch({ ...watch, strapColor: colors.value.find(item => item.id == value) }) } />
                        </TabPane>
                        <TabPane tabId="5">
                            <FormItemSelect name="waterresistance" title="Водозахист" items={ waterResistances } onChange={ (value) => setWatch({ ...watch, waterResistance: waterResistances.value.find(item => item.id == value) }) } />
                            <FormItemSelect name="incrustationtype" title="Інкрустація" items={ incrustationTypes } onChange={ (value) => setWatch({ ...watch, incrustationType: incrustationTypes.value.find(item => item.id == value) }) } />
                            <FormItemSelectInto name="function" title="Функції" items={ functions } onChange={ (items) => setWatch({ ...watch, functions: [...items] }) } />
                        </TabPane>
                        <TabPane tabId="6">
                            <FormItemTextArea name="description" title="Опис" onInput={ (value) => setWatch({ ...watch, description: value }) } />
                        </TabPane>
                        <TabPane tabId="7">
                            <FormItemImageFile onChange={ (imgs => setImgs([...imgs])) } />
                        </TabPane>
                        <TabPane tabId="8">
                            <FormItemInput name="price" title="Ціна" validation={ validation.positiveFloatValidationRule } validationErrorText='Обов’язкове поле' onInput={ (value) => setWatch({ ...watch, price: value }) } />
                            <FormItemInput name="discount" title="Знижка (%)" validation={ discountValidation } validationErrorText='Має бути позитивним числом менше 100' onInput={ (value) => setWatch({ ...watch, discount: value }) } />
                            <FormItemCheckbox name="onsale" title="В продажі" onChange={ (value) => setWatch({ ...watch, onSale: value }) } />
                            <FormItemCheckbox name="istop" title="Популярний товар" onChange={ (value) => setWatch({ ...watch, isTop: value }) } />
                            <FormItemNumber name="available" title="В наявності" validation={ positiveIntValidation } validationErrorText='Має бути цілим позитивним числом' min="0" onChange={ (value) => setWatch({ ...watch, available: value }) } />
                        </TabPane>
                    </TabContent>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={ accept }>Зберегти</Button>{' '}
                    <Button color="secondary" onClick={ onCancel }>Скасувати</Button>
                </ModalFooter>
            </Modal>
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) } title={ infoHeader }>
                { errorMsg && errorMsg.map((item, idx) => <p key={ idx }>{ item }</p>)}
            </InfoModal>
        </>
    );
}

export default WatchForm;