//Access modifiers
class AccessModifiers {
  // Only accessible within this class and it's optional
  private _privateProperty?: string;

  constructor() {}

  getPrivateProperty(): string | undefined {
    return this._privateProperty;
  }
}

// Parameter properties
class ParameterPropertiesShortcut {
  // readonly id: number;

  // Automatically it will generate the class field id and initialize it's value depending the constructor param
  constructor(public readonly id: number) {
    // this.id = id;
  }
}

// Getters and settters
class GettersSetters {
  private _privateProperty?: string;

  get privateProperty(): string {
    return this._privateProperty || 'None';
  }

  set privateProperty(newValue: string) {
    if (newValue.length === 0) {
      throw new Error('Expected long value...');
    }

    this._privateProperty = newValue;
  }
}

const getSet = new GettersSetters();

console.log(getSet.privateProperty);

// Index signature properties
class SeatAssignment {
  // Mosh, John...
  [seatNumber: string]: string;
}

const seats = new SeatAssignment();
seats.A1 = 'Mosh';
seats.A2 = 'John';

// Static members
class StaticMembers {
  // Immediate iniitalized properties
  initialized: number = 0;

  // Static property that belongs to the class. The value changes persists
  // in every instance
  static classProperty: number = 0;
}

// Method overriding
// Always enable 'noImplicitOverride' in tsconfig.
class Parent {
  method1() {
    console.log('Soy parent');
  }
}

class Children extends Parent {
  override method1(): void {
    console.log('Soy children');
  }
}

// Polymorphism
// The possibility of a variable to take more than one shape
const callMethod = (people: Parent[]) => {
  // Person constant will be an instance of Parent or Children
  for (const person of people) {
    console.log(person.method1());
  }
};

callMethod([new Parent(), new Children(), new Children()]);

// Protected memebers
class WithProtecteds {
  // Inherited method - Hidden from outside
  protected protectedMethod() {}

  // Not inherited method - Hidden from outside
  private privateMethod() {}
}

// Abstract classes and methods
// Not ready to be instanciated, it's not a thing that can be used
abstract class Shape {
  abstract render(): void;
}

// Interfaces
// Define the shape of objects
// Shorter code both in TS and JS
// Can't have declarations
interface Calendar {
  name: string;
  addEvent(): void;
  removeEvent(): void;
}
