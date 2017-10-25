/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.collabhangman.restcontrollers;

import edu.eci.arsw.collabhangman.services.GameServices;
import edu.eci.arsw.collabhangman.services.GameServicesException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author hcadavid
 */
@RestController
@RequestMapping("/users")
public class UsersResourceController {
    @Autowired
    GameServices gameServices;
    
    @Autowired
    SimpMessagingTemplate msmt;
    
    @RequestMapping(method = RequestMethod.GET)
    public String test(){
        return "Ok";
    }
    
    @RequestMapping(path = "/{idjug}/loadUser", method = RequestMethod.GET)
    public ResponseEntity<?> getjugador(@PathVariable Integer idjug){
        try {    
            return new ResponseEntity<>(gameServices.loadUserData(idjug),HttpStatus.ACCEPTED);
        } catch (GameServicesException ex) {
            return new ResponseEntity<>(ex.getLocalizedMessage(),HttpStatus.NOT_FOUND);
        }
    }
    
    
}
