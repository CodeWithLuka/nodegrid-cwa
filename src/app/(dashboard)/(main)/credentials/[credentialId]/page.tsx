import { requireAuth } from "@/features/auth/lib/auth-utils";

interface CredentialIdPageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

const CredentialIdPage = async ({ params }: CredentialIdPageProps) => {
  await requireAuth();
  const { credentialId } = await params;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1> Think, CredentialId: {credentialId}</h1>
    </div>
  );
};

export default CredentialIdPage;
