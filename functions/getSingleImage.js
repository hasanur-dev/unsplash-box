// functions/getSingleImage.js
exports.handler = async function (event, context) {
  console.log("hello");
  const access_key = process.env.ACCESS_KEY;
  const base_url = process.env.BASE_URL;
  const { id } = event.queryStringParameters;
  const full_url = `${base_url}/photos/${id}?client_id=${access_key}`;
  const res = await fetch(full_url);
  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
};
