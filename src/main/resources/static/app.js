/* global Stomp, message */

var app = (function () {

    var nombreJugador="NN";
    
    var stompClient = null;
    var gameid = 0;
    var palabra ;
    var wsconnect= function () {
            var socket = new SockJS('/stompendpoint');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);

                //subscriptions
                stompClient.subscribe('/topic/wupdate.'+gameid, function (eventbody) {
                    palabra=JSON.stringify(eventbody.body);
                    $("#palabra").html(palabra);
                    var hangmanWordAttempt = {word: palabra, username: nombreJugador};
                    enviarpalabra(hangmanWordAttempt);
                    
                });
                stompClient.subscribe('/topic/winner.'+gameid, function (data) {
                    var nombre=JSON.stringify(data.body);
                    $("#ganador").text("<h1>Ganador" + nombre + "</h1>");
                    $("#estatusact").text("<h1> Terminado.</h1>");
                
                });
            
            });

        };
    function enviarpalabra(hangmanWordAttempt) {
        var id = gameid;
        jQuery.ajax({
            url: "/hangmangames/" + id + "/wordattempts",
            type: "POST",
            data: JSON.stringify(hangmanWordAttempt),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function () {
                //
            }
        });
    }
    return {
        loadJugador: function () {

            var idjugador = $("#playerid").val();
            
            $.get("/users/"+idjugador+"/loadUser",
                    function (data) {
                        nombreJugador=data.name;
                        $("#nombrej").html(data.name);
                        document.getElementById('imagenj').src=data.photoUrl;
                    }
            ).fail(
                    function (data) {
                        alert(data["responseText"]);
                    }
            );
        },
        loadWord: function () {
            
            gameid = $("#gameid").val();
            
            $.get("/hangmangames/" + gameid +"/currentword",
                    function (data) {
                        $("#palabra").html("<h1>" + data + "</h1>");
                        wsconnect();
                    }
            ).fail(
                    function (data) {
                        alert(data["responseText"]);
                    }
            );
        },
        sendLetter: function () {

            var id = gameid;

            var hangmanLetterAttempt = {letter: $("#caracter").val(), username: nombreJugador};

            console.info("Gameid:"+gameid+",Sending v2:"+JSON.stringify(hangmanLetterAttempt));


            var promesa=jQuery.ajax({
                url: "/hangmangames/" + id + "/letterattempts",
                type: "POST",
                data: JSON.stringify(hangmanLetterAttempt),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function () {
                    
                }
            });
            promesa.then(
                    function(){
                        var hangmanWordAttempt = {word: palabra, username: nombreJugador};
                     enviarpalabra(hangmanWordAttempt);
                    }
                    );
            return promesa;

        },

        sendWord: function () {
            
            var hangmanWordAttempt = {word: $("#adivina").val(), username: nombreJugador};
            if ($("#adivina").val() !=="") {
                enviarpalabra(hangmanWordAttempt);
            }
            else{
                alert("Palabra Invalida");
            }
        }

    };

})();

