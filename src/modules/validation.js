const notEmptyValidationRule = (value) => {
    if(!value) {
        return false;
    }

    return value.length > 0;
}

const digitsOnlyValidationRule = (value) => {
    if(!value) {
        return;
    }

    if(value.split('').some(i => i < '0' || i > '9')) {
        return false;
    }

    return true;
}

const positiveFloatValidationRule = (value) => {
    if(!value) {
        return false;
    }

    if(typeof value === 'number') {
        return true;
    }

    return parseFloat(value).toString() === value && parseFloat(value) >= 0;
}

const nullOrPositiveFloatValidationRule = (value) => {
    if(!value) {
        return true;
    }

    if(typeof value === 'number') {
        return true;
    }

    return parseFloat(value).toString() === value && parseFloat(value) >= 0;
}


const positiveIntValidationRule = (value) => {
    if(!value) {
        return false;
    }

    if(typeof value === 'number') {
        return true;
    }

    return parseInt(value).toString() === value && parseInt(value) >= 0;
}

const discountValidation = (value) => {
    if(!value) {
        return true;
    }
    return nullOrPositiveFloatValidationRule(value) && parseFloat(value) < 100;
}

const validateWatch = (item) => {
    const errorMsg = [];

    if(!item.title || !item.model || !item.price || !item.available) {
        errorMsg.push('Не всі обов’язкові поля заповнені');
    }

    if(!nullOrPositiveFloatValidationRule(item.weight)) {
        errorMsg.push('Значення поля Вага має бути позитивним числом');
    }

    if(!nullOrPositiveFloatValidationRule(item.caseSize)) {
        errorMsg.push('Значення поля Розмір корпусу має бути позитивним числом');
    }

    if(!positiveFloatValidationRule(item.price)) {
        errorMsg.push('Значення поля Ціна має бути позитивним числом');
    }

    if(!discountValidation(item.discount)) {
        errorMsg.push('Значення поля Знижка має бути позитивним числом');
    }

    if(!positiveIntValidationRule(item.available)) {
        errorMsg.push('Значення поля В наявності має бути позитивним числом');
    }

    return errorMsg;
}


const functions = {
    notEmptyValidationRule: notEmptyValidationRule,
    positiveFloatValidationRule: positiveFloatValidationRule,
    positiveIntValidationRule: positiveIntValidationRule,
    nullOrPositiveFloatValidationRule: nullOrPositiveFloatValidationRule,
    discountValidation: discountValidation,
    validateWatch: validateWatch,
    digitsOnlyValidationRule: digitsOnlyValidationRule
};

export default functions;