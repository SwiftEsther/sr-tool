import {dev} from './environment/dev.config';
import {production} from './environment/prod.config';

let environment = process.env.NODE_ENV;

const generateEnvVariables = () => {
  if (environment === 'prod') {
    return production;
  } else {
    return dev;
  }
};

export default generateEnvVariables;
