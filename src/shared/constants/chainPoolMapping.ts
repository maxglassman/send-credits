import { chainIds } from './chainIds';
import { poolIds } from './poolIds';
import { ChainPoolMap } from '../interfaces/chainPoolMap';

export const chainPoolMapping: ChainPoolMap = {
  [chainIds.ETHEREUM]: {
    [poolIds.USDC]: {
      address: '0xdf0770dF86a8034b3EFEf0A1Bb3c889B8332FF56',
      chainPaths: {
        [chainIds.BSC]: [poolIds.BUSD, poolIds.USDT],
        [chainIds.AVALANCHE]: [poolIds.USDC, poolIds.USDT],
        [chainIds.POLYGON]: [poolIds.USDC, poolIds.USDT],
        [chainIds.ARBITRUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.OPTIMISM]: [poolIds.USDC],
        [chainIds.FANTOM]: [poolIds.USDC],
      },
    },
    [poolIds.USDT]: {
      address: '0x38EA452219524Bb87e18dE1C24D3bB59510BD783',
      chainPaths: {
        [chainIds.BSC]: [poolIds.BUSD, poolIds.USDT],
        [chainIds.AVALANCHE]: [poolIds.USDC, poolIds.USDT],
        [chainIds.POLYGON]: [poolIds.USDC, poolIds.USDT],
        [chainIds.ARBITRUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.OPTIMISM]: [poolIds.USDC],
        [chainIds.FANTOM]: [poolIds.USDC],
      },
    },
    [poolIds.DAI]: {
      address: '0x0Faf1d2d3CED330824de3B8200fc8dc6E397850d',
      chainPaths: {
        [chainIds.POLYGON]: [poolIds.DAI],
        [chainIds.OPTIMISM]: [poolIds.DAI],
      },
    },
    [poolIds.FRAX]: {
      address: '0xfA0F307783AC21C39E939ACFF795e27b650F6e68',
      chainPaths: {
        [chainIds.AVALANCHE]: [poolIds.FRAX],
        [chainIds.ARBITRUM]: [poolIds.FRAX],
        [chainIds.OPTIMISM]: [poolIds.FRAX],
      },
    },
    [poolIds.ETH]: {
      address: '0x101816545F6bd2b1076434B54383a1E633390A2E',
      chainPaths: {
        [chainIds.ARBITRUM]: [poolIds.ETH],
        [chainIds.OPTIMISM]: [poolIds.ETH],
      },
    },
    [poolIds.USDD]: {
      address: '0x692953e758c3669290cb1677180c64183cEe374e',
      chainPaths: {
        [chainIds.BSC]: [poolIds.USDD],
      },
    },
    [poolIds.sUSD]: {
      address: '0x590d4f8A68583639f215f675F3a259Ed84790580',
      chainPaths: {
        [chainIds.OPTIMISM]: [poolIds.sUSD],
      },
    },
    [poolIds.LUSD]: {
      address: '0xE8F55368C82D38bbbbDb5533e7F56AfC2E978CC2',
      chainPaths: {
        [chainIds.ARBITRUM]: [poolIds.LUSD],
        [chainIds.OPTIMISM]: [poolIds.LUSD],
      },
    },
    [poolIds.MAI]: {
      address: '0x9cef9a0b1bE0D289ac9f4a98ff317c33EAA84eb8',
      chainPaths: {
        [chainIds.BSC]: [poolIds.MAI],
        [chainIds.AVALANCHE]: [poolIds.MAI],
        [chainIds.POLYGON]: [poolIds.MAI],
        [chainIds.ARBITRUM]: [poolIds.MAI],
        [chainIds.OPTIMISM]: [poolIds.MAI],
      },
    },
    [poolIds.METIS]: {
      address: '0xd8772edBF88bBa2667ed011542343b0eDDaCDa47',
      chainPaths: {
        [chainIds.BSC]: [poolIds.METIS],
        [chainIds.AVALANCHE]: [poolIds.METIS],
        [chainIds.METIS]: [poolIds.METIS],
      },
    },
    [poolIds.metisUSDT]: {
      address: '0x430Ebff5E3E80A6C58E7e6ADA1d90F5c28AA116d',
      chainPaths: {
        [chainIds.BSC]: [poolIds.metisUSDT],
        [chainIds.AVALANCHE]: [poolIds.metisUSDT],
        [chainIds.METIS]: [poolIds.metisUSDT],
      },
    },
  },
  [chainIds.BSC]: {
    [poolIds.USDT]: {
      address: '0x9aA83081AA06AF7208Dcc7A4cB72C94d057D2cda',
      chainPaths: {
        [chainIds.ETHEREUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.AVALANCHE]: [poolIds.USDC, poolIds.USDT],
        [chainIds.POLYGON]: [poolIds.USDC, poolIds.USDT],
        [chainIds.ARBITRUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.OPTIMISM]: [poolIds.USDC],
        [chainIds.FANTOM]: [poolIds.USDC],
      },
    },
    [poolIds.BUSD]: {
      address: '0x98a5737749490856b401DB5Dc27F522fC314A4e1',
      chainPaths: {
        [chainIds.ETHEREUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.AVALANCHE]: [poolIds.USDC, poolIds.USDT],
        [chainIds.POLYGON]: [poolIds.USDC, poolIds.USDT],
        [chainIds.ARBITRUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.OPTIMISM]: [poolIds.USDC],
        [chainIds.FANTOM]: [poolIds.USDC],
      },
    },
    [poolIds.USDD]: {
      address: '0x4e145a589e4c03cBe3d28520e4BF3089834289Df',
      chainPaths: {
        [chainIds.ETHEREUM]: [poolIds.USDD],
      },
    },
    [poolIds.MAI]: {
      address: '0x7BfD7f2498C4796f10b6C611D9db393D3052510C',
      chainPaths: {
        [chainIds.ETHEREUM]: [poolIds.MAI],
        [chainIds.AVALANCHE]: [poolIds.MAI],
        [chainIds.POLYGON]: [poolIds.MAI],
        [chainIds.ARBITRUM]: [poolIds.MAI],
        [chainIds.OPTIMISM]: [poolIds.MAI],
      },
    },
    [poolIds.METIS]: {
      address: '0xD4CEc732b3B135eC52a3c0bc8Ce4b8cFb9dacE46',
      chainPaths: {
        [chainIds.ETHEREUM]: [poolIds.METIS],
        [chainIds.AVALANCHE]: [poolIds.METIS],
        [chainIds.METIS]: [poolIds.METIS],
      },
    },
    [poolIds.metisUSDT]: {
      address: '0x68C6c27fB0e02285829e69240BE16f32C5f8bEFe',
      chainPaths: {
        [chainIds.ETHEREUM]: [poolIds.metisUSDT],
        [chainIds.AVALANCHE]: [poolIds.metisUSDT],
        [chainIds.METIS]: [poolIds.metisUSDT],
      },
    },
  },
  [chainIds.AVALANCHE]: {
    [poolIds.USDC]: {
      address: '0x1205f31718499dBf1fCa446663B532Ef87481fe1',
      chainPaths: {
        [chainIds.BSC]: [poolIds.BUSD, poolIds.USDT],
        [chainIds.ETHEREUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.POLYGON]: [poolIds.USDC, poolIds.USDT],
        [chainIds.ARBITRUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.OPTIMISM]: [poolIds.USDC],
        [chainIds.FANTOM]: [poolIds.USDC],
      },
    },
    [poolIds.USDT]: {
      address: '0x29e38769f23701A2e4A8Ef0492e19dA4604Be62c',
      chainPaths: {
        [chainIds.BSC]: [poolIds.BUSD, poolIds.USDT],
        [chainIds.ETHEREUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.POLYGON]: [poolIds.USDC, poolIds.USDT],
        [chainIds.ARBITRUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.OPTIMISM]: [poolIds.USDC],
        [chainIds.FANTOM]: [poolIds.USDC],
      },
    },
    [poolIds.FRAX]: {
      address: '0x1c272232Df0bb6225dA87f4dEcD9d37c32f63Eea',
      chainPaths: {
        [chainIds.ETHEREUM]: [poolIds.FRAX],
        [chainIds.ARBITRUM]: [poolIds.FRAX],
        [chainIds.OPTIMISM]: [poolIds.FRAX],
      },
    },
    [poolIds.MAI]: {
      address: '0x8736f92646B2542B3e5F3c63590cA7Fe313e283B',
      chainPaths: {
        [chainIds.BSC]: [poolIds.MAI],
        [chainIds.ETHEREUM]: [poolIds.MAI],
        [chainIds.POLYGON]: [poolIds.MAI],
        [chainIds.ARBITRUM]: [poolIds.MAI],
        [chainIds.OPTIMISM]: [poolIds.MAI],
      },
    },
    [poolIds.metisUSDT]: {
      address: '0xEAe5c2F6B25933deB62f754f239111413A0A25ef',
      chainPaths: {
        [chainIds.BSC]: [poolIds.metisUSDT],
        [chainIds.ETHEREUM]: [poolIds.metisUSDT],
        [chainIds.METIS]: [poolIds.metisUSDT],
      },
    },
  },
  [chainIds.POLYGON]: {
    [poolIds.USDC]: {
      address: '0x1205f31718499dBf1fCa446663B532Ef87481fe1',
      chainPaths: {
        [chainIds.BSC]: [poolIds.BUSD, poolIds.USDT],
        [chainIds.ETHEREUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.AVALANCHE]: [poolIds.USDC, poolIds.USDT],
        [chainIds.ARBITRUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.OPTIMISM]: [poolIds.USDC],
        [chainIds.FANTOM]: [poolIds.USDC],
      },
    },
    [poolIds.USDT]: {
      address: '0x29e38769f23701A2e4A8Ef0492e19dA4604Be62c',
      chainPaths: {
        [chainIds.BSC]: [poolIds.BUSD, poolIds.USDT],
        [chainIds.ETHEREUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.AVALANCHE]: [poolIds.USDC, poolIds.USDT],
        [chainIds.ARBITRUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.OPTIMISM]: [poolIds.USDC],
        [chainIds.FANTOM]: [poolIds.USDC],
      },
    },
    [poolIds.DAI]: {
      address: '0x1c272232Df0bb6225dA87f4dEcD9d37c32f63Eea',
      chainPaths: {
        [chainIds.ETHEREUM]: [poolIds.DAI],
        [chainIds.OPTIMISM]: [poolIds.DAI],
      },
    },
    [poolIds.MAI]: {
      address: '0x8736f92646B2542B3e5F3c63590cA7Fe313e283B',
      chainPaths: {
        [chainIds.BSC]: [poolIds.MAI],
        [chainIds.AVALANCHE]: [poolIds.MAI],
        [chainIds.ETHEREUM]: [poolIds.MAI],
        [chainIds.ARBITRUM]: [poolIds.MAI],
        [chainIds.OPTIMISM]: [poolIds.MAI],
      },
    },
  },
  [chainIds.ARBITRUM]: {
    [poolIds.USDC]: {
      address: '0x892785f33CdeE22A30AEF750F285E18c18040c3e',
      chainPaths: {
        [chainIds.BSC]: [poolIds.BUSD, poolIds.USDT],
        [chainIds.ETHEREUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.AVALANCHE]: [poolIds.USDC, poolIds.USDT],
        [chainIds.POLYGON]: [poolIds.USDC, poolIds.USDT],
        [chainIds.OPTIMISM]: [poolIds.USDC],
        [chainIds.FANTOM]: [poolIds.USDC],
      },
    },
    [poolIds.USDT]: {
      address: '0xB6CfcF89a7B22988bfC96632aC2A9D6daB60d641',
      chainPaths: {
        [chainIds.BSC]: [poolIds.BUSD, poolIds.USDT],
        [chainIds.ETHEREUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.AVALANCHE]: [poolIds.USDC, poolIds.USDT],
        [chainIds.POLYGON]: [poolIds.USDC, poolIds.USDT],
        [chainIds.OPTIMISM]: [poolIds.USDC],
        [chainIds.FANTOM]: [poolIds.USDC],
      },
    },
    [poolIds.FRAX]: {
      address: '0xaa4BF442F024820B2C28Cd0FD72b82c63e66F56C',
      chainPaths: {
        [chainIds.AVALANCHE]: [poolIds.FRAX],
        [chainIds.ETHEREUM]: [poolIds.FRAX],
        [chainIds.OPTIMISM]: [poolIds.FRAX],
      },
    },
    [poolIds.ETH]: {
      address: '0x915A55e36A01285A14f05dE6e81ED9cE89772f8e',
      chainPaths: {
        [chainIds.ETHEREUM]: [poolIds.ETH],
        [chainIds.OPTIMISM]: [poolIds.ETH],
      },
    },
    [poolIds.LUSD]: {
      address: '0x600E576F9d853c95d58029093A16EE49646F3ca5',
      chainPaths: {
        [chainIds.ETHEREUM]: [poolIds.LUSD],
        [chainIds.OPTIMISM]: [poolIds.LUSD],
      },
    },
    [poolIds.MAI]: {
      address: '0xF39B7Be294cB36dE8c510e267B82bb588705d977',
      chainPaths: {
        [chainIds.BSC]: [poolIds.MAI],
        [chainIds.AVALANCHE]: [poolIds.MAI],
        [chainIds.POLYGON]: [poolIds.MAI],
        [chainIds.ETHEREUM]: [poolIds.MAI],
        [chainIds.OPTIMISM]: [poolIds.MAI],
      },
    },
  },
  [chainIds.OPTIMISM]: {
    [poolIds.USDC]: {
      address: '0xDecC0c09c3B5f6e92EF4184125D5648a66E35298',
      chainPaths: {
        [chainIds.BSC]: [poolIds.BUSD, poolIds.USDT],
        [chainIds.ETHEREUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.AVALANCHE]: [poolIds.USDC, poolIds.USDT],
        [chainIds.POLYGON]: [poolIds.USDC, poolIds.USDT],
        [chainIds.ARBITRUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.FANTOM]: [poolIds.USDC],
      },
    },
    [poolIds.DAI]: {
      address: '0x165137624F1f692e69659f944BF69DE02874ee27',
      chainPaths: {
        [chainIds.POLYGON]: [poolIds.DAI],
        [chainIds.ETHEREUM]: [poolIds.DAI],
      },
    },
    [poolIds.FRAX]: {
      address: '0x368605D9C6243A80903b9e326f1Cddde088B8924',
      chainPaths: {
        [chainIds.AVALANCHE]: [poolIds.FRAX],
        [chainIds.ETHEREUM]: [poolIds.FRAX],
        [chainIds.ARBITRUM]: [poolIds.FRAX],
      },
    },
    [poolIds.ETH]: {
      address: '0xd22363e3762cA7339569F3d33EADe20127D5F98C',
      chainPaths: {
        [chainIds.ARBITRUM]: [poolIds.ETH],
        [chainIds.ETHEREUM]: [poolIds.ETH],
      },
    },
    [poolIds.sUSD]: {
      address: '0x2F8bC9081c7FCFeC25b9f41a50d97EaA592058ae',
      chainPaths: {
        [chainIds.ETHEREUM]: [poolIds.sUSD],
      },
    },
    [poolIds.LUSD]: {
      address: '0x3533F5e279bDBf550272a199a223dA798D9eff78',
      chainPaths: {
        [chainIds.ARBITRUM]: [poolIds.LUSD],
        [chainIds.ETHEREUM]: [poolIds.LUSD],
      },
    },
    [poolIds.MAI]: {
      address: '0x5421FA1A48f9FF81e4580557E86C7C0D24C18036',
      chainPaths: {
        [chainIds.BSC]: [poolIds.MAI],
        [chainIds.AVALANCHE]: [poolIds.MAI],
        [chainIds.POLYGON]: [poolIds.MAI],
        [chainIds.ARBITRUM]: [poolIds.MAI],
        [chainIds.ETHEREUM]: [poolIds.MAI],
      },
    },
  },
  [chainIds.FANTOM]: {
    [poolIds.USDC]: {
      address: '0x12edeA9cd262006cC3C4E77c90d2CD2DD4b1eb97',
      chainPaths: {
        [chainIds.BSC]: [poolIds.BUSD, poolIds.USDT],
        [chainIds.ETHEREUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.AVALANCHE]: [poolIds.USDC, poolIds.USDT],
        [chainIds.POLYGON]: [poolIds.USDC, poolIds.USDT],
        [chainIds.ARBITRUM]: [poolIds.USDC, poolIds.USDT],
        [chainIds.FANTOM]: [poolIds.USDC],
      },
    },
  },
  [chainIds.METIS]: {
    [poolIds.METIS]: {
      address: '0xAad094F6A75A14417d39f04E690fC216f080A41a',
      chainPaths: {
        [chainIds.BSC]: [poolIds.METIS],
        [chainIds.AVALANCHE]: [poolIds.METIS],
        [chainIds.ETHEREUM]: [poolIds.METIS],
      },
    },
    [poolIds.metisUSDT]: {
      address: '0x2b60473a7C41Deb80EDdaafD5560e963440eb632',
      chainPaths: {
        [chainIds.BSC]: [poolIds.metisUSDT],
        [chainIds.AVALANCHE]: [poolIds.metisUSDT],
        [chainIds.ETHEREUM]: [poolIds.metisUSDT],
      },
    },
  },
};
