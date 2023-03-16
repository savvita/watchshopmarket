
import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Table } from 'reactstrap';


const WatchDetailInfo = ({ item, className }) => {
    const [activeTab, setActiveTab] = useState('1');

    if(!item) return null;

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
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    { item.description && <p className="text-white mt-2">{ item.description }</p> }
                </TabPane>
                <TabPane tabId="2">
                    <Table dark>
                        <tbody>
                            <tr>
                                <td>Модель</td>
                                <td>{ item.model }</td>
                            </tr>
                            { item.brand && 
                                <tr>
                                    <td>Виробник</td>
                                    <td>{ item.brand.value }</td>
                                </tr>
                            }
                            { item.collection && 
                                <tr>
                                    <td>Колекція</td>
                                    <td>{ item.collection.value }</td>
                                </tr>
                            }
                            { item.gender && 
                                <tr>
                                    <td>Стать</td>
                                    <td>{ item.gender.value }</td>
                                </tr>
                            }
                            { item.style && 
                                <tr>
                                    <td>Стиль</td>
                                    <td>{ item.style.value }</td>
                                </tr>
                            }
                            { item.movementType && 
                                <tr>
                                    <td>Тип механізму</td>
                                    <td>{ item.movementType.value }</td>
                                </tr>
                            }
                            { item.caseShape && 
                                <tr>
                                    <td>Форма корпусу</td>
                                    <td>{ item.caseShape.value }</td>
                                </tr>
                            }
                            { item.caseMaterial && 
                                <tr>
                                    <td>Матеріал корпусу</td>
                                    <td>{ item.caseMaterial.value }</td>
                                </tr>
                            }
                            { item.caseSize && 
                                <tr>
                                    <td>Розмір корпусу (мм)</td>
                                    <td>{ item.caseSize }</td>
                                </tr>
                            }
                            { item.caseColor && 
                                <tr>
                                    <td>Колір корпусу</td>
                                    <td>{ item.caseColor.value }</td>
                                </tr>
                            }
                            { item.glassType && 
                                <tr>
                                    <td>Скло</td>
                                    <td>{ item.glassType.value }</td>
                                </tr>
                            }
                            { item.strapType && 
                                <tr>
                                    <td>Браслет/ремінець</td>
                                    <td>{ item.strapType.value }</td>
                                </tr>
                            }
                            { item.strapColor && 
                                <tr>
                                    <td>Колір браслету/ремінця</td>
                                    <td>{ item.strapColor.value }</td>
                                </tr>
                            }
                            { item.dialType && 
                                <tr>
                                    <td>Вид циферблату</td>
                                    <td>{ item.dialType.value }</td>
                                </tr>
                            }
                            { item.dialColor && 
                                <tr>
                                    <td>Колір циферблату</td>
                                    <td>{ item.dialColor.value }</td>
                                </tr>
                            }
                            { item.waterResistance && 
                                <tr>
                                    <td>Водозахист</td>
                                    <td>{ item.waterResistance.value }</td>
                                </tr>
                            }
                            { item.incrustationType && 
                                <tr>
                                    <td>Інкрустація</td>
                                    <td>{ item.incrustationType.value }</td>
                                </tr>
                            }
                            { item.weight && 
                                <tr>
                                    <td>Вага (г)</td>
                                    <td>{ item.weight }</td>
                                </tr>
                            }
                            { item.functions && item.functions.length > 0 &&
                                <tr>
                                    <td>Функції</td>
                                    <td>{ item.functions.map(f => f.value).join(', ') }</td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default WatchDetailInfo;