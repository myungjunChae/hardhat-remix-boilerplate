import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as chai from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

let should = chai.should();

describe("Token contract", async () => {
    let tokenFactory: ContractFactory;
    let hardhatToken: Contract;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;

    beforeEach(async () => {
        tokenFactory = await ethers.getContractFactory("Token");
        [owner, addr1, addr2] = await ethers.getSigners();

        hardhatToken = await tokenFactory.deploy();
    });

    describe("배포", async () => {
        it("배포자가 컨트랙트 owner인가", async () => {
            const hardhatTokenOwner = await hardhatToken.owner();
            hardhatTokenOwner.should.be.equal(owner.address);
        });
        it("전체 토큰을 owner가 가지고 있는가", async () => {
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            const totalSupply = await hardhatToken.totalSupply();
            totalSupply.should.be.equal(ownerBalance);
        });
    });

    describe("전송", async () => {
        it("두 계정 간에 코인 전송이 되야함", async () => {
            await hardhatToken.transfer(addr1.address, 50);
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            addr1Balance.should.be.equal(50);

            await hardhatToken.connect(addr1).transfer(addr2.address, 50);
            const addr2Balanace = await hardhatToken.balanceOf(addr2.address);
            addr2Balanace.should.be.equal(50);
        });

        it("충한 코인이 없으면 전송할 수 없다.", async () => {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

            hardhatToken.connect(addr1).transfer(owner.address, 1).should.be.reverted;

            (await hardhatToken.balanceOf(owner.address)).should.be.equal(initialOwnerBalance);
        });

        it("코인 전송 후에 잔고가 업데이트되야함", async () => {
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

            await hardhatToken.transfer(addr1.address, 100);
            await hardhatToken.transfer(addr2.address, 50);

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            finalOwnerBalance.should.be.equal(initialOwnerBalance.sub(150));

            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            addr1Balance.should.be.equal(100);

            const addr2Balanace = await hardhatToken.balanceOf(addr2.address);
            addr2Balanace.should.be.equal(50);
        });
    });
});
