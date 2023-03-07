const notEmptyValidationRule = (value) => {
    if(!value) {
        return false;
    }

    return value.length > 0;
}

const positiveFloatValidationRule = (value) => {
    if(!value) {
        return false;
    }

    return parseFloat(value) == value && parseFloat(value) > 0;
}


const positiveIntValidationRule = (value) => {
    if(!value) {
        return false;
    }

    return parseInt(value) == value && parseInt(value) >= 0;
}


const functions = {
    notEmptyValidationRule: notEmptyValidationRule,
    positiveFloatValidationRule: positiveFloatValidationRule,
    positiveIntValidationRule: positiveIntValidationRule
};

export default functions;