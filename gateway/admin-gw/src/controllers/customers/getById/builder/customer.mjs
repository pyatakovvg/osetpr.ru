
import moment from '@packages/moment';


export default function(data) {
  return {
    uuid: data['uuid'],
    userUuid: data['userUuid'],
    name: data['name'],
    phone: data['phone'],
    email: data['email'],
    createdAt: moment(data['createdAt']).tz('Europe/Moscow').format('YYYY-MM-DD HH:mm:00.000000Z'),
    updatedAt: moment(data['updatedAt']).tz('Europe/Moscow').format('YYYY-MM-DD HH:mm:00.000000Z'),
  };
}
