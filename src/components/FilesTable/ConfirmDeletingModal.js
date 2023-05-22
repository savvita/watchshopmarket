
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ConfirmDeletingModal = ({ isOpen, header, text, onAccept, onCancel }) => {

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>{ header }</ModalHeader>
            <ModalBody>
                <p>Цю дію не можна відминити.</p>
                <p>{ text }</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={ onAccept }>Видалити</Button>{' '}
                <Button color="secondary" onClick={ onCancel }>Скасувати</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ConfirmDeletingModal;