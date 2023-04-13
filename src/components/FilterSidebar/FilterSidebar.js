
import FilterSidebarItem from "./FilterSidebarItem";

import { selectValues as selectDialTypes, getAsync as getDialTypes } from '../../app/dialtypeSlice';
import { selectValues as selectBrands, getAsync as getBrands } from '../../app/brandSlice';
import { selectValues as selectCollections, getAsync as getCollections } from '../../app/collectionSlice';
import { selectValues as selectStyles, getAsync as getStyles } from '../../app/styleSlice';
import { selectValues as selectGenders, getAsync as getGenders } from '../../app/genderSlice';
import { selectValues as selectMovementTypes, getAsync as getMovementTypes } from '../../app/movementtypeSlice';
import { selectValues as selectColors, getAsync as getColors } from '../../app/colorSlice';
import { selectValues as selectCaseShapes, getAsync as getCaseShapes } from '../../app/caseshapeSlice';
import { selectValues as selectGlassTypes, getAsync as getGlassTypes } from '../../app/glasstypeSlice';
import { selectValues as selectIncrustationTypes, getAsync as getIncrustationTypes } from '../../app/incrustationtypeSlice';
import { selectValues as selectMaterials, getAsync as getMaterials } from '../../app/materialSlice';
import { selectValues as selectStrapTypes, getAsync as getStrapTypes } from '../../app/straptypeSlice';
import { selectValues as selectWaterResistances, getAsync as getWaterResistances } from '../../app/waterresistanceSlice';
import { selectValues as selectFunctions, getAsync as getFunctions } from '../../app/functionSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";

import PriceSlider from './PriceSlider';

import { AccordionBody, AccordionHeader, AccordionItem, UncontrolledAccordion } from 'reactstrap';


const FilterSidebar = ({ onFilter, clear }) => {
    const dialtypes = useSelector(selectDialTypes);
    const brands = useSelector(selectBrands);
    const collections = useSelector(selectCollections);
    const styles = useSelector(selectStyles);
    const genders = useSelector(selectGenders);
    const movementTypes = useSelector(selectMovementTypes);
    const colors = useSelector(selectColors);
    const caseShapes = useSelector(selectCaseShapes);
    const glassTypes = useSelector(selectGlassTypes);
    const incrustationTypes = useSelector(selectIncrustationTypes);
    const materials = useSelector(selectMaterials);
    const straptypes = useSelector(selectStrapTypes);
    const waterResistances = useSelector(selectWaterResistances);
    const functions = useSelector(selectFunctions);
    const dispatch = useDispatch();

    const [filterText, setFilterText] = useState([]);

    const filters = [
        {
            title: "Виробник",
            items: brands.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, brands: [...selected]});
                filterText["Виробник"] = brands.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        // {
        //     title: "Країна",
        //     items: countries.value,
        //     onAccept: function (selected) {
        //         setSelectedFilters({ ...selectedFilters, countries: [...selected]});
        //         filterText["Країна"] = countries.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
        //         setFilterText(filterText);
        //     }
        // },
        {
            title: "Стиль",
            items: styles.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, styles: [...selected]});
                filterText["Стиль"] = styles.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Стать",
            items: genders.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, genders: [...selected]});
                filterText["Стать"] = genders.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Колекція",
            items: collections.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, collections: [...selected]});
                filterText["Колекція"] = collections.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Тип механізму",
            items: movementTypes.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, mouvementTypes: [...selected]});
                filterText["Тип механізму"] = movementTypes.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Матеріал корпусу",
            items: materials.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, caseMaterials: [...selected]});
                filterText["Матеріал корпусу"] = materials.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Форма корпусу",
            items: caseShapes.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, caseShapes: [...selected]});
                filterText["Форма корпусу"] = caseShapes.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Колір корпусу",
            items: colors.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, caseColors: [...selected]});
                filterText["Колір корпусу"] = colors.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Браслет/ремінець",
            items: straptypes.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, strapTypes: [...selected]});
                filterText["Браслет/ремінець"] = straptypes.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Колір браслету/ремінця",
            items: colors.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, strapColors: [...selected]});
                filterText["Колір браслету/ремінця"] = colors.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Вид циферблату",
            items: dialtypes.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, dialTypes: [...selected]});
                filterText["Вид циферблату"] = dialtypes.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Колір циферблату",
            items: colors.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, dialColors: [...selected]});
                filterText["Колір циферблату"] = colors.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Функції",
            items: functions.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, functions: [...selected]});
                filterText["Функції"] = functions.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },

        {
            title: "Скло",
            items: glassTypes.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, glassTypes: [...selected]});
                filterText["Скло"] = glassTypes.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Інкрустація",
            items: incrustationTypes.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, incrustationTypes: [...selected]});
                filterText["Інкрустація"] = incrustationTypes.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        },
        {
            title: "Водозахист",
            items: waterResistances.value,
            onAccept: function (selected) {
                setSelectedFilters({ ...selectedFilters, waterResistances: [...selected]});
                filterText["Водозахист"] = waterResistances.value.filter(x => selected.includes(x.id)).map(x => x.value).join(', ');
                setFilterText(filterText);
            }
        }

    ];

    const [selectedFilters, setSelectedFilters] = useState({});

    const onPriceFilterAccept = (values) => {
        if(!values || values.length !== 2) {
            return;
        }
        
        setSelectedFilters({ ...selectedFilters, minPrice: values[0], maxPrice: values[1] });
        filterText["Ціна"] = `${ values[0] } - ${ values[1] }`;
        setFilterText(filterText);

    }

    useEffect(() => {
        if(clear === true) {
            setSelectedFilters({ });
            setFilterText([]);
        }
    }, [clear]);

    useEffect(() => {
        onFilter && onFilter(selectedFilters, filterText);
    }, [selectedFilters, filterText]);

    useEffect(() => {
        dispatch(getDialTypes());
        dispatch(getBrands());
        dispatch(getCollections());
        dispatch(getStyles());
        dispatch(getGenders());
        dispatch(getMovementTypes());
        dispatch(getColors());
        dispatch(getCaseShapes());
        dispatch(getGlassTypes());
        dispatch(getIncrustationTypes());
        dispatch(getMaterials());
        dispatch(getStrapTypes());
        dispatch(getWaterResistances());
        dispatch(getFunctions());
    }, []);
    return (
        <>
            <UncontrolledAccordion stayOpen>
                <AccordionItem>
                    <AccordionHeader targetId="priceItem">Ціна</AccordionHeader>
                    <AccordionBody accordionId="priceItem">
                        <PriceSlider min="0" max="300000" onAccept={ onPriceFilterAccept } clear={ clear } />
                    </AccordionBody>
                </AccordionItem>
                { filters && filters.map((item ,idx) => <FilterSidebarItem key={ idx } title={ item.title } items={ item.items } idx={ idx } onAccept={ item.onAccept } clear={ clear } />) }
            </UncontrolledAccordion>
        </>
    );
}

export default FilterSidebar;