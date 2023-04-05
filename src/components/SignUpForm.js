
import { Form, FormGroup, Label, Input, Button, FormFeedback, Row, Col } from 'reactstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import validation from '../modules/validation';


const SignUpForm = ({ onSignUp, onError }) => {

    const [login, setLogin] = useState({ value: '', isValid: false });
    const [email, setEmail] = useState({ value: '', isValid: false });
    const [phone, setPhone] = useState({ value: '', isValid: true });
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState({ value: '', isValid: false });
    const [passwordConfirm, setPasswordConfirm] = useState({ value: '', isValid: false });

    const [isValid, setIsValid] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if(!name) {
            return;
        }

        switch (name) {
            case 'login':
                setLogin({ value: value, isValid: value.length > 0 });
                setIsValid(password.isValid && email.isValid && passwordConfirm.isValid && phone.isValid && value.length > 0);
                break;

            case 'email':
                setEmail({ value: value, isValid: value.length > 0 });
                setIsValid(password.isValid && login.isValid && passwordConfirm.isValid && phone.isValid && value.length > 0);
                break;

            case 'phone':
                if(value.length > 0) {
                    const valid = validation.digitsOnlyValidationRule(value) && value.length === 10;
                    setPhone({ value: value, isValid: valid });
                    setIsValid(password.isValid && login.isValid && passwordConfirm.isValid && valid);
                }
                else {
                    setPhone({ value: value, isValid: true });
                    setIsValid(password.isValid && login.isValid && passwordConfirm.isValid);
                }
                break;

            case 'fname':
                setFirstName(value);
                break;

            case 'sname':
                setSecondName(value);
                break;

            case 'lname':
                setLastName(value);
                break;

            case 'password':
                setPassword({ value: value, isValid: value.length > 0});
                setIsValid(login.isValid && email.isValid && passwordConfirm.isValid && phone.isValid && value.length > 0);
                break;

            case 'passwordConfirm':
                setPasswordConfirm({ value: value, isValid: value.length > 0});
                setIsValid(password.isValid && email.isValid && login.isValid && phone.isValid && value === password.value);
                break;

            default: break;
        }
    }

    const signUp = (e) => {
        e.preventDefault();
        if(!isValid) {
            if(!login.isValid || !email.isValid || !password.isValid) {
                onError && onError('Помилка валідації', 'Заповніть усі обов’язкові поля');
                return;
            }
            if(!passwordConfirm) {
                onError && onError('Помилка валідації', 'Паролі не співпадають');
                return;
            }

            if(!phone.isValid) {
                onError && onError('Помилка валідації', 'Невірний формат номеру телефона');
                return;
            }

            onError && onError();
            return;
        }

        onSignUp && onSignUp({ 
            login: login.value,
            email: email.value, 
            password: password.value, 
            firstName: firstName.length > 0 ? firstName : null, 
            secondName: secondName.length > 0 ? secondName : null, 
            lastName: lastName.length > 0 ? lastName : null,
            phone: phone.value.length > 0 ? phone.value : null,
        });
    }

    return (
        <Form className="container-sm" style={{ maxWidth: '500px', minWidth: '300px' }}>
            <FormGroup className="position-relative mt-2">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="signup__login" className="text-white required">Логін</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="signup__login" name="login" placeholder="Логін" type="text" value={ login.value } onInput={ handleInput } invalid={ !login.isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="email" className="text-white required">E-mail</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="email" name="email" placeholder="E-mail" type="email" value={ email.value } onInput={ handleInput } invalid={ !email.isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </Col>
                </Row>        
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="phone" className="text-white">Телефон</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="phone" name="phone" placeholder="Телефон" type="text" value={ phone.value } onInput={ handleInput } invalid={ !phone.isValid } />
                        <FormFeedback tooltip>Формат: 0123456789</FormFeedback>
                    </Col>
                </Row>        
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="fname" className="text-white">Ім’я</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="fname" name="fname" placeholder="Ім’я" type="text" value={ firstName } onInput={ handleInput } />
                    </Col>
                </Row>        
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="sname" className="text-white">По-батькові</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="sname" name="sname" placeholder="По-батькові" type="text" value={ secondName } onInput={ handleInput } />
                    </Col>
                </Row>        
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="lname" className="text-white">Прізвище</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="lname" name="lname" placeholder="Прізвище" type="text" value={ lastName } onInput={ handleInput } />
                    </Col>
                </Row>        
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="signup__password" className="text-white required">Пароль</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="signup__password" name="password" placeholder="Пароль" type="password" value={ password.value } onInput={ handleInput } invalid={ !password.isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </Col>
                </Row>        
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row>
                    <Col sm="12" md="2">
                        <Label for="signup__passwordConfirm" className="text-white required">Підтвердіть пароль</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="signup__passwordConfirm" name="passwordConfirm" placeholder="Підтвердіть пароль" type="password" value={ passwordConfirm.value } onInput={ handleInput } invalid={ !passwordConfirm.isValid } />
                        <FormFeedback tooltip>Паролі не співпадають</FormFeedback>
                    </Col>
                </Row>        
            </FormGroup>
            <Row className="mt-5">
                <Col><Link to="/signin" className="text-decoration-none">Маєте акаунт?</Link></Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Button onClick={ signUp } color="warning" disabled={ !isValid } className="mt-3 ps-4 pe-4">Зареєструватися</Button>
            </Row>
        </Form>
    );
}

export default SignUpForm;