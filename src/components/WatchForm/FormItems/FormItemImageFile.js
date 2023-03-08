import ImagePreview from './ImagePreview';

import { useEffect, useState } from 'react';
import { Input } from 'reactstrap';

const FormItemImageFile = ({ initialValues, onChange }) => {
    const [imgs, setImgs] = useState([]);

    useEffect(() => {
        if(initialValues) {
            setImgs(initialValues);
        }
    }, [initialValues]);

    const deleteImage = (img) => {
        setImgs(imgs.filter(item => item.file !== img.file));
    }
    
    const handleFiles = (e) => {
        if(!e.target.files || e.target.files.length === 0) {
            return;
        }

        const files = e.target.files;

        const p = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
        
            if (!file.type.startsWith('image/')){ 
                continue;
            }

            p.push(new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (function() {
                    return function (e) { 
                        resolve({ src: e.target.result, file: file }); 
                    };
                })();
                reader.readAsDataURL(file);
            }));

        }
        Promise.all(p).then((values) => {
            setImgs([...values]);
        });
    }

    useEffect(() => {
        onChange && onChange(imgs);
    }, [imgs]);


    return (
        <div className='pt-2'>
            <Input name="file" type="file" onChange={ handleFiles } multiple />
            { imgs && imgs.map((item, idx) => <ImagePreview key={ idx } img={ item } onDelete={ deleteImage } />) } 
        </div>
    );

}

export default FormItemImageFile;