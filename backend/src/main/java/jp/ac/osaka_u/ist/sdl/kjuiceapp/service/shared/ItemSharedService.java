package jp.ac.osaka_u.ist.sdl.kjuiceapp.service.shared;

import java.util.List;
import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemSharedService {
  @Autowired ItemRepository itemRepository;

  // active = trueの場合，アクティブな商品のみを取得
  // active = falseの場合，全商品を取得
  public List<ItemEntity> getMembers(Optional<Boolean> active) {
    return itemRepository.findAll().stream()
        .filter(l -> l.isActive() || !active.orElse(false))
        .toList();
  }
}
