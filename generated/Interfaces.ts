import { PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";


export interface DerivativeRegEvent {
	"basetoken":PublicKey;
	"timestamp":string;
	"derivativetoken":PublicKey;
	"derivativeinitializer":PublicKey;
	"label":string;
}

export interface TokenRegEvent {
	"tokenowner":PublicKey;
	"tokenmint":PublicKey;
	"name":string;
	"desc":string;
	"tokendecimal":number;
	"label":string;
}

export interface TokenMintEvent {
	"basetoken":PublicKey;
	"amount":BN;
	"derivativetoken":PublicKey;
	"receiver":PublicKey;
	"label":string;
}

export interface TokenBurnEvent {
	"basetoken":PublicKey;
	"amount":BN;
	"derivativetoken":PublicKey;
	"receiver":PublicKey;
	"label":string;
}

export class Derivative {
	"derivativeToken":string;
	"baseToken":string;
	"timestamp":string;
	"derivativeInitializer":string;
	"tokenHolders":string;

	static async load(derivativeToken:string) : Promise<null | Derivative> {
		return null;
	}

	async save() : Promise<void> {
	}
}
export class Project {
	"tokenMint":string;
	"name":string;
	"description":string;
	"tokenOwner":string;
	"tokenDecimal":number;
	"derivatives":string;

	static async load(tokenMint:string) : Promise<null | Project> {
		return null;
	}

	async save() : Promise<void> {
	}
}
export class Token {
	"id":string;
	"basetoken":string;
	"amount":number;
	"receiver":string;
	"derivativetoken":string;
	"burnedAmount":number;

	static async load(id:string) : Promise<null | Token> {
		return null;
	}

	async save() : Promise<void> {
	}
}
