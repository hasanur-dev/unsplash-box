// functions/createCollection.js

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  const newCollectionData = JSON.parse(event.body);
  console.log(newCollectionData);
  const base_url = process.env.BASE_URL;
  const { access_token } = event.queryStringParameters;

  const res = await fetch(`${base_url}/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(newCollectionData),
  });
  const data = await res.json();
  //   console.log(data);
  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
};
