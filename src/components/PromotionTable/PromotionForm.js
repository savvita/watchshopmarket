import { useEffect, useState } from "react";
import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import validation from '../../modules/validation';

import { getAsync as getBrands, selectValues as selectBrands } from '../../app/brandSlice';
import { useDispatch, useSelector } from "react-redux";

import ConfirmModal from './ConfirmModal';


const PromotionForm = ({ isOpen, item, onAccept, onCancel }) => {
    const brands = useSelector(selectBrands);
    const dispatch = useDispatch();

    const [value, setValue] = useState({
        id: null,
        title: '',
        discountValue: 0,
        description: '',
        isActive: true,
        brandId: null
    });

    const [valid, setValid] = useState({
        title: false,
        discountValue: true,
        description: true
    });

    const [isSaveEnable, setIsSaveEnable] = useState(false);

    const [confirmModal, setConfirmModal] = useState(false);

    useEffect(() => {
        dispatch(getBrands());
    }, []);

    useEffect(() => {
        if(!item) {
            setValue({
                id: null,
                title: '',
                discountValue: 0,
                description: '',
                isActive: true,
                brandId: null
            });
        }
        else {
            setValue({ ...item, description: item.description ?? '', brandId: item.brand !== null ? item.brand.id : null });
        }
        const res = validate();
        setIsSaveEnable(res);
    }, [item]);

    useEffect(() => {
        if(!value) {
            return;
        }

        validate();
    }, [value]);

    const accept = () => {
        if(!validate()) {
            return;
        }

        if(value.isActive === true) {
            setConfirmModal(true);
        }
        else {
            save();
        }
    }

    const save = () => {
        if(!validate()) {
            return;
        }

        const updatedItem = {
            id: value.id ?? 0,
            title: value.title,
            discountValue: value.discountValue,
            description: value.description,
            isActive: value.isActive,
            rowVersion: item !== null ? item.rowVersion : null
        };

        if(value.brandId !== null && value.brandId != 0) {
            updatedItem.brand = {
                id: value.brandId,
                value: ''
            };
        } else {
            updatedItem.brand = null;
        }

        onAccept && onAccept(updatedItem);

        setConfirmModal(false);
    }

    const cancel = () => {
        onCancel && onCancel();
    }

    const validate = () => {
        const titleValid = validation.notEmptyValidationRule(value.title) && value.title.length <= 100;
        const descriptionValid = value.description === null || value.description === '' || value.description.length <= 1000;
        const discountValid = validation.discountValidation(value.discountValue);

        setValid({
            title: titleValid,
            discountValue: discountValid,
            description: descriptionValid
        });

        const res = titleValid && descriptionValid && discountValid;
        setIsSaveEnable(res);

        return titleValid && descriptionValid && discountValid;
    }

    const handleInput = (e) => {
        const name = e.target.name;

        let values;
        
        switch(name) {
            case 'title': 
                values = { ...value, title: e.target.value };
                break;
            case 'description': 
                values = { ...value, description: e.target.value };
                break;
            case 'discountValue': 
                values = { ...value, discountValue: e.target.value };
                break;
            case 'active': 
                values = { ...value, isActive: e.target.checked };
                break;
            case 'brand': 
                values = { ...value, brandId: e.target.value == 0 ? null : e.target.value };
                break;
            default: 
                values = { ...value };
        }

        setValue({ ...values });
    }

    return (
        <div>
            <Modal isOpen={ isOpen } size="xl">
                <ModalHeader>{ item && item.id ? 'Редагування акції' : 'Додати нову акцію'}</ModalHeader>
                <ModalBody>
                    <FormGroup className='position-relative'>
                        <Label className="ps-2">Назва</Label>
                        <Input name="title" type="text" value={ value.title } onInput ={ handleInput } invalid={ !valid.title } maxLength="100" />
                        <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                    </FormGroup>

                    <FormGroup className="position-relative">
                        <Label className="ps-2">Знижка (%)</Label>
                        <Input name='discountValue' type="number" min="0" max="100" value={ value.discountValue } onInput ={ handleInput } invalid={ !valid.discountValue } />
                        <FormFeedback tooltip>Знижка має бути числом між 0 та 100</FormFeedback>
                    </FormGroup>

                    <FormGroup switch>
                        <Label className="ps-2">Актуальна</Label>
                        <Input name="active" type="switch" checked={ value.isActive } onChange={ handleInput } />
                    </FormGroup>

                    <FormGroup className="d-flex align-items-center">
                        <Label for="brand_select">Виробник</Label>
                        <Input id="brand_select" className='flex-frow-1 ms-2' name='brand' value={ value.brandId ?? 0 } type="select" onChange={ handleInput }>
                            <option value={ 0 }>Виберіть...</option>
                            { brands && brands.value && brands.value.map(item => <option key={ item.id } value={ item.id }>{ item.value }</option>)}
                        </Input>
                    </FormGroup>

                    <FormGroup className="position-relative">
                        <Label className="ps-2">Опис</Label>
                        <Input name='description' style={{ height: '20rem' }} maxLength={ 1000 } type="textarea" value={ value.description } onInput ={ handleInput } invalid={ !valid.description } />
                        <FormFeedback tooltip>Максимум 1000 символів</FormFeedback>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={ accept } disabled={ !isSaveEnable }>Зберегти</Button>{' '}
                    <Button color="secondary" onClick={ cancel }>Скасувати</Button>
                </ModalFooter>
            </Modal>
            <ConfirmModal isOpen={ confirmModal } onAccept={ save } onCancel={ () => setConfirmModal(false) } />
        </div>
    );
}

export default PromotionForm;