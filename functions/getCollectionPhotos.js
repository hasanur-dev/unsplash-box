// functions/getCollectionPhotos.js
exports.handler = async function (event, context) {
  const { collectionId, page, per_page, access_token } =
    event.queryStringParameters;
  console.log(collectionId, per_page, page, access_token);
  console.log("collectionPhotos");
  const res = await fetch(
    `https://api.unsplash.com/collections/${collectionId}/photos?page=${page}&per_page=${per_page}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
};
