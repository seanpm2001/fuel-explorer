import type { Address } from 'viem';
import { useAccount, useBalance } from 'wagmi';

export function useEthBalance(token?: Address) {
  const { address } = useAccount();
  const { data: ethBalance } = useBalance({
    address,
    token,
    query: {
      refetchInterval: 5000,
    },
  });

  return {
    ethBalance,
  };
}
