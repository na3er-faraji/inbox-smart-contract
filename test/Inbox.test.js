const assert = require('assert')
const ganache = require('ganache')
const { Web3 } = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)
const { abi, evm } = require('../compile')

const message = 'Hi there!'
let accounts
let inbox

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: '0x' + evm.bytecode.object, arguments: [message] })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address)
  })

  it('has a default message', async () => {
    const msg = await inbox.methods.message().call()
    assert.strictEqual(msg, message)
  })

  it('can change the message', async () => {
    const newMessage = 'new message!'
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] })
    const msg = await inbox.methods.message().call()
    assert.strictEqual(msg, newMessage)
  })
})
