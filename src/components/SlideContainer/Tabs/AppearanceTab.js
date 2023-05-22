import { useEffect, useState } from "react";
import { FormFeedback, FormGroup, Input, Label, TabPane } from "reactstrap";

import validation from '../../../modules/validation';



const AppearanceTab = ({ tabId, onChange }) => {
    const [isActive, setIsActive] = useState(false);
    const [index, setIndex] = useState(0);
    const [isValid, setIsValid] = useState(true);

    const handleInput = (e) => {
        setIndex(parseInt(e.target.value) ?? 0);
        if(!isActive) {
            setIsValid(true);
        } else {
            setIsValid(validation.positiveIntValidationRule(e.target.value) && e.target.value <= 5);
        }
    }


    useEffect(() => {
        onChange && onChange({
            isActive: isActive,
            index: index
        });
    }, [isActive, index]);

    return (
        <TabPane tabId={ tabId }>
            <div className="p-4">
                <FormGroup switch>
                    <Input type="switch" checked={ isActive } onChange={ () => setIsActive(!isActive) }/>
                    <Label check>Опублікувати на головній</Label>
                </FormGroup>
                { isActive === true && <FormGroup className='position-relative d-flex align-items-end mt-3'>
                    <Label className="me-3">Індекс</Label>
                    <Input className="flex-grow-1" type="number" min={ 0 } max = { 5 } step={ 1 } value={ index } onInput ={ handleInput } invalid={ !isValid } />
                    <FormFeedback tooltip>Має бути цілим числом від 0 до 5 включно</FormFeedback>
                </FormGroup> }
            </div>
        </TabPane>
    );
}

export default AppearanceTab;