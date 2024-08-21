const HDWalletProvider = require('@truffle/hdwallet-provider')
const { Web3 } = require('web3')
const { abi, evm } = require('./compile')

const provider = new HDWalletProvider(
  'day flee frost novel inquiry render renew about clarify note faculty loan',
  'https://sepolia.infura.io/v3/d88f4ca988874865a475133d6f4e38ea'
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: '0x' + evm.bytecode.object, arguments: ['Hi There!'] })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)
}

deploy()
