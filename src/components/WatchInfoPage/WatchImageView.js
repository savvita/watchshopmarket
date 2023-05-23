import { useEffect, useState } from "react";




const WatchImageView = ({ item }) => {

    const [current, setCurrent] = useState(null);

    useEffect(() => {
        if(!item || !item.images || !item.images.length === 0) {
            return;
        }
        
        setCurrent(item.images[0]);

    }, [item]);

    return (
        <div className="d-flex flex-column align-items-center bg-light rounded-3 overflow-hidden">
            <div className="watch-image-view__img rounded-3">
                { current ? <img src={ current.value } alt={ item.title } /> : <img src="/images/No_image_available.png" alt={ item.title } />}
            </div>
            { item && item.images && <div className="d-flex flex-row justify-content-center flex-grow-1">
                { item.images.map((img) => 
                <div key={ img.id } className={ current && img.id === current.id ? "rounded-1 m-1 watch-image-view__preview d-flex align-items-end watch-image-view__preview__active" : "rounded-1 m-1 watch-image-view__preview d-flex align-items-end"}><img src={ img.value } alt={ item.title } style={{ width: '4rem' }} onClick={ () => setCurrent(img) } /></div>)}
            </div> }
        </div>
    );
}

export default WatchImageView;