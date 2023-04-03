package jp.ac.osaka_u.ist.sdl.kjuiceapp.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "purchase")
public class PurchaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_id")
    private int purchaseId;

    @Column(name = "member_id")
    private String memberId;

    @Column(name = "item_id")
    private String itemId;

    private int price;

    @Column(name = "purchase_date")
    private LocalDateTime date;
}
