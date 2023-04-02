package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.item.responsebody;

import javax.validation.constraints.NotEmpty;

public record ItemResponseBody(
    @NotEmpty String id,
    String name,
    int sellingPrice,
    int costPrice,
    String group,
    boolean isActive,
    int salesCount) {}
