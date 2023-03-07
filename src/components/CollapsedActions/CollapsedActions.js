
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, UncontrolledTooltip, DropdownItem } from 'reactstrap';
import { FaRegTrashAlt, FaRegEdit, FaRegEye, FaBars } from "react-icons/fa";

import './CollapsedActions.css';

const CollapsedActions = ({ item, editMode, onView, onEdit, onDelete, className }) => {


    return (
        <>{ editMode ? <td colSpan="3"></td> : 
            <>
                <td colSpan="3" className={ className ? `property-table__collapse__collapsed ${ className }` : "property-table__collapse__collapsed" }>
                    <UncontrolledDropdown>
                        <DropdownToggle caret color="dark">
                            <FaBars className="property-table__icon"  />
                        </DropdownToggle>
                        <DropdownMenu dark className='text-center'>
                            <DropdownItem>
                                <div id={ item ? `table_row_dropdown_${ item.id }_view` : `table_row_dropdown_view` } className={ editMode ? 'd-none' : "d-inline-block overflow-hidden p-1" }>
                                    <FaRegEye className="property-table__icon" onClick={ onView } />
                                </div>
                                <UncontrolledTooltip placement="right" target={ item ? `table_row_dropdown_${ item.id }_view` : `table_row_dropdown_view` } >
                                    Переглянути
                                </UncontrolledTooltip>
                            </DropdownItem>
                            <DropdownItem>
                                <div id={ item ? `table_row_dropdown_${ item.id }_edit` : `table_row_dropdown_edit` } className={ editMode ? 'd-none' : "d-inline-block overflow-hidden p-1 position-relative" }>
                                    <FaRegEdit className="property-table__icon" onClick={ onEdit } />
                                </div>
                                <UncontrolledTooltip placement="right" target={ item ? `table_row_dropdown_${ item.id }_edit` : `table_row_dropdown_edit` } >
                                    Редагувати
                                </UncontrolledTooltip>
                            </DropdownItem>
                            { onDelete && <DropdownItem>
                                <div id={ item ? `table_row_dropdown_${ item.id }_delete` : `table_row_dropdown_delete` } className={ editMode ? 'd-none' : "d-inline-block overflow-hidden p-1" }>
                                    <FaRegTrashAlt className="property-table__icon" onClick={ onDelete } />
                                </div>
                                <UncontrolledTooltip placement="right" target={ item ? `table_row_dropdown_${ item.id }_delete` : `table_row_dropdown_delete` } >
                                    Видалити
                                </UncontrolledTooltip>
                            </DropdownItem> }

                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
                <td className={ className ? `text-center property-table__collapse__expanded ${ className }` : 'text-center property-table__collapse__expanded' } >
                    <div id={ item ? `table_row_${ item.id }_view` : `table_row_view` } className={ editMode ? 'd-none' : "d-inline-block overflow-hidden p-1" }>
                        <FaRegEye className="property-table__icon" onClick={ onView } />
                    </div>
                    <UncontrolledTooltip placement="right" target={ item ? `table_row_${ item.id }_view` : `table_row_view` } >
                        Переглянути
                    </UncontrolledTooltip>
                </td>
                <td className={ className ? `text-center property-table__collapse__expanded ${ className }` : 'text-center property-table__collapse__expanded' }>
                    <div id={ item ? `table_row_${ item.id }_edit` : `table_row_edit` } className={ editMode ? 'd-none' : "d-inline-block overflow-hidden p-1 position-relative" }>
                        <FaRegEdit className="property-table__icon" onClick={ onEdit } />
                    </div>
                    <UncontrolledTooltip placement="right" target={ item ? `table_row_${ item.id }_edit` : `table_row_edit` } >
                        Редагувати
                    </UncontrolledTooltip>
                </td>
                { onDelete && 
                <td className={ className ? `text-center property-table__collapse__expanded ${ className }` : 'text-center property-table__collapse__expanded' }>
                    <div id={ item ? `table_row_${ item.id }_delete` : `table_row_delete` } className={ editMode ? 'd-none' : "d-inline-block overflow-hidden p-1" }>
                        <FaRegTrashAlt className="property-table__icon" onClick={ onDelete } />
                    </div>
                    <UncontrolledTooltip placement="right" target={ item ? `table_row_${ item.id }_delete` : `table_row_delete` } >
                        Видалити
                    </UncontrolledTooltip>
                </td> }
            </>
        }
    </>
    );
}

export default CollapsedActions;