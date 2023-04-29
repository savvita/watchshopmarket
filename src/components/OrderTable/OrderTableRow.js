


import { FaRegEye } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import { Button, UncontrolledTooltip } from "reactstrap";


const OrderTableRow = ({ item, idx, isManagerMode, isUserMode, statusses, onCancel, onAccept }) => {

    const location = useLocation();

    if(!item) {
        return null;
    }

    let total = 0;
    item.details.forEach(x => total += x.count * x.unitPrice);

    const cancelOrder = () => {
        if(!item) {
            return null;
        }

        onCancel && onCancel(item.id);
    }

    const accept = () => {
        if(!item) {
            return;
        }

        onAccept && onAccept(item.id);
    }

    return (
        <tr>
            <th className="align-middle text-center">{ idx }</th>
            <th className="align-middle text-center" scope="row">{ item.id }</th>
            <td className="align-middle text-nowrap">{ (new Date(item.date)).toLocaleString() }</td>
            { isManagerMode ? <td className="align-middle">{ item.userId }</td> : <td className="m-0 p-0"></td> }
            <td className="align-middle">{ item.status && item.status.value }</td>
            <td className="align-middle text-nowrap">{ total } &#8372;</td>
            <td className="align-middle text-center">
                <Link to={ isManagerMode ? `${item.id}` : (location.pathname.includes('new') ? `${item.id}` : `/orders/${item.id}`) }>
                    <div id={ `order-table__order${ item.id }` } className="d-inline-block overflow-hidden p-1">
                        <FaRegEye className="property-table__icon" />
                    </div>
                    <UncontrolledTooltip placement="right" target={ `order-table__order${ item.id }` } >
                        Переглянути
                    </UncontrolledTooltip>
                </Link>
            </td>
            { isUserMode && item.status && (item.status.id === 1 || item.status.id === 2) ? <td><Button value="Cancel" onClick={ cancelOrder } className="btn-small">Скасувати</Button></td> : <td className="m-0 p-0"></td> }
            { !isManagerMode && !isUserMode && statusses && statusses.includes(1) && <td><Button className="btn-small" onClick={ accept }>Прийняти</Button></td>}
        </tr>
    );
}

export default OrderTableRow;