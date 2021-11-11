
import moment from '@packages/moment';


function getTypeData(customer) {
  switch (customer['type']) {
    case 'legal': return {
      name: customer[customer['type']]['name'],
      address: customer[customer['type']]['address'],
      phone: customer[customer['type']]['phone'],
    };
    case 'individual': return {

    };
  }
}

export default function(data, plans) {
  const customerData = getTypeData(data);
  return {
    uuid: data['uuid'],
    type: data['type'],
    ...customerData,
    plans: plans.filter((item) => !!~ item['users'].indexOf(data['userUuid'])),
    createdAt: moment(data['createdAt']).tz('Europe/Moscow').format('YYYY-MM-DD HH:mm:00.000000Z'),
  };
}
