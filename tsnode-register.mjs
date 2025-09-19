// tsnode-register.mjs
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// registra o loader ESM do ts-node para resolver .ts/.tsx com ESM
register('ts-node/esm', pathToFileURL('./'));
