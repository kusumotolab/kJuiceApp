package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "bill")
public class BillEntity {
    @Setter(AccessLevel.NONE)
    @NonNull
    @Id
    private String id;

    @Setter(AccessLevel.NONE)
    @NonNull
    @Column(name = "issuerId")
    private String issuerId;
  
    @NonNull
    @Column(name = "date")
    private String date;
}