include .env.goerli

export

ifeq ($(origin KEYSTORE), undefined)
   ACCOUNTS_PARAMS := --private-key ${ACCOUNT_PRIVATE_KEY}
else
   ACCOUNTS_PARAMS := --keystore ${KEYSTORE} --password ${KEYSTORE_PASS}
endif

PARAMS := --rpc-url ${RPC_URL} --account-address ${ACCOUNT_ADDRESS} ${ACCOUNTS_PARAMS} 

export SOZO_PARAMS = $(PARAMS)

export STARKLI_PARAMS= --rpc ${RPC_URL} --account ${ACCOUNT} --keystore ${KEYSTORE} --keystore-password ${KEYSTORE_PASS} --watch

all: 
	@echo "********************************************************************"
	@echo "ENV                     : ${ENV}"
	@echo "WORLD_NAME              : ${WORLD_NAME}"
	@echo "********************************************************************"
	@echo "RPC_URL                 : ${RPC_URL}"
	@echo "ACCOUNT_ADDRESS         : ${ACCOUNT_ADDRESS}"
	@echo "KEYSTORE                : ${KEYSTORE}"
	@echo "ACCOUNT                 : ${ACCOUNT}"
	@echo "********************************************************************"
	@echo "L1_BRIDGE_ADDRESS       : ${L1_BRIDGE_ADDRESS}"
	@echo "DOJO_TOKEN_NAME         : ${DOJO_TOKEN_NAME}"
	@echo "DOJO_TOKEN_SYMBOL       : ${DOJO_TOKEN_SYMBOL}"
	@echo "********************************************************************"



katana_msg:
	katana --messaging anvil.messaging.json --dev

katana_msg_slow:
	katana --messaging anvil.messaging.json --dev --block-time 5000

build:
	sozo build

migrate: build
	sozo migrate ${PARAMS} --name ${WORLD_NAME} --wait --legacy

initialize:
	./scripts/initialize.sh

migrate_and_init: migrate initialize


grant_ownership:
	./scripts/grant_ownership.sh

revoke_ownership:
	./scripts/revoke_ownership.sh


