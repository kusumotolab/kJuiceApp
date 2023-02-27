package io.github.haur514.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import io.github.haur514.repository.SalesRepository;

@RestController
@EnableAutoConfiguration
public class SalesController {

    @Autowired
    SalesRepository salesRepository;

     @RequestMapping("/sales")
     public String getChat(){
        return new Gson().toJson(salesRepository.findAll());
     }
}
