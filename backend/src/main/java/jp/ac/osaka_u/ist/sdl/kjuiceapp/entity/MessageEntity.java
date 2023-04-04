package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE) // for JPA
@Table(name = "message")
public class MessageEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Setter(AccessLevel.NONE)
  private int id;

  @NonNull private String message;

  @Column(name = "post_date")
  @NonNull
  private LocalDateTime date;

  public MessageEntity(String message) {
    this.message = message;
    this.date = LocalDateTime.now();
  }
}
