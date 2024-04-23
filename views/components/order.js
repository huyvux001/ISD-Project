function Orders({orders}){
    return `
        ${orders.map(order => `
            <div class="order">
                <p class="order-time">${order.order_buyDate}</p>
                <p class="order-id" data-order-id = ${order.order_id} data-order-popup>Order #${order.order_code}</p>
                <div class="order-props">
                    <div class="order-prop">Total: ${order.order_amount}</div>
                    <div class="order-prop">Price: ${order.order_cost}</div>
                    <div class="order-prop">State: ${order.shipment_process}</div>
                </div>
            </div>

            <div class="order">
                <p class="order-time">${order.order_buyDate}</p>
                <p class="order-id" data-order-popup data-order-id = ${order.order_id} >Order #${order.order_code}</p>
                <div class="order-props">
                    <div class="order-prop">Total: ${order.order_amount}</div>
                    <div class="order-prop">Price: ${order.order_cost}</div>
                    <div class="order-prop">State: ${order.shipment_process}</div>
                </div>
            </div>
        `)}
    `
}

export default Orders