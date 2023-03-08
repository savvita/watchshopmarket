import InfoModal from '../InfoModal';
import GeneralInfoTab from './Tabs/GeneralInfoTab';
import CaseInfoTab from './Tabs/CaseInfoTab';
import DialInfoTab from './Tabs/DialInfoTab';
import StrapInfoTab from './Tabs/StrapInfoTab';
import AdditionalInfoTab from './Tabs/AdditionalInfoTab';

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

import { TabContent, NavLink, NavItem, Nav, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { useEffect, useState } from 'react';

import './WatchForm.css';
import DescriptionTab from './Tabs/DescriptionTab';
import ImageTab from './Tabs/ImagesTab';
import SalesInfoTab from './Tabs/SalesInfoTab';

const WatchForm = ({ isOpen, item, setItem, onAccept, onCancel }) => {
    const dialTypes = useSelector(selectDialTypes);
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
    const strapTypes = useSelector(selectStrapTypes);
    const waterResistances = useSelector(selectWaterResistances);
    const functions = useSelector(selectFunctions);
    const dispatch = useDispatch();

    const [imgs, setImgs] = useState({});

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');

    const [errorMsg, setErrorMsg] = useState([]);

    const [activeTab, setActiveTab] = useState('1');

    useEffect(() => {

        if(isOpen) {
            setActiveTab('1');
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

            if(!item) {
                dispatch(setItem({ isTop: true, onSale: true }));
            }
        }
    }, [isOpen]);


    // useEffect(() => {
    //     if(item) {
    //         setWatch({ ...item });
    //     }
    // }, [item]);


    const accept = () => { 
        const errors = validation.validateWatch(item);
       
        if(errors.length > 0) {
            setErrorMsg([ "Одно чи більше полей заповнені невірно:", ...errors ]);
            showError('Некоректні дані');
            return;
        }

        onAccept && onAccept(item, imgs.map(img => img.file).filter(img => img.file));
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

                        <GeneralInfoTab item={ item } tabId="1" setItem={ (value) => dispatch(setItem(value)) } brands={ brands } collections={ collections } styles={ styles } genders={ genders } movementTypes={ movementTypes } />

                        <CaseInfoTab item={ item } tabId="2" setItem={ (value) => dispatch(setItem(value)) } caseShapes={ caseShapes } colors={ colors } materials={ materials } />

                        <DialInfoTab item={ item } tabId="3" setItem={ (value) => dispatch(setItem(value)) } dialTypes={ dialTypes } colors={ colors } glassTypes={ glassTypes } />

                        <StrapInfoTab item={ item } tabId="4" setItem={ (value) => dispatch(setItem(value)) } strapTypes={ strapTypes } colors={ colors } />
                        
                        <AdditionalInfoTab item={ item } tabId="5" setItem={ (value) => dispatch(setItem(value)) } waterResistances={ waterResistances } incrustationTypes={ incrustationTypes } functions={ functions } />

                        <DescriptionTab item={ item } tabId="6" setItem={ (value) => dispatch(setItem(value)) } />

                        <ImageTab item={ item } tabId="7" setImages={ (imgs) => setImgs([...imgs]) } />

                        <SalesInfoTab item={ item } tabId="8" setItem={ (value) => dispatch(setItem(value)) } />
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