//SPDX-License-Identifier: MIT
pragma solidity 0.8.33;

import "forge-std/Script.sol";
import "../src/PropertyRegistry.sol";

contract DeployPropertyRegistry is Script {
    function run() external {
        //Get private key from .env
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerKey);
        PropertyRegistry propertyRegistry = new PropertyRegistry();
        vm.stopBroadcast();
        console.log("PropertyRegistry deployed at:", address(propertyRegistry));
    }
}
