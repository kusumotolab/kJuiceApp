package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.purchase.responsebody;

public record PurchaseResponseBody(
    int historyId,
    String memberId,
    String memberName,
    String itemId,
    String itemName,
    int price,
    String date) {}
