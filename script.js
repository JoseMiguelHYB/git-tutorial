// script.js
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("[data-page]");
  const contenido = document.getElementById("contenido");

  async function loadPage(url) {
    try {
      const res = await fetch(url);
      const html = await res.text();

      // Insertamos todo el contenido que venga del archivo
      contenido.innerHTML = html;
    } catch (err) {
      contenido.innerHTML = `<p class="text-danger">⚠ Error al cargar ${url}</p>`;
    }
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      if (page) loadPage(page);
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