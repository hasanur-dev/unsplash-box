import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import Button from "../../ui/Button";
import CollectionRow from "./CollectionRow";
import { getPersonalCollections } from "../../services/apiUnsplash";
import { useQuery } from "@tanstack/react-query";

export default function PersonalCollections() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  // const handleLogin = () => {
  //   navigate(loginUrl);
  // };

  const { data: personalCollectionsData, isPending } = useQuery({
    queryKey: ["personalCollections"],
    queryFn: () => getPersonalCollections(user),
    enabled: Boolean(user),
  });
  // console.log(personalCollectionsData);
  return (
    <div className="flex flex-col gap-4">
      {user ? (
        <div className="flex flex-col gap-2 pr-2">
          {personalCollectionsData?.map((collection) => (
            <CollectionRow key={Math.random()} collection={collection} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-2">
          <p>Login to see and update your collections</p>
          {/* <Button url={loginUrl} onClick={handleLogin}>
            Login
          </Button> */}
        </div>
      )}
    </div>
  );
}
