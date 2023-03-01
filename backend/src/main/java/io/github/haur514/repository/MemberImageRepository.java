package io.github.haur514.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.haur514.entity.MemberImageEntity;


public interface MemberImageRepository extends JpaRepository<MemberImageEntity, Integer>{
    public List<MemberImageEntity> findByName(String name);
}
