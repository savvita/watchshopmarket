
import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Table, Row, Col } from 'reactstrap';
import Reviews from '../Reviews/Reviews';

import { createAsync } from '../../app/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';

import { getByIdAsync } from '../../app/watchSlice';
import InfoModal from '../InfoModal';
import NewReview from '../Reviews/NewReview';
import { selectCurrent } from '../../app/authSlice';

const WatchDetailInfo = ({ item, className }) => {
    const user = useSelector(selectCurrent);

    const [activeTab, setActiveTab] = useState('1');

    const [value, setValue] = useState({});

    const dispatch = useDispatch();

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    useEffect(() => {
        setValue({ ...item });
    }, [item]);

    if(!item) return null;

    const saveReview = async (val) => {
        const review = {
            text: val.value,
            rate: val.rate,
            watchId: item.id
        };

        const res = await dispatch(createAsync(review));

        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText('Щось пішло не так. Спробуйте пізніше');
            setInfoModal(true);
        }
        else {
            const res = await dispatch(getByIdAsync(value.id));

            if(res && res.payload && res.payload.value) {
                setValue(res.payload.value);
            }
        }
    }

    return (
        <div className={ className }>
            <Nav tabs>
                <NavItem>
                    <NavLink className={activeTab === '1' ? 'active' : 'watch-info_details-tabs'} onClick={() => setActiveTab('1')}>
                        Опис
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={activeTab === '2' ? 'active' : 'watch-info_details-tabs'} onClick={() => setActiveTab('2')}>
                        Додаткова інформація
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={activeTab === '3' ? 'active' : 'watch-info_details-tabs'} onClick={() => setActiveTab('3')}>
                        Відгуки
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    { value.description && <p className="text-white mt-2">{ value.description }</p> }
                </TabPane>
                <TabPane tabId="2">
                    <Table dark>
                        <tbody>
                            <tr>
                                <td>Модель</td>
                                <td>{ value.model }</td>
                            </tr>
                            { value.brand && 
                                <tr>
                                    <td>Виробник</td>
                                    <td>{ value.brand.value }</td>
                                </tr>
                            }
                            { value.collection && 
                                <tr>
                                    <td>Колекція</td>
                                    <td>{ value.collection.value }</td>
                                </tr>
                            }
                            { value.gender && 
                                <tr>
                                    <td>Стать</td>
                                    <td>{ value.gender.value }</td>
                                </tr>
                            }
                            { value.style && 
                                <tr>
                                    <td>Стиль</td>
                                    <td>{ value.style.value }</td>
                                </tr>
                            }
                            { value.movementType && 
                                <tr>
                                    <td>Тип механізму</td>
                                    <td>{ value.movementType.value }</td>
                                </tr>
                            }
                            { value.caseShape && 
                                <tr>
                                    <td>Форма корпусу</td>
                                    <td>{ value.caseShape.value }</td>
                                </tr>
                            }
                            { value.caseMaterial && 
                                <tr>
                                    <td>Матеріал корпусу</td>
                                    <td>{ value.caseMaterial.value }</td>
                                </tr>
                            }
                            { value.caseSize && 
                                <tr>
                                    <td>Розмір корпусу (мм)</td>
                                    <td>{ value.caseSize }</td>
                                </tr>
                            }
                            { value.caseColor && 
                                <tr>
                                    <td>Колір корпусу</td>
                                    <td>{ value.caseColor.value }</td>
                                </tr>
                            }
                            { value.glassType && 
                                <tr>
                                    <td>Скло</td>
                                    <td>{ value.glassType.value }</td>
                                </tr>
                            }
                            { value.strapType && 
                                <tr>
                                    <td>Браслет/ремінець</td>
                                    <td>{ value.strapType.value }</td>
                                </tr>
                            }
                            { value.strapColor && 
                                <tr>
                                    <td>Колір браслету/ремінця</td>
                                    <td>{ value.strapColor.value }</td>
                                </tr>
                            }
                            { value.dialType && 
                                <tr>
                                    <td>Вид циферблату</td>
                                    <td>{ value.dialType.value }</td>
                                </tr>
                            }
                            { value.dialColor && 
                                <tr>
                                    <td>Колір циферблату</td>
                                    <td>{ value.dialColor.value }</td>
                                </tr>
                            }
                            { value.waterResistance && 
                                <tr>
                                    <td>Водозахист</td>
                                    <td>{ value.waterResistance.value }</td>
                                </tr>
                            }
                            { value.incrustationType && 
                                <tr>
                                    <td>Інкрустація</td>
                                    <td>{ value.incrustationType.value }</td>
                                </tr>
                            }
                            { value.weight && 
                                <tr>
                                    <td>Вага (г)</td>
                                    <td>{ value.weight }</td>
                                </tr>
                            }
                            { value.functions && value.functions.length > 0 &&
                                <tr>
                                    <td>Функції</td>
                                    <td>{ value.functions.map(f => f.value).join(', ') }</td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </TabPane>
                <TabPane tabId="3">
                    <Row className="flex-row-reverse">
                        <Col md="12" lg="6">
                            { user && user.isUser && user.isActive && <NewReview onAccept={ saveReview } /> }
                        </Col>
                        <Col md="12" lg="6">
                            { value.reviews && <Reviews items={ value.reviews } /> }
                        </Col>
                    </Row>
                    <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) } title={ infoHeader } text={ infoText } />
                </TabPane>
            </TabContent>
        </div>
    );
}

export default WatchDetailInfo;