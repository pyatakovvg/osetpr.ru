
export default function(data) {
  return {
    uuid: data['uuid'],
    login: data['login'],
    role: data['role'],
    createdAt: data['createdAt'],
    updatedAt: data['updatedAt'],
  };
}
