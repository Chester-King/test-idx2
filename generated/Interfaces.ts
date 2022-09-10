import { PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";


export interface U64Event {
	"data":BN;
	"label":string;
}

export interface StringEvent {
	"uid":BN;
	"data":string;
	"label":string;
}

export interface PubkeyEvent {
	"uid":BN;
	"data":PublicKey;
	"label":string;
}

export interface U8Event {
	"uid":BN;
	"data":number;
	"label":string;
}

export class NormalEntity {
	"Uid":number;
	"svalue":string;
	"u8value":number;
	"keyvalue":string;
	"combvalue":string;

	static async load(Uid:number) : Promise<null | NormalEntity> {
		return null;
	}

	async save() : Promise<void> {
	}
}
export class AdvanceEntity {
	"Uid":number;
	"svalue":string;
	"u8value":number;
	"keyvalue":string;

	static async load(Uid:number) : Promise<null | AdvanceEntity> {
		return null;
	}

	async save() : Promise<void> {
	}
}
