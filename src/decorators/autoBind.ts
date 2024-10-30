export default function AutoBind<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      this.bindMethods();
    }

    private bindMethods() {
      // Get all properties of the class instance
      Object.getOwnPropertyNames(constructor.prototype).forEach((key) => {
        const method = key as keyof this;

        // Skip methods that are not functions or the constructor itself
        if (method === 'constructor' || typeof this[method] !== 'function')
          return;

        // Bind each method to the instance
        this[method] = this[method].bind(this);
      });
    }
  };
}
