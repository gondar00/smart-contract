pragma solidity >=0.5.1 <0.7.0;

contract JurStatus {
    /** The Jur admin address */
    address owner;

    /**
    Struct defining the values of a status.
    activationTime - The timestamp from which the status will be valid
    isActive - booleans state depicting if a status is currently valid
    statusType - The type of the status complementing the bussiness logic
    */
    struct Status {
        uint activationTime;
        bool isActive;
        string statusType;
    }

    /** Dynamic array holding the status types */
    string[] public statusTypes;

    /** Mapping between the address of the Jur Status holders and their properties */
    mapping(address  => Status) public status;

    /** Total count of Jur Statuses. */
    uint public statusCount;

    event StateChanged(address statusHolder, bool newState, uint timestamp);
    event StatusAdded(address statusHolder, uint activationTime, string statusType);

    modifier onlyOwner() {
        require(msg.sender == owner, "Access not granted.");
        _;
    }

    constructor()
    public {
        owner = msg.sender;
    }

    /**
    @dev addJurStatus - function to let the Jur admin add new address as a Jur Status, thus
    validating it's license which can be verified on the blockchain.
    @param _statusHolder - The address which will hold the Jur Status.
    @param _statusType - The position of the value from the statusTypes array signifying the
    status type.
    */
    function addJurStatus(
    address _statusHolder,
    uint _statusType
    ) public
    onlyOwner {
        require(_statusHolder != address(0), "Please provide a valid address.");
        status[_statusHolder] = Status(now, true, statusTypes[_statusType]);
        statusCount++;

        emit StatusAdded(_statusHolder, now, statusTypes[_statusType]);
    }

    /**
    @dev changeState - function to let the Jur admin change the state of a status.
    @param _statusHolder - The address holding the Jur Status.
    @param _newState -  Boolean status to update.
    */
    function changeState(
    address _statusHolder,
    bool _newState
    ) public
    onlyOwner {
        require(_statusHolder != address(0), "Pleae provide a valid address.");
        require(status[_statusHolder].activationTime != 0, "Address is not a Jur Status holder.");
        require(status[_statusHolder].isActive != _newState, "Already in the similar state.");
        status[_statusHolder].isActive = _newState;

        emit StateChanged(_statusHolder, _newState, now);
    }

    /**
    @dev addStatusType - function to let an admin add status types to support the bussiness
    logic.
    @param _statusType - The new status type.
    */
    function addStatusType(
    string memory _statusType
    ) public
    onlyOwner {
        require(bytes(_statusType).length != 0, "Status type cannot be an empty string.");
        statusTypes.push(_statusType);
    }
}