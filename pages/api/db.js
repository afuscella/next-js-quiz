import db from '../../db.json';

const HTTP = {
  method: {
    OPTIONS: 'OPTIONS',
  },
};

export default function handleDb(request, response) {
  if (request.method === HTTP.method.OPTIONS) {
    response.send(200);
  }

  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.json(db);
}