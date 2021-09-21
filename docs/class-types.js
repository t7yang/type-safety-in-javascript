class Computer {
  /**
   * @readonly Readonly property
   * @type {string}
   */
  CPU;

  /**
   * _clock type automatic infer from default value
   * @private Private property
   */
  _clock = 3.999;

  /**
   * @param {string} cpu
   * @param {number} clock
   */
  constructor(cpu, clock) {
    this.CPU = cpu;
    this._clock = clock;
  }

  /**
   * @param {string} cpu
   * @returns {void}
   */
  change(cpu) {
    // @ts-expect-error
    this.CPU = cpu; // can not reasign readonly
  }
}

/**
 * Class is both value and type
 * @type {Computer}
 */
const computer = new Computer('Foo', 2.999);

/**
 * @this {HTMLInputElement}
 * @returns {void}
 */
function handleChange() {
  console.log(`The input element's value is ${this.value}`);
}

document.querySelector('input').addEventListener('change', handleChange);
