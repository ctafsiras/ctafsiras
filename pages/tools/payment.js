import React from 'react'

export default function Payment() {
    const handleSubmit = () => {
        fetch("https://pay.edokanpay.com/checkout.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                api: "640c53e3f41df",
                client: "640c53e400f4f",
                secret: "47803468",
                amount: 200,
                position: "https://ctafsiras.vercel.app",
                success_url: "https://ctafsiras.vercel.app/success",
                cancel_url: "https://ctafsiras.vercel.app/cancel",
                cus_name: "Tafsir",
                cus_email: "tafsr@mail.com"
            })
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }
    return (
        <div>


            <input type="number" value="200" required id="amount" />
            <br />

            <input className='btn' onClick={handleSubmit} type="submit" name="submit" value="Pay Now" />

        </div>
    )
}
