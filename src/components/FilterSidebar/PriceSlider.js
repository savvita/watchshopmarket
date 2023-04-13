

import { useEffect, useRef, useState } from 'react';
import 'toolcool-range-slider/dist/plugins/tcrs-generated-labels.min.js';
import 'toolcool-range-slider/dist/plugins/tcrs-moving-tooltip.min.js';
import 'toolcool-range-slider';
import { Button } from 'reactstrap';



const PriceSlider = ({ min, max, onAccept, clear }) => {
    const sliderRef = useRef(null);
    const [values, setValues] = useState([min ?? 0, max ?? 0 ]);

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

    useEffect(() => {
        if(clear === true) {
            setValues([min ?? 0, max ?? 0]);
        }
    }, [clear]);

    const accept = () => {
        onAccept && onAccept(values);
    }

    return (
        <div>
            <p className="text-white text-center mt-0 mb-2">{ values[0] }&nbsp;&#8372; - { values[1] }&nbsp;&#8372;</p>
            <toolcool-range-slider ref={ sliderRef } value1={ values[0] ?? 0 } value2={ values[1] ?? 0 } min={ min ?? 0 } max={ max ?? 0 } step="1" slider-height="0.9rem" slider-bg="#475569" slider-bg-fill="#CBD5E1"  />
            <Button className='mt-2' size="sm" onClick={ accept }>Застосувати</Button>
        </div>
    );
}


export default PriceSlider;