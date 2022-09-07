class KeyValuePair {
  // Restricted values
  // constructor(public key: number, public value: string){}

  // Solution 1: Use any
  // Issue: We won't have intellisense!
  constructor(public key: any, public value: string) {}

  // Correct solution: Generic classes
}

let pair = new KeyValuePair(1, 'Apple');
let pairWithKeyString = new KeyValuePair('1', 'Apple');

// pairWithKeyString.key.INTELLISENSE?

// T comes from Template Classes (T = Template)
class GenericKeyValuePair<T> {
  // For generic Key and Values
  // class GenericKeyValuePair<K, V> {
  constructor(public key: T, public value: string) {}
}

let genericPair = new GenericKeyValuePair<number>(1, 'Apple');
genericPair.key.toFixed();

let genericPairWithKeyString = new GenericKeyValuePair<string>('1', 'Banana');
genericPairWithKeyString.key.includes('1');

// Generic functions
function wrapInArray<T>(value: T) {
  return [value];
}

let numbers = wrapInArray(1);
let strings = wrapInArray('1');

// Generic interfaces
interface APIResult<T> {
  data: T | null;
  error: string | null;
}

function fetch<T>(url: string): APIResult<T> {
  return { data: null, error: null };
}

interface User {
  username: string;
}

interface Product {
  title: string;
}

let productResult = fetch<Product>('url');
productResult.data?.title;

// Constraints - Limit the object types that generics have.
// We can use primitive types, objects, interfaces, classes.
// Here the T type must be only numer or string.
function echo<T extends number | string>(value: T): T {
  return value;
}

echo('1');

function objConstrain<T extends { name: string }>(value: T): T {
  return value;
}

objConstrain({ name: 'x' }); // Work
// objConstrain({ random: 2 }); WONT work

// keyof Operator
// Set a type based on a list of keys of an object
class Findable<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }

  find(property: keyof T, value: unknown): T | undefined {
    return this._objects.find(obj => obj[property] === value);
  }
}

const findable = new Findable<Product>();
findable.add({ title: 'Product 1' });
findable.add({ title: 'Product 2' });

const product1 = findable.find('title', 'Product 1'); // Will encounter product 1
// findable.find('NON EXISTING PROPERTY'); COMPILATION ERROR

// Type Mapping
interface ProductMapping {
  name: string;
  price: string;
}

// We need to use a type alias
type ReadOnlyProduct = {
  readonly [K in keyof Product]: Product[K];
  // Index signature

  // in = iterating over the keys
  // K = holds the property (key) value in the current iteration
};

const readonlyProduct: ReadOnlyProduct = {
  title: "I'm Readonly",
};

// readonlyProduct.title = "Compilation error";

// Type mapping with generics
// There're a lot of Built-In types already in TS!
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

const scalableReadonlyProduct: ReadOnly<Product> = {
  title: "I'm a better readonly product",
};

// scalableReadonlyProduct.title = 'Compilation error';

type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Nullable<T> = {
  [K in keyof T]: T[K];
};
