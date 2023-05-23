

import { useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, FormFeedback, FormGroup, Input, Label } from "reactstrap";

import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

const NewReview = ({ onAccept }) => {
    const [value, setValue] = useState({
        value: '',
        rate: null
    });
    const [isValid, setIsValid] = useState(false);

    const handleInput = (e) => {
        setValue({
            ...value,
            value: e.target.value
        });
        setIsValid(e.target.value.length > 0 && e.target.value.length <= 500);
    }

    const cancel = () => {
        setValue({
            value: '',
            rate: null
        });
    }

    const save = () => {
        onAccept && onAccept(value);
        setValue({
            value: '',
            rate: null
        });
    }

    const setRate = (e) => {
        setValue({
            ...value,
            rate: e.rating
        });
    }

    return (
        <div className="p-3 pb-0">

            <Card className="mt-2 mb-2">
                <CardHeader>Додати новий коментар</CardHeader>
                <CardBody className="mb-0 pb-0 pt-0">
                    <Rater total={5} rating={value.rate ?? 0} style={{ fontSize: '2rem' }} onRate={ setRate } />
                    <FormGroup className="position-relative">
                        <Input name='review' style={{ height: '10rem' }} maxLength={ 500 } type="textarea" value={ value.value } onInput ={ handleInput } invalid={ !isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </FormGroup>
                    <Label className="pt-3 pb-0" style={{ fontSize: '0.8rem' }}>* Коментар буде відображено після перевірки модератором</Label>
                </CardBody>
                <CardFooter>
                    <Button className="me-3" onClick={ save } disabled={ !isValid }>Зберегти</Button>
                    <Button onClick={ cancel } disabled={ value.length === 0 }>Скасувати</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default NewReview;