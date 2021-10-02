
import { connection } from "@sys.packages/rabbit";

import order from './order';
import gallery from './gallery';


export default async function rabbitInit() {

  await connection(process.env['RABBIT_CONNECTION_HOST']);

  await order();
  await gallery();
}
