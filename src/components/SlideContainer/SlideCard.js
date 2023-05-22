import { createRef, useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, FormGroup, Input, Label } from "reactstrap";





const SlideCard= ({ item, onUpdate }) => {
    const refImgContainer = createRef();
    const [previewHeight, setPreviewHeight] = useState(1);

    const [idx, setIdx] = useState([0, 1, 2, 3, 4, 5]);

    const [value, setValue] = useState({ isActive: false});

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

    const setIndex = (e) => {
        const i = parseInt(e.target.value);
        setValue({ ...value, index: i });
    }

    const switchActive = () => {
        const val = { ...value, isActive: !value.isActive };
        setValue({ ...val });

        onUpdate && onUpdate(val);
    }

    if(!item || !value) {
        return null;
    }

    return (
        <Card style={{ width: '30rem', height: 'auto' }} className="text-dark m-2">
            <CardBody className="p-1">
                
                <div className="position-relative" ref={ refImgContainer } style={{ objectFit: 'contain' }}>
                    <img src={ value.imageUrl} style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }} />
                    { value && value.texts && value.texts.map((i, idx) => 
                        <span key={ idx } className='position-absolute' style={{ 
                            top: i.top ? `${ i.top }%` : 0, 
                            left: i.left ? `${ i.left }%` : 0, 
                            fontSize: i.fontSize ? `${ previewHeight * i.fontSize / 100 }px` : '14px', 
                            color: i.fontColor ?? '#000' 
                        }} >{ i.text }</span>
                    ) }
                </div>
            </CardBody>
            <CardFooter>
                <div className="d-flex justify-content-between mb-2">
                    <FormGroup switch>
                        <Input type="switch" checked={ value.isActive } onChange={ switchActive } />
                        <Label check>Опубліковано</Label>
                    </FormGroup>
                    { value.promotion && <a href={`/manager/promotion/${ value.promotion.id }`}><Button color="primary" className="px-4">Акція</Button></a>}
                </div>

                <FormGroup className="d-flex align-items-end">
                    <Label className="me-2">Індекс</Label>
                    <Input type="select" value={ value.index } onChange={ setIndex }>
                        { idx.map(i => <option key={ i } value={ i }>{ i }</option>) }
                    </Input>
                </FormGroup>
            </CardFooter>
        </Card>
    );
}

export default SlideCard;