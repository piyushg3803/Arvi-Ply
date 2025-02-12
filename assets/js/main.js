/**
 *	Fxotary - Digital Agency HTML Template
 *	Author: CodeeFly
 *	Author URL: http://themeforest.net/user/codeefly
 *	Copyright © by codeefly. All Rights Reserved.
 **/

(function ($) {
  "use strict";
  console.clear();

  let device_width = window.innerWidth;
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? true
      : false;

  var fxotary = {
    /* Init */
    init() {
      fxotary.imgToSvg(),
        fxotary.customMouse(),
        fxotary.buttonHover(),
        fxotary.lenisScrollAnimation(),
        fxotary.searchBarToggle(),
        fxotary.stickyNavbar(),
        fxotary.marquee(),
        fxotary.counter(),
        fxotary.slider(),
        fxotary.stickySidebar(),
        fxotary.scrollBtn(),
        fxotary.isotope(),
        fxotary.textAnimation(),
        fxotary.mobileMenu();
    },
    imgToSvg() {
      document.querySelectorAll("img.svg").forEach((el) => {
        const imgID = el.getAttribute("id");
        const imgClass = el.getAttribute("class");
        const imgURL = el.getAttribute("src");
        fetch(imgURL)
          .then((data) => data.text())
          .then((response) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, "text/html");
            let svg = xmlDoc.querySelector("svg");
            if (typeof imgID !== "undefined") {
              svg.setAttribute("id", imgID);
            }

            if (typeof imgClass !== "undefined") {
              svg.setAttribute("class", imgClass + " replaced-svg");
            }

            svg.removeAttribute("xmlns:a");
            if (el.parentNode) {
              el.parentNode.replaceChild(svg, el);
            }
          });
      });
    },
    customMouse() {
      var mouse = { x: 0, y: 0 }; // Cursor position
      var pos = { x: 0, y: 0 }; // Cursor position
      var ratio = 0.15; // delay follow cursor
      var active = false;
      var ball = $("#ball");

      /** default */
      const defaultValue = {
        duration: 0.3,
        opacity: 0.5,
        width: "30px",
        height: "30px",
        backgroundColor: "transparent",
        border: "2px solid #555",
      };
      const hoverBall = {
        duration: 0.3,
        css: {
          borderWidth: 0,
          opacity: "1!important",
          width: "100px!important",
          height: "100px!important",
          backgroundColor: "#066760",
        },
      };
      gsap.set(ball, {
        // scale from middle and style ball
        xPercent: -50,
        yPercent: -50,
      });
      document.addEventListener("mousemove", mouseMove);
      function mouseMove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      gsap.ticker.add(updatePosition);
      function updatePosition() {
        if (!active) {
          pos.x += (mouse.x - pos.x) * ratio;
          pos.y += (mouse.y - pos.y) * ratio;

          gsap.set(ball, { x: pos.x, y: pos.y });
        }
      }
      // link
      $("a,.c-pointer,button,.progress")
        .not(".project_slider a") // omit from selection.
        .on("mouseenter", function () {
          gsap.to(ball, {
            duration: 0.3,
            borderWidth: 0,
            opacity: 0.5,
            backgroundColor: "#CCC",
            width: "80px",
            height: "80px",
          });
        })
        .on("mouseleave", function () {
          gsap.to(ball, defaultValue);
        });

      // Data cursor
      if ($("[data-cursor]")) {
        $("[data-cursor]").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append('<div class="ball-view"></div>');
              $(".ball-view").append($(this).attr("data-cursor"));
              gsap.to(ball, hoverBall);
            })
            .on("mouseleave", function () {
              ball.find(".ball-view").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }
      // Slider
      if ($(".slick-list")) {
        $(".slick-list").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append(
                '<div class="ball-drag"><i class="fa-light fa-chevron-left"></i><i class="fa-light fa-chevron-right"></i></div>'
              );
              // $(".ball-drag").append("read more");
              gsap.to(ball, hoverBall);
            })
            .on("mouseleave", function () {
              ball.find(".ball-drag").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }

      // Slider
      if ($(".cursor-arrow")) {
        $(".cursor-arrow").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append(
                '<div class="ball-arrow"><i class="fa-solid fa-arrow-right"></i></div>'
              );
              // $(".ball-drag").append("read more");
              gsap.to(ball, hoverBall);
            })
            .on("mouseleave", function () {
              ball.find(".ball-arrow").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }

      if ($(".image-view")) {
        $(".image-view").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append('<div class="ball-image-view"></div>');
              $(".ball-image-view").append($(this).attr("data-img-cursor"));
              gsap.to(ball, {
                duration: 0.3,
                css: {
                  borderWidth: 0,
                  opacity: "1!important",
                  width: "250px!important",
                  height: "250px!important",
                  borderRadius: "50%",
                },
              });
            })
            .on("mouseleave", function () {
              ball.find(".ball-image-view").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }

      // Gallery
      if ($(".gallery")) {
        $(".gallery").each(function () {
          $(this)
            .on("mouseenter", function () {
              ball.append(
                '<div class="ball-gallery"><i class="fa-sharp fa-solid fa-eye"></i></div>'
              );
              // $(".ball-drag").append("read more");
              gsap.to(ball, hoverBall);
            })
            .on("mouseleave", function () {
              ball.find(".ball-gallery").remove();
              gsap.to(ball, defaultValue);
            });
        });
      }
    },
    buttonHover() {
      class Magnet {
        constructor(target, magnetism = 0.2) {
          this.target = target;
          this.magnetism = magnetism;
          this.interval;
          this.hover = false;
          this.bubble;
          this.content;
          this.initX;
          this.initY;
          this.cursorX = 0;
          this.cursorY = 0;
          this.buttonX = 0;
          this.buttonY = 0;
          this.contentX = 0;
          this.contentY = 0;
          this.bubbleX = 0;
          this.bubbleY = 0;
          this.init();
        }

        init() {
          this.initX =
            this.target.getBoundingClientRect().left +
            this.target.offsetWidth / 2;
          this.initY =
            this.target.getBoundingClientRect().top +
            this.target.offsetHeight / 2;

          let inner = this.target.innerHTML;
          inner = `<span class="js-magnet-content magnet-content">${inner}</span>`;
          inner = `<i class="js-magner-bubble magnet-bubble"></i>${inner}`;
          this.target.innerHTML = inner;
          this.bubble = this.target.querySelector(".js-magner-bubble");
          this.content = this.target.querySelector(".js-magnet-content");

          let timelineBubble = gsap
            .timeline({ paused: true })
            .to(this.bubble, {
              duration: 0,
              opacity: 1,
            })
            .to(this.bubble, {
              duration: 0.6,
              scaleX: "15000%",
              scaleY: "15000%",
            });
          var ball = $("#ball");
          this.target.addEventListener("mouseenter", (e) => {
            this.hover = true;
            this.moveBubble(e);
            timelineBubble.play();
            let that = this;
            this.interval = setInterval(this.magnetize, 30, that);
            ball.removeClass("d-block");
            ball.addClass("d-none");
          });

          this.target.addEventListener("mouseleave", (e) => {
            this.moveBubble(e);
            timelineBubble.reverse();
            this.hover = false;
            this.cursorX = 0;
            this.cursorY = 0;
            ball.removeClass("d-none");
            ball.addClass("d-block");
          });

          this.target.addEventListener("mousemove", (e) => {
            let targetX =
              this.target.getBoundingClientRect().left +
              this.target.offsetWidth / 2;
            let targetY =
              this.target.getBoundingClientRect().top +
              this.target.offsetHeight / 2;
            this.cursorX =
              ((e.clientX - targetX) * 100) / (this.target.offsetWidth / 2);
            this.cursorY =
              ((e.clientY - targetY) * 100) / (this.target.offsetHeight / 2);
          });
        }

        moveBubble(e) {
          this.bubbleX = (e.layerX * 100) / this.target.offsetWidth;
          this.bubbleY = (e.layerY * 100) / this.target.offsetHeight;
          this.bubble.style.left = this.bubbleX + "%";
          this.bubble.style.top = this.bubbleY + "%";
        }

        magnetize(that) {
          let distance = Math.sqrt(
            (that.initX - that.buttonX) ** 2 + (that.initY - that.buttonY) ** 2
          );
          let magnetized = distance > 0.01 && that.hover ? true : false;

          if (magnetized) {
            that.buttonX += (that.cursorX - that.buttonX) * 0.2;
            that.buttonY += (that.cursorY - that.buttonY) * 0.2;
            that.contentX += (that.cursorX - that.contentX) * 0.2;
            that.contentY += (that.cursorY - that.contentY) * 0.2;
            let buttonTranslateX = `translateX(${
              that.buttonX * that.magnetism
            }%)`;
            let buttonTranslateY = `translateY(${
              that.buttonY * that.magnetism
            }%)`;
            let contentTranslateX = `translateX(${
              (-that.contentX * that.magnetism) / 2
            }%)`;
            let contentTranslateY = `translateY(${
              (-that.contentY * that.magnetism) / 2
            }%)`;
            that.target.style.transform =
              buttonTranslateX + " " + buttonTranslateY;
            that.content.style.transform =
              contentTranslateX + " " + contentTranslateY;
          } else {
            that.target.style.transform = "translateX(0%) translateY(0%)";
            that.content.style.transform = "translateX(0%) translateY(0%)";
            clearInterval(that.interval);
          }
        }
      }

      let magnets = document.querySelectorAll(".circle_btn");
      magnets.forEach((magnet) => {
        new Magnet(magnet);
      });
    },
    lenisScrollAnimation() {
      const lenis = new Lenis();
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    },
    searchBarToggle() {
      $(".search_icon").on("click", function () {
        $(".menu_search").addClass("show_search");
      });

      $(".close_search").on("click", function () {
        $(".menu_search").removeClass("show_search");
      });
    },
    stickyNavbar() {
      var prevScrollpos = window.pageYOffset;
      window.onscroll = function () {
        var currentScrollpos = window.pageYOffset;
        if (prevScrollpos > currentScrollpos) {
          document.querySelector(".main_menu").style.top = "0";
        } else {
          document.querySelector(".main_menu").style.top = "-100px";
        }

        prevScrollpos = currentScrollpos;
      };
    },
    marquee() {
      // latest project slider
      $(".marquee_animi").marquee({
        speed: 70,
        gap: 0,
        delayBeforeStart: 0,
        direction: "left",
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
      });
      // latest project slider
      $(".marquee_animi2").marquee({
        speed: 70,
        gap: 0,
        delayBeforeStart: 0,
        direction: "right",
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
      });
    },
    counter() {
      $(".count").countUp();
    },
    slider() {
      $(".testi_slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        arrows: true,
        nextArrow: '<i class="fa-light fa-chevron-right nextArrow"></i>',
        prevArrow: '<i class="fa-light fa-chevron-left prevArrow"></i>',

        responsive: [
          {
            breakpoint: 1400,
            settings: {
              arrows: false,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
            },
          },
          {
            breakpoint: 992,
            settings: {
              arrows: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
            },
          },
          {
            breakpoint: 576,
            settings: {
              arrows: false,
            },
          },
        ],
      });
    },
    stickySidebar() {
      $("#sticky_sidebar").stickit({
        top: 70,
      });
    },
    scrollBtn() {
      $(".tf__scroll_btn").on("click", function () {
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          300
        );
      });

      $(window).on("scroll", function () {
        var scrolling = $(this).scrollTop();

        if (scrolling > 500) {
          $(".tf__scroll_btn").fadeIn();
        } else {
          $(".tf__scroll_btn").fadeOut();
        }
      });
    },
    mobileMenu() {
      $(".menu-bar").on("click", function () {
        $(".mobile_menu_content").addClass("opened");
        $(".body-overlay").addClass("apply");
      });
      $(".close_btn").on("click", function () {
        $(".mobile_menu_content").removeClass("opened");
        $(".body-overlay").removeClass("apply");
      });
      $(".body-overlay").on("click", function () {
        $(".mobile_menu_content").removeClass("opened");
        $(".body-overlay").removeClass("apply");
      });

      if ($("#navbarNav").length && $(".main-menu-mobile").length) {
        let navContent = document.querySelector("#navbarNav").outerHTML;
        let mobileNavContainer = document.querySelector(".main-menu-mobile");
        mobileNavContainer.innerHTML = navContent;

        let arrow = $(".main-menu-mobile .dropdown-nav > a");

        arrow.each(function () {
          let self = $(this);
          let arrowBtn = document.createElement("BUTTON");
          arrowBtn.classList.add("dropdown-toggle-btn");
          arrowBtn.innerHTML = "<i class='fa-solid fa-caret-down'></i>";

          self.append(function () {
            return arrowBtn;
          });

          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("dropdown-opened");
            self.parent().toggleClass("expanded");
            self
              .parent()
              .parent()
              .addClass("dropdown-opened")
              .siblings()
              .removeClass("dropdown-opened");
            self.parent().parent().children(".submenu").slideToggle();
          });
        });
      }
    },
    preloader() {
      const svg = document.getElementById("svg");
      const tl = gsap.timeline();
      const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
      const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

      tl.to(".preloader-text", {
        delay: 0.5,
        y: -100,
        opacity: 0,
        onComplete: function () {
          setTimeout(() => {
            if (document.querySelector(".main_menu")) {
              document.querySelector(".main_menu").style.top = "0";
            }
            var hasAnim = $(".banner_title");
            hasAnim.each(function () {
              var $this = $(this);
              var splitType = "lines, chars";
              var splitto = new SplitText($this, {
                // type: splitType,
                // linesClass: "anim_line",
                // charsClass: "anim_char",
                // wordsClass: "anim_word",
              });
              var lines = $this.find(".anim_line"),
                words = $this.find(".anim_word"),
                chars = $this.find(".anim_char");
              gsap.fromTo(
                chars,
                { y: "100%" },
                {
                  y: "0%",
                  duration: 0.8,
                  stagger: 0.01,
                  ease: "power2.out",
                }
              );
            });

            fxotary.scrollAnimation();
            fxotary.scrollTextAnimation();
          }, 230);
        },
      });
      tl.to(svg, {
        duration: 0.1,
        // attr: { d: curve },
        ease: "power2.easeIn",
      }).to(svg, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.easeOut",
      });
      tl.to(".preloader", {
        y: -1500,
      });
      tl.to(".preloader", {
        zIndex: -1,
        display: "none",
      });
    },
    createScrollTrigger(triggerElement, timeline) {
      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 80%",
        onEnter: () => timeline.play(),
      });
    },
    scrollAnimation() {
      const animations = document.querySelectorAll("[data-animation]");
      animations.forEach((animation) => {
        let direction = "fade-bottom",
          duration = 1.5,
          offset = 50,
          delay = 0,
          scroll = 1,
          stagger = 0.2,
          ease = "power2.out";
        // Set attribute
        if (animation.getAttribute("data-offset")) {
          offset = animation.getAttribute("data-offset");
        }
        if (animation.getAttribute("data-duration")) {
          duration = animation.getAttribute("data-duration");
        }
        if (animation.getAttribute("data-animation")) {
          direction = animation.getAttribute("data-animation");
        }
        if (animation.getAttribute("data-delay")) {
          delay = animation.getAttribute("data-delay");
        }
        if (animation.getAttribute("data-ease")) {
          ease = animation.getAttribute("data-ease");
        }
        if (animation.getAttribute("data-scroll")) {
          scroll = animation.getAttribute("data-scroll");
        }
        if (animation.getAttribute("data-stagger")) {
          stagger = animation.getAttribute("data-stagger");
        }
        // Animation
        if (scroll == 1) {
          if (direction == "fade-top") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation, {
              y: -offset,
              opacity: 0,
              ease,
              duration,
              delay,
              stagger: { amount: stagger },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
          if (direction == "fade-left") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation, {
              x: -offset,
              opacity: 0,
              ease,
              duration,
              delay,
              stagger: { amount: stagger },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
          if (direction == "fade-bottom") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation, {
              y: offset,
              opacity: 0,
              ease,
              duration,
              delay,
              stagger: { amount: stagger },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
          if (direction == "fade-right") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation, {
              x: offset,
              opacity: 0,
              ease,
              duration,
              delay,
              stagger: { amount: stagger },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
          if (direction == "fade-in") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation, {
              opacity: 0,
              ease,
              duration,
              delay,
              stagger: { amount: stagger },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
          if (direction == "img-blur") {
            let img = animation.getElementsByTagName("img")[0];
            let tl = gsap.timeline({ paused: true });
            tl.from(img, {
              scale: "1.3",
              filter: "blur(5px)",
              ease,
              duration,
              delay,
              stagger: { amount: stagger },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
        } else {
          if (direction == "img-blur") {
            let img = animation.getElementsByTagName("img")[0];
            gsap.from(img, {
              scale: "1.3",
              filter: "blur(5px)",
              duration: 1,
            });
          }
          if (direction == "fade-top") {
            gsap.from(animation, {
              y: -offset,
              opacity: 0,
              ease,
              duration,
              delay,
            });
          }
          if (direction == "fade-left") {
            gsap.from(animation, {
              x: -offset,
              opacity: 0,
              ease,
              duration,
              delay,
            });
          }
          if (direction == "fade-bottom") {
            gsap.from(animation, {
              y: offset,
              opacity: 0,
              ease,
              duration,
              delay,
            });
          }
          if (direction == "fade-right") {
            gsap.from(animation, {
              x: offset,
              opacity: 0,
              ease,
              duration,
              delay,
            });
          }
          if (direction == "fade-in") {
            gsap.from(animation, {
              opacity: 0,
              ease,
              duration,
              delay,
            });
          }
        }
      });
    },
    scrollTextAnimation() {
      let typeSplit = new SplitType("[data-text-animation]", {
        types: "lines,words, chars",
        className: "line",
      });
      // Link timelines to scroll position

      const text_animations = document.querySelectorAll(
        "[data-text-animation]"
      );

      text_animations.forEach((animation) => {
        let type = "slide-up",
          duration = 0.75,
          offset = 80,
          stagger = 0.6,
          delay = 0,
          scroll = 1,
          split = "line",
          ease = "power2.out";
        // Set attribute
        if (animation.getAttribute("data-stagger")) {
          stagger = animation.getAttribute("data-stagger");
        }
        if (animation.getAttribute("data-duration")) {
          duration = animation.getAttribute("data-duration");
        }
        if (animation.getAttribute("data-text-animation")) {
          type = animation.getAttribute("data-text-animation");
        }
        if (animation.getAttribute("data-delay")) {
          delay = animation.getAttribute("data-delay");
        }
        if (animation.getAttribute("data-ease")) {
          ease = animation.getAttribute("data-ease");
        }
        if (animation.getAttribute("data-scroll")) {
          scroll = animation.getAttribute("data-scroll");
        }
        if (animation.getAttribute("data-offset")) {
          offset = animation.getAttribute("data-offset");
        }
        if (animation.getAttribute("data-split")) {
          split = animation.getAttribute("data-split");
        }
        if (scroll == 1) {
          if (type == "slide-up") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              yPercent: offset,
              duration,
              ease,
              opacity: 0,
              stagger: { amount: stagger },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
          if (type == "slide-down") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              yPercent: -offset,
              duration,
              ease,
              opacity: 0,
              stagger: { amount: stagger },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
          if (type == "rotate-in") {
            let tl = gsap.timeline({ paused: true });
            tl.set(animation.querySelectorAll(`.${split}`), {
              transformPerspective: 400,
            });
            tl.from(animation.querySelectorAll(`.${split}`), {
              rotationX: -offset,
              duration,
              ease,
              force3D: true,
              opacity: 0,
              transformOrigin: "top center -50",
              stagger: { amount: stagger },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
          if (type == "slide-from-left") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              xPercent: -offset,
              duration,
              opacity: 0,
              ease,
              stagger: { amount: stagger },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
          if (type == "slide-from-right") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              xPercent: offset,
              duration,
              opacity: 0,
              ease,
              stagger: { amount: stagger },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
          if (type == "fade-in") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              duration,
              ease,
              opacity: 0,
              stagger: { amount: stagger },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
          if (type == "fade-in-random") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              duration,
              ease,
              opacity: 0,
              stagger: { amount: stagger, from: "random" },
            });
            fxotary.createScrollTrigger(animation, tl);
          }
          if (type == "scrub") {
            let tl = gsap.timeline({
              scrollTrigger: {
                trigger: animation,
                start: "top 90%",
                end: "top center",
                scrub: true,
              },
            });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0.2,
              duration,
              ease,
              stagger: { amount: stagger },
            });
          }

          // Avoid flash of unstyled content
          gsap.set("[data-text-animation]", { opacity: 1 });
        } else {
          if (type == "slide-up") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              yPercent: offset,
              duration,
              ease,
              opacity: 0,
            });
          }
          if (type == "slide-down") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              yPercent: -offset,
              duration,
              ease,
              opacity: 0,
            });
          }
          if (type == "rotate-in") {
            let tl = gsap.timeline({ paused: true });
            tl.set(animation.querySelectorAll(`.${split}`), {
              transformPerspective: 400,
            });
            tl.from(animation.querySelectorAll(`.${split}`), {
              rotationX: -offset,
              duration,
              ease,
              force3D: true,
              opacity: 0,
              transformOrigin: "top center -50",
            });
          }
          if (type == "slide-from-right") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              xPercent: offset,
              duration,
              opacity: 0,
              ease,
            });
          }
          if (type == "fade-in") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              duration,
              ease,
              opacity: 0,
            });
          }
          if (type == "fade-in-random") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0,
              duration,
              ease,
              opacity: 0,
              stagger: { amount: stagger, from: "random" },
            });
          }
          if (type == "scrub") {
            tl.from(animation.querySelectorAll(`.${split}`), {
              opacity: 0.2,
              duration,
              ease,
            });
          }

          // Avoid flash of unstyled content
          // gsap.set("[data-text-animation]", { opacity: 0 });
        }
      });
    },
    isotope() {
      $(".grid").isotope({
        itemSelector: ".grid_item",
        masonry: {},
      });
    },
    textAnimation() {
      var hasAnim = $(".text_hover_animaiton");
      if (hasAnim.length !== 0) {
        hasAnim.each(function () {
          var $this = $(this);
          var splitType = "words,chars";
          new SplitText($this, {
            type: splitType,
            wordsClass: "menu-text",
          });
        });
      }
    },
  };
  $(document).ready(function () {
    fxotary.preloader();
    fxotary.init();
  });
})(jQuery);