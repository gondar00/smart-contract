const Migrations = artifacts.require('JurStatus')

module.exports = async function (deployer) {
  await deployer.deploy(Migrations)
}
