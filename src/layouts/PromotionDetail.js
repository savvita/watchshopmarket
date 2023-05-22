import { useParams } from "react-router-dom";
import PromotionDetailView from "../components/PromotionDetailView";

import { getByIdAsync, updateAsync,  selectStatus, selectCurrent } from '../app/promotionSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import InfoModal from "../components/InfoModal";


const PromotionDetail = ({ isManagerMode }) => {
    const params = useParams();

    const item = useSelector(selectCurrent);
    const status = useSelector(selectStatus);
    
    const dispatch = useDispatch();

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    useEffect(() => {
        dispatch(getByIdAsync(params.id));
    }, []);

    const saveItem = async (item) => {

        if(!item) {
            return;
        }
        
        let res = null;
        if(item.id && item.id !== 0) {
            const newItem = { ...item, description: item.description === '' ? null : item.description }
            res = await dispatch(updateAsync(newItem));
        }

        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText('Щось пішло не так. Спробуйте пізніше');
            setInfoModal(true);
        }
        else {
            if(res.payload.value) {
                if(res.payload.value.code === 404) {
                    setInfoHeader('Помилка');
                    setInfoText('Запис було видалено іншим користувачем');
                    setInfoModal(true);
                }
    
                if(res.payload.value.code === 409) {
                    setInfoHeader('Помилка');
                    setInfoText('Запис було змінено іншим користувачем');
                    setInfoModal(true);
                }
            }

            dispatch(getByIdAsync(params.id));
        }
    }


    return (
        <div>
            <div className={ status === 'loading' ? 'd-flex justify-content-center mt-3' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
            { item &&
                <div className={ status !== 'idle' ? 'd-none' : 'mt-4' }>
                    <PromotionDetailView item={ item } isManagerMode={ isManagerMode } onUpdate={ saveItem } />
                </div>
            }     
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />
        </div>
    );
}

export default PromotionDetail;