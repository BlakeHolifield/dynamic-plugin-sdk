// eslint-disable-next-line import/no-relative-packages
import { tsLibConfig, dtsLibConfig } from '../common/rollup-configs';
import pkg from './package.json';

// eslint-disable-next-line no-console
console.log(`Rollup ${pkg.name}`);

export default [
  tsLibConfig(pkg, 'src/index.ts'),
  dtsLibConfig(pkg, 'dist/types/lib-webpack/src/index.d.ts'),
];
