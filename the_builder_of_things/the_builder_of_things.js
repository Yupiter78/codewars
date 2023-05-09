/*For this kata you will be using some meta-programming magic to create a new Thing object. This object will allow you to define things in a descriptive sentence like format.

This challenge attempts to build on itself in an increasingly complex manner.

Examples of what can be done with "Thing":
const jane = new Thing('Jane')
jane.name // => 'Jane'

// can define boolean methods on an instance
jane.is_a.person
jane.is_a.woman
jane.is_not_a.man

jane.is_a_person // => true
jane.is_a_man // => false

// can define properties on a per instance level
jane.is_the.parent_of.joe
jane.parent_of // => 'joe'

// can define number of child things
// when more than 1, an array is created
jane.has(2).legs
jane.legs.length // => 2
jane.legs[0] instanceof Thing // => true

// can define single items
jane.has(1).head

jane.head instanceof Thing // => true

// can define number of things in a chainable and natural format
jane.has(2).arms.each(arm => having(1).hand.having(5).fingers )

jane.arms[0].hand.fingers.length // => 5

// can define properties on nested items
jane.has(1).head.having(2).eyes.each( eye => being_the.color.blue.having(1).pupil.being_the.color.black )

// can define methods
jane.can.speak('spoke', phrase =>
  `${name} says: ${phrase}`)

jane.speak("hello") // => "Jane says: hello"

// if past tense was provided then method calls are tracked
jane.spoke // => ["Jane says: hello"]
Note: Most of the test cases have already been provided for you so that you can see how the Thing object is supposed to work.*/


class Thing {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.properties = {};
        this.methods = {};
        this.items = {};

        const self = this;

        this.is_a = new Proxy({}, {
            get(target, prop) {
                self.properties[prop] = true;
                return true;
            }
        });

        this.is_not_a = new Proxy({}, {
            get(target, prop) {
                self.properties[prop] = false;
                return true;
            }
        });

        this.has = count => new Proxy({}, {
            get(target, prop) {
                self.items[prop] = [];
                for (let i = 0; i < count; i++) {
                    const item = new Thing(prop, self);
                    self.items[prop].push(item);
                }
                return self.items[prop].length === 1 ? self.items[prop][0] : self.items[prop];
            }
        });

        this.is_the = prop => new Proxy({}, {
            get(target, item) {
                self.properties[`${prop}_of`] = item;
                return self;
            }
        });

        this.each = callback => {
            const items = Object.keys(self.items).length === 1 ? self.items[Object.keys(self.items)[0]] : Object.values(self.items);
            items.forEach(item => callback(item));
        };

        this.be = new Proxy({}, {
            get(target, prop) {
                self.properties.name = prop;
                return self;
            }
        });

        this.being_the = new Proxy({}, {
            get(target, prop) {
                self.properties[`name_of`] = prop;
                return self;
            }
        });

        this.having = count => new Proxy({}, {
            get(target, prop) {
                self.items[prop] = self.items[prop] || [];
                for (let i = self.items[prop].length; i < count; i++) {
                    self.items[prop][i] = new Thing(prop, self);
                }
                return self.items[prop][count - 1];
            }
        });

        this.can = new Proxy({}, {
            get(target, prop) {
                return (pastTense, callback) => {
                    self.methods[prop] = (...args) => {
                        const result = callback(...args);
                        if (pastTense) {
                            self.properties[pastTense] = result;
                        }
                        return result;
                    };
                }
            }
        });
    }

    get is_a_person() {
        return this.is_a.person && !this.is_not_a.person;
    }

    get is_a_man() {
        return this.is_a.man && !this.is_not_a.man;
    }

    get parent_of() {
        return this.properties.parent_of;
    }

    set parent_of(value) {
        this.properties.parent_of = value;
    }

    get legs() {
        return this.items.legs && this.items.legs.length === 1 ? this.items.legs[0] : this.items.legs;
    }

    get head() {
        return this.items.head;
    }

    get arms() {
        return this.items.arms && this.items.arms.length === 1 ? this.items.arms[0] : this.items.arms;
    }

    get eyes() {
        return this.items.eyes && this.items.eyes.length === 1 ? this.items.eyes[0] : this.items.eyes;
    }

    get pupil() {
        return this.items.pupil;
    }

    get spoke() {
        return this.properties.spoke || [];
    }

    speak(phrase) {
        const method = this.methods.speak;
        return method.call(null, phrase);
    }
}
