// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {PropertyRegistry} from "../src/PropertyRegistry.sol";

contract PropertyRegistryTest is Test {
    PropertyRegistry registry;

    string constant PROPERTY_ID = "PROP001";

    function setUp() public {
        registry = new PropertyRegistry();
    }
     function testDeployment() public view {
        assertTrue(address(registry) != address(0));
    }

    function testRegisterProperty() public {
        registry.registerProperty(
            PROPERTY_ID,
            "Test Property",
            "Abuja",
            100,
            PropertyRegistry.PropertyType.Land,
            "ipfs://test"
        );

        PropertyRegistry.Property memory property = registry.getProperty(PROPERTY_ID);
assertEq(property.propertyId, PROPERTY_ID);
    }
    function testGetProperty() public {
        registry.registerProperty(
            PROPERTY_ID,
            "Test Property",
            "Abuja",
            100,
            PropertyRegistry.PropertyType.Land,
            "ipfs://test"
        );

        PropertyRegistry.Property memory property = registry.getProperty(PROPERTY_ID);

        assertEq(property.propertyId, PROPERTY_ID);
        assertEq(property.title, "Test Property");
        assertEq(property.location, "Abuja");
        assertEq(property.owner, address(this));
    }
    function testGetPropertiesByOwner() public {
        registry.registerProperty(
            PROPERTY_ID,
            "Test Property",
            "Abuja",
            100,
            PropertyRegistry.PropertyType.Land,
            "ipfs://test"
        );

        string[] memory properties = registry.getPropertiesByOwner(address(this));

        assertEq(properties.length, 1);
        assertEq(properties[0], PROPERTY_ID);
    }
    function testTransferOwnership() public {
        registry.registerProperty(
            PROPERTY_ID,
            "Test Property",
            "Abuja",
            100,
            PropertyRegistry.PropertyType.Land,
            "ipfs://test"
        );

        address newOwner = address(0x1234);

        registry.transferOwnership(
            PROPERTY_ID,
            newOwner
        );
    }
        function testGetTransferHistory() public {
        registry.registerProperty(
            PROPERTY_ID,
            "Test Property",
            "Abuja",
            100,
            PropertyRegistry.PropertyType.Land,
            "ipfs://test"
        );

        address newOwner = address(0x1234);

        registry.transferOwnership(
            PROPERTY_ID,
            newOwner
        );

        PropertyRegistry.TransferRecord[] memory history =
            registry.getTransferHistory(PROPERTY_ID);

        assertEq(history.length, 1);
        assertEq(history[0].newOwner, newOwner);
    }
    function testCannotRegisterDuplicateProperty() public {
        registry.registerProperty(
            PROPERTY_ID,
            "Test Property",
            "Abuja",
            100,
            PropertyRegistry.PropertyType.Land,
            "ipfs://test"
        );

        vm.expectRevert(PropertyRegistry.PropertyAlreadyExists.selector);

        registry.registerProperty(
            PROPERTY_ID,
            "Another Property",
            "Lagos",
            200,
            PropertyRegistry.PropertyType.House,
            "ipfs://another"
        );
    }
function testCannotTransferPropertyNotOwned() public {
        registry.registerProperty(
            PROPERTY_ID,
            "Test Property",
            "Abuja",
            100,
            PropertyRegistry.PropertyType.Land,
            "ipfs://test"
        );

        vm.prank(address(0x5678));

        vm.expectRevert(PropertyRegistry.NotPropertyOwner.selector);

        registry.transferOwnership(
            PROPERTY_ID,
            address(0x1234)
        );
    }
 function testCannotTransferToZeroAddress() public {
        registry.registerProperty(
            PROPERTY_ID,
            "Test Property",
            "Abuja",
            100,
            PropertyRegistry.PropertyType.Land,
            "ipfs://test"
        );

        vm.expectRevert(PropertyRegistry.InvalidAddress.selector);

        registry.transferOwnership(
            PROPERTY_ID,
            address(0)
        );
    }
    function testCannotTransferToSelf() public {
        registry.registerProperty(
            PROPERTY_ID,
            "Test Property",
            "Abuja",
            100,
            PropertyRegistry.PropertyType.Land,
            "ipfs://test"
        );

        vm.expectRevert(PropertyRegistry.SelfTransferNotAllowed.selector);

        registry.transferOwnership(
            PROPERTY_ID,
            address(this)
        );
    }
}