import React from 'react'

export default function Payment() {
    const handleSubmit = () => {
        var cus_name = "Tafsir"
        var cus_email = "taf@sir.com"
        var amount = 33

        var apikey = '640c53e3f41df'; //Your Api Key
        var clientkey = '640c53e400f4f'; //Your Client Key
        var secretkey = '47803468'; //Your Secret Key

        var success_url = 'https://ctafsiras.vercel.app/success';
        var cancel_url = 'http://localhost:3000/cancel';
        var hostname = 'https://ctafsiras.vercel.app/';

        const data = {
            api: apikey,
            client: clientkey,
            secret: secretkey,
            amount: amount,
            position: hostname,
            success_url: success_url,
            cancel_url: cancel_url,
            cus_name: cus_name,
            cus_email: cus_email
        };

        fetch("https://pay.edokanpay.com/checkout.php", {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json).then(data => console.log(data))


    }
    return (
        <div>

            <input type="text" placeholder="Enter your full name" required id="full_name" />
            <br />

            <input type="email" placeholder="Enter your email" required id="email_add" />
            <br />

            <input type="number" value="200" required id="amount" />
            <br />

            <input className='btn' onClick={handleSubmit} type="submit" name="submit" value="Pay Now" />

        </div>
    )
}
