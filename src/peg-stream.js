import through2 from 'through2';
import _ from 'lodash';

/*

Input stream: Object
- expression (string) - Input will be returned un modified if not provided.

Output stream: Object
- expression (object, required)

Input and output properties can be altered by providing options

*/

const defaultOptions = {
  expression: 'expression',
  parsed: 'parsed',
};

module.exports = function pegStream(grammar, options) {
  const opt = _.merge({}, defaultOptions, options);

  function transform(chunk, encoding, cb) {
    const expression = chunk[opt.expression];

    // No expression to parse
    if (!expression) {
      this.push(chunk);
      return cb();
    }

    chunk[opt.parsed] = grammar.parse(expression);
    this.push(chunk);
    return cb();
  }

  return through2.obj(transform);
};
