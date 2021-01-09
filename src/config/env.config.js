import {dev} from './environment/dev.config';
import {production} from './environment/prod.config';
require('dotenv').config()

let environment = process.env.NODE_ENV;

const generateEnvVariables = () => {
  console.log('env', environment)
  if (environment === 'prod') {
    return production;
  } else {
    return dev;
  }
};

export default generateEnvVariables;
