package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.requestbody;

public record ItemAddRequestBody(
    String id, String name, int sellingPrice, int costPrice, String group) {}
