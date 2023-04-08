

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ConfirmDeletingModal = ({ isOpen, onAccept, onCancel }) => {
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Видалення відгуку</ModalHeader>
            <ModalBody>
                <p>Ви впевнені, що хочете видалити цей вигук?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={ onAccept }>Видалити</Button>{' '}
                <Button color="secondary" onClick={ onCancel }>Скасувати</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ConfirmDeletingModal;