package io.github.haur514.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.haur514.entity.MemberImageEntity;


public interface MemberImageRepository extends JpaRepository<MemberImageEntity, String>{
    public MemberImageEntity findByName(String name);
}
