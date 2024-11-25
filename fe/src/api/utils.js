export function camelToSnake(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

export function camelToSnakeKeys(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(camelToSnakeKeys);
    }

    return Object.keys(obj).reduce((acc, key) => {
        const snakeKey = camelToSnake(key);
        acc[snakeKey] = camelToSnakeKeys(obj[key]);
        return acc;
    }, {});
}
