package io.github.haur514.repository;

import io.github.haur514.entity.MemberImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberImageRepository extends JpaRepository<MemberImageEntity, String> {
  public MemberImageEntity findByName(String name);
}
