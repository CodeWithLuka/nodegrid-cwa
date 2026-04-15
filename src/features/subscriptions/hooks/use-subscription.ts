import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";

export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const { data } = await authClient.customer.state();

      return data;
    },
  });
};
