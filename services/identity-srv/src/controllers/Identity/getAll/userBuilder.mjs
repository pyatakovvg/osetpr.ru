
export default function(data) {
  return {
    uuid: data['uuid'],
    login: data['login'],
    type: data['type'],
    createdAt: data['createdAt'],
    updatedAt: data['updatedAt'],
    role: data['role'].length ? data['role'][0] : null,
  };
}
