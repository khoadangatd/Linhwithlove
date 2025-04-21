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

    const startDrag = (x, y, rect) => {
      letter.style.position = "fixed";
      letter.style.left = `${rect.left}px`;
      letter.style.top = `${rect.top}px`;
      offsetX = x - rect.left;
      offsetY = y - rect.top;
      letter.style.zIndex = zIndexCounter++;
    };

    const moveDrag = (x, y) => {
      letter.style.left = `${x - offsetX}px`;
      letter.style.top = `${y - offsetY}px`;
    };

    // Mouse support
    letter.addEventListener("mousedown", (e) => {
      if (e.target.tagName !== "BUTTON") {
        const rect = e.target.getBoundingClientRect();
        startDrag(e.clientX, e.clientY, rect);

        const onMouseMove = (moveEvent) => {
          moveDrag(moveEvent.clientX, moveEvent.clientY);
        };

        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }
    });

    // Touch support
    letter.addEventListener("touchstart", (e) => {
      if (e.target.tagName !== "BUTTON") {
        const touch = e.touches[0];
        const rect = e.target.getBoundingClientRect();
        startDrag(touch.clientX, touch.clientY, rect);

        const onTouchMove = (moveEvent) => {
          const touchMove = moveEvent.touches[0];
          moveDrag(touchMove.clientX, touchMove.clientY);
        };

        const onTouchEnd = () => {
          document.removeEventListener("touchmove", onTouchMove);
          document.removeEventListener("touchend", onTouchEnd);
        };

        document.addEventListener("touchmove", onTouchMove, { passive: false });
        document.addEventListener("touchend", onTouchEnd);
      }
    });
  });

  // Open envelope
  document.querySelector("#openEnvelope").addEventListener("click", () => {
    document.querySelector(".envelope").classList.add("active");
  });

  // Close letter
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

  // Heart animation
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
