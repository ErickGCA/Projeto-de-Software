package com.example.gcvas.service;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gcvas.models.Acao;
import com.example.gcvas.repositories.AcaoRepository;

import jakarta.transaction.Transactional;

@Service
public class AcaoService {
    
    @Autowired
    AcaoRepository acaoRepository;

    public List<Acao> findAll() {
        return acaoRepository.findAll();
    }

    public Acao findByid(Long id) {

       Optional<Acao> obj = this.acaoRepository.findById(id);

        if(obj.isPresent()){
            return obj.get();
        }
        throw new RuntimeException("Ação não encontrada {id:"+id+"} ");
    }

    @Transactional
    public Acao create(Acao obj){
        obj.setId(null);

       return  this.acaoRepository.save(obj);
    }

    @Transactional
    public Acao update(Acao newObj){

        Acao obj =  this.findByid(newObj.getId());

        obj.setData_hora(newObj.getData_hora());
      
  
          return this.acaoRepository.save(obj);
  
      }

      public void deleteByid(Long id){
        try {
            this.acaoRepository.deleteById(id);
        } catch (Exception e) {
        }
    }

}
