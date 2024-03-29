package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.requestbody.ItemAddRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.requestbody.ItemUpdateRequestBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.responsebody.ItemResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemImageEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.ItemService;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.DuplicateIdException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchItemException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/items")
public class ItemsController {
  @Autowired private ItemService itemService;

  @GetMapping
  public List<ItemResponseBody> getItems(
      @RequestParam(required = false) Optional<String> category,
      @RequestParam(required = false) Optional<Boolean> active) {
    // TODO isActiveによるフィルタ
    // TODO パラメータバリデーション

    if (category.isPresent()) {
      return itemService.getItems(category.get()).stream().map(ItemsController::convert).toList();
    } else {
      return itemService.getAllItems().stream().map(ItemsController::convert).toList();
    }
    // 400
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ItemResponseBody addItem(@RequestBody ItemAddRequestBody item) {
    ItemEntity result;
    try {
      result =
          itemService.addItem(
              item.id(), item.name(), item.sellingPrice(), item.costPrice(), item.category());
    } catch (DuplicateIdException e) {
      throw new ResponseStatusException(HttpStatus.CONFLICT);
    } catch (IllegalArgumentException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    return ItemsController.convert(result);
  }

  @PatchMapping("{id}")
  public ItemResponseBody updateItem(
      @PathVariable String id, @RequestBody ItemUpdateRequestBody item) {
    // TODO パラメータバリデーション
    ItemEntity result;
    try {
      result =
          itemService.updateItem(
              id,
              item.name().orElse(null),
              item.sellingPrice().orElse(null),
              item.costPrice().orElse(null),
              item.category().orElse(null),
              item.active().orElse(null));
    } catch (NoSuchItemException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return ItemsController.convert(result);
  }

  @DeleteMapping("{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteItem(@PathVariable String id) {
    try {
      itemService.deleteItem(id);
    } catch (NoSuchItemException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return;
  }

  @GetMapping("{id}/image")
  public ResponseEntity<InputStreamResource> getItemImage(@PathVariable String id) {
    Optional<ItemImageEntity> image;
    try {
      image = itemService.getItemIcon(id);
    } catch (NoSuchItemException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    if (image.isPresent()) {
      return ResponseEntity.ok()
          .contentType(MediaType.valueOf(image.get().getMediaType()))
          .body(new InputStreamResource(new ByteArrayInputStream(image.get().getImage())));
    } else {
      return ResponseEntity.noContent().build();
    }
  }

  @PutMapping("{id}/image")
  public void setItemImage(@PathVariable String id, @RequestPart MultipartFile image) {
    try {
      itemService.storeItemIcon(id, image.getContentType(), image.getBytes());
    } catch (NoSuchItemException e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    } catch (IOException e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return;
  }

  private static ItemResponseBody convert(ItemEntity origin) {
    return new ItemResponseBody(
        origin.getId(),
        origin.getName(),
        origin.getSellingPrice(),
        origin.getCostPrice(),
        origin.getCategory(),
        origin.isActive());
  }
}
