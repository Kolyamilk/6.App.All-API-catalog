import { useState, useEffect } from "react"
import axios from 'axios'
const URL = 'https://api.ipify.org?format=json'
const GetIPAdress = () => {
    const [IP, setIP] = useState()
    function handleClick() {
        axios.get(URL)
            .then(response => {
                
                setIP(response.data.ip)
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <main className="main">
            <header>
                <h1>Ваш IP адрес</h1>
            </header>
            <div className="image">
            </div>
            <div className="btn">
                <button onClick={handleClick}>Показать</button>
                <h2>{IP}</h2>
            </div>
        </main>
    )
}
export default GetIPAdress