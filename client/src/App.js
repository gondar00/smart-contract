import React, { Component } from "react";
import JurStatusContract from "./contracts/JurStatus.json";
import getWeb3 from "./lib/initialize-web3";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = JurStatusContract.networks[networkId];
      // console.log('deployedNetwork', deployedNetwork)
      // console.log('JurStatusContract', JurStatusContract)
      const instance = new web3.eth.Contract(
        JurStatusContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    const statusTypes = await contract.methods.addStatusType('solomon').call()

    // Get the value from the contract to prove it worked.
    // await contract.methods.new({ from: accounts[0] })
    await contract.methods.addJurStatus(accounts[0], 1).call()

    // const response = await contract.methods.addStatusType('status').call();
    // const statusTypes = await contract.methods.addStatusType('type').call();

    // console.log('statusTypes', statusTypes)
    // // Update state with the result.
    // this.setState({ storageValue: statusTypes });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        {/* <div>The stored value is: {this.state.storageValue}</div> */}
      </div>
    );
  }
}

export default App;
