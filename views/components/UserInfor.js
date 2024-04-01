function UserInfor() {
	return `
        <div class="user-infor">
            <div class="form-user">
                <div class="form-user__group">
                    <label for="fullName">Full name: </label>
                    <input name="fullName" type="text" data-name placeholder="Name">
                </div>

                <div class="form-user__group">
                    <label for="phone">Phone number: </label>
                    <input name="phone" type="text" data-phone placeholder="Phone number">
                </div>

                <div class="form-user__group">
                    <label for="address">Address: </label>
                    <input name="address" type="text" data-address placeholder="Address">
                </div>

                <div class="form-user__group">
                    <label for="CCCD">CCCD: </label>
                    <input name="CCCD" type="text" data-cc placeholder="CCCD">
                </div>

                <div class="form-user__group">
                    <label for="bank">Bank account: </label>
                    <input name="bank" type="text" data-bank placeholder="Bank account">
                </div>

                <div class="form-user__group">
                    <label for="email">Email: </label>
                    <input name="email" type="text" data-email placeholder="Email">
                </div>

                <div class="form-user__group">
                    <label for="username">Username: </label>
                    <input name="username" type="text" data-username placeholder="Username">
                </div>

                <div class="form-user__group">
                    <label for="password">Password: </label>
                    <input name="password" type="password" data-password placeholder="Password">
                </div>
            </div>


            <div class="user-infor__control">
                <button data-back>Back</button>
                <button data-confirm>Confirm</button>
            </div>
        </div>

    `;
}

export default UserInfor
