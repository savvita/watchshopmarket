import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, TabContent } from "reactstrap";



import './SlideContainer.css';
import AppearanceTab from "./Tabs/AppearanceTab";
import PreviewTab from "./Tabs/PreviewTab";
import PromotionTab from "./Tabs/PromotionTab";


const SlideForm = ({ item, isOpen, onCancel, onAccept }) => {

    const [slide, setSlide] = useState({
        imageUrl: null,
        index: 0,
        isActive: false,
        texts: [],
        promotion: null
    });

    const [activeTab, setActiveTab] = useState('1');

    useEffect(() => {
        if(!item) {
            return;
        }

        setSlide({ ...item });
    }, [item]);

    const accept = () => {
        if(!slide) {
            return;
        }

        onAccept && onAccept({ ...slide });
    }

    return (
        <div>
            <Modal isOpen={ isOpen } size="xl">
                <ModalHeader>{ item && item.id ? 'Редагування слайду' : 'Додати новий слайд'}</ModalHeader>
                <ModalBody>
                    <Nav tabs>
                        <NavItem>
                            <NavLink className={activeTab === '1' ? 'watch-form__tab active' : 'watch-form__tab'} onClick={() => setActiveTab('1')}>
                                Зовнішній вигляд
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={activeTab === '2' ? 'watch-form__tab active' : 'watch-form__tab'} onClick={() => setActiveTab('2')}>
                                Акція
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={activeTab === '3' ? 'watch-form__tab active' : 'watch-form__tab'} onClick={() => setActiveTab('3')}>
                                Публікація
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={ activeTab }>
                        <PreviewTab tabId="1" onChange={ (item) => setSlide({ ...slide, imageUrl: item.imageUrl, texts: [ ...item.texts ] })} />
                         <PromotionTab tabId="2" onChange={ (item) => setSlide({ ...slide, promotion: item })} />
                        <AppearanceTab tabId="3" onChange={ (item) => setSlide({ ...slide, isActive: item.isActive, index: item.index }) } />                 
                    </TabContent>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={ accept }>Зберегти</Button>{' '}
                    <Button color="secondary" onClick={ onCancel }>Скасувати</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default SlideForm;