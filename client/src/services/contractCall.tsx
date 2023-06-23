import { ethers } from 'ethers';

export async function contractCall(
  provider: ethers.providers.Web3Provider,
  signer: ethers.Signer,
  contractAddress: string,
  contractABI: ethers.ContractInterface,
  contractFunction: string,
  contractParams: any[]
) {
  try {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const contractWithSigner = contract.connect(signer);

    const contractCall = await contractWithSigner[contractFunction](
      ...contractParams
    );

    return contractCall;
  } catch (error) {
    console.error('Error calling contract:', error);
  }
}
