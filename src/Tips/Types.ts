// We can separe digits in a big number with "_" to improve code readability.
let bigNumber: number = 100_500;

// Tuples syntax
let tuple: [number, string] = [1, 'First Tuple'];

// When declaring an Enum, use a const to generate a more optimized code
const enum MyEnum {
  First = 1,
  Second,
  Third,
}

// Types
type aType = {
  property: string;
  readonly anotherProperty: number;
};

// Union types - Set a variable that could be from one or another type
let numberOrString: number | string = '';

if (typeof numberOrString === 'number') {
  // Narrowing -> Reduce the type categories to a more specific type
}

// Intersection types - Set a variable that have more than one type

type Entity = {
  position: string;
};

type Slime = {
  color: string;
};

let aSlime: Entity & Slime;

// Literal types - Limit the values that a variable could have
type Metric = 'cm' | 'inch';

let distanceFormat: Metric;

// Type assertion -> Casting
let inputElement = document.getElementById('input') as HTMLInputElement;
console.log(inputElement.value);

// 'Unknown' type -> Forces us to do type checking
let unknownType: unknown = 0;
if (typeof unknownType === 'number') {
  // Narrowing - We have here all the Number's methods.
}

// 'Never' type - Value that never occurs
// If we set the "allowUnreachableCode" option to false in tsconfig.json, the call to this function
// will be prevented
// function infinite() { <--- The compiler doesn't know that this function never returns
function infinite(): never {
  while (true) {
    //...
  }
}

infinite();
console.log('Never reached');
