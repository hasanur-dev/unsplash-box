// functions/loginUser.js
exports.handler = async function (event, context) {
  const { code } = event.queryStringParameters;
  const body = {
    client_id: process.env.ACCESS_KEY,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    code: code,
    grant_type: "authorization_code",
  };
  console.log(body.toString());
  const res = await fetch(`https://unsplash.com/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.log(res);
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  console.log(data);
  return {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
};
