import React from 'react'
import axios from "axios";

export default function Payment() {
    const handleSubmit = async () => {
        const data = "api=640c53e3f41df&client=640c53e400f4f&secret=47803468&position=https%3A%2F%2Fctafsiras.vercel.app&amount=33&success_url=https%3A%2F%2Fctafsiras.vercel.app&cancel_url=https%3A%2F%2Fctafsiras.vercel.app&cus_name=fsdf&cus_email=cjkj%40lkfjs.com";

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", "https://pay.edokanpay.com/checkout.php");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(data);
    }
    return (
        <div>


            <input type="number" value="200" required id="amount" />
            <br />

            <input className='btn' onClick={handleSubmit} type="submit" name="submit" value="Pay Now" />

        </div>
    )
}
