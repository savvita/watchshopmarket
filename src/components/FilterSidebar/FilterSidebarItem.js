
import { useEffect, useState } from 'react';
import { AccordionItem, AccordionHeader, AccordionBody, FormGroup, Input, Label, ButtonGroup, Button } from 'reactstrap';


const FilterSidebarItem = ({ title, items, idx, onAccept, clear }) => {
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        if(!items) {
            return;
        }
        setChecked(items.map(x => { 
            return { 
                id: x.id, 
                value: x.value,
                isChecked: false 
            } 
        }));
    }, [items]);

    useEffect(() => {
        if(clear === true && items) {
            setChecked(items.map(x => { 
                return { 
                    id: x.id, 
                    value: x.value,
                    isChecked: false 
                } 
            }));
        }
    }, [clear]);

    const handleChecked = (item, value) => {
        setChecked(checked.map(x => { 
            if(x.id !== item.id) {
                return x;
            }
            else {
                return { ...x, isChecked: value };
            }
        }));
    }

    const accept = () => {
        onAccept && onAccept(checked.filter(x => x.isChecked === true).map(x => x.id));
    }

    return (
        <AccordionItem>
            <AccordionHeader targetId={ idx.toString() }>{ title }</AccordionHeader>
            <AccordionBody accordionId={ idx.toString() }>
                <div style={{ overflowY: 'auto' }}>
                    <ButtonGroup vertical className="p-1 mb-2 d-flex justify-content-start me-0" style={{ maxHeight: '5rem' }}>
                    { checked && checked.map((item => 
                        <FormGroup key={ item.id } check className='flex-shrink-0'>
                            <Input type="checkbox" id={ `${title}${item.id}` } checked={ item.isChecked } className="pointer" onChange={ (e) => handleChecked(item, e.target.checked) } />
                            {' '}
                            <Label check for={ `${title}${item.id}` }>{ item.value }</Label>
                        </FormGroup>)) }
                    </ButtonGroup>
                </div>
                <Button className='mt-2' size="sm" onClick={ accept }>Застосувати</Button>
            </AccordionBody>
        </AccordionItem>
    );
}


export default FilterSidebarItem;