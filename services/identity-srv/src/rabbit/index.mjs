
import { connection } from "@sys.packages/rabbit";


export default async function() {
  await connection(process.env['RABBIT_CONNECTION_HOST']);

}
