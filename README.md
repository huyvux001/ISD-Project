Note 14/4/2024
  - **1 vài phần add to front end** (cần xem xét lại)
      + Có thêm 1 button ở **details** nhưng class của 2 "Edit Customer" và "Back to menu" đang là **"button-abc"**
      + Có **components/UserTrashCard.js** (là UserCard nhưng thêm **<span>${user.deleted_at}</span>**)
      + **components/popUp** (Có **ctinue=true**, để khi bỏ trống ko điền field nào trong form add customer sẽ hiện popup và ấn countinue để bỏ popup ấy đi) - **chưa đc**
      + function **loadUserForm()**, **sendForm** đang trả về **true hoặc false** để đưa ra popup - **chưa tối ưu**
      + trong **Trash**, khi hiện **details của customer** bị xóa, **bỏ nút edit customer**
  - **Edit Customer**
      + Update tất cả hoặc 1 phần thông tin
      + Done testing with Postman
  - **Function edit Customer**
      + Khi ấn vào customer's details có button edit customer
      + Hiện ra trang chỉnh sửa như trang details
      + Chỉ chỉnh sửa thông tin name, email, phone, citizenID
      + Hiển thị 4 thông tin được mờ trên 1 form (vẫn hiển thị thông tin active account và đơn hàng nhma ko đc chỉnh sửa)
      + Có nút back to menu và OK
      + Khi chỉnh sửa, ấn OK hiện popup "Customer() updated successfully" và trở về details của người đó
      + Nếu ko điền thông tin nào sẽ hiện popup 
