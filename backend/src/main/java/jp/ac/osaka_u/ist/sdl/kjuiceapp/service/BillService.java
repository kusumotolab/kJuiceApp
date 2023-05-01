package jp.ac.osaka_u.ist.sdl.kjuiceapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jp.ac.osaka_u.ist.sdl.kjuiceapp.entity.BillEntity;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.repository.BillRepository;

@Service
@Transactional
public class BillService {

    @Autowired private BillRepository billRepository;

    public List<BillEntity> findAllBills(){
        return billRepository.findAll();
    }

    public BillEntity postBill(String issuerId){
        BillEntity newBill = new BillEntity(issuerId);
        return billRepository.save(newBill);
    }
}
