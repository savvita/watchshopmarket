

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Label, Row, Spinner } from "reactstrap";

import validation from '../../modules/validation';

import { selectProfile, selectCurrent, selectStatus, getProfileAsync, updateAsync, deleteAsync, logOut } from '../../app/authSlice';
import EditableCell from "./EditableCell";

import './UserProfileTable.css';
import InfoModal from "../InfoModal";
import ConfirmDeletingModal from "./ConfirmDeletingModal";
import { useNavigate } from "react-router-dom";


const UserProfileTable = () => {
    const profile = useSelector(selectProfile);
    const user = useSelector(selectCurrent);
    const status = useSelector(selectStatus);

    const [isValid, setIsValid] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);

    const [values, setValues] = useState({
        firstName: { value: '', isValid: true },
        secondName: { value: '', isValid: true },
        lastName: { value: '', isValid: true },
        phoneNumber: { value: '', isValid: true },
        email: { value: '', isValid: true }
    });

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [deleteModal, setDeleteModal] = useState(false);

    const showError = (title, text) => {
        setInfoHeader(title ?? 'Інформація');
        setInfoText(text);
        setInfoModal(true);
    }

    useEffect(() => {
        if(!user || !user.userName) {
            return;
        }

        dispatch(getProfileAsync(user.userName));
    }, []);

    useEffect(() => {

        if(!profile) {
            return;
        }

        setValues(
            {
                firstName: { value: profile.firstName ?? "", isValid: true },
                secondName: { value: profile.secondName ?? "", isValid: true },
                lastName: { value: profile.lastName ?? "", isValid: true },
                phoneNumber: { value: profile.phoneNumber ?? "", isValid: true },
                email: { value: profile.email ?? "", isValid: true }
            });
    }, [profile]);

    useEffect(() => {
        if(!profile || !values) {
            return;
        }

        for(let key in values) {
            if(values[key].value !== (profile[key] ?? "")) {
                setIsChanged(true);
                return;
            }
        }

        setIsChanged(false);
    }, [values]);

    const cancel = () => {
        setValues(
            {
                firstName: { value: profile.firstName ?? "", isValid: true },
                secondName: { value: profile.secondName ?? "", isValid: true },
                lastName: { value: profile.lastName ?? "", isValid: true },
                phoneNumber: { value: profile.phoneNumber ?? "", isValid: true },
                email: { value: profile.email ?? "", isValid: true }
            });
            setEditMode(false);
    }

    const validatePhone = (value) => {
        if(value === '') {
            return true;
        }
        return validation.digitsOnlyValidationRule(value) && value.length === 10;
    }

    const setValue = (valueName, value) => {
        switch(valueName) {
            case "firstName":
                setValues({ ...values, firstName: { ...value } });
                setIsValid(value.isValid && values.secondName.isValid && values.lastName.isValid && values.email.isValid && values.phoneNumber.isValid);
                break;
            case "secondName":
                setValues({ ...values, secondName: { ...value } });
                setIsValid(values.firstName.isValid && value.isValid && values.lastName.isValid && values.email.isValid && values.phoneNumber.isValid);
                break;
            case "lastName":
                setValues({ ...values, lastName: { ...value } });
                setIsValid(values.firstName.isValid && values.secondName.isValid && value.isValid && values.email.isValid && values.phoneNumber.isValid);
                break;
            case "email":
                setValues({ ...values, email: { ...value } });
                setIsValid(values.firstName.isValid && values.secondName.isValid && values.lastName.isValid && value.isValid && values.phoneNumber.isValid);
                break;
            case "phone":
                setValues({ ...values, phoneNumber: { ...value } });
                setIsValid(values.firstName.isValid && values.secondName.isValid && values.lastName.isValid && values.email.isValid && value.isValid);
                break;
            default:
                break;
        }
    }

    const update = async () => {
        if(!profile) {
            return;
        }

        if(!isValid) {
            if(!values.email.isValid) {
                showError('Помилка валідації', 'Заповніть усі обов’язкові поля');
                return;
            }
            if(!values.phoneNumber.isValid) {
                showError('Помилка валідації', 'Невірний формат номеру телефона');
                return;
            }

            return;
        }

        const entity = { 
            ...profile,
            firstName: values.firstName.value,
            secondName: values.secondName.value,
            lastName: values.lastName.value,
            email: values.email.value,
            phoneNumber: values.phoneNumber.value,
        }
        const res = await dispatch(updateAsync(entity));

        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText(`Виникла помилка. Спробуйте пізніше`);
            setInfoModal(true);
        }
        else {
            setEditMode(false);
        }
    }

    const deleteProfile = async () => {
        if(!profile) {
            return;
        }

        const res = await dispatch(deleteAsync(profile.id));

        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText(`Виникла помилка. Спробуйте пізніше`);
            setInfoModal(true);
        }
        else {
            setInfoHeader('Профіль видалено');
            setInfoText(`Профіль було видалено. Для відновлення зверніться до адміністратора`);
            setInfoModal(true);
            dispatch(logOut());
        }

        setDeleteModal(false);
    }

    return (
        <div>
            { user && user.isActive && profile &&
                <div className="text-white" style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <Row>
                        <Col>
                            <h4 className="mt-3 mb-3 text-center">Мої дані</h4>
                        </Col>
                    </Row>
                    <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                        <Col sm="12" md="4">
                            <Label>Username:</Label>
                        </Col>
                        <Col sm="12" md="8">
                            { profile.userName }
                        </Col>
                    </Row>

                    <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                        <Col sm="12" md="4">
                            <Label>Ім’я:</Label>
                        </Col>
                        <Col sm="12" md="8">
                            <EditableCell value={ values.firstName.value } editMode={ editMode } onInput={ value => setValue("firstName", value) } maxLength="100" />
                        </Col>
                    </Row>

                    <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                        <Col sm="12" md="4">
                            <Label>По-батькові:</Label>
                        </Col>
                        <Col sm="12" md="8">
                            <EditableCell value={ values.secondName.value } editMode={ editMode } onInput={ value => setValue("secondName", value) } maxLength="100" />
                        </Col>
                    </Row>

                    <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                        <Col sm="12" md="4">
                            <Label>Прізвище:</Label>
                        </Col>
                        <Col sm="12" md="8">
                            <EditableCell value={ values.lastName.value } editMode={ editMode } onInput={ value => setValue("lastName", value) } maxLength="100" />
                        </Col>
                    </Row>

                    <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                        <Col sm="12" md="4">
                            <Label>Телефон:</Label>
                        </Col>
                        <Col sm="12" md="8">
                            <EditableCell value={ values.phoneNumber.value } editMode={ editMode } onInput={ value => setValue("phone", value) } validationRule={ validatePhone } validationErrorText='Формат: 0123456789' maxLength="10" />
                        </Col>
                    </Row>

                    <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                        <Col sm="12" md="4">
                            <Label className={ editMode ? "required" : "" }>E-mail:</Label>
                        </Col>
                        <Col sm="12" md="8">
                            <EditableCell value={ values.email.value } editMode={ editMode } onInput={ value => setValue("email", value) } validationRule={ validation.notEmptyValidationRule } validationErrorText="Обов’язкове поле" maxLenght="256" />
                        </Col>
                    </Row>

                    <Row className="m-3">
                        <Col className="d-flex">
                            { editMode ? 
                                <div>
                                    <Button className="me-2" disabled={ !isValid || !isChanged } onClick={ update }>Зберегти</Button>
                                    <Button onClick={ cancel }>Скасувати</Button>
                                </div> 
                                :
                                <div>
                                    <Button className="m-1" onClick={() => setEditMode(true) }>Редагувати</Button>
                                    <Button className="m-1" onClick={ () => setDeleteModal(true) }>Видалити профіль</Button>
                                </div> 
                            }
                        </Col>
                    </Row>
                </div>
            
            }
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) } title={ infoHeader } text={ infoText } />
            <ConfirmDeletingModal isOpen={ deleteModal } onAccept={ deleteProfile } onCancel={ () => setDeleteModal(false) } />
            <div className={ status === 'loading' ? 'd-flex justify-content-center mt-3' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
        </div>
    );
}

export default UserProfileTable;