interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
