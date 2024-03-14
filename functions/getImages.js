// functions/getImages.js
exports.handler = async function (event, context) {
  const base_url = process.env.BASE_URL;
  const access_key = process.env.ACCESS_KEY;
  const { imageQuery, pageParam } = event.queryStringParameters;
  console.log(imageQuery, pageParam);
  const res = await fetch(
    `${base_url}/search/photos?page=${pageParam}&query=${imageQuery}&per_page=24&client_id=${access_key}`,
  );
  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
