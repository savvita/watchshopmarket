import { FormGroup, Input } from "reactstrap";
import CollapsedActions from "./CollapsedActions";




const PromotionTableRow = ({ idx, item, onEdit, onChange }) => {

    const switchActive = () => {
        if(!item) {
            return;
        }

        onChange && onChange({ ...item, isActive: !item.isActive });
    }

    const edit = () => {
        if(!item) {
            return;
        }

        onEdit && onEdit(item);
    }

    if(!item) {
        return null;
    }

    return (
        <tr>
            <th className="text-center">{ idx }</th>
            <td>{ item.title }</td>
            <td>{ item.brand && item.brand.value }</td>
            <td className="text-center">{ item.discountValue }</td>
            <td>
                <FormGroup switch className="d-flex justify-content-center">
                    <Input type="switch" checked={ item.isActive } onChange={ switchActive } />
                </FormGroup>
            </td>
            <td>
                <CollapsedActions item={ item } onEdit={ edit } />
            </td>
        </tr>
    );
}

export default PromotionTableRow;