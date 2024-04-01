function UserDetail({user}){
    const customer = user.customer;
    const orders = user.orders;
    return `
        <div class="user-detail">
            <h2>Thông tin liên hệ khách hàng</h2>

            <div class="user-detail__content">
                <div class="block">
                    <div class="prop">Name:</div>
                    <div class="value">${customer.customer_name}</div>
                </div>
                <div class="block">
                    <div class="prop">Email</div>
                    <div class="value">q${customer.customer_email}</div>
                </div>
                <div class="block">
                    <div class="prop">Phone:</div>
                    <div class="value">${customer.customer_phoneNumber}</div>
                </div>
                <div class="block">
                    <div class="prop">Address:</div>
                    <div class="value">Ha Noi</div>
                </div>
            </div>
        </div>
        <button data-back class="button-abc">Back to menu</button>
    `
}

export default UserDetail;