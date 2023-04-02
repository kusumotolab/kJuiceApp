package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item;

import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.requestbody.ItemAddRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.requestbody.ItemUpdateRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.responsebody.ItemResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/items")
public class ItemsController {
  @Autowired private ItemService itemService;

  @GetMapping
  public String getItems(
      @RequestParam(required = false) Optional<String> group,
      @RequestParam(required = false) Optional<Boolean> isActive) {
    // TODO isActiveによるフィルタ
    // TODO List<Item>を返す
    // TODO パラメータバリデーション

    return itemService.getItemList(group.orElse(""));
    // 400
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ItemResponseBody addItem(@RequestBody ItemAddRequestBody item) {
    // TODO パラメータバリデーション
    String result =
        itemService.addItem(item.id(), item.sellingPrice(), item.costPrice(), item.group());

    // TODO ID重複チェック
    if (result == "failed") {
      throw new ResponseStatusException(HttpStatus.CONFLICT);
    }

    ItemEntity newItem = itemService.findByName(item.id());
    return new ItemResponseBody(
        newItem.getName(),
        newItem.getName(),
        newItem.getSellingPrice(),
        newItem.getCostPrice(),
        newItem.getGrouping(),
        newItem.isActive(),
        newItem.getSalesFigure());
  }

  @PatchMapping("{id}")
  public ItemResponseBody updateItem(
      @PathVariable String id, @RequestBody ItemUpdateRequestBody item) {
    // TODO パラメータバリデーション
    // TODO salesFigureの整合性
    // TODO nameの扱い
    if (!itemService.isRegistered(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    var oldItem = itemService.findByName(id);

    // 未指定のパラメータは同idの既存itemから引用
    // パラメータが未指定のときに既存から引っ張ってくるのはインターフェースの定義でありcontorollerがその実行責務を負う
    itemService.updateItem(
        id,
        item.sellingPrice().orElse(oldItem.getSellingPrice()),
        item.costPrice().orElse(oldItem.getCostPrice()),
        item.group().orElse(oldItem.getGrouping()),
        oldItem.getSalesFigure());

    var newItem = itemService.findByName(id);
    return new ItemResponseBody(
        newItem.getName(),
        newItem.getName(),
        newItem.getSellingPrice(),
        newItem.getCostPrice(),
        newItem.getGrouping(),
        newItem.isActive(),
        newItem.getSalesFigure());
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteItem(@PathVariable String id) {
    if (!itemService.isRegistered(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    itemService.deleteItem(id);
    return;
  }
}
