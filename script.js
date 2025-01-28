const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var t1 = gsap.timeline();

  t1.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundelem", {
      y: 0,
      ease: Expo.easeInOut,
      delay: -1,
      duration: 2,
      stagger: 0.2,
    })
    .from("#homefooter", {
      y: -10,
      delay: -1,
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
    });
}

/* now we will animate the cursor to get skewed or to get distorted whenever we move our mouse while in motion
   the circle gets a little distorted this distortion is fixed at maximum and minimum now will animate it*/

var timeout; // this is global variable use to stop the motion of squeeze in mouse when it stops
function cursormotion() {
  /* define the scale values of the squeezeness of the ball as scale 1 means no squeeze 
      max scale is 1.2(max mota) and min scale is 0.8(max chapta)*/
  /* this technique of squeezing the cursor in motion is called "CLAMP" */
  /* in gsap Clamp we pass the min range and max range and value(your val) then it maps it to the 
      nearest range accord to ur value */
  var xscale = 1;
  var yscale = 1;

  var xprevval = 0; // we let the previous values of x and y as 0
  var yprevval = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    // var xdiff = dets.clientX - xprevval; // this is the dist btw the current and pehli postion
    // var ydiff = dets.clientY - yprevval;

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprevval);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprevval);

    xprevval = dets.clientX; // then make the current as pehli for new difference
    yprevval = dets.clientY;

    circlecursor(xscale, yscale);
    timeout = setTimeout(function () {
      document.querySelector(
        "#cursor"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    }, 100); //thia piece of code will run when the mouse stops moving to get the circle in its proper shape
  });
}

function circlecursor(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#cursor"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
  });
}
cursormotion();
circlecursor();
firstPageAnim();

// now animation of SECOND PAGE
document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.8),
    });
  });
});
