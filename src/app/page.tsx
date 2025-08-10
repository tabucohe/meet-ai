"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [form, setForm] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email: form.email,
        name: form.name,
        password: form.pass,
      },
      {
        onError: () => {
          window.alert("something went wrong!");
        },
        onSuccess: () => {
          window.alert("sucess");
        },
      }
    );
  };
  const onSignin = () => {
    authClient.signIn.email(
      {
        email: form.email,
        password: form.pass,
      },
      {
        onError: () => {
          window.alert("something went wrong!");
        },
        onSuccess: () => {
          window.alert("sucess");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session?.user?.name}</p>
        <Button onClick={() => authClient?.signOut()}> Sign out</Button>
      </div>
    );
  }
  return (
    <>
      <div className="p-4 w-1/5 flex flex-col gap-y-4">
        <Input
          placeholder="name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <Input
          placeholder="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          placeholder="pass"
          value={form.pass}
          onChange={(e) => handleChange("pass", e.target.value)}
        />
        <Button onClick={onSubmit}>Create User</Button>
      </div>
      <div className="p-4 w-1/5 flex flex-col gap-y-4">
        <Input
          placeholder="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          placeholder="pass"
          value={form.pass}
          onChange={(e) => handleChange("pass", e.target.value)}
        />
        <Button onClick={onSignin}>Sign in</Button>
      </div>
    </>
  );
}
