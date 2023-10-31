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
@Table(name = "item_image")
public class ItemImageEntity {
  @Id
  @Column(name = "item_id")
  private String itemId;

  @NonNull
  @Column(name = "media_type")
  private String mediaType;

  @NonNull @Lob private byte[] image;

  public ItemImageEntity(String itemId, String mediaType, byte[] image) {
    this.itemId = itemId;
    this.mediaType = mediaType;
    this.image = image;
  }

  public void setImage(String mediaType, byte[] image) {
    this.mediaType = mediaType;
    this.image = image;
  }
}
