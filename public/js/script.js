
document.addEventListener("DOMContentLoaded", function (event) {

    const inicio = async () =>{
    const socket = io();
    const notificacion = document.querySelector('#notificacion');

    const ocultar = () =>{
      setTimeout(function(){ 
        notificacion.innerHTML = ""; 
      },5000); 
    }
    
    socket.on('notificacion', data => {
      const producto = data.product.Nombre;
      const tipo = data.product.Tipo_Medicamento;
      if(data.evento === "nuevo"){
        notificacion.innerHTML = `
        <div class="row d-flex justify-content-center">
              <div class="col-md-6">
                  <div class="alert alert-success mt-5" role="alert">
                      <h4 class="alert-heading">Producto agregado!</h4>
                      <hr>
                      <p class="mb-0">Nombre: ${producto}</p>
                      <p class="mb-0">Tipo: ${tipo}</p>
                  </div>
              </div>
        </div>
        `;
      }
      if(data.evento === "eliminar"){
        notificacion.innerHTML = `
        <div class="row d-flex justify-content-center">
              <div class="col-md-6">
                  <div class="alert alert-danger mt-5" role="alert">
                      <h4 class="alert-heading">Producto eliminado!</h4>
                      <hr>
                      <p class="mb-0">Nombre: ${producto}</p>
                      <p class="mb-0">Tipo: ${tipo}</p>
                  </div>
              </div>
        </div>
        `;
      }
     
      ocultar();
    });
    
   

    }
    
    inicio();
    });