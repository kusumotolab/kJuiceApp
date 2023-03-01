package io.github.haur514.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import lombok.Data;

@Data
@Entity
@Table(name="memberImage")
public class MemberImageEntity {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private String id;

    @Column(name="name")
    private String name;

    @Column(name="type")
    private String type;

    @Lob
    @Type(type="org.hibernate.type.BinaryType")
    @Column(name="data")
    private byte[] data;


}
