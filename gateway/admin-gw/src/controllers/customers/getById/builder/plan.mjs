
import moment from '@packages/moment';


export default function(data) {
  return {
    uuid: data['uuid'],
    name: data['name'],
    createdAt: moment(data['createdAt']).tz('Europe/Moscow').format('YYYY-MM-DD HH:mm:00.000000Z'),
  };
}
