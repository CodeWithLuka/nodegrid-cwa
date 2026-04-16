import { Loader2Icon } from "lucide-react";

interface EntityLoadingStateProps {
  message?: string;
}

export const EntityLoadingState = ({ message }: EntityLoadingStateProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <Loader2Icon className="size-6 animate-spin text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};
