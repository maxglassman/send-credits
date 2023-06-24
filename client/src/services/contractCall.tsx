import { ethers } from 'ethers';

export async function contractCall(
  provider: ethers.providers.Web3Provider,
  signer: ethers.Signer,
  contractAddress: string,
  contractABI: ethers.ContractInterface,
  contractFunction: string,
  contractParams: any[],
  value?: string
) {
  try {
    let overrideOptions: any = { gasLimit: 5000000 };
    if (value) overrideOptions['value'] = ethers.utils.parseUnits(value, 18);

    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const contractWithSigner = contract.connect(signer);

    const contractCall = await contractWithSigner[contractFunction](
      ...contractParams,
      overrideOptions
    );

    return contractCall;
  } catch (error) {
    console.error('Error calling contract:', error);
  }
}
