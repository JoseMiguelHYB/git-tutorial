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


// Script para quizzes ------------------------------------------------------
document.addEventListener("click", e => {
  if (e.target.classList.contains("quiz-btn")) {
    const btn = e.target;
    const targetId = btn.dataset.target;  // ej: quiz-feedback-1 o quiz-feedback-2
    const feedback = document.getElementById(targetId);

    if (!feedback) return;

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





/* -------------------
   Frases aleatorias en topbar
------------------- */
const frases = [
  "Controla tus versiones, controla tu proyecto 🚀",
  "Un commit al día mantiene los bugs a raya 🐛",
  "Git es tu máquina del tiempo ⏳",
  "Colaborar en GitHub es construir en equipo 🤝",
  "Los repositorios cuentan tu historia 📖",
  "Un buen commit explica más que mil líneas de código ✍️",
  "Con Git, cada error es reversible 🔄",
  "El branching es tu mejor amigo en el caos 🌱",
  "Sincroniza, colabora y evoluciona en GitHub 🌍",
  "Cada push es un paso hacia adelante 📤"
];

function cambiarFrase() {
  const quote = document.getElementById("gitQuote");
  const random = Math.floor(Math.random() * frases.length);
  quote.textContent = frases[random];
}
cambiarFrase();
setInterval(cambiarFrase, 5000);

/* -------------------
   Buscador de comandos
------------------- */
const form = document.getElementById("topSearch");
const input = document.getElementById("topSearchInput");
const sidebarLinks = document.querySelectorAll(".sidebar a[data-page]");
const inicioLink = document.querySelector('nav a[href="index.html"]'); // 👈 ya lo tienes arriba, lo reutilizamos

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = input.value.trim().toLowerCase();

  // Limpiar estados previos
  sidebarLinks.forEach(link => link.classList.remove("active"));
  if (inicioLink) inicioLink.classList.remove("active"); // 👈 desactivar Inicio

  if (query === "") return;

  let resultados = [];

  // Buscar coincidencias
  sidebarLinks.forEach(link => {
    if (link.textContent.toLowerCase().includes(query)) {
      resultados.push(link);
      link.classList.add("active"); // resaltar
    }
  });

  if (resultados.length > 0) {
    // Scroll hacia el primer resultado
    resultados[0].scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    alert("❌ No se encontraron comandos con: " + query);
  }
});

