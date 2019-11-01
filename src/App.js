import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import EthCrypto from 'eth-crypto'

const Box = require('3box')

function App() {

const [entropy, setEntropy] = useState()
function entropySetter(e) {
    setEntropy(e)
}
// salt to meet min entropy size limits
const salt = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
async function createBox() {
    console.log(entropy)
    let entropyBuffer = Buffer.from(entropy + salt)
    let account = EthCrypto.createIdentity(entropyBuffer)
    let ethereum = {
        sendAsync: function (data, callback) {
            console.log('data', data)
            console.log('data params', data.params)
            console.log('data params[0]', data.params[0])
            let messageHash = EthCrypto.hash.keccak256(data.params[0]);
            let signature = EthCrypto.sign(account.privateKey, messageHash)
            callback(null, {result: signature})
            return signature
        }
    }
    let box = await Box.openBox(account.address, ethereum)
    console.log(box)
}

return (
    <div className="App">
    <p>Input entropy below</p>
    <input onChange={(e) => entropySetter(e.target.value)} type="text" />
    <button onClick={createBox}>
        Create new keypair
    </button>
    </div>
    );
}

export default App;
