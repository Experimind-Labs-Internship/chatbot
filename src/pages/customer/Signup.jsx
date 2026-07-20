import AuthLayout from "../../components/auth/AuthLayout";
import AuthBanner from "../../components/auth/AuthBanner";
import SignupForm from "../../components/auth/SignupForm";

import signinImage from "../../assets/images/auth/signin.png";

export default function Signup() {
  return (
    <AuthLayout image={signinImage}>

      <AuthBanner
        subtitle="Join YUMI"
        title="Create Account"
        description="Become part of the YUMI family."
      />

      <SignupForm />

    </AuthLayout>
  );
}