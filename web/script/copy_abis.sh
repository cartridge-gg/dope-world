#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

cp ../l1/out/Token.sol/Token.json ./src/abis/
cp ../l1/out/StarknetPaperBridge.sol/StarknetPaperBridge.json ./src/abis/

cp ../sn/target/dev/dope_world::paper_bridge::paper_bridge.json ./src/abis/
cp ../sn/target/dev/dope_world::paper_token::paper_token.json ./src/abis/
