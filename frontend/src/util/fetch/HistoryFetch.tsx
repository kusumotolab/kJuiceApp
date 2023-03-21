import React, {useState, useEffect} from 'react'
import HistoryEntity from '../../entity/HistoryEntity'

const fetchHistoryData = async (setHistories) =>{
    await fetch(`${window.location.protocol}//${window.location.host}${window.location.pathname}backend/history`, {
        method: 'GET',
        mode: 'cors'
    })
    .then(res => res.json())
    .then(histories => {
        histories.map(history => {
            let history_element = new HistoryEntity(
                history.id,
                history.name,
                history.item,
                history.prince,
                history.date
            );
            setHistories([...histories,history_element]);
        })
    });
}

const HistoryFetch = () => {

    const [histories, setHistories] = useState([]);

    useEffect(() => {
        fetchHistoryData(setHistories);
    },[])

    return (
        <div>
            <ul>
                {histories.map(history => 
                    <div>{history.name}</div>
                )}
            </ul>
        </div>
    )
}

export default HistoryFetch;
