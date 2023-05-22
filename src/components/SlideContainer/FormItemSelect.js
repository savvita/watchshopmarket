

import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { FormGroup, Input, Label, UncontrolledTooltip } from 'reactstrap';
import PromotionForm from '../PromotionTable/PromotionForm';

const FormItemSelect = ({ name, title, items, initialIndex, onChange }) => {

    const [idx, setIdx] = useState(0);
    const [isModal, setIsModal] = useState(false);

    useEffect(() => {
        if(initialIndex) {
            setIdx(initialIndex);
        }
    }, [initialIndex]);

    const accept = (id) => {
        setIsModal(false);

        if(!id) {
            return;
        }

        setIdx(id);
    }

    return (
        <div>
            <FormGroup>
                <Label className="ps-2 d-flex align-items-center">
                    { title }
                    <div id={ `${ name }__new` } className="d-inline-block overflow-hidden p-1" onClick={ () => setIsModal(true) }>
                        <FaPlusCircle className="property-table__icon property-table__icon__dark" />
                    </div>
                    <UncontrolledTooltip placement="right" target={ `${ name }__new` } >
                        Додати нове
                    </UncontrolledTooltip>
                </Label>
                <Input name={ name } placeholder={ title } value={ idx ?? 0 } type="select" onChange={ (e) => onChange && onChange(e.target.value) }>
                    <option value={ 0 }>Виберіть...</option>
                    { items && items.map(item => <option key={ item.id } value={ item.id }>{ item.title }</option>)}
                </Input>
            </FormGroup>
            <PromotionForm isOpen={ isModal } onCancel={ () => setIsModal(false) } onAccept={ accept } />
        </div>
    );
}

export default FormItemSelect;