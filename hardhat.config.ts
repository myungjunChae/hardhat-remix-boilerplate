import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@typechain/hardhat";
import "hardhat-deploy";
import { task } from "hardhat/config";

import { HardhatUserConfig } from "hardhat/types";

import { execSync } from "child_process";
import dotenv from "dotenv";
dotenv.config();

let RINKEBY_METADATA = {
	INFURA_END_POINT: process.env.INFURA_END_POINT_RINKEBY ?? "",
	WALLET_PRIVATE_KEY: process.env.RINKEBY_WALLET_PRIVATE_KEY ?? "",
	ETHER_SCAN_API: process.env.ETHER_SCAN_API ?? "",
};

let MAINNET_METADATA = {
	INFURA_END_POINT: process.env.INFURA_END_POINT_MAINNET ?? "",
	WALLET_PRIVATE_KEY: process.env.MAINNET_WALLET_PRIVATE_KEY ?? "",
	ETHER_SCAN_API: process.env.ETHER_SCAN_API ?? "",
};

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.17",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	namedAccounts: {
		deployer: 0,
	},
	networks: {
		// mainnet: {
		// 	url: MAINNET_METADATA.INFURA_END_POINT,
		// 	accounts: [MAINNET_METADATA.WALLET_PRIVATE_KEY],
		// },
		// rinkeby: {
		// 	url: RINKEBY_METADATA.INFURA_END_POINT,
		// 	accounts: [RINKEBY_METADATA.WALLET_PRIVATE_KEY],
		// 	chainId: 4,
		// },
	},
	//https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html
	etherscan: {
		apiKey: {
			rinkeby: RINKEBY_METADATA.ETHER_SCAN_API,
		},
	},
};

task("remix", "run remixd").setAction(async () => {
	execSync(`remixd -s ./ —remix-ide https://remix.ethereum.org`, {
		stdio: "inherit",
	});
});

task("tt", "test with typechain").setAction(async (taskArgs, hre) => {
	execSync(`npx hardhat typechain`, {
		stdio: "inherit",
	});

	execSync(`npx hardhat test`, {
		stdio: "inherit",
	});
});

export default config;
