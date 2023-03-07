
import { useEffect, useState } from 'react';
import { AccordionItem, AccordionHeader, AccordionBody, FormGroup, Input, Label, ButtonGroup, Button } from 'reactstrap';


const FilterSidebarItem = ({ title, items, idx, onAccept, checkedItems }) => {
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        if(checkedItems) {
            setChecked([...checkedItems]);
        }
    }, [checkedItems]);

    const handleChecked = (item, value) => {
        if(value === true) {
            setChecked([...checked, item.id]);
        }
        else {
            setChecked(checked.filter(i => i !== item.id));
        }
    }

    const accept = () => {
        onAccept && onAccept(checked);
    }

    return (
        <AccordionItem>
            <AccordionHeader targetId={ idx.toString() }>{ title }</AccordionHeader>
            <AccordionBody accordionId={ idx.toString() }>
                <div style={{ overflowY: 'auto', paddingTop: '1rem' }}>
                <ButtonGroup vertical className="p-1 mb-2 d-flex justify-content-center me-0" style={{ maxHeight: '5rem' }}>
                    { items && items.map((item => 
                        <FormGroup key={ item.id } check>
                        <Input type="checkbox" id={ `${title}${item.id}` } className="pointer" onChange={ (e) => handleChecked(item, e.target.checked) } />
                        {' '}
                        <Label check for={ `${title}${item.id}` }>{ item.value }</Label>
                    </FormGroup>)) }
                </ButtonGroup></div>
                <Button size="sm" onClick={ accept }>Застосувати</Button>
            </AccordionBody>
        </AccordionItem>
    );
}


export default FilterSidebarItem;