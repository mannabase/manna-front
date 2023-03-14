const Manna = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "BURNER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MINTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const ClaimManna = [
	{
		"type": "constructor",
		"stateMutability": "nonpayable",
		"inputs": [
			{
				"type": "address",
				"name": "brightidAddr",
				"internalType": "address"
			},
			{
				"type": "address",
				"name": "mannaAddr",
				"internalType": "address"
			}
		]
	},
	{
		"type": "event",
		"name": "OwnershipTransferred",
		"inputs": [
			{
				"type": "address",
				"name": "previousOwner",
				"internalType": "address",
				"indexed": true
			},
			{
				"type": "address",
				"name": "newOwner",
				"internalType": "address",
				"indexed": true
			}
		],
		"anonymous": false
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "approveToken",
		"inputs": [
			{
				"type": "address",
				"name": "tokenAddr",
				"internalType": "address"
			},
			{
				"type": "address",
				"name": "spender",
				"internalType": "address"
			},
			{
				"type": "uint256",
				"name": "amount",
				"internalType": "uint256"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "address",
				"name": "",
				"internalType": "contract IMannaBrightID"
			}
		],
		"name": "brightid",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			}
		],
		"name": "checkPeriod",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "claim",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			}
		],
		"name": "claimPeriod",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "bool",
				"name": "",
				"internalType": "bool"
			}
		],
		"name": "isRegistered",
		"inputs": [
			{
				"type": "address",
				"name": "addr",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "bool",
				"name": "",
				"internalType": "bool"
			}
		],
		"name": "isVerified",
		"inputs": [
			{
				"type": "address",
				"name": "addr",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			}
		],
		"name": "lastClaim",
		"inputs": [
			{
				"type": "address",
				"name": "",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "address",
				"name": "",
				"internalType": "contract IManna"
			}
		],
		"name": "mannaToken",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			}
		],
		"name": "maxClaimable",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "address",
				"name": "",
				"internalType": "address"
			}
		],
		"name": "owner",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "register",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "renounceOwnership",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "setBrightID",
		"inputs": [
			{
				"type": "address",
				"name": "addr",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "setCheckPeriod",
		"inputs": [
			{
				"type": "uint256",
				"name": "checkPeriod_",
				"internalType": "uint256"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "setClaimPeriod",
		"inputs": [
			{
				"type": "uint256",
				"name": "claimPeriod_",
				"internalType": "uint256"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "setMannaToken",
		"inputs": [
			{
				"type": "address",
				"name": "addr",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "setMaxClaimable",
		"inputs": [
			{
				"type": "uint256",
				"name": "maxClaimable_",
				"internalType": "uint256"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			}
		],
		"name": "toClaim",
		"inputs": [
			{
				"type": "address",
				"name": "addr",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "transferOwnership",
		"inputs": [
			{
				"type": "address",
				"name": "newOwner",
				"internalType": "address"
			}
		]
	}
]

const MannaBrightID = [
	{
		"type": "constructor",
		"stateMutability": "nonpayable",
		"inputs": [
			{
				"type": "address",
				"name": "_verifier",
				"internalType": "address"
			},
			{
				"type": "bytes32",
				"name": "_app",
				"internalType": "bytes32"
			},
			{
				"type": "bytes32",
				"name": "_verificationHash",
				"internalType": "bytes32"
			}
		]
	},
	{
		"type": "event",
		"name": "AppSet",
		"inputs": [
			{
				"type": "bytes32",
				"name": "_app",
				"internalType": "bytes32",
				"indexed": false
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "OwnershipTransferred",
		"inputs": [
			{
				"type": "address",
				"name": "previousOwner",
				"internalType": "address",
				"indexed": true
			},
			{
				"type": "address",
				"name": "newOwner",
				"internalType": "address",
				"indexed": true
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "VerificationHashSet",
		"inputs": [
			{
				"type": "bytes32",
				"name": "verificationHash",
				"internalType": "bytes32",
				"indexed": false
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "Verified",
		"inputs": [
			{
				"type": "address",
				"name": "addr",
				"internalType": "address",
				"indexed": true
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "VerifierAdded",
		"inputs": [
			{
				"type": "address",
				"name": "verifier",
				"internalType": "address",
				"indexed": false
			}
		],
		"anonymous": false
	},
	{
		"type": "event",
		"name": "VerifierRemoved",
		"inputs": [
			{
				"type": "address",
				"name": "verifier",
				"internalType": "address",
				"indexed": false
			}
		],
		"anonymous": false
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "addVerifier",
		"inputs": [
			{
				"type": "address",
				"name": "_verifier",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "bytes32",
				"name": "",
				"internalType": "bytes32"
			}
		],
		"name": "app",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "bool",
				"name": "",
				"internalType": "bool"
			}
		],
		"name": "isVerified",
		"inputs": [
			{
				"type": "address",
				"name": "addr",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "address",
				"name": "",
				"internalType": "address"
			}
		],
		"name": "owner",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "removeVerifier",
		"inputs": [
			{
				"type": "address",
				"name": "_verifier",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "renounceOwnership",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "setApp",
		"inputs": [
			{
				"type": "bytes32",
				"name": "_app",
				"internalType": "bytes32"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "setVerificationHash",
		"inputs": [
			{
				"type": "bytes32",
				"name": "_verificationHash",
				"internalType": "bytes32"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "transferOwnership",
		"inputs": [
			{
				"type": "address",
				"name": "newOwner",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "bytes32",
				"name": "",
				"internalType": "bytes32"
			}
		],
		"name": "verificationHash",
		"inputs": []
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "uint256",
				"name": "",
				"internalType": "uint256"
			}
		],
		"name": "verificationTime",
		"inputs": [
			{
				"type": "address",
				"name": "addr",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "uint256",
				"name": "time",
				"internalType": "uint256"
			},
			{
				"type": "bool",
				"name": "isVerified",
				"internalType": "bool"
			}
		],
		"name": "verifications",
		"inputs": [
			{
				"type": "address",
				"name": "",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "view",
		"outputs": [
			{
				"type": "bool",
				"name": "",
				"internalType": "bool"
			}
		],
		"name": "verifiers",
		"inputs": [
			{
				"type": "address",
				"name": "",
				"internalType": "address"
			}
		]
	},
	{
		"type": "function",
		"stateMutability": "nonpayable",
		"outputs": [],
		"name": "verify",
		"inputs": [
			{
				"type": "address",
				"name": "addr",
				"internalType": "address"
			},
			{
				"type": "uint256",
				"name": "timestamp",
				"internalType": "uint256"
			},
			{
				"type": "uint8",
				"name": "v",
				"internalType": "uint8"
			},
			{
				"type": "bytes32",
				"name": "r",
				"internalType": "bytes32"
			},
			{
				"type": "bytes32",
				"name": "s",
				"internalType": "bytes32"
			}
		]
	}
]

export default { Manna, ClaimManna, MannaBrightID }