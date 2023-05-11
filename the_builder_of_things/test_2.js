class Thing {
    constructor(name) {
        this.name = name;
        this.properties = {};
        this.methods = {};
        this.tracker = {};
    }

    get is_a() {
        return new Proxy({}, {
            get: (target, prop) => {
                const property = `is_a_${prop}`;
                this.properties[property] = true;
                return true;
            }
        });
    }

    get is_not_a() {
        return new Proxy({}, {
            get: (target, prop) => {
                const property = `is_a_${prop}`;
                this.properties[property] = false;
                return false;
            }
        });
    }

    has(n) {
        const singularName = this.getLastProperty().replace(/s$/, '');
        const things = [];
        for (let i = 0; i < n; i++) {
            const thing = new Thing(singularName);
            things.push(thing);
        }
        if (n === 1) {
            this.properties[singularName] = things[0];
        } else {
            this.properties[singularName] = things;
        }
        return new PropertyChainer(things);
    }

    having(n) {
        return this.has(n);
    }

    each(callback) {
        const propertyName = this.getLastProperty();
        const things = this.properties[propertyName];
        things.forEach((thing) => {
            callback.call(this, thing);
        });
        return this;
    }

    get is_the() {
        return new PropertySetter(this, 'is_the');
    }

    get being_the() {
        return new PropertySetter(this, 'being_the');
    }

    get and_the() {
        return new PropertySetter(this, 'and_the');
    }

    get can() {
        return new MethodCreator(this);
    }

    getLastProperty() {
        const properties = Object.keys(this.properties);
        return properties[properties.length - 1];
    }
}

class PropertySetter {
    constructor(thing, prefix) {
        this.thing = thing;
        this.prefix = prefix;
    }

    get [Symbol.toPrimitive]() {
        return () => {
            return new Proxy({}, {
                get: (target, prop) => {
                    this.property = prop;
                    return this;
                },
                apply: (target, thisArg, args) => {
                    let value = args[0];
                    if (typeof value === 'function') {
                        value = value.call(this.thing);
                    }
                    const property = `${this.prefix}_${this.property}`;
                    this.thing.properties[property] = value;
                    return this.thing;
                }
            });
        };
    }
}

class PropertyChainer {
    constructor(things) {
        this.things = things;
    }

    each(callback) {
        this.things.forEach((thing) => {
            callback.call(this, thing);
        });
        return this;
    }

    having(n) {
        return this.each(function(thing) {
            thing.has(n);
        });
    }
}

class MethodCreator {
    constructor(thing) {
        this.thing = thing;
    }

    get [Symbol.toPrimitive]() {
        return () => {
            return new Proxy({}, {
                get: (target, prop) => {
                    return (pastTense, fn) => {
                        const boundFn = fn.bind(this.thing);
                        this.thing.methods[prop] = { fn: boundFn, pastTense };
                        Object.defineProperty(this.thing, prop, {
                            get: function() {
                                return function(...args) {
                                    const result = boundFn.apply(this, args);
                                    const trackerKey = `${prop}_${pastTense}`;
                                    this.tracker[trackerKey] = this.tracker[trackerKey] || [];
                                    this.tracker[trackerKey].push(result);
                                    return result;
                                }
                            }
                        });
                    };
                }
            });
        };
    }
}