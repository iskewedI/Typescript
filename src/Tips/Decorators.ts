/**
 * Decorators are functions that get called by the Js runtime (engine).
 * EXPERIMENTAL FEATURE - Needs to be enabled using "experimentalDecorators: true"
 */

// Class decorators expects only one argument, the Class Constructor function.

// You can do it extending this class, implementing inheritance
class ComponentDecoratorClass {
  insertInDOM() {
    console.log('Inserting in DOM...');
  }
}

// One way to do it, is defining it as a function
// It's called only once, even if no instance is created.
function ComponentDecoratorFunction(constructor: Function) {
  console.log('Constructor called');

  // Every instance of the decorated class and childrens will have these properties
  constructor.prototype.customProperty = 'abc';
  constructor.prototype.insertInDOM = () => {
    console.log('Inserting in DOM...');
  };
}

@ComponentDecoratorFunction
class AComponent {}

class AnotherComponent extends ComponentDecoratorClass {}

type Params = {
  selector: string;
};

// Parametrized or dynamic decorators -> Decorator factory
function DecoratorFactory(params: Params) {
  return (constructor: Function) => {
    constructor.prototype.customProperty = 'abc';
    constructor.prototype.selector = params.selector;
  };
}

@DecoratorFactory({ selector: '#with-factory' })
class ComponentWithFactory {}

// Decorator Composition -> Order in which the decorator are being called
function First(constructor: Function) {
  console.log('First decorator');
}

function Second(constructor: Function) {
  console.log('Second decorator');
}

@Second
@First
class TellMeTheOrder {}

// Method decorators
/* Expects three arguments.
    1st - The object that owns the method. Commonly we give it the 'any' type.
    2nd - Name of the method.
    3rd - Descriptor object. Type: PropertyDescriptor.

*/

function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value as Function;

  descriptor.value = function (...args: any) {
    console.log('Decorated. Logging... ');
    original.call(this, ...args);
    console.log('Finished logging.');
  };
}

class WithMethodDecorated {
  @Log
  say(message: string) {
    console.log('Logging...', message);
  }
}

function Capitalize(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const original = descriptor.get;

  descriptor.get = function () {
    const result = original?.call(this);

    return typeof result === 'string' ? result.toUpperCase() : result;
  };
}
// Accesor decorators (Getter and Setter)
class Person {
  constructor(public firstName: string, public lastName: string) {}

  @Capitalize
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// Parameterized decorator
function MinLength(length: number) {
  return function (target: any, propertyName: string) {
    let value: string;

    const descriptor: PropertyDescriptor = {
      get() {
        return value;
      },
      set(newValue: string) {
        if (newValue.length < length) {
          throw new Error(
            `${propertyName} should be at least ${length} characters long.`
          );
        }

        console.log('Password setted correctly');
        value = newValue;
      },
    };

    Object.defineProperty(target, propertyName, descriptor);
  };
}

// Property decorators
class UserWithValidation {
  @MinLength(8)
  password: string;

  // To apply decorator, we can't use the shorthand in the constructor to set class properties
  constructor(password: string) {
    this.password = password;
  }
}

const user = new UserWithValidation('12313131313123');

type WatchedParameter = {
  methodName: string;
  parameterIndex: number;
};

const watchedParameters: WatchedParameter[] = [];

function Watch(target: any, methodName: string, parameterIndex: number) {
  watchedParameters.push({
    methodName,
    parameterIndex,
  });
}

// Parameter decorator
class Vehicle {
  move(@Watch speed: number) {}
}
