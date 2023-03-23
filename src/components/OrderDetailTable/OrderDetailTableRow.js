
import { Link } from "react-router-dom";




const OrderDetailTableRow = ({ item, idx }) => {

    if(!item) {
        return null;
    }

    return (
        <tr className="text-center">
            <th scope="row">{ idx }</th>
            <td className="text-start"><Link to={ `/watches/${ item.watchId }` } className="text-white" style={{ textDecoration: 'none' }}>{ item.watch.title }</Link></td>
            <td>{ item.watch.id }</td>
            <td>{ item.count }</td>
            <td className="text-nowrap">{ item.unitPrice } &#8372;</td>
            <td className="text-nowrap">{ item.unitPrice * item.count } &#8372;</td>
        </tr>
    );
}


export default OrderDetailTableRow;