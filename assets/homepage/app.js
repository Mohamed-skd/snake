import { dom, fetchFn, numFn } from "../script.js";

export default async function () {
  try {
    const canvasDom = dom.select("canvas");
    if (!(canvasDom instanceof HTMLCanvasElement))
      throw new Error("Invalid canvas.");

    const info = dom.select("h2");
    const scoreDOM = dom.select("h3:nth-of-type(1) span");
    const highscoreDOM = dom.select("h3:nth-of-type(2) span");
    const canvas = dom.canvas(canvasDom);
    const size = 20;
    const cWidth = Math.floor(canvasDom.width / size);
    const cHeight = Math.floor(canvasDom.height / size);
    const speeds = [20, 40, 80, 160];
    const directions = {
      z: ["UP", "DOWN"],
      q: ["LEFT", "RIGHT"],
      s: ["DOWN", "UP"],
      d: ["RIGHT", "LEFT"],
    };
    const highScoreHist = fetchFn.local("highscore");
    let snake = {
      speed: 2,
      direction: "RIGHT",
      body: [
        [150, 90],
        [130, 90],
        [110, 90],
      ],
    };
    let food = [];
    let isPlaying = false;
    let reset = false;
    let score = 0;
    let highscore = highScoreHist.get() ?? 0;
    let startTime = null;

    function setFoodPos() {
      const x = Math.floor(numFn.rand(cWidth + 1 / 2, 1 / 2) * size);
      const y = Math.floor(numFn.rand(cHeight + 1 / 2, 1 / 2) * size);
      for (let i = 0; i < snake.body.length; i++) {
        if (x === snake.body[i][0] && y === snake.body[i][1]) {
          return setFoodPos();
        }
      }
      food = [x, y];
    }
    function drawSnake() {
      for (let i = 0; i < snake.body.length; i++) {
        canvas.draw(snake.body[i], size, "arc", true, "green");
      }
    }
    function drawFood() {
      canvas.draw(food, size, "arc", true, "red");
    }
    function init() {
      setFoodPos();
      drawSnake();
      drawFood();
      setScore();
    }
    /**
     * Start game and change snake direction
     * @param {KeyboardEvent} e
     * @returns
     */
    function move(e) {
      if (reset) return;
      const key = e.key;
      if (!isPlaying) {
        if (key !== " ") return;
        isPlaying = true;
        dom.modClass(canvasDom, "is-playing");
        return requestAnimationFrame(gameLoop);
      }
      if (!Object.keys(directions).includes(key)) return;
      if (snake.direction === directions[key][1]) return;
      snake.direction = directions[key][0];
    }
    /**
     * @param {DOMHighResTimeStamp} time
     * @returns
     */
    function gameLoop(time) {
      if (!isPlaying) return;
      startTime = startTime ? startTime : time;
      snake.speed = numFn.clamp(snake.speed, 0, 3);
      if (time < startTime + speeds[snake.speed])
        return requestAnimationFrame(gameLoop);
      startTime = time;

      canvas.clear();
      for (let i = snake.body.length - 1; i > 0; i--) {
        snake.body[i][0] = snake.body[i - 1][0];
        snake.body[i][1] = snake.body[i - 1][1];
      }
      let sHead = snake.body[0];
      switch (snake.direction) {
        case "UP":
          sHead[1] -= size;
          sHead[1] =
            sHead[1] < size / 2
              ? Math.floor(canvasDom.height - size / 2)
              : sHead[1];
          break;
        case "LEFT":
          sHead[0] -= size;
          sHead[0] =
            sHead[0] < size / 2
              ? Math.floor(canvasDom.width - size / 2)
              : sHead[0];
          break;
        case "DOWN":
          sHead[1] += size;
          sHead[1] =
            sHead[1] > Math.floor(canvasDom.height - size / 2)
              ? size / 2
              : sHead[1];
          break;
        case "RIGHT":
          sHead[0] += size;
          sHead[0] =
            sHead[0] > Math.floor(canvasDom.width - size / 2)
              ? size / 2
              : sHead[0];
          break;
      }
      drawSnake();
      drawFood();

      grow();
      die();

      return requestAnimationFrame(gameLoop);
    }
    /**
     * Check snake collision with food or self
     * @param {Number[]} elem
     * @returns
     */
    function eat(elem) {
      return snake.body[0][0] === elem[0] && snake.body[0][1] === elem[1];
    }
    function grow() {
      if (!eat(food)) return;
      snake.body.push([]);
      score += size;
      highscore = score > highscore ? score : highscore;
      highScoreHist.set(highscore);
      setScore();
      setFoodPos();
    }
    function setScore() {
      scoreDOM.textContent = score;
      highscoreDOM.textContent = highscore;
    }
    function die() {
      for (let i = 1; i < snake.body.length; i++) {
        if (!eat(snake.body[i])) continue;
        resetGame();
      }
    }
    function resetGame() {
      reset = true;
      isPlaying = false;
      info.textContent = "💀";
      dom.modClass(canvasDom, "is-playing", "del");

      setTimeout(() => {
        reset = false;
        canvas.clear();
        info.textContent = "[ESPACE] pour Jouer.";
        snake = {
          speed: 2,
          direction: "RIGHT",
          body: [
            [150, 90],
            [130, 90],
            [110, 90],
          ],
        };
        food = [];
        score = 0;
        init();
      }, 1000);
    }

    init();
    addEventListener("keydown", move);
  } catch (err) {
    return dom.error(err);
  }
}
