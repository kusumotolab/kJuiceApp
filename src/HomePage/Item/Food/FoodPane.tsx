import React from "react";
import './FoodPane.css';
import ItemCard from "../../../component/ItemCard";
import LogoCocaCora from "../../../image/logo_coca_cora.jpeg";

const food_list = ["PotatoChips","Rice","Pasta","Dagashi"];
function FoodPane(props){
    return(
        <div className="FoodPane">
            <div className="Category">Food</div>
            <div className="FoodPane-flex">
            {food_list.map((food) => {
                return(
                <ItemCard
                    color={props.selected?"#121258":"#FFC039"}
                    onClick={() => {
                        props.setValue(food);
                        props.setPopUpVisivility(true);
                    }}
                    name = {food}
                    imgSrc = {LogoCocaCora}
                    width = "100px"
                />
                )
            })}
            
            </div>
        </div>
    );
}

export default FoodPane;