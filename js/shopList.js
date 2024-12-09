totalPrice = 0;
let productCount = 0;
let price;
document.getElementById('totalPrice').innerHTML = totalPrice;

function addItem() {
    productCount++;
    let item = document.getElementById('item').value;
    price = +document.getElementById('price').value;
    if (item === '' || price === '') {
        alert('Both fields must be filled if you want to add the item to the list.');
        return;
    }
    if (isNaN(price) || price <= 0) {
        alert('Please enter a valid price, greater than 0');
        return;
    }
    document.getElementById('products').innerHTML += `<tr><td>${productCount}</td><td>${item}</td><td> ${price} </td><td><button class="btn btn-warning btn-sm" onclick="deleteItem(this, ${price})" id="btnDelete">Delete</button></td></tr>`;
    totalPrice += price;
    document.getElementById('totalPrice').innerHTML = totalPrice + '\u20aa';
    document.getElementById('item').value = "";
    document.getElementById('price').value = "";

}

function deleteItem(button, price) {
    let row = button.closest('tr');
    row.parentNode.removeChild(row);
    totalPrice -= price;
    document.getElementById('totalPrice').innerHTML = totalPrice;
}



