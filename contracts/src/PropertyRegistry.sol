// SPDX-Licence-Identifier: MIT
pragma solidity ^0.8.24;

contract PropertyRegistry {

    address public admin;

modifier onlyAdmin() {
    if (msg.sender != admin) revert NotPropertyOwner();
    _;
}

constructor() {
    admin = msg.sender;
}

    enum PropertyType {
        Land,
        House,
        Apartment,
        Commercial
    }

    enum PropertyStatus {
        Active,
        Transfered,
        Suspended
    }

      struct Property {
        string propertyId;
        string title;
        string location;
        uint256 size;
        PropertyType propertyType;
        address owner;
        uint256 registeredAt;
        uint256 lastTransferAt;
        PropertyStatus status;
        string metadataHash;
    }

    struct TransferRecord {
        address previousOwner;
        address newOwner;
        uint256 transferredAt;
    }

    error PropertyAlreadyExists();
    error PropertyNotFound();
    error NotPropertyOwner();
    error InvalidAddress();
    error InvalidInput();
    error SelfTransferNotAllowed();
    error EmptyField();

    event PropertyRegistered(
        string indexed propertyId,
        address indexed owner
    );

    event OwnershipTransferred(
        string indexed propertyId,
        address indexed previousOwner,
        address indexed newOwner
    );

    mapping(string => Property) private properties;
    mapping(string => bool) private propertyExists;
    mapping(address => string[]) private ownerProperties;
    mapping(string => TransferRecord[]) private transferHistory;

      modifier onlyPropertyOwner(string memory propertyId) {
        if (!propertyExists[propertyId]) revert PropertyNotFound();
        if (properties[propertyId].owner != msg.sender) revert NotPropertyOwner();
        _;
    }

/// @notice Registers a new property
function registerProperty(
    string memory propertyId,
    string memory title,
    string memory location,
    uint256 size,
    PropertyType propertyType,
    string memory metadataURI
) public {
    if (bytes(propertyId).length == 0) revert EmptyField();
    if (bytes(title).length == 0) revert EmptyField();
    if (propertyExists[propertyId]) revert PropertyAlreadyExists();

    Property storage p = properties[propertyId];

    p.propertyId = propertyId;
    p.title = title;
    p.location = location;
    p.size = size;
    p.propertyType = propertyType;
    p.owner = msg.sender;
    p.registeredAt = block.timestamp;
    p.lastTransferAt = block.timestamp;
    p.status = PropertyStatus.Active;
    p.metadataHash = metadataURI;

    propertyExists[propertyId] = true;
    ownerProperties[msg.sender].push(propertyId);

    emit PropertyRegistered(
        propertyId,
        msg.sender
    );
}
function propertyExistsById(string memory propertyId) public view returns (bool) {
    return propertyExists[propertyId];
}
function getProperty(
    string memory propertyId
) public view returns (Property memory) {
    if (!propertyExists[propertyId]) revert PropertyNotFound();
    return properties[propertyId];
}
function getPropertiesByOwner(
    address owner
) public view returns (string[] memory) {
    return ownerProperties[owner];
}
function getTransferHistory(
    string memory propertyId
) public view returns (TransferRecord[] memory) {
    if (!propertyExists[propertyId]) revert PropertyNotFound();
    return transferHistory[propertyId];
}
function transferOwnership(
    string memory propertyId,
    address newOwner
) public onlyPropertyOwner(propertyId) {
    if (newOwner == address(0)) revert InvalidAddress();
    if (newOwner == msg.sender) revert SelfTransferNotAllowed();

    address previousOwner = properties[propertyId].owner;

    properties[propertyId].owner = newOwner;
    properties[propertyId].lastTransferAt = block.timestamp;
    properties[propertyId].status = PropertyStatus.Transfered;

    string[] storage previousOwnerProperties = ownerProperties[previousOwner];

for (uint256 i = 0; i < previousOwnerProperties.length; i++) {
    if (
        keccak256(bytes(previousOwnerProperties[i])) ==
        keccak256(bytes(propertyId))
    ) {
        previousOwnerProperties[i] =
            previousOwnerProperties[previousOwnerProperties.length - 1];
        previousOwnerProperties.pop();
        break;
    }
}

    ownerProperties[newOwner].push(propertyId);

    transferHistory[propertyId].push(
        TransferRecord({
            previousOwner: previousOwner,
            newOwner: newOwner,
            transferredAt: block.timestamp
        })
    );

    emit OwnershipTransferred(
        propertyId,
        previousOwner,
        newOwner
    );
}
function suspendProperty(
    string memory propertyId
) public onlyAdmin {
    if (!propertyExists[propertyId]) revert PropertyNotFound();

    properties[propertyId].status = PropertyStatus.Suspended;
}

}
