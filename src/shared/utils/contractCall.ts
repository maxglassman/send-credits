import { ethers } from 'ethers';

export async function contractCallBackOff(
  address: string,
  abi: ethers.ContractInterface,
  providers: ethers.providers.JsonRpcProvider[],
  fn: string,
  args: any[]
): Promise<any> {
  for (const p of providers) {
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        const contract = new ethers.Contract(address, abi, p);
        const result = await contract.callStatic[fn](...args);
        return result;
      } catch (error) {
        console.error(
          `Attempt ${attempt} failed for function: ${fn} on network:${p.network} for address:${address}`
        );
        if (attempt < 5) {
          const backoffTime = Math.pow(2, attempt) * 10;
          await new Promise((resolve) => setTimeout(resolve, backoffTime));
        }
      }
    }
  }
  throw new Error(
    `All contract calls have failed for address:${address} for function:${fn}`
  );
}
