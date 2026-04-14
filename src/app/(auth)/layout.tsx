import { AuthLayoutView } from "@/features/auth/ui/views/auth-layout-view";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <AuthLayoutView>{children}</AuthLayoutView>;
};

export default AuthLayout;
