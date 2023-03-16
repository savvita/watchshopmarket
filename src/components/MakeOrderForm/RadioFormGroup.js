
import { FormGroup, Input, Label } from "reactstrap";

const RadioFormGroup = ({ items, title, onChange, children }) => {


    if(!items) {
        return null;
    }

    return (
        <FormGroup tag="fieldset" className="fs-6 border border-light rounded-1 p-3 pt-1">
            <legend className="fs-5">{ title }</legend>
            { items && items.map((item, idx) => 
                <FormGroup key={ item.id } check>
                    <Input id={ `${ title }${ item.id }` } name={ title } type="radio" onChange={ () => onChange && onChange(item.id) } />
                    <Label for={ `${ title }${ item.id }` } check>{ item.value }</Label>
                </FormGroup>
            )}
            { children }
        </FormGroup>
    );
}

export default RadioFormGroup;