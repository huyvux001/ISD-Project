const container = document.querySelector('.home-container');
import UserCards from '../components/UserCard.js';
import UserDetail from '../components/UserDetail.js';
import UserInfor from '../components/UserInfor.js';
const addUser = document.querySelector('[data-add-user]');

async function loadUserMenu() {
	container.innerHTML = '';
	return new Promise(async (resolve, reject) => {
		const res = await fetch('http://localhost:8000');
		const users = await res.json();
		resolve(users);
	})
		.then((users) => {
			container.innerHTML = UserCards({ users: users });
		})
		.then(() => {
			const userNodes = document.querySelectorAll(
				'.customer-card'
			);
			userNodes.forEach((userNode) => {
				const button =
					userNode.querySelector('[data-button');
				const id = button.dataset.id;

				button.onclick = async () => {
					await loadDetail({ id });
				};
			});
		});
}

async function loadDetail({ id }) {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(
			'http://localhost:8000/details/' + id
		);
		const user = await res.json();
		resolve(user);
	})
		.then((user) => {
			container.innerHTML = UserDetail({ user });
			return true;
		})
		.then(() => {
			const backButton =
				document.querySelector('.button-abc');
			backButton.onclick = async () => {
				await loadUserMenu();
			};
		});
}

function loadUserForm() {
	addUser.onclick = () => {
		container.innerHTML = UserInfor();

		const backButton =
			document.querySelector('[data-back]');
		const confirmButton = document.querySelector(
			'[data-confirm]'
		);
		backButton.onclick = async () => await loadUserMenu();

		/* Send form */
		confirmButton.onclick = async () => await sendForm();
	};
}

async function sendForm() {
	const name = document.querySelector('[data-name]');
	const email = document.querySelector('[data-email]');
	const phone = document.querySelector('[data-phone]');
	const address = document.querySelector('[data-address]');
	const bank = document.querySelector('[data-bank]');
	const cc = document.querySelector('[data-cc]');
	const username = document.querySelector(
		'[data-username]'
	);
	const password = document.querySelector(
		'[data-password]'
	);

	console.log(name.value);

	await fetch('http://localhost:8000/addCustomer', {
		method: 'post',
		body: JSON.stringify({
			name: name.value,
			phone: phone.value,
			email: email.value,
			address: address.value,
			bank: bank.value,
			cc: cc.value,
			username: username.value,
			password: password.value,
		}),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
	});
}

await loadUserMenu();
loadUserForm();
