// functions/getAllCOllections.js
exports.handler = async function (event, context) {
  const { pageParam } = event.queryStringParameters;
  const base_url = process.env.BASE_URL;
  const access_key = process.env.ACCESS_KEY;

  const res = await fetch(
    `${base_url}/collections?page=${pageParam}&per_page=12&client_id=${access_key}`,
  );

  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
};
