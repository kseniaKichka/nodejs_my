
function mergeObjects<T extends object, R extends object>(a: T, b: R) {
    return Object.assign({}, a, b);
}

// mergeObjects('fff','fff');

interface ILength {
    length: number
}

function withCount<T extends ILength>(value: T) : {value: T, count: string} {
    return {
        value,
        count: `here is ${value.length} elements`
    }
}

withCount('13245')


