package io.github.haur514.member;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import io.github.haur514.entity.MemberEntity;

@SpringBootTest
public class MemberListTest {
    private List<MemberEntity> memberEntityList = new ArrayList<>();
    // 下処理
    @BeforeEach
    public void preprocess(){
        // テスト用データを作成しています．
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setName("h-yosiok");
        memberEntity.setDisplayName("Yoshioka");
        memberEntity.setUmpayedAmount(10000);
        memberEntity.setAttribute("m1");
        memberEntity.setActive(true);
        memberEntityList.add(memberEntity);

        MemberEntity memberEntity2 = new MemberEntity();
        memberEntity2.setName("hogepoge");
        memberEntity2.setDisplayName("HOGEPOGE");
        memberEntity2.setUmpayedAmount(12300);
        memberEntity2.setAttribute("m2");
        memberEntity2.setActive(true);
        memberEntityList.add(memberEntity2);
    }

    @Test
    public void testGetMemberNameList(){
        String[] expectedAsArray = {"h-yosiok","hogepoge"};
        List<String> expected = Arrays.asList(expectedAsArray);
        
        MemberList memberList = new MemberList(memberEntityList);
        List<String> actual = memberList.getMemberNameList();

        assertEquals(expected,actual);
    }

    
}
