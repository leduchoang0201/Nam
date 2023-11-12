function addProduct(){
    let maKH = document.getElementById('id').value;
    let tenKH = document.getElementById('name').value;
    let sanpham = document.getElementById('nameP').value;
    let ngayDH = document.getElementById('day').value;
    let soluong = document.getElementById('quantity').value;
    if (maKH && tenKH && sanpham && ngayDH && soluong) {
        let productList = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
        
        productList.push({
            id: maKH,
            name: tenKH,
            nameP: sanpham,
            day: ngayDH,
            quantity: soluong,
        });
        let tableContent = `<tr>
            <td>STT</td>
            <td>Mã KH</td>
            <td>Tên khách hàng</td>
            <td>Tên sản phẩm</td>
            <td>Ngày đặt hàng</td>
            <td>Số lượng</td>
            <td>Chức năng</td>
        </tr>`;

    productList.forEach((product, index) => {     
        let STT = index;
        index ++;
        tableContent += `<tr>
            <td>${index}</td>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.nameP}</td>
            <td>${product.day}</td>
            <td>${product.quantity}</td>
            <td>
                <a href= '#' onclick='deleteProduct(${STT})'>Xóa</a>
            </td>
        </tr>`
    });
    document.getElementById('list-product').innerHTML = tableContent;
        
        localStorage.setItem('product', JSON.stringify(productList));
        this.saveProduct();
        updateTable();
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("nameP").value = "";
        document.getElementById("day").value = "";
        document.getElementById("quantity").value = "";
    }
}
function saveProduct(){
    let productList = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    if(productList.lenght === 0 ){
        document.getElementById('list').style.display= 'none';
        return false;
    }
    document.getElementById('list').style.display= 'block';
   
}
function deleteProduct(STT){
    let productList = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    productList.splice(STT,1);
    localStorage.setItem('product', JSON.stringify(productList));
    saveProduct();
    updateTable();
}
function updateTable() {
    let productList = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    let tableContent = `<tr>
        <td>STT</td>
        <td>Mã KH</td>
        <td>Tên khách hàng</td>
        <td>Tên sản phẩm</td>
        <td>Ngày đặt hàng</td>
        <td>Số lượng</td>
        <td>Chức năng</td>
    </tr>`;

    productList.forEach((product, index) => {
        let STT = index;
        index++;
        tableContent += `<tr>
            <td>${index}</td>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.nameP}</td>
            <td>${product.day}</td>
            <td>${product.quantity}</td>
            <td>
                <a href= '#' onclick='deleteProduct(${STT})'>Xóa</a>
            </td>
        </tr>`;
    });
    document.getElementById('list-product').innerHTML = tableContent;
}
function searchID(){
    let searchID = document.getElementById('search').value.toLowerCase();
    let product = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')) : [];
    let allRows = document.querySelectorAll('#list-product tr');
    allRows.forEach(row => row.classList.remove('found'));
    let foundRow = null;
    product.forEach((product, index) => {
        if (product.id === searchID) {
            foundRow = index + 2; 
        }
        
    });

    if (foundRow !== null) {
        let row = document.querySelector(`#list-product tr:nth-child(${foundRow})`);
        row.classList.add('found');
        console.log(row.classList);
    }
}
function initPage() {
    updateTable();
    saveProduct();
}
window.addEventListener('load', initPage);
