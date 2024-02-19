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
echo "---------------------------------------------------------------------------"
echo NEW_OWNER : $NEW_WORLD_OWNER
echo "---------------------------------------------------------------------------"
echo STARKLI_PARAMS: $STARKLI_PARAMS
echo "---------------------------------------------------------------------------"
sleep 1

# revoke_owner(ref self: ContractState, address: ContractAddress, resource: felt252) {
DOJO_TOKEN_MODELS=("ERC20MetadataModel" "ERC20BalanceModel" "ERC20AllowanceModel" "ERC20BridgeableModel")
DOJO_BRIDGE_MODELS=("PaperBridgeModel")

echo "----------------"
echo revoke models ownership
sleep 5

for model in ${DOJO_TOKEN_MODELS[@]}; do
    starkli invoke $STARKLI_PARAMS $WORLD_ADDRESS revoke_owner $ACCOUNT_ADDRESS $model
    sleep $TX_SLEEP
done

for model in ${DOJO_BRIDGE_MODELS[@]}; do
    starkli invoke $STARKLI_PARAMS $WORLD_ADDRESS revoke_owner $ACCOUNT_ADDRESS $model
    sleep $TX_SLEEP
done

echo "----------------"
echo revoke contracts ownership
sleep 5

starkli invoke $STARKLI_PARAMS $WORLD_ADDRESS revoke_owner $ACCOUNT_ADDRESS $PAPER_TOKEN_ADDRESS
sleep $TX_SLEEP

starkli invoke $STARKLI_PARAMS $WORLD_ADDRESS revoke_owner $ACCOUNT_ADDRESS $PAPER_BRIDGE_ADDRESS
sleep $TX_SLEEP


echo "----------------"
echo revoke WORLD ownership
sleep 5
starkli invoke $STARKLI_PARAMS $WORLD_ADDRESS revoke_owner $ACCOUNT_ADDRESS 0

