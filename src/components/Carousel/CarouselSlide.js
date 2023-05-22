import { createRef, useEffect, useState } from "react";


const CarouselSlide = ({ item }) => {
    const refImgContainer = createRef();
    const [previewHeight, setPreviewHeight] = useState(1);

    useEffect(() => {
        if(refImgContainer.current) {
            const height = refImgContainer.current.getBoundingClientRect().height;
            setPreviewHeight(height);
        }
    }, [refImgContainer]);

    if(!item) {
        return null;
    }

    return (
        <div>
            { item.promotion ? 
                <a href={ `/promotion/${ item.promotion.id }` }>
                    <div className="position-relative" ref={ refImgContainer } style={{ objectFit: 'cover', overflow: 'hidden' }}>
                        <img src={ item.imageUrl} style={{ objectFit: 'cover', maxHeight: '100%', maxWidth: '100%' }} />
                        { item.texts && item.texts.map((i, idx) => 
                            <span key={ idx } className='position-absolute' style={{ 
                                top: i.top ? `${ i.top }%` : 0, 
                                left: i.left ? `${ i.left }%` : 0, 
                                fontSize: i.fontSize ? `${ previewHeight * i.fontSize / 100 }px` : '14px', 
                                color: i.fontColor ?? '#000' 
                            }} >{ i.text }</span>
                        ) }
                    </div>
                </a>
                :
                <div className="position-relative" ref={ refImgContainer } style={{ objectFit: 'cover', overflow: 'hidden' }}>
                <img src={ item.imageUrl} style={{ objectFit: 'cover', maxHeight: '100%', maxWidth: '100%' }} />
                { item.texts && item.texts.map((i, idx) => 
                    <span key={ idx } className='position-absolute' style={{ 
                        top: i.top ? `${ i.top }%` : 0, 
                        left: i.left ? `${ i.left }%` : 0, 
                        fontSize: i.fontSize ? `${ previewHeight * i.fontSize / 100 }px` : '14px', 
                        color: i.fontColor ?? '#000' 
                    }} >{ i.text }</span>
                ) }
            </div>
            }
        </div>
    );
}

export default CarouselSlide;