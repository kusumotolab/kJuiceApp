package io.github.haur514.common;

import com.google.gson.Gson;
import io.github.haur514.common.data.MemberRanking;
import io.github.haur514.entity.MemberEntity;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/** MemberListを変形させ，必要なデータを取得します． */
public class ManipulateMemberList {

  /** rankingの取得 */
  public String getMembersRanking(List<MemberEntity> memberEntityList) {
    return new Gson().toJson(setMemberRanking(memberEntityList));
  }

  public List<MemberRanking> setMemberRanking(List<MemberEntity> memberEntityList) {
    List<MemberRanking> memberRankings = new ArrayList<>();
    sortMemberEntityByUnpayedAmount(memberEntityList);
    int old_unpayedAmount = -1;
    int nextRank = 1;
    int nextRankSupprement = 1;
    for (MemberEntity memberEntity : memberEntityList) {
      if (old_unpayedAmount == -1) {
        old_unpayedAmount = memberEntity.getUmpayedAmount();
        memberRankings.add(new MemberRanking(memberEntity.getName(), nextRank));
      } else if (old_unpayedAmount == memberEntity.getUmpayedAmount()) {
        memberRankings.add(new MemberRanking(memberEntity.getName(), nextRank));
        nextRankSupprement++;
      } else {
        nextRank += nextRankSupprement;
        nextRankSupprement = 1;
        old_unpayedAmount = memberEntity.getUmpayedAmount();
        memberRankings.add(new MemberRanking(memberEntity.getName(), nextRank));
      }
    }
    return memberRankings;
  }

  /**
   * unpayedAmountに従った降順ランクづけ
   *
   * @param memberEntityList
   */
  public void sortMemberEntityByUnpayedAmount(List<MemberEntity> memberEntityList) {
    Collections.sort(
        memberEntityList,
        new Comparator<MemberEntity>() {
          @Override
          public int compare(MemberEntity me1, MemberEntity me2) {
            return me2.getUmpayedAmount() - me1.getUmpayedAmount();
          }
        });
  }
}
