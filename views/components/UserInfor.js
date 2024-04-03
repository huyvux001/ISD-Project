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
                    <label for="CCCD">CCCD: </label>
                    <input name="CCCD" type="text" data-cc placeholder="CCCD">
                </div>

                <div class="form-user__group">
                    <label for="email">Email: </label>
                    <input name="email" type="text" data-email placeholder="Email">
                </div>

                <div class="form-user__group">
                    <label for="customerType">Customer Type: </label>
                    <select name="customerType" data-type>
                        <option value="CN">Personal (CN)</option>
                        <option value="DN">Enterprise</option>
                        <option value="NONE">None</option>
                    </select>
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
