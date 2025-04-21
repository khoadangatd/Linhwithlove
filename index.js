document.addEventListener("DOMContentLoaded", () => {
  console.log("Document loaded!");
  const letters = document.querySelectorAll(".letter");
  const lettersContainer = document.querySelector(".letters");
  let zIndexCounter = 10;

  const shuffledThings = Array.from(letters).reverse();

  shuffledThings.forEach((letter) => {
    lettersContainer.appendChild(letter);
    const center =
      document.querySelector(".cssletter").offsetWidth / 2 -
      letter.offsetWidth / 2;
    letter.style.left = `${center}px`;

    function isOverflown(element) {
      return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      );
    }

    if (!isOverflown(letter)) {
      letter.classList.add("center");
    }
    let offsetX, offsetY;
    letter.addEventListener("mousedown", (e) => {
      if (e.target.tagName !== "BUTTON") {
        const rect = e.target.getBoundingClientRect();

        letter.style.position = "fixed";
        letter.style.left = `${rect.left}px`;
        letter.style.top = `${rect.top}px`;

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        letter.style.zIndex = zIndexCounter++;
        const moveAt = (posX, posY) => {
          letter.style.left = `${posX - offsetX}px`;
          letter.style.top = `${posY - offsetY}px`;
        };
        const onMouseMove = (moveEvent) =>
          moveAt(moveEvent.clientX, moveEvent.clientY);
        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }
    });
  });

  document.querySelector("#openEnvelope").addEventListener("click", () => {
    document.querySelector(".envelope").classList.add("active");
  });

  console.log(document, "document");
  const closeButtons = document.querySelectorAll(".closeLetter");
  closeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const letter = e.target.closest(".letter");
      if (letter) {
        letter.style.display = "none";
      }
    });
  });

  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart-icon");

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";

    heart.innerText = "💗";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5000);
  }

  setInterval(createHeart, 300);
});
