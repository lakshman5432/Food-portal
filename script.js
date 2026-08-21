const foods = [
{
name:"Burger",
price:120,
image:"burger.jpeg"
},
{
name:"Chicken Burger",
price:150,
image:"chickenBurger.jpeg"
},
{
name:"Pizza",
price:250,
image:"pizza.jpeg"
},
{
name:"Chicken Biryani",
price:220,
image:"chickenbiryani.jpeg"
},
{
name:"Veg Biryani",
price:180,
image:"vegbiryani.jpeg"
},
{
name:"Grill Chicken",
price:300,
image:"Grill.jpeg"
},
{
name:"Chocolate Cake",
price:140,
image:"chococake.jpeg"
},
{
name:"Ice Cream",
price:90,
image:"icecream.jpeg"
},
{
name:"Milk shake",
price:110,
image:"milkshake.jpeg"
},
{
name:"Drink",
price:80,
image:"drink.jpeg"
}
];

const menuContainer = document.getElementById("menu-container");
const cartItems = document.getElementById("cart-items");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayFoods(foodList){

menuContainer.innerHTML="";

foodList.forEach(food=>{

menuContainer.innerHTML += `
<div class="card">

<img src="${food.image}" alt="${food.name}">

<div class="card-content">
<h3>${food.name}</h3>

<div class="price">₹${food.price}</div>

<button onclick="addToCart('${food.name}',${food.price})">
Add To Cart
</button>

</div>

</div>
`;

});

}

function addToCart(name,price){

let existing = cart.find(item=>item.name===name);

if(existing){
existing.quantity += 1;
}
else{
cart.push({
name:name,
price:price,
quantity:1
});
}

saveCart();
}

function removeItem(index){

cart.splice(index,1);

saveCart();
}

function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();
}

function updateCart(){

cartItems.innerHTML="";

let total = 0;
let count = 0;

cart.forEach((item,index)=>{

total += item.price * item.quantity;
count += item.quantity;

cartItems.innerHTML += `
<div class="cart-item">

<div>
<b>${item.name}</b><br>
₹${item.price} × ${item.quantity}
</div>

<button onclick="removeItem(${index})">
Remove
</button>

</div>
`;

});

document.getElementById("total-price").innerText = total;
document.getElementById("cart-count").innerText = count;

}

document.getElementById("search").addEventListener("keyup",function(){

let value = this.value.toLowerCase();

let filteredFoods = foods.filter(food =>
food.name.toLowerCase().includes(value)
);

displayFoods(filteredFoods);

});

function checkout(){

if(cart.length===0){
alert("Your cart is empty!");
return;
}

alert("🎉 Order Placed Successfully!");

cart=[];

localStorage.removeItem("cart");

updateCart();

}

displayFoods(foods);
updateCart();