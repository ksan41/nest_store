import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = () => {
  const env = process.env.NODE_ENV;

  if (env === 'local' || env === 'dev' || env === 'test' || env === 'prod') {
    return `${env}.yaml`;
  }

  return null;
};

export default () => {
  const filename = YAML_CONFIG_FILENAME();
  return filename ? (yaml.load(readFileSync(join(__dirname, filename), 'utf8')) as Record<string, any>) : null;
};
