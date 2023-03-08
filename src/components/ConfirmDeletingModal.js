
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ConfirmDeletingModal = ({ isOpen, item, onAccept, onCancel }) => {
    if(item === null) {
        return;
    }
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Видалення строки { item.value }</ModalHeader>
            <ModalBody>
                <p>Видалення цієї строки встановить "Не вказано" у всіх товарах, що мають цю властивість.</p>
                <p>Цю дію не можна відминити.</p>
                <p>Ви впевнені, що хочете видалити це значення?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={ onAccept }>Видалити</Button>{' '}
                <Button color="secondary" onClick={ onCancel }>Скасувати</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ConfirmDeletingModal;