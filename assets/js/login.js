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
                                        console.log("presion boton");
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
                        alert(xhr.responseText);
                    }
                });
            }, 2500);
        }
    }
});