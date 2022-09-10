import {
	U64Event,
	StringEvent,
	PubkeyEvent,
	U8Event,
	NormalEntity,
	AdvanceEntity
} from '../generated/Interfaces';

import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
export async function handleU64Event(params : U64Event) {
	//TODO: Implement
	console.log("HANDLEU64EVENT REACHED !!!!!!!!!")
	console.log(params.data);
	let norment =  await NormalEntity.load(params.data.toNumber());
	if (norment == null) {
		norment = new NormalEntity();
		norment.Uid = params.data.toNumber();
	}

	let advment =  await AdvanceEntity.load(params.data.toNumber());
	if (advment == null) {
		advment = new AdvanceEntity();
		advment.Uid = params.data.toNumber();
	}
	await norment.save();
	await advment.save();
}

export async function handleStringEvent(params : StringEvent) {
	//TODO: Implement
	console.log(params.uid);
	let norment =  await NormalEntity.load(params.uid.toNumber());
	if (norment == null) {
		norment = new NormalEntity();
		norment.Uid = params.uid.toNumber();
	}
	norment.svalue = params.data;

	let advment =  await AdvanceEntity.load(params.uid.toNumber());
	if (advment == null) {
		advment = new AdvanceEntity();
		advment.Uid = params.uid.toNumber();
	}
	if (advment.svalue == null) {
		advment.svalue = params.data;
	} else {
		advment.svalue += params.data;
	}
	await norment.save();
	await advment.save();
}

export async function handlePubkeyEvent(params : PubkeyEvent) {
	//TODO: Implement
	let norment =  await NormalEntity.load(params.uid.toNumber());
	if (norment == null) {
		norment = new NormalEntity();
		norment.Uid = params.uid.toNumber();
	}
	norment.keyvalue = params.data.toBase58();

	let advment =  await AdvanceEntity.load(params.uid.toNumber());
	if (advment == null) {
		advment = new AdvanceEntity();
		advment.Uid = params.uid.toNumber();
	}
	advment.keyvalue = params.data.toBase58();
	await norment.save();
	await advment.save();
}

export async function handleU8Event(params : U8Event) {
	//TODO: Implement
	let norment =  await NormalEntity.load(params.uid.toNumber());
	if (norment == null) {
		norment = new NormalEntity();
		norment.Uid = params.uid.toNumber();
	}
	norment.u8value = params.data;
	norment.combvalue = norment.svalue+norment.keyvalue+params.data.toString()

	let advment =  await AdvanceEntity.load(params.uid.toNumber());
	if (advment == null) {
		advment = new AdvanceEntity();
		advment.Uid = params.uid.toNumber();
	}
	if (advment.u8value == null) {
		advment.u8value = params.data;
	} else {
		advment.u8value += params.data;
	}
	await norment.save();
	await advment.save();
}

