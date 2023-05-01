package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.BillEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.BillRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.MemberRepository;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.exceptions.NoSuchMemberException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BillService {

  @Autowired private BillRepository billRepository;
  @Autowired private MemberRepository memberRepository;

  public List<BillEntity> findAllBills() {
    return billRepository.findAll();
  }

  public BillEntity postBill(String issuerId) throws NoSuchMemberException {
    if (!memberRepository.existsById(issuerId)) throw new NoSuchMemberException();
    BillEntity newBill = new BillEntity(issuerId);
    return billRepository.save(newBill);
  }
}
