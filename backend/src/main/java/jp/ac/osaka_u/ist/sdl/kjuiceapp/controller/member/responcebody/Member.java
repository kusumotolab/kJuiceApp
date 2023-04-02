package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.member.responcebody;

public record Member(String id, String name, int unpaidAmount, String attiribute, boolean active) {}
