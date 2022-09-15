import {
	DerivativeRegEvent,
	TokenRegEvent,
	TokenMintEvent,
	TokenBurnEvent,
	Derivative,
	Project,
	Token
} from '../generated/Interfaces';

import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
export async function handleDerivativeRegEvent(params : DerivativeRegEvent) {
	//TODO: Implement
	let derivative = await Derivative.load(params.derivativetoken.toBase58());
	if (derivative == null){
		derivative = new Derivative();
		derivative.derivativeToken = params.derivativetoken.toBase58();
		derivative.baseToken = params.basetoken.toBase58();
		derivative.timestamp = params.timestamp.toString();
		derivative.derivativeInitializer = params.derivativeinitializer.toBase58();
		derivative.tokenHolders = "";
	}
	await derivative.save();

	let project = await Project.load(params.basetoken.toBase58());
	if (project != null){
		let derivatives = project.derivatives.toString();
		if (derivatives.includes(",")) {
			let derivatives_list = derivatives.split(",");
			if (!derivatives_list.includes(params.derivativetoken.toBase58())){
				derivatives_list.push(params.derivativetoken.toBase58());
				project.derivatives = derivatives_list.toString();
			}
		} else if(derivatives.length === 0){
			project.derivatives = params.derivativetoken.toBase58();
		} else {
			project.derivatives = derivatives + "," + params.derivativetoken.toBase58();
		}
	}
	await project.save();
}

export async function handleTokenRegEvent(params : TokenRegEvent) {
	//TODO: Implement
	let project = await Project.load(params.tokenmint.toBase58());
	if (project == null){
		project = new Project();
		project.tokenMint = params.tokenmint.toBase58();
		project.name = params.name.toString();
		project.description = params.desc.toString();
		project.tokenDecimal = params.tokendecimal;
		project.tokenOwner = params.tokenowner.toBase58();
		project.derivatives = "";
	}
	await project.save();
}

export async function handleTokenMintEvent(params : TokenMintEvent) {
	//TODO: Implement
	let id = params.basetoken.toBase58() + "-" + params.derivativetoken.toBase58() + "|" + params.receiver.toBase58();
	let token = await Token.load(id);
	if (token == null) {
		token = new Token();
		token.id = id;
		token.basetoken = params.basetoken.toBase58();
		token.amount = 0;
		token.receiver = params.receiver.toBase58();
		token.derivativetoken = params.receiver.toBase58();
		token.burnedAmount = 0;
	}
	let prev_amount = new BN(token.amount);
	token.amount = prev_amount.add(new BN(params.amount)).toString(10);
	await token.save();

	let derivative = await Derivative.load(params.derivativetoken.toBase58());
	if (derivative != null){
		let tokenHolders_ = derivative.tokenHolders.toString();
		if (tokenHolders_.includes(",")) {
			let tokenHolders_list = tokenHolders_.split(",");
			if (!tokenHolders_list.includes(params.receiver.toBase58())){
				tokenHolders_list.push(params.receiver.toBase58());
				derivative.tokenHolders = tokenHolders_.toString();
			} 
		} else if(tokenHolders_.length === 0){
			derivative.tokenHolders = params.receiver.toBase58();
		} else {
			derivative.tokenHolders = tokenHolders_ + "," + params.receiver.toBase58();
		}
	}
	await derivative.save();
}

export async function handleTokenBurnEvent(params : TokenBurnEvent) {
	//TODO: Implement
	let id = params.basetoken.toBase58() + "-" + params.derivativetoken.toBase58() + "|" + params.receiver.toBase58();
	let token = await Token.load(id);
	if (token == null) {
		token = new Token();
		token.id = id;
		token.basetoken = params.basetoken.toBase58();
		token.amount = 0;
		token.receiver = params.receiver.toBase58();
		token.derivativetoken = params.receiver.toBase58();
		token.burnedAmount = 0;
	}
	let prev_amount = new BN(token.amount);
	token.amount = (prev_amount.sub(new BN(params.amount))).toString(10);

	let prev_burn_amount = new BN(token.burnedAmount);
	token.burnedAmount = (prev_burn_amount.add(new params.amount)).toString(10);
	await token.save();
}

