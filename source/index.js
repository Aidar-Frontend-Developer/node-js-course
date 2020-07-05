import { pipeline } from 'stream';
import { promisify } from 'util';

// import Ui from './task-1/Ui';
// import Guardian from './task-1/Guardian';
// import AccountManager from './task-1/AccountManager';

// import {
// 	uiOptions,
// 	guardianOptions,
// 	accountManagerOptions,
// } from './task-1/config';

import Ui from './task-2/Ui';
import Guardian from './task-2/Guardian';
import AccountManager from './task-2/AccountManager';

import {
	uiOptions,
	guardianOptions,
	accountManagerOptions,
} from './task-2/config';

const customers = [
	{
		name: 'Pitter Black',
		email: 'pblack@email.com',
		password: 'pblack_123',
	},
	{
		name: 'Oliver White',
		email: 'owhite@email.com',
		password: 'owhite_456',
	},
];

const ui = new Ui(customers, uiOptions);
const guardian = new Guardian(guardianOptions);
const manager = new AccountManager(accountManagerOptions);
const pipelineAsync = promisify(pipeline);

async function run() {
	await pipelineAsync(
		ui,
		guardian,
		manager,
	);
}

run()
	.then(() => {
		console.log('Stream Done');
	})
	.catch(
		(error) => {
			console.error(error);
		},
	);
