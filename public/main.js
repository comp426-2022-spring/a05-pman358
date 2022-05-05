// Focus div based on nav button click

// Flip one coin and show coin image to match result when button clicked

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button

  const home_div = (document.getElementById("homenav").onclick = function () {
    flip_home();
    });
  const flip_one_div = (document.getElementById("singlenav").onclick = function () {      
    flip_one_click();
    });
  const flip_many_div = (document.getElementById("multinav").onclick = function () {
    flip_many_click();
    });
  const guess_flip_div = (document.getElementById("guessnav").onclick = function () {
    flip_guess_click();
    });

    function flip_home() {
        document.getElementById("single").className = "hidden";
        document.getElementById("multi").className = "hidden";
        document.getElementById("guess").className = "hidden";
        document.getElementById("home").className = "active";
    }
    function flip_one_click() {
        document.getElementById("single").className = "active";
        document.getElementById("multi").className = "hidden";
        document.getElementById("guess").className = "hidden";
        document.getElementById("home").className = "hidden";
    }
    function flip_many_click() {
        document.getElementById("single").className = "hidden";
        document.getElementById("multi").className = "active";
        document.getElementById("guess").className = "hidden";
        document.getElementById("home").className = "hidden";
    }
    function flip_guess_click() {
        document.getElementById("single").className = "hidden";
        document.getElementById("multi").className = "hidden";
        document.getElementById("guess").className = "active";
        document.getElementById("home").className = "hidden";
    }
  
  const flip_one_btn = (document.getElementById("one_flip_button").onclick = function () {
    fetch("http://localhost:5555/app/flip", { mode: "cors" })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          document.getElementById("result1").innerText = result.flip;
          document
            .getElementById("one_flip_img")
            .setAttribute("src", `assets/img/${result.flip}.png`);
        });
    });
  
  const flip_guess_heads = (document.getElementById("heads_guess").onclick =
    function () {
        fetch("http://localhost:5555/app/flip/call/heads", { mode: "cors" })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          console.log(result);
          document.getElementById("result3").innerText = `You ${result.result}!`;
          if (result.result == "win") {
            result = result.call;
          } else {
            result = result.flip;
          }
          document
            .getElementById("guess_flip_img")
            .setAttribute("src", `assets/img/${result}.png`);
        });
    });
  const flip_guess_tails = (document.getElementById("tails_guess").onclick = function () {
        fetch("http://localhost:5555/app/flip/call/tails", { mode: "cors" })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          console.log(result);
          document.getElementById("result3").innerText = `You ${result.result}!`;
          if (result.result == "win") {
            result = result.call;
          } else {
            result = result.flip;
          }
          document
            .getElementById("guess_flip_img")
            .setAttribute("src", `assets/img/${result}.png`);
        });
    });
  
  const flip_many_btn = (document.getElementById("submit").onclick = function () {
    const input = document.getElementById("input").value || 0;
    fetch(`http://localhost:5555/app/flips/${input}`, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        document.getElementById("result2_heads").innerText = result.summary.heads;
        document.getElementById("result2_tails").innerText = result.summary.tails;
      });
  });