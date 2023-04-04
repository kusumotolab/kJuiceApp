package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Entity
@Data
@Setter(AccessLevel.NONE)
@NoArgsConstructor(access = AccessLevel.PRIVATE) // for JPA
@Table(name = "member_image")
public class MemberImageEntity {
  @Id
  @Column(name = "member_id")
  private String memberId;

  @NonNull
  @Column(name = "media_type")
  private String mediaType;

  @NonNull @Lob private byte[] image;

  public MemberImageEntity(String memberId, String mediaType, byte[] image) {
    this.memberId = memberId;
    this.mediaType = mediaType;
    this.image = image;
  }

  public void setImage(String mediaType, byte[] image) {
    this.mediaType = mediaType;
    this.image = image;
  }
}
