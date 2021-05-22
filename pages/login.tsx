import React, { useState } from "react";
import Input from "~components/Input";
import Button from "~components/Button";
import SocialProvider from "~localComponents/Auth/SocialProvider";
import Link from "next/link";

const login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
    }
  };

  return (
    <div className="h-screen w-screen lg:grid lg:place-items-center mx-auto">
      <div className="ct-shadow rounded-xl blur-lg flex flex-col items-center justify-center h-screen w-screen lg:h-auto lg:w-96 p-3">
        <img
          src="/login-vector.png"
          alt="People wearing face masks."
          className="w-60 h-60 object-contain select-none"
          draggable="false"
        />
        <div className="space-y-3">
          <Input
            className="w-80"
            placeholder="Email"
            prepend={<i className="fal fa-at text-gray-700 text-sm"></i>}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="w-80"
            placeholder="Password"
            prepend={<i className="fal fa-lock-alt text-gray-700 text-sm"></i>}
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="bg-green-500 hover:bg-green-400 transition-all text-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div className="text-center text-gray-400">
            <Link href="/signup">
              <a className="mr-2">No Account yet?</a>
            </Link>
            <Link href="">
              <a className="">Forgot Password?</a>
            </Link>
          </div>
        </div>

        <div className="flex mx-auto mt-5">
          <SocialProvider provider="twitter" />
          <SocialProvider provider="google" />
          <SocialProvider provider="facebook" />
        </div>
      </div>
    </div>
  );
};

export default login;
