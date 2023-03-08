

import { FormGroup, Input, Label } from 'reactstrap';

const FormItemSelect = ({ name, title, items, initialIndex, onChange }) => {

    return (
        <FormGroup>
            <Label className="ps-2">{ title }</Label>
            <Input name={ name } placeholder={ title } value={ initialIndex ?? 0 } type="select" onChange={ (e) => onChange && onChange(e.target.value) }>
                <option value={ 0 }>Виберіть...</option>
                { items && items.value && items.value.map(item => <option key={ item.id } value={ item.id }>{ item.value }</option>)}
            </Input>
        </FormGroup>
    );
}

export default FormItemSelect;