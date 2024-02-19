#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

sleep 1

# export TX_SLEEP=200 # goerli ...
export TX_SLEEP=120
export WORLD_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.world.address')

export PAPER_TOKEN_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "dope_world::paper_token::paper_token" ).address')
export PAPER_BRIDGE_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "dope_world::paper_bridge::paper_bridge" ).address')


echo "---------------------------------------------------------------------------"
echo rpc : $RPC_URL
echo world : $WORLD_ADDRESS
echo "---------------------------------------------------------------------------"
echo token : $PAPER_TOKEN_ADDRESS
echo bridge: $PAPER_BRIDGE_ADDRESS
echo "---------------------------------------------------------------------------"
echo ACCOUNT_ADDRESS : $ACCOUNT_ADDRESS
echo SOZO_PARAMS : $SOZO_PARAMS
echo "---------------------------------------------------------------------------"
echo NEW_OWNER : $NEW_WORLD_OWNER
echo "---------------------------------------------------------------------------"
echo STARKLI_PARAMS: $STARKLI_PARAMS
echo "---------------------------------------------------------------------------"
sleep 1

echo grant WORLD ownership to $NEW_WORLD_OWNER

sleep 5

# grant_owner(ref self: ContractState, address: ContractAddress, resource: felt252) 
# resource = 0 = WORLD
starkli invoke $STARKLI_PARAMS $WORLD_ADDRESS grant_owner $NEW_WORLD_OWNER 0

