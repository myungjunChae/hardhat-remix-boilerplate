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

let DEFAULT_CONFIG = {
	ETHER_SCAN_API: process.env.ETHER_SCAN_API ?? "",
};

let GOERLI_CONFIG = {
	INFURA_END_POINT: process.env.INFURA_END_POINT_GOERLI ?? "",
	WALLET_PRIVATE_KEY: process.env.GOERLI_WALLET_PRIVATE_KEY ?? "",
};

let MAINNET_CONFIG = {
	INFURA_END_POINT: process.env.INFURA_END_POINT_MAINNET ?? "",
	WALLET_PRIVATE_KEY: process.env.MAINNET_WALLET_PRIVATE_KEY ?? "",
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
		mainnet: {
			url: MAINNET_CONFIG.INFURA_END_POINT,
			accounts: [MAINNET_CONFIG.WALLET_PRIVATE_KEY],
			chainId: 1,
		},
		goerli: {
			url: GOERLI_CONFIG.INFURA_END_POINT,
			accounts: [GOERLI_CONFIG.WALLET_PRIVATE_KEY],
			chainId: 5,
		},
	},
	//https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html
	etherscan: {
		apiKey: {
			goerli: DEFAULT_CONFIG.ETHER_SCAN_API,
			mainnet: DEFAULT_CONFIG.ETHER_SCAN_API,
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
