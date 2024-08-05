const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source
    }
  },
  settings: {
    metadata: {
      useLiteralContent: true
    },
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

const output = JSON.parse(solc.compile(JSON.stringify(input)))
console.log(output)
module.exports = output.contracts['Inbox.sol'].Inbox
