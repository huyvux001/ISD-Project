const container = document.querySelector('.home-container');
import UserCards from '../components/UserCard.js';
import UserDetail from '../components/UserDetail.js';
import UserInfor from '../components/UserInfor.js';
import PopUp from '../components/popup.js';
const addUser = document.querySelector('[data-add-user]');
let body = document.querySelector('body')
async function loadUserMenu() {
	container.innerHTML = '';
	return new Promise(async (resolve, reject) => {
		const res = await fetch('http://localhost:8000/home');
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

				const removeButton = userNode.querySelector('[data-remove]');

				button.onclick = async () => {
					await loadDetail({ id });
				};

				removeButton.onclick = async () => {
					const initialHTML = body.innerHTML;
					body.innerHTML+=PopUp({
						link: false,
						isAdd: false,
						hasClose: true,
						type: 'Delete',
						title:"Delete",
						desc:'Delete the customer(' + userNode.dataset.name +').Customers in the trash will be permanently deleted after 10 days'
					})

					const closeBtn = document.querySelector('[data-popup-close]');
					const okBtn = document.querySelector('[data-ok]');
					const cancelBtn = document.querySelector('[data-cancel]');
					closeBtn.onclick = cancelBtn.onclick = async()=> {
						body.innerHTML = initialHTML;
						await loadUserMenu()
					}

					okBtn.onclick = async() => {
						const response = await fetch('http://localhost:8000/delete/'+id, {
							method: 'delete'
						});

						const data = await response.json();

						window.location.assign('http://localhost:8000/')
					}
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
		confirmButton.onclick = async () => {
			const formSubmittedSuccessfully = await sendForm();
			if (formSubmittedSuccessfully) {
				const popUpHtml = PopUp({
					title: 'You have been added',
					desc: 'You have been added a new customer successfully',
					link: true,
					type: 'Add'
				});
				body.innerHTML += popUpHtml;
			}
			else 
			{const popUpFalse = PopUp({
				title: 'Error',
				desc: 'All fields must be filled out, and a valid customer type selected.',
				ctinue: true,
				type: 'Error'
			});
			body.innerHTML += popUpFalse;
			
		}
		};
		
	};
}

async function sendForm() {
    const name = document.querySelector('[data-name]');
    const email = document.querySelector('[data-email]');
    const phone = document.querySelector('[data-phone]');
    const cc = document.querySelector('[data-cc]');
    const type = document.querySelector('[data-type]');

    if (!name.value || !email.value || !phone.value || !cc.value || type.value === 'NONE') { 
        return false; 
		
    }

    try {
        const response = await fetch('http://localhost:8000/auth', {
            method: 'POST',
            body: JSON.stringify({
                name: name.value,
                phone: phone.value,
                email: email.value,
                cc: cc.value,
                type: type.value
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error('Server responded with an error.');
        }
        return true;
    } catch (error) {
        console.error("Failed to submit form:", error);
        return false; 
}};


await loadUserMenu();
loadUserForm();