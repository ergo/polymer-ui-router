import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import progress from 'rollup-plugin-progress';
import sourcemaps from 'rollup-plugin-sourcemaps';
import visualizer from 'rollup-plugin-visualizer';
import commonjs from 'rollup-plugin-commonjs';

let MINIFY = process.env.MINIFY;

let pkg = require('./package.json');
let banner =
`/**
 * ${pkg.description}
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */`;

let uglifyOpts = { output: {} };
// retain multiline comment with @license
uglifyOpts.output.comments = (node, comment) =>
comment.type === 'comment2' && /@license/i.test(comment.value);

let plugins = [
  nodeResolve({jsnext: true}),
  progress(),
  sourcemaps(),
  commonjs(),
];

if (MINIFY) plugins.push(uglify(uglifyOpts));
if (MINIFY) plugins.push(visualizer({ sourcemap: true }));

let extension = MINIFY ? '.min.js' : '.js';

function onwarn(warning) {
  // Suppress this error message caused by typescript "extends" codegen
  if (warning.code === 'THIS_IS_UNDEFINED') return;
  console.error(warning.message);
}

const CONFIG = {
  moduleName: 'ui-router-polymer',
  entry: './ui-router-core.js',
  dest: './dist/ui-router-polymer' + extension,

  sourceMap: true,
  format: 'umd',
  exports: 'named',
  plugins: plugins,
  banner: banner,

  onwarn: onwarn,
};

export default CONFIG;
