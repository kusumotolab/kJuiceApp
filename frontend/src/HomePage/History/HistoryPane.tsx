import { useEffect, useState } from "react";
import HistoryCard from "./card/HistoryCard";
import styled from "styled-components";
import { History } from "types";
import { Backend } from "util/Backend";

const fetchHistoryData = async (selectedMemberId: string,setHistories) =>{
    if(selectedMemberId===""){
        setHistories([]);
        return;
    }

    const histories = await Backend.getUserHistory(selectedMemberId);

    if (histories === null) {
        console.error("fetchHistoryData: failed");
        return;
    }

    setHistories(histories);
}

function HistoryPane({
    selectedMember
}){

    const [histories, setHistories] = useState<History[]>([]);

    useEffect(() => {
        fetchHistoryData(selectedMember.name,setHistories);
    },[selectedMember])

    const updateHistory = () =>{
        fetchHistoryData(selectedMember.name,setHistories);
    }
    
    return(
        <MainHistoryPane>
            <CategoryName>購入履歴</CategoryName>
            {histories.map(history=>
                <HistoryCard 
                    history={history}
                    updateHistory={updateHistory}
                    key={history.id}/>
            )}
        </MainHistoryPane>
    );
}

const MainHistoryPane = styled.div`
    width:100%;
    border: solid 1px black;
    overflow-y:scroll;
    overflow-x:hidden;
`
const CategoryName = styled.div`
    background-color: #303030;
    color:greenyellow;
    font-weight: bold;
    font-size:2em;
`

export default HistoryPane;
