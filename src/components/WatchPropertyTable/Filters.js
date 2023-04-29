import { Input, FormGroup, Label, ButtonGroup, Row, Col, Button } from 'reactstrap';
import { useEffect, useRef, useState } from 'react';
import 'toolcool-range-slider/dist/plugins/tcrs-generated-labels.min.js';
import 'toolcool-range-slider/dist/plugins/tcrs-moving-tooltip.min.js';
import 'toolcool-range-slider';

const Filters = ({ onAccept }) => {
    const sliderRef = useRef(null);
    const [values, setValues] = useState([0, 300000 ]);

    useEffect(() => {
        const slider = sliderRef.current;

        const onChange = (e) => {
            setValues([...e.detail.values]);
        };

        slider?.addEventListener('change', onChange);

        return () => {
            slider?.removeEventListener('change', onChange);
        };
    }, []);

    const [filters, setFilters] = useState({ 
        model: '', 
        minPrice: null, 
        maxPrice: null, 
        onSale: [], 
        isTop: [] 
    });

    const setOnSale = (value) => {
        let values = [ ...filters.onSale ];
        if(values.includes(value)) {
            values = values.filter(item => item !== value);
        }
        else {
            values.push(value);
        }

        setFilters({ ...filters, onSale: [...values] });
    }

    const setIsTop = (value) => {
        let values = [ ...filters.isTop ];
        if(values.includes(value)) {
            values = values.filter(item => item !== value);
        }
        else {
            values.push(value);
        }

        setFilters({ ...filters, isTop: [...values] });
    }

    const accept = () => {
        onAccept && onAccept({ ...filters, minPrice: values[0], maxPrice: values[1] });
    }

    return (
        <div className='ps-5 mt-3 text-white border-bottom border-light fs-6'>
            <div>
                <p className="m-0 fs-5">Назва</p>
                <FormGroup>
                    <Input name="search" placeholder="Назва" type="search" onInput={ (e) => setFilters({ ...filters, model: e.target.value.toLowerCase() }) } style={{ maxWidth: '40rem' }} />
                </FormGroup>
                <p className="m-0 mb-1 fs-5">Ціна ({ values[0] }&nbsp;&#8372; - { values[1] }&nbsp;&#8372;)</p>
                <toolcool-range-slider ref={ sliderRef } value1={ values[0] } value2={ values[1] } min={ 0 } max={ 300000 } step="1" slider-height="0.9rem" slider-bg="#475569" slider-bg-fill="#CBD5E1" slider-width='40rem' />
            </div>

            <div className="d-flex mt-3">
                <div>
                    <p className="m-0 fs-5">В продажі</p>
                    <ButtonGroup vertical className="p-0 mb-2 d-flex justify-content-center me-0">
                        <FormGroup check className="pointer">
                            <Input type="checkbox" id='onSale_true' className="pointer" onChange={ (e) => setOnSale(true) } />
                            {' '}
                            <Label check for='onSale_true' className="pointer">Так</Label>
                        </FormGroup>
                        <FormGroup check className="pointer">
                            <Input type="checkbox" id='onSale_false' className="pointer" onChange={ (e) => setOnSale(false) } />
                            {' '}
                            <Label check for='onSale_false' className="pointer">Ні</Label>
                        </FormGroup>
                    </ButtonGroup>
                </div>
                <div className="ms-4">
                    <p className="m-0 fs-5">Популярні</p>
                    <ButtonGroup vertical className="p-0 mb-2 d-flex justify-content-center me-0">
                        <FormGroup check className="pointer">
                            <Input type="checkbox" id='top_true' className="pointer" onChange={ (e) => setIsTop(true) } />
                            {' '}
                            <Label check for='top_true' className="pointer">Так</Label>
                        </FormGroup>
                        <FormGroup check className="pointer">
                            <Input type="checkbox" id='top_false' className="pointer" onChange={ (e) => setIsTop(false) } />
                            {' '}
                            <Label check for='top_false' className="pointer">Ні</Label>
                        </FormGroup>
                    </ButtonGroup>
                </div>
            </div>
            <div className="mt-3 mb-3">
                <Button onClick={ accept }>Застосувати</Button>      
            </div>    
        </div>
    );
}

export default Filters;