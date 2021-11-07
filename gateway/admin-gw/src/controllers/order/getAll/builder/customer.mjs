
function factory(type, data) {
  switch(type) {
    case 'legal': {
      const customer = data[data['type']];
      return {
        name: customer ? customer['name'] : null,
      };
    }
    case 'individual': {
      const customer = data[data['type']];
      return {
        name: customer ? customer['name'] : null,
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
