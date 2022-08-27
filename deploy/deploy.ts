import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Token } from "../typechain-types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployer } = await hre.getNamedAccounts();
	const { deploy } = hre.deployments;
	const chainId = hre.network.config.chainId || 0;

	if (chainId === 0) {
		throw "Check ChainId";
	}

	const deployment = await deploy("Token", {
		from: deployer,
		// args: [],
		log: true,
	});

	const token = (await hre.ethers.getContractAt(
		deployment.abi,
		deployment.address
	)) as Token;

	// if (hre.network.name != "hardhat") {
	// 	await hre.run("verify:verify", {
	// 		address: esion.address,
	// 		network: hre.network.name,
	// 		constructorArguments: [METADATA_URI, deployer, ROYALTY_FEE, saleInfoList],
	// 	});
	// }
};

export default deploy;
