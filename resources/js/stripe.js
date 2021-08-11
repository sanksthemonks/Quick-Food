import { loadStripe } from '@stripe/stripe-js'
import { placeOrder } from './apiService'
import { CardWidget } from './CardWidget';

export async function initStripe() {
    // Payment
    const stripe = await loadStripe('pk_test_51JMTZKG8P7RMeDltVMic9zy4T501i1Zp8j0RDCyhMawpEdkdUFWI3zWV0Tbbdm66AeDhSA91JgCUNE3XE4TawzO300t8tmNiJ6');
    
    let card = null;
    
    const paymentType = document.querySelector('#paymentType');
    if(!paymentType) {
        return;
    }
    paymentType.addEventListener('change', (e) => {
        if (e.target.value === 'card') {
            // Display Widget
            card = new CardWidget(stripe)
            card.mount()
        } else {
            card.destory()
        }
    })


    // Ajax call
    const paymentForm = document.querySelector('#payment-form');
    if(paymentForm) {
        paymentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let formData = new FormData(paymentForm);
            let formObject = {}
            for(let [key, value] of formData.entries()) {
                formObject[key] = value
            }

            if (!card) {
                placeOrder(formObject);
                return;
            }

            const token = await card.createToken()
            formObject.stripeToken = token.id;
            placeOrder(formObject);
        })
    }

}