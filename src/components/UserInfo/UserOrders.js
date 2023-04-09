import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import PerPageSelect from "../PerPageSelect";
import OrderCard from "./OrderCard";



const UserOrders = ({ items }) => {

    const [values, setValues] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    const [hits, setHits] = useState(0);

    useEffect(() => {
        pages.splice(0, pages.length);
        pages.push(10);
        pages.push(20);
        pages.push(50);
        setPages(pages);
    }, []);

    useEffect(() => {
        if(items) {
            setHits(items.length);
            setValues(items.slice((currentPage - 1) * perPage, currentPage * perPage));
        }
    }, [items]);

    useEffect(() => {
        if(items) {
            setValues(items.slice((currentPage - 1) * perPage, currentPage * perPage));
        }
    }, [currentPage, perPage]);

    if(!items) {
        return null;
    }


    return (
        <div className="text-white">
            { hits > 0 ? 
            <>
                <PerPageSelect values={ pages } onChange={ (idx) => setPerPage(pages[idx]) } />

                { values && values.map(item => item && <OrderCard key={ item.id } item={ item } />) }

                <Pagination currentPage={ currentPage } hits={ hits } perPage={ perPage } onPageChanged={ (page) => setCurrentPage(page) } />
            </>
            :
                'Замовлень немає'
            }
        </div>
    );
}

export default UserOrders;