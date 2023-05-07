function typeOf(value, type) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
}

function isFunction(value) {
    return typeOf(value, "Function");
}

function isObject(value) {
    return typeOf(value, "Object");
}

function isArray(value) {
    return typeOf(value, "Array");
}

function isString(value) {
    return typeOf(value, "String");
}

function isNumber(value) {
    return typeOf(value, "Number");
}

function isMap(value) {
    return typeOf(value, "Map");
}

function isSet(value) {
    return typeOf(value, "Set");
}

function isPromise(value) {
    return (
        value instanceof Promise ||
        ((isFunction(value) || isObject(value)) && isFunction(value.then))
    );
}