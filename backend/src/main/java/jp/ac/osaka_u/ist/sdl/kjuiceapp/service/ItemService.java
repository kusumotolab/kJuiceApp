package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.ItemRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.DuplicateIdException;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchItemException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ItemService {
  @Autowired ItemRepository itemRepository;

  public List<ItemEntity> getAllItems() {
    return itemRepository.findAll();
  }

  public List<ItemEntity> getItems(String group) {
    return itemRepository.findByGroup(group);
  }

  public ItemEntity addItem(String id, String name, int sellingPrice, int costPrice, String group)
      throws DuplicateIdException {
    if (itemRepository.existsById(id)) {
      throw new DuplicateIdException();
    }

    boolean defaultActive = false;

    ItemEntity itemEntity = new ItemEntity(id, name, sellingPrice, costPrice, group, defaultActive);
    return itemRepository.save(itemEntity);
  }

  public void updateItem(
      String id, String name, Integer sellingPrice, Integer costPrice, String group, Boolean active)
      throws NoSuchItemException {
    ItemEntity target = itemRepository.findById(id).orElseThrow(NoSuchItemException::new);

    if (name != null) target.setName(name);
    if (sellingPrice != null) target.setSellingPrice(sellingPrice);
    if (costPrice != null) target.setCostPrice(costPrice);
    if (group != null) target.setGroup(group);
    if (active != null) target.setActive(active);

    itemRepository.save(target);
    return;
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
}
