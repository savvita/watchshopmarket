import { FaBars, FaRegEdit, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, UncontrolledTooltip } from "reactstrap";




const CollapsedActions = ({ item, onEdit }) => {
    return (
        <>
            <div className="text-center property-table__collapse__expanded d-flex">
                { item && <div>
                    <Link to={ `/manager/promotion/${ item.id }` }>
                        <div id={ item ? `table_row_dropdown_${ item.id }_view` : `table_row_dropdown_view` } className="d-inline-block overflow-hidden p-1">
                            <FaRegEye className="property-table__icon" />
                        </div>
                    </Link>
                    <UncontrolledTooltip placement="right" target={ item ? `table_row_dropdown_${ item.id }_view` : `table_row_dropdown_view` } >
                        Переглянути
                    </UncontrolledTooltip>
                </div> }
                { item && <div>
                    <div id={ item ? `table_row_${ item.id }_edit` : `table_row_edit` } className="d-inline-block overflow-hidden p-1 position-relative">
                        <FaRegEdit className="property-table__icon" onClick={ onEdit } />
                    </div>
                    <UncontrolledTooltip placement="right" target={ item ? `table_row_${ item.id }_edit` : `table_row_edit` } >
                        Редагувати
                    </UncontrolledTooltip>
                </div> }
            </div>
        </>
    );
}

export default CollapsedActions;