import axios from "axios";
import { BottomWarning } from "../../components/BottomWarning";
import { Button } from "../../components/Button";
import { Heading } from "../../components/Heading";
import { InputBox } from "../../components/InputBox";
import { SubHeading } from "../../components/SubHeading";
import { useState } from "react";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSignIn() {
    // try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      {
        email,
        password,
      }
    );

    //   if (response.status === 200) {
    //     const { token } = response.data;
    //     console.log("Login successful:", response.data);

    //     // Optionally store the token in local storage or state
    //     localStorage.setItem("token", token);

    //     // Perform additional actions, e.g., redirecting the user
    //   } else {
    //     console.error("Login failed:", response.data);
    //   }
    // } catch (error) {
    //   console.error(
    //     "Error during login:",
    //     error.response ? error.response.data : error.message
    //   );
    // }
  }
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="harkirat@gmail.com"
            label={"Email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={handleSignIn} />
          </div>
          {/* <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            // to={"/signup"}
          /> */}
        </div>
      </div>
    </div>
  );
};
