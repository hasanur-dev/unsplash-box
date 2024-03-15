// functions/test.js
exports.handler = async function (event, context) {
  console.log("hello");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify Functions!" }),
  };
};
