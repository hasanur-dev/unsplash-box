// functions/initiateOAuth.js

exports.handler = async (event, context) => {
  console.log("initiateOAuth");
  const client_id = process.env.ACCESS_KEY;
  const redirect_uri = process.env.REDIRECT_URI;

  const authUrl = `https://unsplash.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=public+read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections`;

  return {
    statusCode: 302,
    headers: {
      Location: authUrl,
    },
  };
};
