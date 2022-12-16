import React, {useState, useEffect} from "react";
import axios from "axios";

function DataFetching() {
    const [receipts, setReceipts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/receipt/')
            .then(res => {
                console.log(res)
                setReceipts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        
            <ul>
                {
                    receipts.map(receipt => <li key={receipt.id}>{receipt.store}<br/> -{receipt.items}</li>)
                }
            </ul>
        
    )
}

export default DataFetching