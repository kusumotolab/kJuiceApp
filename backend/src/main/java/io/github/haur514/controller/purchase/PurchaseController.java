package io.github.haur514.controller.purchase;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import io.github.haur514.controller.purchase.requestbody.PurchaseData;
import io.github.haur514.entity.ItemEntity;
import io.github.haur514.entity.MemberEntity;
import io.github.haur514.repository.ItemRepository;
import io.github.haur514.repository.MemberRepository;
import io.github.haur514.repository.SalesRepository;
import io.github.haur514.service.HistoryService;
import io.github.haur514.service.ItemService;
import io.github.haur514.service.MemberService;
import io.github.haur514.service.SalesService;

@RestController
public class PurchaseController {
    @Autowired HistoryService historyService;
    @Autowired ItemService itemService;
    @Autowired MemberService memberService;

    @Autowired ItemRepository itemRepository;
    @Autowired MemberRepository memberRepository;

    @Autowired SalesRepository salesRepository;
    @Autowired SalesService salesService;


    @PostMapping("/purchase")
    public String purchaseItem(
        @RequestBody PurchaseData purchaseData
    ){
        String name = purchaseData.name;
        String item = purchaseData.item;

        ItemEntity purchasedItem = itemRepository.findByName(item);
        if(purchasedItem == null){
            return "Item failed";
        }
        MemberEntity purchasedMember = memberRepository.findByName(name);
        if(purchasedMember == null){
            return "Member failed";
        }
        int price = purchasedItem.getSellingPrice();
        
        if(!canPurchase(name, item, price)){
            return "Purchase failed";
        }

        historyService.insertHistory(name,item,price);
        itemService.purchased(item);
        memberService.purchased(name,price);
        // salesDBの更新
        salesService.updateSales(name, new Date(), price);
        
        return new Gson().toJson("success");
    }

    // 購入処理を進める前に，購入が可能かどうかを判定する．
    public boolean canPurchase(String name,String item,int price){
        // 入力された名前が名簿に登録済みか
        if(!memberService.isRegistered(name)){
            return false;
        }
        // 購入しようとしている商品が登録積みか
        if(!itemService.isRegistered(item)){
            return false;
        }
        return true;
    }
}
