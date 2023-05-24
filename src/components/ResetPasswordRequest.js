import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";


import { resetPasswordRequestAsync } from '../app/authSlice';


const ResetPasswordRequest = () => {

    const [value, setValue] = useState("");
    const [isValid, setIsValid] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const handleInput = (e) => {
        setValue(e.target.value);
        setIsValid(e.target.value.length > 0);
    }

    const resetPassword = async () => {
        if(isValid) {
            await dispatch(resetPasswordRequestAsync({ userName: value }));
            navigate("/resetpassword/confirm");
        }
    }

    return (
        <div className="container text-white mt-3" style={{ maxWidth: '500px', minWidth: '300px' }}>
            <h3 className="text-center">Скидання паролю</h3>
            <FormGroup className="position-relative mt-4">
                <Row className="align-items-center">
                    <Col sm="12" md="2">
                        <Label for="reset__login" className="text-white required">Логін</Label>
                    </Col>
                    <Col sm="12" md="10">
                        <Input id="reset__login"  placeholder="Логін" type="text" value={ value } onInput={ handleInput } invalid={ !isValid } />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </Col>
                </Row>
            </FormGroup>
            <Row className="d-flex justify-content-center">
                <Button onClick={ resetPassword } color="warning" disabled={ !isValid } className="mt-3 ps-4 pe-4">Скинути</Button>
            </Row>
        </div>
    );
}

export default ResetPasswordRequest;