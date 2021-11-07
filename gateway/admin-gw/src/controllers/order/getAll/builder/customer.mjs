
function factory(type, data) {
  switch(type) {
    case 'legal': {
      const customer = data[data['type']];
      if ( ! customer) {
        return null;
      }
      let user = '';
      if (customer['surname']) {
        user += customer['surname'];
      }
      if (customer['name']) {
        user += user ? ' ' + customer['surname'] : customer['surname'];
      }
      if (customer['patronymic']) {
        user += user ? ' ' + customer['patronymic'] : customer['patronymic'];
      }
      return {
        name: user,
      };
    }
    case 'individual': {
      const customer = data[data['type']];
      if ( ! customer) {
        return null;
      }
      return {
        name: customer['name'],
      };
    }
  }
}


export default function(data) {
  const customer = factory(data['type'], data);
  return {
    userUuid: data['userUuid'],
    ...customer,
  };
}
