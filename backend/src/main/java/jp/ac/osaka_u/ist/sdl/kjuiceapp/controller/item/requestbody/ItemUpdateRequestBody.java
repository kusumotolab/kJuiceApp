package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.requestbody;

import java.util.Optional;
import java.util.OptionalInt;

public record ItemUpdateRequestBody(
    String name,
    OptionalInt sellingPrice,
    OptionalInt costPrice,
    Optional<String> group,
    Optional<Boolean> isActive) {}
