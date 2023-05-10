class Thing {
  constructor(name) {
    this.name = name;
    this.properties = {};
    this.childCount = 1;
    this.children = {};
    this.trackMethodCalls = {};
  }

  has(num) {
    this.childCount = num;
    return this;
  }

  is_a = new Proxy({}, {
      get: (target, property) => {
        return () => {
          this.properties[property] = true;
        }
      },
      set: (target, property) => {
        return false;
      }
    })

  is_not_a = new Proxy({}, {
    get: (target, property) => {
      return () => {
        this.properties[property] = false;
      }
    },
    set: (target, property) => {
      return false;
    }
  })

  is_the = new Proxy({}, {
    get: (target, property) => {
      return {
        parent_of: (childName) => {
          this.properties[`parent_of_${childName}`] = true;
          this.children[childName] = new Thing(childName);
          return this.children[childName];
        },
        color: {
          get: () => {
            return {
              blue: () => {
                this.properties['color'] = 'blue';
              }
            }
          },
          set: (property) => {
            return false;
          }
        },
      }
    },
    set: (target, property) => {
      return false;
    }
  })

  having(num) {
    return {
      hand: {
        having: (numFingers) => {
          const hand = new Thing('hand');
          hand.has(numFingers).fingers;
          return hand;
        }
      },
      fingers: {
        having: (num) => {
          const fingers = new Thing('fingers');
          fingers.has(num);
          return fingers;
        }
      },
      eyes: {
        each: (callback) => {
          const eyes = new Thing('eyes');
          eyes.has(num);
          eyes.children = new Array(num).fill('').map((_, i) => {
            const eye = new Thing(`eye ${i+1}`);
            callback(eye);
            return eye;
          });
          return eyes;
        }
      },
      pupil: {
        being_the: {
          color: {
            get: () => {
              return {
                black: () => {
                  this.properties['pupil_color'] = 'black';
                }
              }
            },
            set: (property) => {
              return false;
            }
          }
        }
      },
    }
  }

  each(callback) {
    const children = new Array(this.childCount).fill('').map(callback);
    if (this.childCount === 1) {
      return children[0];
    } else {
      return children;
    }
  }

  can = new Proxy({}, {
    get: (target, property) => {
      return (pastTense, callback) => {
        this[property] = (...args) => {
          const result = callback.apply(this, args);
          if (pastTense) {
            this.trackMethodCalls[property] = this.trackMethodCalls[property] || [];
            this.trackMethodCalls[property].push(result);
          }
          return result;
        }
      }
    },
    set: (target, property) => {
      return false;
    }
  })

  speak(phrase) {
    return `${this.name} says: ${phrase}`;
  }
}