import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";

import { changePasswordAsync, logOut } from "../app/authSlice";
import InfoModal from "./InfoModal";


const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        old_password: {
            value: '',
            isValid: false
        },
        new_password: {
            value: '',
            isValid: false
        },
        new_password_confirm: {
            value: '',
            isValid: false
        }
    });

    const [isValid, setIsValid] = useState(false);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [errTxt, setErrTxt] = useState("");


    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        switch(name) {
            case "old_password":
                setValues({ ...values, old_password: {
                        value: value, 
                        isValid: value.length > 0
                    }
                });
            break;
                case "new_password":
                setValues({ ...values, new_password: {
                        value: value, 
                        isValid: value.length > 0
                    }
                });
                break;
            case "new_password_confirm":
                setValues({ ...values, new_password_confirm: {
                        value: value, 
                        isValid: value === values.new_password.value
                    }
                });
                break;
        }
    }

    useEffect(() => {
        setIsValid(values.old_password.isValid && values.new_password.isValid && values.new_password_confirm.isValid);
    }, [values]);

    const changePassword = async () => {
        if(isValid) {
            const res = await dispatch(changePasswordAsync({
                newPassword: values.new_password.value,
                oldPassword: values.old_password.value
            }));

            if(res && res.payload && res.payload.value === true) {
                setErrTxt("");
                setInfoHeader('Пароль було змінено');
                setInfoText('Вам необхідно увійти з новим паролем');
                setInfoModal(true);
             } else {
                setErrTxt("Не вдалося змінити пароль");
             }
        }
    }

    const logOutRequest = async () => {
        setInfoModal(false);
        await dispatch(logOut());
        navigate("/signIn");
    }


    return (
        <div className="container text-white mt-3" style={{ maxWidth: '500px', minWidth: '300px' }}>
            <h3 className="text-center">Змінити пароль</h3>
            <p>{ errTxt }</p>
            <FormGroup className="position-relative mt-4">
                <Row className="align-items-center">
                    <Col sm="12" md="4">
                        <Label for="change__old-password" className="text-white required">Старий пароль</Label>
                    </Col>
                    <Col sm="12" md="8">
                        <Input id="change__old-password" placeholder="Старий пароль" type="password" name="old_password" value={ values.old_password.value } onInput={ handleInput } invalid={ !values.old_password.isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row className="align-items-center">
                    <Col sm="12" md="4">
                        <Label for="change__new-password" className="text-white required">Новий пароль</Label>
                    </Col>
                    <Col sm="12" md="8">
                        <Input id="change__new-password" placeholder="Пароль" type="password" name="new_password" value={ values.new_password.value } onInput={ handleInput } invalid={ !values.new_password.isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row className="align-items-center">
                    <Col sm="12" md="4">
                        <Label for="change__new_password_confirm" className="text-white required">Підтвердіть пароль</Label>
                    </Col>
                    <Col sm="12" md="8">
                        <Input id="change__new_password_confirm" placeholder="Підтвердіть пароль" type="password" name="new_password_confirm" value={ values.new_password_confirm.value } onInput={ handleInput } invalid={ !values.new_password_confirm.isValid } />
                        <FormFeedback tooltip>Паролі не співпадають</FormFeedback>
                    </Col>
                </Row>
            </FormGroup>
            <div className="d-flex justify-content-end">
                <Button onClick={ changePassword } color="secondary" disabled={ !isValid } className="mt-3 ps-4 pe-4">Зберегти</Button>
                <Button onClick={ () => navigate(-1) } color="secondary" className="mt-3 ps-4 pe-4 ms-3">Скасувати</Button>
            </div>
            <InfoModal isOpen={ infoModal } onAccept={ logOutRequest }  text={ infoText } title={ infoHeader } />
        </div>
    );
}

export default ChangePassword;