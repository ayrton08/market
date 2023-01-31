import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";

import { Header } from "components";
import { User } from "ui";
import { useLogin, useMe } from "hooks";
import { isUserLogged } from "../helpers/localStorage";

export default function Profile() {
  const data = useMe("/me");

  const logged = isUserLogged();

  console.log(logged);

  useEffect(() => {
    if (!logged) {
      Router.push("/signin");
    }
  }, [logged]);

  return (
    <div className="flex-col-center container-page pt-12 pb-4 px-4 sm:px-0 bg-gradient-to-bl from-indigo-700 via-indigo-400 to-indigo-700">
      <Head>
        <title>{data?.data?.name || "Profile"}</title>
      </Head>
      <User userName={data?.data?.name || "User"}></User>
    </div>
  );
}
