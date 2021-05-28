function moveTo(start, end, dom, prop) {
    if(!dom) return
    let speed = 5;
    if (end < 0) {
      speed *= -1;
    }
    let x = 0;
    let timer = setInterval(() => {
      x += speed;
      dom[prop] = start + x;
      if (Math.abs(x) > Math.abs(end)) {
        dom[prop] = start + end;
        clearInterval(timer);
      }
    }, 2);
  }

  export default {
    moveTo
  }