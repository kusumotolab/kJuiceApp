package io.github.haur514.controller.item;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.haur514.controller.item.requestbody.ItemAddRequestBody;
import io.github.haur514.controller.item.requestbody.ItemDeleteBody;
import io.github.haur514.controller.item.requestbody.ItemSetActivityBody;
import io.github.haur514.controller.item.requestbody.ItemUpdateBody;
import io.github.haur514.entity.ItemEntity;
import io.github.haur514.repository.ItemRepository;
import io.github.haur514.service.ItemService;


@RestController
@EnableAutoConfiguration
public class ItemController {
    @Autowired
    ItemService itemService;

    @Autowired
    ItemRepository itemRepository;

    
    @RequestMapping("/item")
    public String getItemList(
       @RequestParam(name="grouping",defaultValue="") String grouping
    ){
       return itemService.getItemList(grouping);
    }

    @PostMapping("/item/add")
    @ResponseBody
    public String addItemList(
        @RequestBody ItemAddRequestBody itemAddRequestBody
    ){
        int int_sellingPrice = Integer.parseInt(itemAddRequestBody.sellingprice);
        int int_costPrice = Integer.parseInt(itemAddRequestBody.costprice);
        return itemService.addItem(itemAddRequestBody.name,int_sellingPrice,int_costPrice,itemAddRequestBody.grouping);
    }

    @PostMapping("/item/delete")
    @ResponseBody
    public String deleteItem(
        @RequestBody ItemDeleteBody itemDeleteBody
    ){
        return itemService.deleteItem(itemDeleteBody.name);
    }

    @PostMapping("/item/update")
    @ResponseBody
    public String updateItem(
        @RequestBody ItemUpdateBody itemUpdateBody
    ){
        return itemService.updateItem(
            itemUpdateBody.name,
            itemUpdateBody.sellingPrice,
            itemUpdateBody.costPrice,
            itemUpdateBody.grouping,
            itemUpdateBody.salesFigure);
    }


    @PostMapping
    @RequestMapping("/item/ranking")
    public String getItemRanking(){
        return itemService.getItemRanking();
    }

    @PostMapping("/item/setactivity")
    @ResponseBody
     public String setMemberActivity(
        @RequestBody ItemSetActivityBody itemSetActivityBody){
        ItemEntity itemEntity= itemService.findByName(itemSetActivityBody.id);
        itemEntity.setActive(itemSetActivityBody.activity);
        itemRepository.save(itemEntity);
        return "success";
     }

    

}
