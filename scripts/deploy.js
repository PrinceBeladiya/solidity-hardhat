main = async () => {
    const [accounts] = await ethers.getSigners();

    const Token = await ethers.getContractFactory('token');
    const token = await Token.deploy();

    console.log("Token address ==> ", token.address);
}

main()
.then( () => process.exit(0))
.catch((error) => {
    console.log("Error ==> ", error);
    process.exit(1);
});