<template>
  <div class="main-container">
    <header class="py-3 bg-dark border-bottom">
      <div class="container-fluid d-grid gap-3 align-items-center" style="grid-template-columns: 1fr 2fr;">
        <div>menu</div>

        <div class="d-flex justify-content-end w-100">
          <div class="flex-shrink-0 dropdown">
            <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
            </a>
            <ul class="dropdown-menu text-small shadow" style="">
              <li><a class="dropdown-item" href="#">New project...</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <div class="content">
      <aside class="position-absolute top-0 d-flex flex-column flex-shrink-0 p-3 bg-dark h-100" style="width: 200px;">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
          <span class="fs-4">Sidebar</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="#" class="p-2 nav-link active fw-semibold" aria-current="page">
              Home
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-body-emphasis fw-semibold">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-body-emphasis fw-semibold">
              Orders
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-body-emphasis fw-semibold">
              Products
            </a>
          </li>
          <li>
            <a href="#" class="nav-link link-body-emphasis fw-semibold">
              Customers
            </a>
          </li>
        </ul>
        <hr class="border-white">
        <div class="dropdown">
          <a href="#" class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
            <strong>mdo</strong>
          </a>
          <ul class="dropdown-menu text-small shadow">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </aside>

      <router-view class="main"></router-view>
    </div>

    <footer>
      My Footer
    </footer>
  </div>
</template>

<script>

</script>

<style lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .content {
    display: flex;
    flex: 1;

    .main {
      flex: 1;
    }
  }
}
</style>