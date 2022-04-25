# solidity_hardhat

There is one more file hardhat.config.js


code : 

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('@nomiclabs/hardhat-waffle');

const Rinkeby_key = ''; // provide metamask account private key
const api = ''; // provide api for create node for us in the rinkeby network ( for E.g. - infura )

module.exports = {
  solidity: "0.8.9",

  networks : {
    rinkeby:{
      url : `https://rinkeby.infura.io/v3/${api}`,
      accounts : [`${Rinkeby_key}`]
    }
  }
};
