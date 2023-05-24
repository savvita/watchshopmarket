import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";



import { resetPasswordAsync } from '../app/authSlice';



const ResetPassword = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isValid, setIsValid] = useState(false);

    const [values, setValues] = useState({
        password: {
            value: '',
            isValid: false
        }, 
        passwordConfirm: {
            value: '',
            isValid: false
        }, 
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        switch(name) {
            case "password":
                setValues({ ...values, password: {
                    value: value, 
                    isValid: value.length > 0
                }
            });
                break;
            case "password_confirm":
                setValues({ ...values, passwordConfirm: {
                        value: value, 
                        isValid: value === values.password.value
                    }
                });
                break;
        }
    }

    useEffect(() => {
        setIsValid(values.password.isValid && values.passwordConfirm.isValid);
    }, [values]);

    const resetPassword = async () => {
        if(isValid) {
            const res = await dispatch(resetPasswordAsync({ 
                userId: params.userId,
                password: values.password.value,
                code: params.code
             }));

             if(res && res.payload && res.payload.statusCode === 200) {
                navigate("/resetpassword/success");
             } else {
                navigate("/resetpassword/error");
             }
        }
    }

    if(!params.userId || !params.code) {
        return null;
    }
    return (
        <div className="container text-white mt-3" style={{ maxWidth: '500px', minWidth: '300px' }}>
            <h3 className="text-center">Скидання паролю</h3>
            <FormGroup className="position-relative mt-4">
                <Row className="align-items-center">
                    <Col sm="12" md="4">
                        <Label for="reset__password" className="text-white required">Новий пароль</Label>
                    </Col>
                    <Col sm="12" md="8">
                        <Input id="reset__password" placeholder="Пароль" type="password" name="password" value={ values.password.value } onInput={ handleInput } invalid={ !values.password.isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup className="position-relative mt-4">
                <Row className="align-items-center">
                    <Col sm="12" md="4">
                        <Label for="reset__password__confirm" className="text-white required">Підтвердіть пароль</Label>
                    </Col>
                    <Col sm="12" md="8">
                        <Input id="reset__password__confirm" placeholder="Підтвердіть пароль" type="password" name="password_confirm" value={ values.passwordConfirm.value } onInput={ handleInput } invalid={ !values.passwordConfirm.isValid } />
                        <FormFeedback tooltip>Паролі не співпадають</FormFeedback>
                    </Col>
                </Row>
            </FormGroup>
            <Row className="d-flex justify-content-center">
                <Button onClick={ resetPassword } color="warning" disabled={ !isValid } className="mt-3 ps-4 pe-4">Скинути</Button>
            </Row>
        </div>
    );
}

export default ResetPassword;