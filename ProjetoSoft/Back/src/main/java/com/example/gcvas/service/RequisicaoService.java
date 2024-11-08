package com.example.gcvas.service;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gcvas.models.Requisicao;
import com.example.gcvas.repositories.RequisicaoRespository;

import jakarta.transaction.Transactional;

@Service
public class RequisicaoService {
    
        @Autowired
        RequisicaoRespository requisicaoRespository;

        public List<Requisicao> findAll() {
            return requisicaoRespository.findAll();
        }

public Requisicao findByid(Long id) {

       Optional<Requisicao> obj = this.requisicaoRespository.findById(id);

        if(obj.isPresent()){
            return obj.get();
        }
        throw new RuntimeException("Requisição não encontrada {id:"+id+"} ");
    }

    @Transactional
public Requisicao create(Requisicao obj){
        obj.setId(null);

       return  this.requisicaoRespository.save(obj);
    }

    @Transactional
    public Requisicao update(Requisicao newObj){

        Requisicao obj =  this.findByid(newObj.getId());
  
        obj.setDesc_req(newObj.getDesc_req());
        obj.setStatus(newObj.getStatus());

          return this.requisicaoRespository.save(obj);
  
      }

      public void deleteByid(Long id){
        try {
            this.requisicaoRespository.deleteById(id);
        } catch (Exception e) {
        }
    }

    

}

