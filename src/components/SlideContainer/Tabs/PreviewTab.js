


import { createRef, useEffect, useState } from 'react';
import { Col, FormGroup, Input, Label, Row, TabPane } from 'reactstrap';
import SlideTextSelect from '../Items/SlideTextSelect';
import TextFormatting from '../Items/TextFormatting';


const PreviewTab = ({ tabId, item, onChange }) => {
    const refImgContainer = createRef();

    const [previewHeight, setPreviewHeight] = useState(1);
    const [previewText, setPreviewText] = useState(null);

    const [value, setValue] = useState({
        imageUrl: null,
        texts: []
    });

    const [errors, setErrors] = useState([]);


    useEffect(() => {
        if(!item) {
            return;
        }

        setValue({ ...item });
    }, [item]);

    useEffect(() => {
        const height = refImgContainer.current.getBoundingClientRect().height;
        setPreviewHeight(height);
    }, [refImgContainer]);

    useEffect(() => {
        if(!value) {
            return;
        }

        onChange && onChange({ ...value, texts: [...value.texts] });
    }, [value]);

    const addText = (text) => {
        setValue({ ...value, texts: [ ...value.texts, text ] });
        setPreviewText(null);
    }

    const removeText = (text) => {
        if(!value || !value.texts) {
            return;
        }

        const texts = value.texts.filter(x => x !== text);

        setValue({ ...value, texts:[...texts]});
    }

    const showTextPreview = (item) => {
        setPreviewText({ ...item });
    }

    const handleFiles = (e) => {
        const err = [];
        if(!e.target.files || e.target.files.length !== 1) {
            return;
        }

        const files = e.target.files;

        const file = files[0];
    
        if (!file.type.startsWith('image/')){ 
            err.push("Недопустимий формат файлу");
        }

        if (file.size > 1024 * 1024){ 
            const error = "Файл " + file.name + " занадто великий";
            err.push(error);
        }

        const url = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function(e) {
        };

        img.src = url.createObjectURL(file);
        setValue({ ...value, imageUrl: { src: img.src, file: file } });

        setErrors([...err]);
    }

    if(!tabId) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            <FormGroup>
                <Label>Завантажити зображення</Label>
                <Input type="file" name="img" onChange={ handleFiles } size={ 1024 * 1024 } accept="image/jpeg" />
                { errors.map((item, idx) => <p key={ idx } className='text-danger'>{ item }</p>) }
            </FormGroup>
            <Row>
                <Col md="12" lg="9">
                    <div className="position-relative slide-form__img-container" style={{ backgroundImage: `url(${ value.imageUrl ? value.imageUrl.src : '' })` }}ref={ refImgContainer }>
                        { value && value.texts && value.texts.map((item, idx) => 
                            <span key={ idx } className='position-absolute' style={{ 
                                top: item.top ? `${ item.top }%` : 0, 
                                left: item.left ? `${ item.left }%` : 0, 
                                fontSize: item.fontSize ? `${ previewHeight * item.fontSize / 100 }px` : '14px', 
                                color: item.fontColor ?? '#000' 
                            }} >{ item.text }</span>
                        ) }
                        { previewText &&  <span className='position-absolute' style={{ 
                                top: previewText.top ? `${ previewText.top }%` : 0, 
                                left: previewText.left ? `${ previewText.left }%` : 0, 
                                fontSize: previewText.fontSize ? `${ previewHeight * previewText.fontSize / 100 }px` : '14px', 
                                color: previewText.fontColor ?? '#000' 
                            }} >{ previewText.text }</span> }
                    </div>
                </Col> 
                <Col md="12" lg="3">
                    <TextFormatting onAdd={ addText } onChange={ showTextPreview } />
                    <hr />
                    { value && value.texts && value.texts.length > 0 && <SlideTextSelect items={ value.texts } onDelete={ removeText } /> }
                </Col>
            </Row>
        </TabPane>
    );
}

export default PreviewTab;