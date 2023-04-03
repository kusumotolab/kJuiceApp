package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.purchase.responsebody;

public record PurchaseResponseBody(
    int historyId,
    String userId,
    String userName,
    String itemId,
    String itemName,
    int price,
    String date) {}
