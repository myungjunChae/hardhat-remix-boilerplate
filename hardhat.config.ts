import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/types";

import { execSync } from "child_process";
import dotenv from "dotenv";
dotenv.config();

const INFURA_END_POINT = process.env.INFURA_END_POINT;
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY ?? "";
const ETHER_SCAN_API = process.env.ETHER_SCAN_API ?? "";

const config: HardhatUserConfig = {
	solidity: "0.8.7",
	networks: {
		rinkeby: {
			url: INFURA_END_POINT,
			accounts: [WALLET_PRIVATE_KEY], //todo : 배포할 계정으로 변경해야함
		},
	},
	//https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html
	etherscan: {
		apiKey: {
			rinkeby: ETHER_SCAN_API,
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
