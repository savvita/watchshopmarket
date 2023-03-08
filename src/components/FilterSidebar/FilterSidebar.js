
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
import { selectValues as selectCountries, getAsync as getCountries } from '../../app/countrySlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";

import { UncontrolledAccordion } from 'reactstrap';


const FilterSidebar = ({ onFilter }) => {
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
    const countries = useSelector(selectCountries);
    const dispatch = useDispatch();

    const filters = [
        {
            title: "Водозахист",
            items: waterResistances.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, waterResistances: [...selected]})
        },
        {
            title: "Стиль",
            items: styles.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, styles: [...selected]})
        },
        {
            title: "Форма корпусу",
            items: caseShapes.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, caseShapes: [...selected]})
        },
        {
            title: "Колекція",
            items: collections.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, collections: [...selected]})
        },
        {
            title: "Колір корпусу",
            items: colors.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, caseColors: [...selected]})
        },
        {
            title: "Колір браслету/ремінця",
            items: colors.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, strapColors: [...selected]})
        },
        {
            title: "Колір циферблату",
            items: colors.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, dialColors: [...selected]})
        },
        {
            title: "Країна",
            items: countries.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, countries: [...selected]})
        },
        {
            title: "Вид циферблату",
            items: dialtypes.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, dialTypes: [...selected]})
        },
        {
            title: "Функції",
            items: functions.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, functions: [...selected]})
        },
        {
            title: "Стать",
            items: genders.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, genders: [...selected]})
        },
        {
            title: "Скло",
            items: glassTypes.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, glassTypes: [...selected]})
        },
        {
            title: "Інкрустація",
            items: incrustationTypes.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, incrustationTypes: [...selected]})
        },
        {
            title: "Матеріал корпусу",
            items: materials.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, caseMaterials: [...selected]})
        },
        {
            title: "Тип механізму",
            items: movementTypes.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, mouvementTypes: [...selected]})
        },
        {
            title: "Браслет/ремінець",
            items: straptypes.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, strapTypes: [...selected]})
        },
        {
            title: "Виробник",
            items: brands.value,
            onAccept: (selected) => setSelectedFilters({ ...selectedFilters, brands: [...selected]})
        }
    ];

    const [selectedFilters, setSelectedFilters] = useState({});

    useEffect(() => {
        onFilter && onFilter(selectedFilters);
    }, [selectedFilters]);

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
        dispatch(getCountries());
    }, []);
    return (
        <UncontrolledAccordion stayOpen>
            { filters && filters.map((item ,idx) => <FilterSidebarItem key={ idx } title={ item.title } items={ item.items } idx={ idx } onAccept={ item.onAccept } />) }
        </UncontrolledAccordion>
    );
}

export default FilterSidebar;