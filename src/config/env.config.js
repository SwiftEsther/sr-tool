import {dev} from './environment/dev.config';
import {production} from './environment/prod.config';

let environment = 'dev';

const generateEnvVariables = () => {
  if (environment === 'prod') {
    return production;
  } else {
    return dev;
  }
};

export default generateEnvVariables;
