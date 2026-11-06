(() => {
  const SHADOW = 10;

  const canvas = document.getElementById("canvas");
  const card = document.getElementById("card");
  const rect = card.getBoundingClientRect();
  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };

  const wrap = (angle) => {
    if (angle < 0) return angle + 360;
    if (angle > 360) return angle - 360;
    return angle;
  };

  calcShadow = (a) => {
    const angle = wrap(a);
    return (
      (((angle > 180 ? 360 - angle : angle) / 180) * (SHADOW * 2) - SHADOW) * -1
    );
  };

  const update = (xPos, yPos) => {
    const dx = xPos - center.x;
    const dy = yPos - center.y;

    // lol. had a bunch of conditionals before finding atan2
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

    const shadowX = calcShadow(angle + 90);
    const shadowY = calcShadow(angle);

    card.style.setProperty(
      "box-shadow",
      `${shadowX}px ${shadowY}px 10px 2px #7f7f7f4f`,
    );
  };

  document.body.addEventListener("mousemove", (event) => {
    if (event.target !== canvas) {
      return;
    }

    update(event.clientX, event.clientY);
  });
})();
