const { expect } = require('chai');

describe('Token Contract', () => {

    let owner;
    let Token;
    let address1;
    let address2;

    beforeEach(async () => {
        Token = await ethers.getContractFactory('token');
        [owner, address1, address2, ...address] = await ethers.getSigners();
        tokenDeploy = await Token.deploy();
    });

    describe('deployments', () => {
        it('can set owner ', async () => {
            expect(await tokenDeploy.owner()).to.equals(owner.address);
        });

        it('total supply is assigned to the owner', async () => {
            expect(await tokenDeploy.balanceOf(owner.address)).to.equals(await tokenDeploy.totalSupply());
        });
    });

    describe('transactions', () => {
        it( 'can tokens transfered by owner ', async () => {

            const amount = 100;

            const preOwnerBalance = await tokenDeploy.balanceOf(owner.address);
            const preRecipientBalance = await tokenDeploy.balanceOf(address1.address);

            await tokenDeploy.transfer(address1.address, amount);

            const ownerBalance = await tokenDeploy.balanceOf(owner.address);
            const recipientBalance = await tokenDeploy.balanceOf(address1.address);

            expect(ownerBalance).to.equals(preOwnerBalance - amount);
            expect(recipientBalance).to.equals(preRecipientBalance + amount);

        });

        it( 'Should fail if sender does not have enough tokens', async function () {
            const initialOwnerBalance = await tokenDeploy.balanceOf(owner.address); 
            await expect(
                tokenDeploy.connect(address1).transfer(owner.address, 1)
            ).to.be.revertedWith("Not enough tokens");

            expect(await tokenDeploy.balanceOf(owner.address)).to.equal(
              initialOwnerBalance
            );
          });

        it( 'can balance update after use of transfer function', async () => {

            const initialBalance = await tokenDeploy.balanceOf(owner.address);
            await tokenDeploy.transfer(address1.address, 100);
            
            const currentBalance = await tokenDeploy.balanceOf(owner.address);

            expect(initialBalance - currentBalance).to.equals(100);
            expect(await tokenDeploy.balanceOf(address1.address)).to.equals(100);
        });
    });
});