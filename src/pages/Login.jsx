import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { initiateOAuth } from "../services/apiUnsplash";
import { useUserContext } from "../contexts/UserContext";
import Button from "../ui/Button";

export default function Login() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user && user.access_token) {
      // navigate(-1);
      console.log(user);
    }
  }, [user, navigate]);
  return (
    <div className="flex justify-center py-14">
      {user?.access_token ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <h2>Login Successful</h2>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      ) : (
        <Button onClick={initiateOAuth}>Login with unsplash</Button>
      )}
    </div>
  );
}
