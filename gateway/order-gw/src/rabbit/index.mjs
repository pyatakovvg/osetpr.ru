
import { connection } from "@sys.packages/rabbit";

import attributes from './attributes';
import categories from './categories';
import types from './types';
import units from './units';
import products from './products';
import currency from './currency';
import promotion from './promotion';
import brands from './brands';
import gallery from './gallery';
import customer from './customer';


export default async function rabbitInit() {

  await connection(process.env['RABBIT_CONNECTION_HOST']);

  await attributes();
  await categories();
  await types();
  await units();
  await products();
  await currency();
  await promotion();
  await brands();
  await gallery();
  await customer();
}
