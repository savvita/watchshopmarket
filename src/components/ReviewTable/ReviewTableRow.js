



import { useState } from "react";
import { FaBan, FaCheck, FaEdit, FaRegEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";
import EditableCell from "./EditableCell";



const ReviewTableRow = ({ item, idx, onCheck, onUpdate, onDelete, isManagerMode }) => {

    const [editMode, setEditMode] = useState(false);
    const [errorText, setErrorText] = useState("");

    const accept = () => {
        onCheck && onCheck(item);
    }

    const remove = () => {
        onDelete && onDelete(item);
    }

    const cancel = () => {
        setEditMode(false);
    }

    const save = (text) => {
        if(!text || !item) {
            return;
        }

        if(!validation(item.text)) {
            return;
        }

        setEditMode(false);

        const value ={ ...item, text: text, checked: false };
        onUpdate && onUpdate(value);
    }

    const validation = (value) => {
        if(!value) {
            setErrorText("Обов’язкове поле");
            return false;
        }

        if(value.length === 0) {
            setErrorText("Обов’язкове поле");
            return false;
        }

        if(value.length > 500) {
            setErrorText("Максимум 500 символів");
            return false;
        }
        return true;
    }



    if(!item) {
        return null;
    }

    return (
        <tr>
            <th className="text-center">{ idx }</th>
            { isManagerMode === true && <td>{ item.userName }</td> }
            <td>{ (new Date(item.date)).toLocaleString() }</td>
            <td style={{ width: '100%' }}>
                { isManagerMode !== true ? 
                    (!item.deleted ?
                    <EditableCell item={ item } editMode={ editMode } onCancel={ cancel } onAccept={ save } validationRule={ validation } validationErrorText={ errorText } />
                    :
                    'Коментар видалено')
                    :
                    !item.deleted ? item.text : 'Коментар видалено'
                }
                </td>
            <td>
                <Link to={ `/watches/${ item.watchId }` }>
                    <div id={ `review__${ item.id }__view` } className="d-inline-block overflow-hidden p-1">
                        <FaRegEye className="property-table__icon" />
                    </div>
                </Link>
                <UncontrolledTooltip placement="right" target={ `review__${ item.id }__view` } >
                    Переглянути
                </UncontrolledTooltip>
            </td>
            { isManagerMode !== true && <td>{ !item.checked ? 'Очікує розгляду' : 'Розглянуто' }</td> }
            { isManagerMode === true ?
                <td className="text-nowrap">
                    <div id={ `review__${ item.id }__accept` } className="d-inline-block overflow-hidden p-1" onClick={ accept }>
                        <FaCheck className="property-table__icon" />
                    </div>
                    <UncontrolledTooltip placement="right" target={ `review__${ item.id }__accept` } >
                        Прийняти
                    </UncontrolledTooltip>
                    <div id={ `review__${ item.id }__delete` } className="d-inline-block overflow-hidden p-1" onClick={ remove }>
                        <FaBan className="property-table__icon" />
                    </div>
                    <UncontrolledTooltip placement="right" target={ `review__${ item.id }__delete` } >
                        Видалити
                    </UncontrolledTooltip>
                </td>
                :
                <td className="text-nowrap text-center">
                    { !item.deleted && 
                    <><div id={ `review__${ item.id }__edit` } className="d-inline-block overflow-hidden p-1" onClick={ () => setEditMode(true) }>
                        <FaEdit className="property-table__icon" />
                    </div> 
                    <UncontrolledTooltip placement="right" target={ `review__${ item.id }__edit` } >
                        Редагувати
                    </UncontrolledTooltip>
                    <div id={ `review__${ item.id }__delete` } className="d-inline-block overflow-hidden p-1" onClick={ remove }>
                        <FaTrash className="property-table__icon" />
                    </div>
                    <UncontrolledTooltip placement="right" target={ `review__${ item.id }__delete` } >
                        Видалити
                    </UncontrolledTooltip>
                    </> }
                </td>
            }
        </tr>
    );
}

export default ReviewTableRow;