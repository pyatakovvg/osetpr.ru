
function factory(data) {
  switch(data['type']) {
    case 'legal': {
      const customer = data[data['type']];
      return {
        userUuid: data['userUuid'],
        name: customer ? customer['name'] : null,
      };
    }
    case 'individual': {
      const customer = data[data['type']];
      return {
        userUuid: data['userUuid'],
        name: customer ? customer['name'] : null,
        phone: customer ? customer['phone'] : null,
      };
    }
  }
}


export default function(data) {
  const customer = factory(data);
  return {
    userUuid: customer['userUuid'],
    name: customer['name'],
    phone: customer['phone'],
  };
}
