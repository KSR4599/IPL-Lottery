import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider); //This makes teh current version of web3 to get configured to that of ours (solver the problem of multiple-version of web3)

export default web3;
