
import order from './order';
import gallery from './gallery';


export default async function rabbitInit() {

  await order();
  await gallery();
}
