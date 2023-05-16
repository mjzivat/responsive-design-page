import {menuArray} from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


let cartArray = []
const checkout = document.getElementById('checkout')
const paymentModal = document.getElementById('payment-modal')
const payForm = document.getElementById('pay-form')

function getMenuHtml() {
    let menuHtml = ``
    
    menuArray.forEach(function(item){
        menuHtml += `
                <div class="menu-item flex" id="menu-item">
                    <div class="flex">
                        <span class="item-img">${item.emoji}</span>
                        <div class="item-details flex">
                            <span class="item-name">${item.name}</span>
                            <span class="item-description">${item.ingredients}</span>
                            <span class="item-price">$${item.price}</span>
                        </div>
                    </div>
                    <div>
                        <i class="fa-regular fa-plus add-btn" data-add="${item.id}"></i>
                    </div>
                </div>
                `
    })
    
    return menuHtml
}

function getCheckoutHtml() {
    let checkoutHtml = ``
    
    cartArray.forEach(function(item){
         checkoutHtml += `
            <div class="checkout-details flex" id="checkout-details">
                <div class="checkout-item flex">
                    <span class="item-name">${item.name}</span>
                    <button class="remove-btn" id="remove-btn" 
                    data-remove="${item.uuid}">remove</button>
                </div>
                <div>
                <span class="item-price">$${item.price}</span>
                </div>
            </div>
        `
    })
    
    return checkoutHtml
}

function calcTotalPrice() {
    let totalPrice = 0
    let totalPriceHtml = ``
    
    cartArray.forEach(function(item){
        totalPrice += item.price
    })
    
    totalPriceHtml = `
    $${totalPrice}
    `
    
    return totalPriceHtml
}

document.addEventListener('click', function(e){
    
    if (e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    } else if (e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    } else if (e.target.id === 'comp-order-btn') {
        handleCompOrderBtnClick()
    }
})

function handleAddClick(itemId) {
    const item = menuArray.filter(function(item){
        return item.id === itemId
    })[0]
    
    cartArray.push({
        name: item.name,
        ingredients: item.ingredients,
        price: item.price,
        emoji: item.emoji,
        id: item.id,
        uuid: uuidv4(),
    })
    
    
    renderCheckout()
    renderTotalPrice()
    
}

function handleRemoveClick(itemUuid) {
    cartArray = cartArray.filter(function(item){
        return item.uuid !== itemUuid
    })
    
    
    
    renderCheckout()
    renderTotalPrice()
    
}

function handleCompOrderBtnClick() {
    paymentModal.style.display = 'inline'
}

payForm.addEventListener('submit', function(e) {
    e.preventDefault()
    
    const payFormData = new FormData(payForm)
    const userName = payFormData.get('userName')
    
    paymentModal.style.display = 'none'
    
    document.getElementById('container').innerHTML = `
    <div class="order-complete">
        <span>
            Thanks, ${userName}! Your order is on its way!
        </span>
    </div>
    `
})

function renderMenu() {
    document.getElementById("menu").innerHTML = getMenuHtml()
}

function renderCheckout(){
    document.getElementById('checkout-cart').innerHTML = getCheckoutHtml()
    
    if (cartArray.length) {
        checkout.style.display = 'inline'
    } else {
        checkout.style.display = 'none'
    }
}

function renderTotalPrice() {
    document.getElementById('total-price').innerHTML = calcTotalPrice()
}

renderMenu()