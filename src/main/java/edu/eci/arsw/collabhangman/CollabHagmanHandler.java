/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.collabhangman;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 *
 * @author estudiante
 */
@Controller
public class CollabHagmanHandler {
 
    @Autowired 
    SimpMessagingTemplate msgt ;
    
    
    @MessageMapping("/app")
    public void system() throws Exception {
        System.out.println("Recibido un evento");
    }
}
