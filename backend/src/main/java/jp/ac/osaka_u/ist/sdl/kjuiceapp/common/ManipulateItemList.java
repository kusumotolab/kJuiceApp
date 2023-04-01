package jp.ac.osaka_u.ist.sdl.kjuiceapp.common;

import com.google.gson.Gson;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.ItemEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.common.data.ItemRanking;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class ManipulateItemList {

  public String getItemRanking(List<ItemEntity> itemEntityList) {
    return new Gson().toJson(setItemRanking(itemEntityList));
  }

  public List<ItemRanking> setItemRanking(List<ItemEntity> itemEntities) {
    List<ItemRanking> itemRankings = new ArrayList<>();
    sortItemEntityBySalesFigure(itemEntities);
    int old_unpayedAmount = -1;
    int nextRank = 1;
    int nextRankSupprement = 1;
    for (ItemEntity itemEntity : itemEntities) {
      if (old_unpayedAmount == -1) {
        old_unpayedAmount = itemEntity.getSalesFigure();
        itemRankings.add(new ItemRanking(itemEntity.getName(), nextRank));
      } else if (old_unpayedAmount == itemEntity.getSalesFigure()) {
        itemRankings.add(new ItemRanking(itemEntity.getName(), nextRank));
        nextRankSupprement++;
      } else {
        nextRank += nextRankSupprement;
        nextRankSupprement = 1;
        old_unpayedAmount = itemEntity.getSalesFigure();
        itemRankings.add(new ItemRanking(itemEntity.getName(), nextRank));
      }
    }
    return itemRankings;
  }

  /**
   * unpayedAmountに従った降順ランクづけ
   *
   * @param itemEntities
   */
  public void sortItemEntityBySalesFigure(List<ItemEntity> itemEntities) {
    Collections.sort(
        itemEntities,
        new Comparator<ItemEntity>() {
          @Override
          public int compare(ItemEntity me1, ItemEntity me2) {
            return me2.getSalesFigure() - me1.getSalesFigure();
          }
        });
  }
}
