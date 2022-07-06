import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
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
	solidity: "0.8.9",
	networks: {
		rinkeby: {
			url: RINKEBY_METADATA.INFURA_END_POINT,
			accounts: [RINKEBY_METADATA.WALLET_PRIVATE_KEY],
		},
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

task("deploy", "deploy contract").setAction(async (taskArgs, hre) => {
	execSync(`npx hardhat run scripts/deploy.ts --network ${hre.network.name}`, {
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
