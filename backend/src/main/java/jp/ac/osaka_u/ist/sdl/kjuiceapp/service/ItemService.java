package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import com.google.gson.Gson;
import java.util.List;
import javax.transaction.Transactional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.common.ManipulateItemList;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ItemService {
  @Autowired ItemRepository itemRepository;

  public String getItemList(String grouping) {
    if (grouping.equals("")) {
      return new Gson().toJson(itemRepository.findAll());
    }
    return new Gson().toJson(itemRepository.findByGrouping(grouping));
  }

  public String addItem(String name, int sellingPrice, int costPrice, String group) {
    ItemEntity itemEntity = new ItemEntity();
    itemEntity.setName(name);
    itemEntity.setSellingPrice(sellingPrice);
    itemEntity.setCostPrice(costPrice);
    itemEntity.setGrouping(group);
    itemEntity.setSalesFigure(0);
    itemRepository.save(itemEntity);
    return "success";
  }

  // 商品が既に登録されているか
  public boolean isRegistered(String name) {
    if (itemRepository.findByName(name) == null) {
      return false;
    }
    return true;
  }

  // 商品購入時に呼び出し
  public boolean purchased(String name) {
    ItemEntity itemEntity = itemRepository.findByName(name);
    if (itemEntity == null) {
      return false;
    }
    itemEntity.setSalesFigure(itemEntity.getSalesFigure() + 1);
    itemRepository.save(itemEntity);
    return true;
  }

  // 商品取り消し時に呼び出し
  // 成功 true 失敗 false
  public boolean recalled(String name) {
    ItemEntity itemEntity = itemRepository.findByName(name);
    if (itemEntity == null) {
      return false;
    }
    itemEntity.setSalesFigure(itemEntity.getSalesFigure() - 1);
    itemRepository.save(itemEntity);
    return true;
  }

  public void updateItem(
      String name, int sellingPrice, int costPrice, String grouping, int salesFigure) {
    ItemEntity item = new ItemEntity();
    item.setName(name);
    item.setSellingPrice(sellingPrice);
    item.setCostPrice(costPrice);
    item.setGrouping(grouping);
    item.setSalesFigure(salesFigure);
    itemRepository.save(item);
    return;
  }

  public ItemEntity findByName(String name) {
    return itemRepository.findByName(name);
  }

  public String deleteItem(String name) {
    try {
      itemRepository.deleteByName(name);
      return "success";
    } catch (Exception e) {
      return "failed";
    }
  }

  public String getItemRanking() {
    List<ItemEntity> itemEntities = itemRepository.findAll();
    return new ManipulateItemList().getItemRanking(itemEntities);
  }
}
