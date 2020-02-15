pragma solidity >=0.5.1 <0.7.0;

contract JurStatus {
    // Represents a single status.
    struct Status {
      uint timestamp; // timestamp from which the status will be valid
      bool active; // boolean state depicting if a status is currently active
      bytes32 statusType; // the type of the status
    }

    // This is a type for a single status-type.
    struct Type {
      bytes32 name; // short name (up to 32 bytes)
    }

    address owner;

    // This declares a state variable - status that
    // stores a `Status` struct for each possible address.
    mapping(address => Status) public status;

    // A dynamically-sized array of `Type` structs.
    Type[] public statusTypes;

    event TriggerStatusTypeAdded(uint timestamp, bytes32 statusType, string notification);
    event TriggerStateChanged(uint timestamp, address statusHolder, bool newState, string notification);
    event TriggerStatusAdded(uint timestamp, address statusHolder, uint position, string notification);

    modifier onlyOwner() {
      require(msg.sender == owner, "Access not granted.");
      _;
    }

    constructor()
    public {
      owner = msg.sender;
    }

    // @dev addStatus - function to let the admin add new address as struct Status
    function addStatus(
      address _statusHolder, // @param _statusHolder - The address which will hold the Jur Status.
      uint _position // @param _position - The position of the value from the statusTypes array
    ) public
    onlyOwner {
      require(_statusHolder != address(0), "Please provide a valid address.");
      status[_statusHolder] = Status(now, true, statusTypes[_position].name);

      emit TriggerStatusAdded(now, _statusHolder, _position, "Status added");
    }

    // @dev changeState - function to let the Jur admin change the state of a status.
    function changeState(
      address _statusHolder, // @param _statusHolder - The address holding the Jur Status.
      bool _newState // @param _newState -  Boolean status to update.
    ) public
    onlyOwner {
      require(_statusHolder != address(0), "Please provide a valid address.");
      // Since `status` is a reference, this
      // modifies `status[_statusHolder].active`
      require(status[_statusHolder].active != _newState, "Already in the same state.");
      status[_statusHolder].active = _newState;

      emit TriggerStateChanged(now, _statusHolder, _newState, "Active state changed");
    }

    // @dev addStatusType - function to let an admin add status type
    function addStatusType(
      bytes32 _statusType // @param _statusType - The new status type.
    ) public
    onlyOwner {
      // require(_statusType.length == 0, "Status type cannot be an empty string.");

      // `Type({...})` creates a temporary
      // Type object and `statusTypes.push(...)`
      // appends it to the end of `statusTypes`.
      statusTypes.push(Type(_statusType));

      emit TriggerStatusTypeAdded(now, _statusType, "Status type added");
    }
}
