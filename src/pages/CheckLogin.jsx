import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginUser } from "../services/apiUnsplash";
import { useUserContext } from "../contexts/UserContext";
import Spinner from "../ui/Spinner";

export default function CheckLogin() {
  const navigate = useNavigate();

  const [params, setSearchParams] = useSearchParams();
  const { setUser } = useUserContext();
  const code = params.get("code");

  const { data, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: () => loginUser(code),
  });

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
      navigate(-1);
    }
  }, [isSuccess, navigate, setUser, data]);

  return (
    <div>
      <Spinner />
    </div>
  );
}
