
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ConfirmModal = ({ isOpen, onAccept, onCancel }) => {
    return (
        <Modal isOpen={ isOpen }>
            <ModalHeader>Додавання нової акції</ModalHeader>
            <ModalBody>
                <p>Додавання цієї акції перепише всі наявні знижки на акційні товари</p>
                <p>Цю дію не можна відминити.</p>
                <p>Ви впевнені, що хочете додати акцію?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={ onAccept }>Додати</Button>{' '}
                <Button color="secondary" onClick={ onCancel }>Скасувати</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ConfirmModal;