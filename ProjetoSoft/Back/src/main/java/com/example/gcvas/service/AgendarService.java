package com.example.gcvas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gcvas.models.Agendar;
import com.example.gcvas.repositories.AgendarRepository;

import jakarta.transaction.Transactional;

@Service
public class AgendarService {

    @Autowired
    AgendarRepository agendarRepository;


    public List<Agendar> findAll() {
        return agendarRepository.findAll();
    }
    
     public Agendar findByid(Long id) {

       Optional<Agendar> obj = this.agendarRepository.findById(id);

        if(obj.isPresent()){
            return obj.get();
        }
        throw new RuntimeException("Agendamento não encontrado {id:"+id+"} ");
    }

    @Transactional
    public Agendar create(Agendar obj){
        obj.setId(null);

       return  this.agendarRepository.save(obj);
    }

    @Transactional
    public Agendar update(Agendar newObj){

        Agendar obj =  this.findByid(newObj.getId());

        obj.setSetor(newObj.getSetor());
        obj.setHora(newObj.getHora());
  
          return this.agendarRepository.save(obj);
  
      }

      public void deleteByid(Long id){
        try {
            this.agendarRepository.deleteById(id);
        } catch (Exception e) {
        }
    }

}