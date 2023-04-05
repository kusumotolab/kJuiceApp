package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.requestbody;

import java.util.Optional;

public record ItemUpdateRequestBody(
    String name,
    Optional<Integer> sellingPrice,
    Optional<Integer> costPrice,
    Optional<String> group,
    Optional<Boolean> isActive) {}
