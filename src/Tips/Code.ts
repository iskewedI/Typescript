// Optional property access operator
const customer = {
  a: '',
};

console.log(customer?.a);

// Optional element access operator
const arr: number[] = [];
arr?.[0];

// Optional call
console.log?.('a');

// Nullish Coaelscing Operator
let canBeNull: number | null = null;

// canBeNull !== null ?return canBeNull : "isNull";
console.log(canBeNull ?? 'is null');
