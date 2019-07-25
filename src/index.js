import * as jetstate from 'jetstate';
import * as jetemit from 'jetemit';

/**
 *
 * @param {Array} fields
 * @returns {undefined}
 */
export const initial = fields =>
  fields.forEach(field =>
    jetstate.init({
      ...field,
      didUpdate: value => {
        jetemit.emit(field.name, value);
        field.didUpdate && field.didUpdate(value);
      }
    })
  );

/**
 *
 * @param {Array} fields array of lisining state name
 * @param {React.Component|React.PureComponent} component for extends
 * @returns {React.Component|React.PureComponent}
 */
export const Beep = (fields, component) => {
  return class extends component {
    constructor(props) {
      super(props);
      fields.forEach(field => jetemit.on(field, () => this.forceUpdate()));
    }
  };
};

export const on = jetemit.on;

export const emit = jetemit.emit;

export const init = jetstate.init;

export const state = jetstate.state;
