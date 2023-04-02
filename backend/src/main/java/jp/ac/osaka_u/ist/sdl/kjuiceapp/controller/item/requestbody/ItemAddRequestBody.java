package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.requestbody;

public record ItemAddRequestBody(String id, int sellingPrice, int costPrice, String group) {}
