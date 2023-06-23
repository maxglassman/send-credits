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
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const contractWithSigner = contract.connect(signer);
    console.log(contractWithSigner);

    const contractCall = await contractWithSigner[contractFunction](
      ...contractParams,
      { value: ethers.utils.parseUnits('0.03', 18), gasLimit: 5000000 }
    );

    return contractCall;
  } catch (error) {
    console.error('Error calling contract:', error);
  }
}
