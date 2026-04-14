import Link from "next/link";
import Image from "next/image";

interface AuthLayoutViewProps {
  children: React.ReactNode;
}

export const AuthLayoutView = ({ children }: AuthLayoutViewProps) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
      <main className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image
            src="/logos/logo.svg"
            alt="NodeGrid Logo"
            width={20}
            height={20}
          />
          NodeGrid
        </Link>
        {children}
      </main>
    </div>
  );
};
