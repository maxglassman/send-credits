//construct interface for router contract addresses for each chain/ {chainId: {router: address, routerETH:adress}}. routerETH will only exist on chainIds 101,110,111.
interface RouterAddresses {
  [chainId: string]: string;
}

export const routerAddresses: RouterAddresses = {
  '101': '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
  '102': '0x4a364f8c717cAAD9A442737Eb7b8A55cc6cf18D8',
  '106': '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
  '109': '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd',
  '110': '0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614',
  '111': '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
  '112': '0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6',
  '151': '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590',
};
