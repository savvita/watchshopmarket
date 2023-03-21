
import { Input } from 'reactstrap';

import { useState } from 'react';

import './AutocompleteSelect.css'

const AutocompleteSelect = ({ items, placeholder, onSelect }) => {

    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [userInput, setUserInput] = useState("");

    const onChange = (e) => {
        setUserInput(e.currentTarget.value);
        setFilteredSuggestions(items.filter(x => x.description && x.description.toLowerCase().startsWith(e.currentTarget.value.toLowerCase())));
        setShowSuggestion(true);
    }

    const onClick = (value, idx) => {
        setFilteredSuggestions([]);
        setShowSuggestion(false);
        setUserInput(value);
        onSelect && onSelect(filteredSuggestions[idx]);
    }

    const onKeyDown = (e) => {

        if (e.keyCode === 13) {
            setActiveSuggestion(0);
            setShowSuggestion(false);
            setUserInput(filteredSuggestions[activeSuggestion]);
        } 
    };

    const suggestionList = () => {
        if(showSuggestion && userInput) {
            if(filteredSuggestions.length > 0) {
                return (
                    <ul className="autocomplete__suggestions w-100 position-absolute bg-dark" style={{ zIndex: 100 }}>
                        {
                            filteredSuggestions.map((item, idx) => {
                                let className = "bg-dark";
                                if(idx === activeSuggestion) {
                                    className += "autocomplete__suggestion-active"
                                }

                                return <li key={ item.ref } className={ className } onClick={ (e) => onClick(e.currentTarget.innerText, idx) }>{ item.description }</li>
                            })
                        }
                    </ul>
                );
            }
            else {
                return (
                    <div className="autocomplete__no-suggestions">
                        <em>Не знайдено</em>
                    </div>
                );
            }
        }
    }
    return (
        <div className='position-relative'>
            <Input type='text' onChange={ onChange } onKeyDown={ onKeyDown } value={ userInput } placeholder={ placeholder } />
            { suggestionList() }
        </div>
    );
}

export default AutocompleteSelect;