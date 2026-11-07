(() => {
  const MAX_SHADOW = 10;
  const MAX_SHADOW_SPREAD = 5;

  const card = document.getElementById("card");
  const rect = card.getBoundingClientRect();
  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  const distScale = 1 / center.y;
  const maxDist = center.y * 2;

  const wrap = (angle) => {
    if (angle < 0) return angle + 360;
    if (angle > 360) return angle - 360;
    return angle;
  };

  const calcShadowAngle = (a) => {
    const angle = wrap(a);
    return (
      (((angle > 180 ? 360 - angle : angle) / 180) * (MAX_SHADOW * 2) -
        MAX_SHADOW) *
      -1
    );
  };

  const calcShadowSpread = (p1, p2) => {
    const a = Math.abs(p1.x - p2.x);
    const b = Math.abs(p1.y - p2.y);
    const h = Math.sqrt(a * a + b * b);
    const max = Math.min(h, maxDist);
    return (1 - max * distScale) * MAX_SHADOW_SPREAD;
  };

  const update = (xPos, yPos) => {
    const dx = xPos - center.x;
    const dy = yPos - center.y;

    // lol. had a bunch of conditionals before finding atan2
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

    const shadowX = calcShadowAngle(angle + 90);
    const shadowY = calcShadowAngle(angle);
    const shadowSpread = calcShadowSpread(center, { x: xPos, y: yPos });

    card.style.setProperty(
      "box-shadow",
      `${shadowX}px ${shadowY}px 10px ${shadowSpread}px #7f7f7f4f`,
    );
  };

  document.body.addEventListener("mousemove", (event) => {
    update(event.clientX, event.clientY);
  });
})();
