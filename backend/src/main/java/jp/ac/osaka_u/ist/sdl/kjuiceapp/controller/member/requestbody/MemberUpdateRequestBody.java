package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.requestbody;

import java.util.Optional;

public record MemberUpdateRequestBody(
    Optional<String> name, Optional<String> attribute, Optional<Boolean> active) {}
