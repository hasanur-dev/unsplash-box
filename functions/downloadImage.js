// functions/downloadImage.js
exports.handler = async function (event, context) {
  const { imageUrl, imageName } = event.queryStringParameters;

  if (!imageUrl || !imageName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing imageUrl or imageName" }),
    };
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${imageName}.jpeg"`,
      },
      body: base64,
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("Error fetching image:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch image" }),
    };
  }
};
