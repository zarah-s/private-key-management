const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config();

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const abi = fs.readFileSync("./build/SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const bin = fs.readFileSync("./build/SimpleStorage_sol_SimpleStorage.bin", "utf8")
    const encryptedJsonKey = fs.readFileSync("./.encryptedKey.json", "utf8");
    let wallet = ethers.Wallet.fromEncryptedJsonSync(encryptedJsonKey, process.env.PRIVATE_KEY_PASSWORD);
    // wallet = await wallet.connect(provider);
    wallet = wallet.connect(provider)
    const contractFactory = new ethers.ContractFactory(abi, bin, wallet);

    const deployed = await contractFactory.deploy();

    console.log(deployed)
}


main().then(() => process.exit(0)).catch(e => {
    console.log(e)
    process.exit(1)
})