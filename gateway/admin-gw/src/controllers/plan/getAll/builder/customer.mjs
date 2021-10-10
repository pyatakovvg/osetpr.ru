
function factory(type, data) {
  switch(type) {
    case 'individual': {
      const customer = data[data['type']];
      return {
        name: (`${customer['surname']} ${customer['name']} ${customer['patronymic']}`).trim(),
      };
    }
    case 'legal': {
      const customer = data[data['type']];
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
