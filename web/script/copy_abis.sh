#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

cp ../l1/out/Token.sol/Token.json ./src/abis/
cp ../l1/out/L1DojoBridge.sol/L1DojoBridge.json ./src/abis/

cp ../sn/target/dev/dojo_bridge::dojo_bridge::dojo_bridge.json ./src/abis/
cp ../sn/target/dev/dojo_bridge::dojo_token::dojo_token.json ./src/abis/
