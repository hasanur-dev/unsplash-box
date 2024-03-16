export const getImages = async (imageQuery, pageParam = 1) => {
  const res = await fetch(
    `/.netlify/functions/getImages?imageQuery=${imageQuery}&pageParam=${pageParam}`,
  );
  const data = await res.json();

  console.log(data);
  return { images: data, nextPage: pageParam + 1 };
};

export const getSingleImage = async (id) => {
  const full_url = `/.netlify/functions/getSingleImage?id=${id}`;
  const res = await fetch(full_url);
  const data = await res.json();

  return data.data;
};

export const getPersonalCollections = async (user) => {
  const res = await fetch(
    `/.netlify/functions/getPersonalCollections?username=${user.username}&access_token=${user.access_token}`,
  );
  const data = await res.json();
  return data.data;
};

export const loginUser = async (code) => {
  if (!code) console.log("no code");
  const res = await fetch(`/.netlify/functions/loginUser?code=${code}`);
  console.log(res);
  if (!res.ok) {
    console.log(res);
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data.data;
};

export const getAllCollections = async (pageParam = 1) => {
  console.log(pageParam);
  const res = await fetch(
    `/.netlify/functions/getAllCollections?pageParam=${pageParam}`,
  );

  const data = await res.json();

  return { collections: data.data, nextPage: pageParam + 1 };
};

export const getCollectionPhotos = async ({
  collectionId,
  pageParam = 1,
  perPage = 24,
  user,
}) => {
  console.log("access_token", user.access_token);
  const res = await fetch(
    `/.netlify/functions/getCollectionPhotos?collectionId=${collectionId}&page=${pageParam}&per_page=${perPage}&access_token=${user.access_token}`,
  );
  const data = await res.json();
  console.log(res);
  console.log(data);
  return { images: data.data, nextPage: pageParam + 1 };
};

export const addPhotoToCollection = async (collection_id, photo_id, user) => {
  const res = await fetch(
    `/.netlify/functions/addPhotoToCollection?collection_id=${collection_id}&photo_id=${photo_id}&access_token=${user.access_token}`,
  );

  const data = await res.json();
  return data.data;
};

export const removePhotoFromCollection = async (
  collection_id,
  photo_id,
  user,
) => {
  // console.log("addPhotosToCollection", collection_id, photo_id, user);
  console.log(photo_id, collection_id);
  console.log(user.access_token);

  const res = await fetch(
    `/.netlify/functions/removePhotoFromCollection?collection_id=${collection_id}&photo_id=${photo_id}&access_token=${user.access_token}`,
  );

  const data = await res.json();

  // console.log(res);
  console.log(data);
  return data.data;
};

export const createCollection = async (newCollectionData, user) => {
  console.log(newCollectionData);
  const res = await fetch(
    `/.netlify/functions/createCollection?access_token=${user.access_token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCollectionData),
    },
  );
  const data = await res.json();
  console.log(data);
  return data;
};

// Client-side code
export const initiateOAuth = async () => {
  window.location.href = "/.netlify/functions/initiateOAuth";
};
