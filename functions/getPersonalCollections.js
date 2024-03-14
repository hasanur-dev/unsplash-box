// functions/getPersonalCollections.js
exports.handler = async function (event, context) {
  const { username, access_token } = event.queryStringParameters;
  const res = await fetch(
    `https://api.unsplash.com/users/${username}/collections/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  const data = await res.json();
  console.log(data);
  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
};
