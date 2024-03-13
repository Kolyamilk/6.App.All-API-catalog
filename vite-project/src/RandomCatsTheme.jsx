import { useState, useEffect } from "react"
import axios from 'axios'
const URL = 'https://dog.ceo/api/breeds/image/random'

const RandomCatsTheme = () => {
    const [fact, setFact] = useState()
    function handleClick() {
        axios.get(URL)
            .then(response => {
                setFact(response.data.message)
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <main className="main">
            <header>
                <h1>Случайные факты про кошек</h1>
            </header>
            <div className="image">
                <img src={fact} alt="" />
            </div>
            <div className="btn">
                <button onClick={handleClick}>Показать другую собаку</button>
            </div>
        </main>
    )
}
export default RandomCatsTheme
