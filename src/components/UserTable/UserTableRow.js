import { useState } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Input } from "reactstrap";





const UserTableRow = ({ item, idx, onUpdate, onBanChanged }) => {

    const [isManager, setIsManager] = useState(item && item.isManager);
    const [isAdmin, setIsAdmin] = useState(item && item.isAdmin);
    const [banned, setBanned] = useState(item && !item.isActive);

    const switchManagerRole = () => {
        setIsManager(!isManager);

        if(!item) {
            return;
        }
        onUpdate && onUpdate({ ...item, isManager: !item.isManager });
    }

    const switchAdminRole = () => {
        setIsAdmin(!isAdmin);

        if(!item) {
            return;
        }

        onUpdate && onUpdate({ ...item, isAdmin: !item.isAdmin });
    }

    const switchBanned = () => {
        setBanned(!banned);
        if(!item) {
            return;
        }

        onBanChanged && onBanChanged(item.id, !banned);
    }

    if(!item) {
        return null;
    }

    return (
        <tr>
            <th scope="row" className='text-center ms-4 me-4 ps-0 pe-0'><p className="p-1 m-0">{ idx }</p></th>
            <td className="ps-0 pe-0"><Link to={ `${ item.userName }` } className="text-white text-decoration-none">{ item.userName }</Link></td>
            <td className="ps-0 pe-0">{ item.email }</td>
            <td className="ps-0 pe-0"><FormGroup switch className="d-flex justify-content-center"><Input type="switch" checked={ isManager } onChange={ switchManagerRole } /></FormGroup></td>
            <td className="ps-0 pe-0"><FormGroup switch className="d-flex justify-content-center"><Input type="switch" checked={ isAdmin } onChange={ switchAdminRole } /></FormGroup></td>
            <td className="ps-0 pe-0">
                <FormGroup switch className="d-flex justify-content-center"><Input type="switch" checked={ banned } onChange={ switchBanned } /></FormGroup>
            </td>
        </tr>
    );
}

export default UserTableRow;