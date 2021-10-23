
export default function(data) {
  return {
    uuid: data['uuid'],
    name: data['name'],
    createdAt: data['createdAt'],
  };
}
