// Script principal
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("[data-page]");
  const inicioLink = document.querySelector('nav a[href="index.html"]'); // el enlace de Inicio
  const contenido = document.getElementById("contenido");
  const buscador = document.getElementById("buscador"); // capturamos el buscador

  // Función para cargar la página en el área de contenido
  async function loadPage(url) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      contenido.innerHTML = html;
    } catch (err) {
      contenido.innerHTML = `<p class="text-danger">⚠ Error al cargar ${url}</p>`;
    }
  }

  // Función para activar un enlace
  function setActive(link) {
    // Quitar "active" de todos los enlaces
    document.querySelectorAll(".sidebar a").forEach(l => l.classList.remove("active"));
    // Marcar en verde el enlace clicado
    link.classList.add("active");

    const page = link.getAttribute("data-page");
    if (page) {
      loadPage(page);
      buscador.style.display = "none"; // ocultar buscador al cargar un comando
    } else {
      buscador.style.display = "block"; // mostrar buscador si no hay página (ej: index)
    }
  }

  // Eventos de clic en los enlaces
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      setActive(link);
    });
  });

  // 🚀 Al cargar la página, activar por defecto "Inicio"
  if (inicioLink) {
    inicioLink.classList.add("active");
    buscador.style.display = "block"; // mostrar buscador en inicio
  }
});


// Script para quizzes
document.addEventListener("click", e => {
  if (e.target.classList.contains("quiz-btn")) {
    const btn = e.target;
    const feedback = document.getElementById("quiz-feedback");

    feedback.textContent = btn.dataset.feedback || "❌ Incorrecto, prueba de nuevo.";

    if (btn.dataset.correct === "true") {
      feedback.classList.add("text-success");
      feedback.classList.remove("text-danger");
    } else {
      feedback.classList.add("text-danger");
      feedback.classList.remove("text-success");
    }
  }
});


// Script para mostrar info al pasar sobre los cuadros de Git
const boxes = document.querySelectorAll('.git-box');
const infoBox = document.getElementById('gitInfo');

boxes.forEach(box => {
  box.addEventListener('mouseenter', () => {
    infoBox.textContent = box.getAttribute('data-info');
    infoBox.classList.add('show');
  });
  box.addEventListener('mouseleave', () => {
    infoBox.classList.remove('show');
    infoBox.textContent = ""; // opcional: limpiar texto
  });
});
