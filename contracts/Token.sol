//SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.5.0 < 0.9.0;

import 'hardhat/console.sol';

contract token {
    string public name = "Hard Hat Token";
    string public symbol = "HHT";
    uint public totalSupply = 10000;

    address public owner;
    mapping(address => uint) balances;  

    constructor () {
        owner = msg.sender;

        balances[owner] = totalSupply;
    }

    function transfer (address to, uint amount) external {
        console.log("address => ", to);
        console.log("amount => ", amount);
        require(balances[msg.sender] >= amount, 'Not enough tokens');

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf (address account) external view returns (uint) {
        return balances[account];
    }
}