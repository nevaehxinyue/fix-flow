"use client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import UsernameChangeForm from "./UsernameChangeForm";

const ChangeUserNameMessage = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user && !session?.user.name) {
      const generatedUsername = session?.user.email?.split("@")[0];
        console.log(`user id: ${session.user.id}`)
      axios
        .patch("/api/users/" + session?.user.id, { name: generatedUsername })
        .then((response) => {
          console.log("Username set to:", generatedUsername);
        })
        .catch(error => {
          console.log("Username cannot be generated", error);
        });
    }
  }, [session?.user.id]);

  return (
    <div>
      <Callout.Root >
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Your username has been generated automatically. You can change it
          here.
        <UsernameChangeForm />
        </Callout.Text>
      </Callout.Root>
    </div>
  );
};

export default ChangeUserNameMessage;
