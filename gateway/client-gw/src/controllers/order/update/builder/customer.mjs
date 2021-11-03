
export default function(data) {
  const customer = data[data['type']];
  return {
    name: customer['name'],
    phone: customer['phone'],
  };
}
