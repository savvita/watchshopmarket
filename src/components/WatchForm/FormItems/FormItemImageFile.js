import ImagePreview from './ImagePreview';

import { useEffect, useState } from 'react';
import { FormText, Input } from 'reactstrap';

const FormItemImageFile = ({ initialValues, onChange }) => {
    const [imgs, setImgs] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(initialValues) {
            setImgs(initialValues);
        }
    }, [initialValues]);

    const deleteImage = (img) => {
        setImgs(imgs.filter(item => item.file !== img.file || item.src !== img.src));
    }
    
    const handleFiles = (e) => {
        const err = [];
        if(!e.target.files || e.target.files.length === 0) {
            return;
        }

        const files = e.target.files;

        const p = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
        
            if (!file.type.startsWith('image/')){ 
                err.push("Недопустимий формат файлу");
                continue;
            }

            if (file.size > 1024 * 1024){ 
                const error = "Файл " + file.name + " занадто великий";
                err.push(error);
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

        setErrors([...err]);
        Promise.all(p).then((values) => {
            setImgs([...imgs, ...values]);
        });
    }

    useEffect(() => {
        onChange && onChange(imgs);
    }, [imgs]);


    return (
        <div className='pt-2'>
            <Input name="file" type="file" onChange={ handleFiles } multiple size={ 1024 * 1024 } />
            <FormText>*&nbsp;Максимальний розмір 1&nbsp;Мб</FormText>
            { errors.map((item, idx) => <p key={ idx } className='text-danger'>{ item }</p>) }
            { imgs && imgs.map((item, idx) => <ImagePreview key={ idx } img={ item } onDelete={ deleteImage } />) } 
        </div>
    );

}

export default FormItemImageFile;