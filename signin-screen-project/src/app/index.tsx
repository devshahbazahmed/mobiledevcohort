import { useState } from "react";
import SigninScreen from "./SigninScreen";
import SignupScreen from "./SignupScreen";

export default function Index() {
  const [screen, setScreen] = useState<"signin" | "signup">("signup");
  return (
    <>
      {screen === "signin" ? (
        <SigninScreen goToNextScreen={() => setScreen("signup")} />
      ) : (
        <SignupScreen goToNextScreen={() => setScreen("signin")} />
      )}
    </>
  );
}
