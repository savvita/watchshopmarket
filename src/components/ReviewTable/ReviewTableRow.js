



import { useState } from "react";
import { FaBan, FaCheck, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";



const ReviewTableRow = ({ item, idx, onCheck, onDelete }) => {

    const accept = () => {
        onCheck && onCheck(item);
    }

    const remove = () => {
        onDelete && onDelete(item);
    }


    if(!item) {
        return null;
    }

    return (
        <tr>
            <th className="text-center">{ idx }</th>
            <td>{ item.userName }</td>
            <td>{ (new Date(item.date)).toLocaleString() }</td>
            <td style={{ width: '100%' }}>{ item.text }</td>
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
        </tr>
    );
}

export default ReviewTableRow;