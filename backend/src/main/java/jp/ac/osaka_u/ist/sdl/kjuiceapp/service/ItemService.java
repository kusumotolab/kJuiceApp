package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemImageEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.ItemImageRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.ItemRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.DuplicateIdException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchItemException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ItemService {
  @Autowired private ItemRepository itemRepository;
  @Autowired private ItemImageRepository itemImageRepository;

  public List<ItemEntity> getAllItems() {
    return itemRepository.findAll();
  }

  public List<ItemEntity> getItems(String category) {
    return itemRepository.findByCategory(category);
  }

  public ItemEntity addItem(
      String id, String name, int sellingPrice, int costPrice, String category)
      throws DuplicateIdException {
    if (itemRepository.existsById(id)) {
      throw new DuplicateIdException();
    }

    boolean defaultActive = false;

    ItemEntity itemEntity =
        new ItemEntity(id, name, sellingPrice, costPrice, category, defaultActive);
    return itemRepository.save(itemEntity);
  }

  public ItemEntity updateItem(
      String id,
      String name,
      Integer sellingPrice,
      Integer costPrice,
      String category,
      Boolean active)
      throws NoSuchItemException {
    ItemEntity target = itemRepository.findById(id).orElseThrow(NoSuchItemException::new);

    if (name != null) target.setName(name);
    if (sellingPrice != null) target.setSellingPrice(sellingPrice);
    if (costPrice != null) target.setCostPrice(costPrice);
    if (category != null) target.setCategory(category);
    if (active != null) target.setActive(active);

    return itemRepository.save(target);
  }

  public Optional<ItemEntity> getItemById(String id) {
    return itemRepository.findById(id);
  }

  public void deleteItem(String id) throws NoSuchItemException {
    if (!itemRepository.existsById(id)) {
      throw new NoSuchItemException();
    }

    itemRepository.deleteById(id);
    return;
  }

  public void storeItemIcon(String id, String contentType, byte[] image)
      throws NoSuchItemException, IOException {
    if (!itemRepository.existsById(id)) {
      throw new NoSuchItemException();
    }

    Optional<ItemImageEntity> target = itemImageRepository.findById(id);

    ItemImageEntity newItemImageEntity;
    if (target.isPresent()) {
      newItemImageEntity = target.get();
      newItemImageEntity.setImage(contentType, image);
    } else {
      newItemImageEntity = new ItemImageEntity(id, contentType, image);
    }

    itemImageRepository.save(newItemImageEntity);
    return;
  }

  // ユーザーのアイコンをデータベースから取得する
  public Optional<ItemImageEntity> getItemIcon(String id) throws NoSuchItemException {
    if (!itemRepository.existsById(id)) {
      throw new NoSuchItemException();
    }
    return itemImageRepository.findById(id);
  }
}
