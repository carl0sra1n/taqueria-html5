var arrayMenu = [];
var arrayPedido = [];

function getMenu()
{
    $.ajax({
        type: "GET",
        url: "assets/php/funciones.php",
        data: {
            opc: "getMenu"
        },
        success: function(data)
        {
            try 
            {
                respuesta = JSON.parse(data);
                arrayMenu = respuesta;

                var htmlContenido = "";
                $("#contendorMenu").html(htmlContenido);
                for(var i = 0; i < respuesta.length; i++)
                {
                    htmlContenido += "<div class=\"card\" style=\"width: 7rem;\">";
                    htmlContenido += "<img class=\"card-img-top\" src=\"" + respuesta[i].imagen + "\" alt=\"img_menu\">";
                    htmlContenido += "<div class=\"card-body\">";
                    htmlContenido += "<p class=\"card-text\">" + respuesta[i].nombre + "</p>";
                    htmlContenido += "<p class=\"card-text\"><button type=\"button\" class=\"btn btn-sm btn-success\" onclick=\"addPedido(" + respuesta[i].id + ", '" + respuesta[i].nombre + "', " + respuesta[i].precio + ")\"><i class=\"fas fa-shopping-cart\"></i> $" + respuesta[i].precio + "</button></p>";
                    htmlContenido += "</div>";
                    htmlContenido += "</div>";
                }
                $("#contendorMenu").append(htmlContenido);
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
}

function addPedido(in_id, in_nombre, in_precio)
{
    var pedido = {
        id: in_id,
        nombre: in_nombre,
        precio: in_precio
    };

    arrayPedido.push(pedido)

    for(var i = 0; i < arrayPedido.length; i++)
    {
        
    }

    Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      }).fire({
        icon: 'success',
        title: 'Se agregó un ' + in_nombre + ' a tu pedido'
      });


}

getMenu();