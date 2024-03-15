// functions/removePhotoFromCollection.js
exports.handler = async function (event, context) {
  const base_url = process.env.BASE_URL;
  const { collection_id, access_token, photo_id } = event.queryStringParameters;

  const body = {
    collection_id: collection_id,
    photo_id: photo_id,
  };

  const res = await fetch(
    `${base_url}/collections/${collection_id}/remove?photo_id=${photo_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
};
