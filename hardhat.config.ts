import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/types";

import { execSync } from "child_process";
import { env } from "process";

// todo : 추후에 테스트넷 및 메인넷을 추가할 때, 사용하기 위함
// const ALCHEMY_API_KEY = "KEY";
// const ROPSTEN_PRIVATE_KEY = "YOUR ROPSTEN PRIVATE KEY";

const config: HardhatUserConfig = {
	solidity: "0.7.3",
	networks: {
		// ropsten: {
		//     url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
		//     accounts: [`${ROPSTEN_PRIVATE_KEY}`],
		// },
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
