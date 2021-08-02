import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(food) {
    axios.post('/update-cart', food).then(res => {
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 2000,
            text: 'Item Added to Cart',
            progressBar: false,
            layout: 'bottomRight'
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 2000,
            text: 'Unable to Add Item in Cart',
            progressBar: false,
            layout: 'bottomRight'
        })
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let food = JSON.parse(btn.dataset.food)
        updateCart(food)
        console.log(food)
    })
})