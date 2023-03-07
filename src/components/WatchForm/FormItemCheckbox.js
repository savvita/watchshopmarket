
import { FormGroup, Input, Label } from 'reactstrap';

import { useEffect, useState } from 'react';

const FormItemCheckbox = ({ name, title, onChange }) => {
    const [state, setState] = useState(true);

    const switchState = () => {
        setState(!state);
    }

    useEffect(() => {
        onChange && onChange(state);
    }, [state]);

    return (
        <FormGroup switch>
            <Label for={ `watch-form__${ title }` } className="ps-2">{ title }</Label>
            <Input id={ `watch-form__${ title }` } name={ name } type="switch" role="switch" checked={ state } onChange={ switchState } />
        </FormGroup>
    );
}

export default FormItemCheckbox;