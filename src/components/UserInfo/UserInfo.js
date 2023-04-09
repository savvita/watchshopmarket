


import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


import { selectProfile, selectStatus, getProfileAsync } from '../../app/authSlice';
import { selectValues as selectReviews, getByUserAsync as getReviews } from '../../app/reviewSlice';
import { selectValues as selectOrders, getByUserAsync as getOrders } from '../../app/orderSlice';
import { useEffect } from "react";
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem, Spinner, Button } from "reactstrap";
import UserData from "./UserData";
import UserReviews from "./UserReviews";
import UserOrders from "./UserOrders";


const UserInfo = () => {
    const params = useParams();

    const status = useSelector(selectStatus);
    const user = useSelector(selectProfile);
    const reviews = useSelector(selectReviews);
    const orders= useSelector(selectOrders);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if(params && params.username) {
            dispatch(getProfileAsync(params.username));
        }
    }, []);

    useEffect(() => {
        if(user && user.id) {
            dispatch(getReviews(user.id));
            dispatch(getOrders(user.id));
        }
    }, [user]);

    const items = [
        {
            id: 1,
            title: 'Дані',
            tag: <UserData item={ user } />
        },
        {
            id: 2,
            title: 'Замовлення',
            tag: <UserOrders items={ orders } />
        },
        {
            id: 3,
            title: 'Відгуки',
            tag: <UserReviews items={ reviews } />
        },
    ];

    return (
        <div className="mt-4 mb-2">
            <Button onClick={() => navigate(-1)}>Назад</Button>
            <div className={ status === 'loading' ? 'd-none' : "mt-2" }>
                <UncontrolledAccordion stayOpen>
                    { items.map(item => 
                        <AccordionItem key={ item.id }>
                            <AccordionHeader targetId={ item.id.toString() }>{ item.title }</AccordionHeader>
                            <AccordionBody accordionId={ item.id.toString() }>
                                { item.tag }
                            </AccordionBody>
                        </AccordionItem>
                    ) }
                </UncontrolledAccordion>
            </div> 
            <div className={ status === 'loading' ? 'd-flex justify-content-center mt-3' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
        </div>
    );
}

export default UserInfo;