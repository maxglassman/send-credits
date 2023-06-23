//construct interface for router contract addresses for each chain/ {chainId: {router: address, routerETH:adress}}. routerETH will only exist on chainIds 101,110,111.
interface RouterAddresses {
  [chainId: string]: {
    router: string;
    routerETH?: string;
  };
}

export const routerAddresses: RouterAddresses = {
  '101': {
    router: '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
    routerETH: '0x150f94B44927F078737562f0fcF3C95c01Cc2376',
  },
  '102': { router: '0x4a364f8c717cAAD9A442737Eb7b8A55cc6cf18D8' },
  '106': { router: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd' },
  '109': { router: '0x45A01E4e04F14f7A4a6702c74187c5F6222033cd' },
  '110': {
    router: '0x53Bf833A5d6c4ddA888F69c22C88C9f356a41614',
    routerETH: '0xbf22f0f184bCcbeA268dF387a49fF5238dD23E40',
  },
  '111': {
    router: '0xB0D502E938ed5f4df2E681fE6E419ff29631d62b',
    routerETH: '0xB49c4e680174E331CB0A7fF3Ab58afC9738d5F8b',
  },
  '112': { router: '0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6' },
  '151': { router: '0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590' },
};
