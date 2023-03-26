
import { CloseButton } from 'reactstrap';


const ImagePreview = ({ img, onDelete }) => {
    if(!img) {
        return null;
    }
    return (
        <div className="position-relative d-inline-block p-1 pt-3 m-2 border rounded-2 watch-form__preview-container">
            { img.src ? <img src={ img.src } alt={ img.value } className="rounded-2 watch-form__preview" /> :
            <img src={ img.value } alt={ img.value } className="rounded-2 watch-form__preview" /> }
            <CloseButton className="position-absolute top-0 end-0" style={{ fontSize: '0.7rem', color: '#f00' }} onClick={ () => onDelete && onDelete(img) } />
        </div>
    );
}

export default ImagePreview;