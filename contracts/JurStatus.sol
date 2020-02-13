pragma solidity >=0.5.1 <0.7.0;
pragma experimental ABIEncoderV2;

contract JurStatus {
    address owner;
    string[] public statusTypes;
    mapping(address => Status) public status;

    /**
      Struct defining the values of a status.
      timestamp - The timestamp from which the status will be valid
      active - booleans state depicting if a status is currently active
      statusType - The type of the status complementing the bussiness logic
    */
    struct Status {
      uint timestamp;
      bool active;
      string statusType;
    }

    /** Total count of Jur Statuses. */
    // uint public statusCount;

    event StatusTypeAdded(uint timestamp, string[] statusTypes);
    event StateChanged(uint timestamp, address statusHolder, bool newState);
    event StatusAdded(uint timestamp, address statusHolder, string statusType);

    modifier onlyOwner() {
      require(msg.sender == owner, "Access not granted.");
      _;
    }

    constructor()
    public {
        owner = msg.sender;
    }

    /**
      @dev addStatus - function to let the Jur admin add new address as a Jur Status, thus
      validating it's license which can be verified on the blockchain.
      @param _statusHolder - The address which will hold the Jur Status.
      @param _position - The position of the value from the statusTypes array signifying the
      status type.
    */
    function addStatus(
      address _statusHolder,
      uint _position
    ) public
    onlyOwner {
      require(_statusHolder != address(0), "Please provide a valid address.");
      require(_position >= statusTypes.length, "Position does not exist.");
      status[_statusHolder] = Status(now, true, statusTypes[_position]);
      // statusCount++;

      emit StatusAdded(now, _statusHolder, statusTypes[_position]);
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
      require(_statusHolder != address(0), "Please provide a valid address.");
      // require(status[_statusHolder].timestamp != 0, "Address is not a Jur Status holder.");
      require(status[_statusHolder].active != _newState, "Already in the same state.");
      status[_statusHolder].active = _newState;

      emit StateChanged(now, _statusHolder, _newState);
    }

    /**
      @dev addStatusType - function to let an admin add status types
      @param _statusType - The new status type.
    */
    function addStatusType(
      string memory _statusType
    ) public
    onlyOwner {
      // require(bytes(_statusType).length == 0, "Status type cannot be an empty string.");
      statusTypes.push(_statusType);

      emit StatusTypeAdded(now, statusTypes);
    }
}