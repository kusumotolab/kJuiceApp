package io.github.haur514.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.github.haur514.entity.ItemEntity;
import io.github.haur514.entity.MemberEntity;
import io.github.haur514.repository.ItemRepository;
import io.github.haur514.repository.MemberRepository;
import io.github.haur514.service.HistoryService;
import io.github.haur514.service.ItemService;
import io.github.haur514.service.MemberService;

@RestController
public class RecallController {
    @Autowired HistoryService historyService;
    @Autowired ItemService itemService;
    @Autowired MemberService memberService;

    @Autowired ItemRepository itemRepository;
    @Autowired MemberRepository memberRepository;


    @RequestMapping("/recall")
    public String purchaseItem(
        @RequestParam("name") String name,
        @RequestParam("item") String item,
        @RequestParam("id") String id,
        @RequestParam("price") String price
    ){
        ItemEntity purchasedItem = itemRepository.findByName(item);
        if(purchasedItem == null){
            return "failed";
        }
        MemberEntity purchasedMember = memberRepository.findByName(name);
        if(purchasedMember == null){
            return "failed";
        }
        if(!canRecall(Integer.parseInt(id), name, item)){
            return "failed";
        }

        historyService.removeHistory(Integer.parseInt(id),name);
        itemService.recalled(item);
        memberService.recalled(name,Integer.parseInt(price));

        return "success";
    }

    // recall可能か判定
    public boolean canRecall(int id,String name,String item){
        // 指定されたhistoryのidは登録されており，なおかつ購入者のnameはidと一致しているか
        if(!historyService.isRegistered(id,name)){
            return false;
        }
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
