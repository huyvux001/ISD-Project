function Products({products, pageNum, curPage}){
    /* FAKE IMAGES */
    const images = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbnNCeZGV08lUKgKWf74t70-vm_OxeMZzweA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrWHXVb-IsVs-3K0eklfmJ2xIUxyLtHgMHBg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGvn5jRZDJxT8Ix-U6LLIpqe10wJT_VVWBmg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQV9cBVUT1L1r3FGfdq1nfavGW0EgeOEx5Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjR1iYwx5Hua-qehL5cLe9PBg-VgUlsjI08w&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbnNCeZGV08lUKgKWf74t70-vm_OxeMZzweA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNBGNssDvbqqzSAUjY5gw6IyhsGzAyIIZSeQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJluSvPipucAJSA-WyH23Z0HoJV6rUz2_eIA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRplt7Vp_TgRSFQhmBqoAas34-N_H_C0-JjJA&s'
    ]
    return `
        ${products.map((p, i) => `
            <div class="el-wrapper">
                <div class="box-up">
                <img class="img" src="${images[i]}" alt="">
                <div class="img-info">
                    <div class="info-inner">
                    <span class="p-name">${p.shoes_name}</span>
                    <span class="p-company">${p.shoes_brand}</span>
                    </div>
                    <div class="a-size">Available sizes : <span class="size">${p.shoes_size}</span></div>
                </div>
                </div>

                <div class="box-down">
                <div class="h-bg">
                    <div class="h-bg-inner"></div>
                </div>

                <a class="cart" href="#">
                    <span class="price">${p.shoes_price}VND</span>
                    <span class="add-to-cart">
                    <span class="txt">Order now</span>
                    </span>
                </a>
                </div>
            </div>
        `).join('')}


        <ul class="page">

            ${Array(pageNum).fill(1).map((v, i) => (
                `<li data-page=${i+1} class="page__numbers ${curPage === i + 1 ? 'active' : ''}">${i + 1}</li>`
            )).join('')}

        </ul>
    `
}

export default Products