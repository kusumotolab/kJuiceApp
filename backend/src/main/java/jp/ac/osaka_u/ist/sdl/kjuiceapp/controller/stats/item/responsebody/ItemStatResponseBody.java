package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.stats.item.responsebody;

import javax.validation.constraints.NotEmpty;

public record ItemStatResponseBody(@NotEmpty String id, int sales) {}
