// script.js
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("[data-page]");
  const contenido = document.getElementById("contenido");
  const buscador = document.getElementById("buscador"); // capturamos el buscador

  async function loadPage(url) {
    try {
      const res = await fetch(url);
      const html = await res.text();
      contenido.innerHTML = html;
    } catch (err) {
      contenido.innerHTML = `<p class="text-danger">⚠ Error al cargar ${url}</p>`;
    }
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("data-page");

      // Quitar "active" de todos los enlaces
      links.forEach(l => l.classList.remove("active"));

      // Marcar en verde el enlace clicado
      link.classList.add("active");

      if (page) {
        loadPage(page);
        buscador.style.display = "none"; // ocultar buscador al cargar un comando
      } else {
        buscador.style.display = "block"; // mostrar buscador si no hay página (ej: index)
      }
    });
  });
});


// scripto generico
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


// Contador de visitas usando localStorage
/*document.addEventListener("DOMContentLoaded", () => {
    let visitas = localStorage.getItem("visitas");
    if (visitas === null) {
        visitas = 1;
    } else {
        visitas = parseInt(visitas) + 1;
    }
    localStorage.setItem("visitas", visitas);

    document.getElementById("contador-visitas").textContent = 
        `👀 Has visitado esta página ${visitas} veces desde este navegador.`;
});*/


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
