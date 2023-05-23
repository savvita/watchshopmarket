import { Input } from "reactstrap";





const SortingSelect = ({ items, onChange }) => {


    const change = (e) => {
        onChange && onChange(e.target.value);
    }

    return (
        <div>
            <Input type="select" onChange={ change }>
                { items && items.map(item => <option key={ item.value } value={ item.value }>{ item.title }</option>) }
            </Input>
        </div>
    );
}

export default SortingSelect;