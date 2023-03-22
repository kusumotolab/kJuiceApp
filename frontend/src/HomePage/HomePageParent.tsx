import { useEffect, useState } from "react";
import ItemPane from "./Item/ItemPane";
import MemberPane from "./Member/MemberPane";
import styled from "styled-components";
import { Backend } from "util/Backend";

const fetchMemberList = async (setMemberList) =>{
    const memberList = await Backend.getMemberList();

    if (memberList === null){
        console.error("fetchMemberList: failed");
        return;
    } 

    setMemberList(memberList.filter((member) => member.active));
}

const fetchItemList = async (setJuiceList,setFoodList) => {
    const itemList = await Backend.getItemList();

    if (itemList === null) {
        console.error("fetchItemList: failed");
        return;
    }

    setJuiceList(itemList.filter((item) => item.active && item.grouping === "juice"));
    setFoodList(itemList.filter((item) => item.active && item.grouping === "food"));
}

function memberFindByName(memberList,searchName){
    memberList.map((member) => {
        if(member.name == searchName){
            return member;
        }
    })
    return {name:"",displayName:"",umpayedAmount:0,attribute:"",active:true};
}

function HomePageParent(){
    const [selectedMemberId, setSelectedMemberId] = useState("");
    const [selectedMember, setSelectedMember] = useState({name:"",displayName:"",umpayedAmount:0,attribute:"",active:true});
    const [selectedItem,setSelectedItem] = useState(null);
    const [memberList,setMemberList] = useState([]);
    const [juiceList,setJuiceList] = useState([]);
    const [foodList,setFoodList] = useState([]);

    const [update,setUpdate] = useState(false);

    // 再レンダリング用のトリガとして利用するステート
    // もう少し賢い実装がありそうなので，TODO としておく
    // TODO
    const [sumPurchased,setSumPurchased] = useState(0);

    useEffect(() => {
        fetchMemberList(setMemberList);
        fetchItemList(setJuiceList,setFoodList);
        setSelectedMember(memberFindByName(memberList,selectedMember.name));
    },[sumPurchased])

    return(
        <HomePageParentPane>
            <MemberPane 
                selectedMember={selectedMember}
                setSelectedMember={setSelectedMember}
                memberList={memberList}/>
            <ItemPane
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                juiceList={juiceList}
                update={update}
                setUpdate={setUpdate}
                foodList={foodList}
                selectedMemberId={selectedMemberId}
                selectedMember={selectedMember}
                setSumPurchased={setSumPurchased}
                sumPurchased={sumPurchased}/>
        </HomePageParentPane>
    );
}

const HomePageParentPane = styled.div`
display: flex;
`

export default HomePageParent;
