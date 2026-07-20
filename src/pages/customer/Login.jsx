import AuthLayout from "../../components/auth/AuthLayout";
import AuthBanner from "../../components/auth/AuthBanner";
import LoginForm from "../../components/auth/LoginForm";

import loginImage from "../../assets/images/auth/login.jpeg";

export default function Login() {
  return (
    <AuthLayout image={loginImage}>

      <AuthBanner
        subtitle="Welcome Back"
        title="Sign In"
        description="Continue your journey with YUMI."
      />

      <LoginForm />

    </AuthLayout>
  );
}