package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.stats.member.responsebody;

import java.util.List;

public record MemberStatResponseBody(
    int totalAmount, int totalCount, List<StatisticsOnMemberPurchase> statistics) {}
