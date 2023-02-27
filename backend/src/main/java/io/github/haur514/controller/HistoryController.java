package io.github.haur514.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import io.github.haur514.entity.HistoryEntity;
import io.github.haur514.history.HistoryList;
import io.github.haur514.history.selling.monthly.SellingOfAPersonWithinHalfYear;
import io.github.haur514.history.selling.monthly.SellingOfEachMemberInHalfYear;
import io.github.haur514.history.selling.monthly.SellingOfEachMonth;
import io.github.haur514.member.MemberList;
import io.github.haur514.service.HistoryService;
import io.github.haur514.service.MemberService;

@RestController
@EnableAutoConfiguration
public class HistoryController {

    @Autowired
    HistoryService historyService;

    @Autowired
    MemberService memberService;

    @PostMapping
    @RequestMapping("/history/add")
    public String insertHistory(
            @RequestParam("name") String name,
            @RequestParam("item") String item,
            @RequestParam("price") String price) {
        int p = Integer.parseInt(price);
        return historyService.insertHistory(name, item, p);
    }

    @PostMapping
    @RequestMapping("/history/delete")
    public String cancelHistory(@RequestParam("name") String name, @RequestParam("id") String id) {
        return historyService.removeHistory(Integer.parseInt(id), name);
    }

    @RequestMapping("/history")
    public String getHistory(@RequestParam(name = "name", defaultValue = "") String name) {
        List<HistoryEntity> historyList;
        Gson gson = new Gson();
        if (name.equals("")) {
            historyList = historyService.findAllHistory();
        } else {
            historyList = historyService.findByName(name);
        }
        return gson.toJson(historyList);
    }

    @RequestMapping("/history/eachmonth")
    public String getHistoryOfEachMonth() {
        SellingOfEachMonth sellingOfEachMonth = new SellingOfEachMonth(
                new HistoryList(historyService.findAllHistory()));
    return sellingOfEachMonth.getSellingAmountOfEachMonthAsJson();
    }

    // 過去最大6ヶ月分の料金を各月ごとに返す
    @RequestMapping("/history/billingamount")
    public String getMemberBillingAmount(
            @RequestParam(name = "name") String name) {
        // 半年以内におけるメンバーnameの購入金額を取得
        HistoryList historyList = new HistoryList(historyService.findAllHistory());
        SellingOfAPersonWithinHalfYear sellingOfEachPersonWithinHalfYear = new SellingOfAPersonWithinHalfYear(historyList,name);
        return sellingOfEachPersonWithinHalfYear.getSellingOfEachPersonWithinHalfYearAsJson();
    }

    // 年，月を指定することで，構成員全員の使用した金額を出力する．
    @RequestMapping("/history/billingamount/allmember")
    public String getBillingAmountAllMember() {
        HistoryList historyList = new HistoryList(historyService.findAllHistory());
        MemberList memberList = new MemberList(memberService.findAll());
        SellingOfEachMemberInHalfYear sellingOfEachMemberInHalfYear = new SellingOfEachMemberInHalfYear(historyList,memberList);
        return sellingOfEachMemberInHalfYear.getAsJson();
    }
}