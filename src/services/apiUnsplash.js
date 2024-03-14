const base_url = "https://api.unsplash.com";

// const access_key = "vLZnhUMloza4nWEugcus6tEYauwnUes_cZZKSAOXytk";
// const client_secret = "Zya_T9hG8md3_ovr05OWBjrKtUwwjY5cVp-S-jwOXQI";

// const access_key = "zA3eDxA3tB9Ar3wldDbijnxatT_rFnGsu2yXuBz8CHE";
// const client_secret = "6lUUEmQjI0SwPPQJkR5JW4opiHcGiDVrnN6zfD1zrV4";

// const access_key = "qcGfvuUntjQyoUM3R3hXyeDLf5OsGQg0Mxb5lLePOFI";
// const client_secret = "saVYn_jv0tubVqgSSHPCuHzQFlVaJz4Rv2c2V32hzTg";

// const access_key = "GRcKNPJP7FbsVJ7EALZY05LdDkOQxEY057_v3FGiFVk";
// const client_secret = "IuMDpXONIwjdu0SSELfDIpUUQieM9tYSx7s4n0U2EMs";

const access_key = "78-iq6584uDjm5yHyF5gTxS0jpsUKYBojp7DUT-g6PU";
const client_secret = "9hMeWcp-fd1GLK8X_pMMryC0aiIA7oiJZ3PYGwod2gw";

// const access_key = "ctzCuYztBNyucCPCaaCMW6LHSshV67LAkrQ7hpYOLOg";
// const client_secret = "rR4j8adlzcTIXn4rObwEKS9lfLfZEehpv-MKLJOKe40";

// const access_key = "jQ8VPKdmdL__Bpn1EJwsilZ5KguBhXIogV9wyr-hluY";
// const client_secret = "xv9lSLNPBfBq2iXaf04lzsSvZo86QIIQTNpIyQ1m-zE";

// const access_key = "PCAX0MA3MCamSjJdQofw8vDZxAnJEcVe_bJ1m-qCn08";
// const client_secret = "0ABuM9rd7PPszWE4gDCdk7a18TYRXL1atskR6RxATKY";

export const getImages = async (imageQuery, pageParam = 1) => {
  const res = await fetch(
    `/.netlify/functions/getImages?imageQuery=${imageQuery}&pageParam=${pageParam}`,
  );
  const data = await res.json();

  console.log(data);
  return { images: data, nextPage: pageParam + 1 };
};

export const getSingleImage = async (id) => {
  // console.log(id);
  const full_url = `${base_url}/photos/${id}?client_id=${access_key}`;
  const res = await fetch(full_url);
  const data = await res.json();
  // console.log(full_url);
  // console.log(data);

  return data;
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
  const body = {
    client_id: access_key,
    client_secret: client_secret,
    redirect_uri: "http://localhost:8888/login",
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
  // console.log(data);
  return data;
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
  // console.log(pageParam);
  console.log("access_token", user.access_token);
  const res = await fetch(
    `/.netlify/functions/getCollectionPhotos?collectionId=${collectionId}&page=${pageParam}&per_page=${perPage}&access_token=${user.access_token}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    },
  );

  const data = await res.json();
  // console.log("res", res);
  // console.log("data", data);
  return { images: data.data, nextPage: pageParam + 1 };
  // return { images: [], nextPage: pageParam + 1 };
};

export const addPhotoToCollection = async (collection_id, photo_id, user) => {
  // console.log("addPhotosToCollection", collection_id, photo_id, user);
  console.log(photo_id, collection_id);
  console.log(user);
  const auth = `Bearer ${user.access_token}`;
  console.log(auth);
  console.log(user.access_token);
  const body = {
    collection_id: collection_id,
    photo_id: photo_id,
  };

  const res = await fetch(
    `${base_url}/collections/${collection_id}/add?photo_id=${photo_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();

  console.log(data);
  return data;
};

export const removePhotoFromCollection = async (
  collection_id,
  photo_id,
  user,
) => {
  // console.log("addPhotosToCollection", collection_id, photo_id, user);
  console.log(photo_id, collection_id);
  console.log(user);
  const auth = `Bearer ${user.access_token}`;
  console.log(auth);
  console.log(user.access_token);
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
        Authorization: auth,
      },
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();

  console.log(res);
  console.log(data);
  return data;
};

export const createCollection = async (newCollectionData, user) => {
  console.log(newCollectionData);
  const auth = `Bearer ${user.access_token}`;
  const res = await fetch(`${base_url}/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify(newCollectionData),
  });
  const data = await res.json();
  console.log(data);
  return data;
};

export const loginUrl = `https://unsplash.com/oauth/authorize?client_id=${access_key}&redirect_uri=http://localhost:8888/login&response_type=code&scope=public+read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections`;
// https://unsplash.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=public+read_user

// https://unsplash.com/oauth/authorize?client_id=vLZnhUMloza4nWEugcus6tEYauwnUes_cZZKSAOXytk&redirect_uri=http://localhost:5173/home&response_type=code

// authentication
// https://unsplash.com/oauth/authorize?client_id=vLZnhUMloza4nWEugcus6tEYauwnUes_cZZKSAOXytk&redirect_uri=http://localhost:5173/home&response_type=code

// https://api.unsplash.com/photos/mFrLqRZMx7o/download

// download
// https://api.unsplash.com/photos/mFrLqRZMx7o/download?client_id=vLZnhUMloza4nWEugcus6tEYauwnUes_cZZKSAOXytk

// `https://unsplash.com/oauth/token?client_id=vLZnhUMloza4nWEugcus6tEYauwnUes_cZZKSAOXytk&client_secret=Zya_T9hG8md3_ovr05OWBjrKtUwwjY5cVp-S-jwOXQI&redirect_uri=http://localhost:5173&code=${code}&grant_type=authorization_code`

export const testFn = async () => {
  const res = await fetch("/.netlify/functions/hello");
  const data = await res.json();
  console.log("test fn");
  console.log(data);
  return [];
};
