import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { loginUser } from "../services/apiUnsplash";
import { useUserContext } from "../contexts/UserContext";

export default function CheckLogin() {
  const navigate = useNavigate();

  const [params, setSearchParams] = useSearchParams();
  const { setUser } = useUserContext();
  const [userData, setUserData] = useState({});
  const code = params.get("code");
  console.log(code);
  const { mutate, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("success");
      console.log(data);
      setUserData(data);
      setUser(data);
      navigate(-1);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, [code, mutate]);
  return <div>CheckLogin</div>;
}
