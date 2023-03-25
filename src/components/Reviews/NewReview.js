

import { useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, FormFeedback, FormGroup, Input, Label } from "reactstrap";



const NewReview = ({ onAccept }) => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleInput = (e) => {
        setValue(e.target.value);
        setIsValid(e.target.value.length > 0 && e.target.value.length <= 500);
    }

    const cancel = () => {
        setValue("");
    }

    const save = () => {
        onAccept && onAccept(value);
        setValue("");
    }
    return (
        <div className="p-3 pb-0">
            <Card className="mt-2 mb-2">
                <CardHeader>Додати новий коментар</CardHeader>
                <CardBody className="mb-0 pb-0">
                    <FormGroup className="position-relative">
                        <Input name='review' style={{ height: '10rem' }} maxLength={ 500 } type="textarea" value={ value } onInput ={ handleInput } invalid={ !isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </FormGroup>
                    <Label className="pt-3 pb-0" style={{ fontSize: '0.8rem' }}>* Коментар буде відображено після перевірки модератором</Label>
                </CardBody>
                <CardFooter>
                    <Button className="me-3" onClick={ save }>Зберегти</Button>
                    <Button onClick={ cancel }>Скасувати</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default NewReview;