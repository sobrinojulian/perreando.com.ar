<template>
  <br><br><br>
  <footer class="footer bg-dark text-light">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <p>&copy; 2023 Paseo de Mascotas. Todos los derechos reservados.</p>
        </div>
        <div class="col-md-6 text-md-right">
          <ul class="list-inline">
            <li class="nav-item active">
            <RouterLink to="/" class="nav-link" href="#">
              Inicio
            </RouterLink>
          </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px; /* Ajusta la altura según tus necesidades */
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
}
</style>
