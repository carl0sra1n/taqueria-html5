$("#login-form").submit(function(e) 
{
    e.preventDefault();

    var url = $(this).attr('action');
    var form = JSON.parse(JSON.stringify($(this).serializeArray()));

    var inputCorreo = form[0].value;
    var inputPassword = form[1].value;
    
    if(inputCorreo == "" || inputCorreo == undefined)
    {
        Swal.fire({
            icon: 'error',
            title: "Por favor ingresa un correo electronico valido."
          });
    }
    else
    {
        if(inputPassword == "" || inputPassword == undefined)
        {
            Swal.fire({
                icon: 'error',
                title: "Por favor ingresa una contrase&ntilde;a"
              });
        }
        else
        {
            Swal.fire({
                title: 'Por favor espere...',
                html: 'Se est&aacute; iniciando sesi&oacute;n',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
            });
            
            setTimeout(function(){
                $.ajax({
                    type: "GET",
                    url: url,
                    data: form,
                    success: function(data)
                    {
                        try 
                        {
                            respuesta = JSON.parse(data);
                            if(parseInt(respuesta.estado) == 0)
                            {
                                Swal.fire({
                                    title: respuesta.mensaje,
                                    icon: 'success',
                                    showCancelButton: false,
                                    allowOutsideClick: false,
                                    confirmButtonText: 'Ingresar',
                                }).then((result) => {
                                    if (result.value) {
                                        window.location.replace("index.html");
                                    }
                                });
                            }
                            else
                            {
                                Swal.fire({
                                    icon: 'error',
                                    title: respuesta.mensaje
                                  });       
                            }                            
                        } catch (e) {
                            Swal.fire({
                                html: data,
                                icon: 'error',
                                title: "Ocurri&oacute; un error"
                              }); 
                        }
                    },
                    error: function(xhr, status, error)
                    {
                        Swal.fire({
                            html: xhr.responseText,
                            icon: 'error',
                            title: "Ocurri&oacute; un error"
                          });                     
                    }
                });
            }, 2500);
        }
    }
});

$("#register-form").submit(function(e) 
{
    e.preventDefault();

    var url = $(this).attr('action');
    var form = JSON.parse(JSON.stringify($(this).serializeArray()));

    var inputUsuario = form[0].value;
    var inputNombre = form[1].value;
    var inputDireccion = form[2].value;
    var inputTelefono = form[3].value;
    var inputCorreo = form[4].value;
    var inputContrasena = form[5].value;
    
    if(inputUsuario == "" || inputUsuario == undefined)
    {
        Swal.fire({
            icon: 'error',
            title: "Por favor ingresa tu usuario."
          });
    }
    else
    {
        if(inputNombre == "" || inputNombre == undefined)
        {
            Swal.fire({
                icon: 'error',
                title: "Por favor ingresa tu nombre"
              });
        }
        else
        {
            if(inputDireccion == "" || inputDireccion == undefined)
            {
                Swal.fire({
                    icon: 'error',
                    title: "Por favor ingresa tu direcci&oacute;n"
                  });
            }
            else
            {
                if(inputTelefono == "" || inputTelefono == undefined)
                {
                    Swal.fire({
                        icon: 'error',
                        title: "Por favor ingresa tu telef&oacute;no"
                      });
                }
                else
                {
                    if(inputCorreo == "" || inputCorreo == undefined)
                    {
                        Swal.fire({
                            icon: 'error',
                            title: "Por favor ingresa tu correo"
                          });
                    }
                    else
                    {
                        if(inputContrasena == "" || inputCorreo == inputContrasena)
                        {
                            Swal.fire({
                                icon: 'error',
                                title: "Por favor ingresa tu contrase&ntilde;a"
                              });
                        }
                        else
                        {
                            Swal.fire({
                                title: 'Por favor espere...',
                                html: 'Se est&aacute; registrando tu usuario...',
                                allowOutsideClick: false,
                                onBeforeOpen: () => {
                                    Swal.showLoading()
                                },
                            });
                            
                            setTimeout(function(){
                                $.ajax({
                                    type: "GET",
                                    url: url,
                                    data: form,
                                    success: function(data)
                                    {
                                        try 
                                        {
                                            respuesta = JSON.parse(data);
                                            if(parseInt(respuesta.estado) == 0)
                                            {
                                                Swal.fire({
                                                    title: respuesta.mensaje,
                                                    icon: 'success',
                                                    showCancelButton: false,
                                                    allowOutsideClick: false,
                                                    confirmButtonText: 'Ingresar',
                                                }).then((result) => {
                                                    if (result.value) {
                                                        //window.location.replace("index.html");
                                                    }
                                                });
                                            }
                                            else
                                            {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: respuesta.mensaje
                                                  });       
                                            }                            
                                        } catch (e) {
                                            Swal.fire({
                                                html: data,
                                                icon: 'error',
                                                title: "Ocurri&oacute; un error"
                                              }); 
                                        }
                                    },
                                    error: function(xhr, status, error)
                                    {
                                        Swal.fire({
                                            html: xhr.responseText,
                                            icon: 'error',
                                            title: "Ocurri&oacute; un error"
                                          });                     
                                    }
                                });
                            }, 2500);
                        }
                    }
                }
            }
        }
    }
});