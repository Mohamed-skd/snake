import { Base } from "./Base.js";

export class NumberFuncs extends Base {
  constructor() {
    super();
  }

  /**
   * Return number formater.
   * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
   * @param {Intl.NumberFormatOptions} options Formater options
   * @param {String} local Local language
   * @returns
   */
  numberFormater(
    options = { style: "currency", currency: "EUR" },
    local = "fr-FR"
  ) {
    let res;
    try {
      if (local && typeof local !== "string") throw new Error("Invalid local.");
      if (options && !(options instanceof Object))
        throw new Error("Invalid options.");
      res = new Intl.NumberFormat(local, options);
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Return range of numbers
   * @param {Number} max Last of range (default:100)
   * @param {Number} min First of range (default:0)
   * @param {Number} step Increment step
   * @param {Number} type Return type => Array:0 (default) | String:1
   * @returns
   */
  range(max = 100, min = 0, step = 1, type = 0) {
    let res;

    try {
      if (typeof max !== "number") throw new Error("Invalid max.");
      if (typeof min !== "number") throw new Error("Invalid min.");
      if (typeof step !== "number") throw new Error("Invalid step.");
      if (typeof type !== "number") throw new Error("Invalid type.");

      const arr = [];
      while (min <= max) {
        arr.push(min);
        min += step;
      }

      const str = arr.join(" ");
      const types = [arr, str];
      res = types[type];
    } catch (err) {
      return this.error(err);
    }

    return res;
  }

  /**
   * Return random integer
   * @param {Number} max Maximum limit (excluded - default:101)
   * @param {Number} min Minimum limit (default:0)
   * @returns
   */
  rand(max = 101, min = 0) {
    let res;
    try {
      if (typeof max !== "number") throw new Error("Invalid max.");
      if (typeof min !== "number") throw new Error("Invalid min.");
      res = Math.floor(Math.random() * (max - min)) + min;
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Check if a number is even or odd
   * @param {Number} num Number
   * @returns
   */
  isEven(num) {
    let res;
    try {
      if (typeof num !== "number") throw new Error("Invalid num.");
      res = !(num & 1);
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Sum collection of numbers
   * @param {Number[]} nums Numbers
   * @returns
   */
  sum(nums) {
    let res;
    try {
      if (!(nums instanceof Array)) throw new Error("Invalid nums.");
      res = nums.reduce((a, b) => a + b);
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Give the average of a collection of numbers
   * @param {Number[]} nums Numbers
   * @returns
   */
  avg(nums) {
    let res;
    try {
      if (!(nums instanceof Array)) throw new Error("Invalid nums.");
      const sum = this.sum(nums);
      res = sum / nums.length;
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Give the median of a collection of numbers
   * @param {Number[]} nums Numbers
   * @returns
   */
  median(nums) {
    let med;

    try {
      if (!(nums instanceof Array)) throw new Error("Invalid nums.");

      const sorted = nums.toSorted((a, b) => a - b);

      if (this.isEven(sorted.length)) {
        const mid = sorted.length / 2;
        med = this.avg([sorted[mid - 1], sorted[mid]]);
      } else {
        const floor = Math.floor(sorted.length / 2);
        med = sorted[floor];
      }
    } catch (err) {
      return this.error(err);
    }

    return med;
  }

  /**
   * Clamp number between two values min & max.
   * @param {number} num
   * @param {number} min
   * @param {number} max
   * @returns
   */
  clamp(num, min, max) {
    let res;
    try {
      if (typeof num !== "number") throw new Error("Invalid num.");
      if (typeof min !== "number") throw new Error("Invalid min.");
      if (typeof max !== "number") throw new Error("Invalid max.");
      res = Math.min(Math.max(num, min), max);
    } catch (err) {
      return this.error(err);
    }
    return res;
  }
}
export class StringFuncs extends Base {
  constructor() {
    super();
  }

  /**
   * Return string sample
   * @param {"letters"|"numbers"|"symbols"|"all"} type String type
   * @returns
   */
  getString(type = "letters") {
    let res;

    try {
      if (typeof type !== "string") throw new Error("Invalid type.");

      const strings = {
        letters: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "$%-/\\+*.&! §:;?,(){}[]@#~¨^²°|`'\"_=¤£µ€",
      };

      if (type === "all") {
        res = strings.letters + strings.numbers + strings.symbols;
      }
      res = strings[type];
    } catch (err) {
      return this.error(err);
    }

    return res;
  }

  /**
   * Format string (capitalized and hyphens replaced by spaces)
   * @param {String} string Input
   * @returns
   */
  formatText(string) {
    let res;
    try {
      if (typeof string !== "string") throw new Error("Invalid string.");
      let base = "";
      const uc = string[0].toUpperCase();
      const remainder = string.substring(1).toLowerCase();
      base = `${uc}${remainder}`;
      res = base.replaceAll("-", " ").trim();
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Shuffles string
   * @param {String} string Input
   * @returns
   */
  shuffle(string) {
    let base = "";
    try {
      if (typeof string !== "string") throw new Error("Invalid string.");
      for (let i = 0; i < string.length; i++) {
        const random = Math.floor(Math.random() * string.length);
        base += string[random];
      }
    } catch (err) {
      return this.error(err);
    }
    return base;
  }

  /**
   * Reverse string
   * @param {String} str Input
   * @returns
   */
  strRev(str) {
    let res;
    try {
      if (typeof str !== "string") throw new Error("Invalid str.");
      res = str.split("").reverse().join("").toLowerCase();
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Return the first word of a string
   * @param {String} string Input
   * @returns
   */
  slug(string) {
    let res;
    try {
      if (typeof string !== "string") throw new Error("Invalid string.");
      res = string.match(/\w+/)?.[0];
    } catch (err) {
      return this.error(err);
    }
    return res;
  }
}
export class DateFuncs extends Base {
  constructor() {
    super();
  }

  /**
   * Return date formater.
   * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
   * @param {Intl.DateTimeFormatOptions} options Formater options
   * @param {String} local Local Language
   * @returns
   */
  dateFormater(options, local = "fr-FR") {
    let res;
    try {
      if (local && typeof local !== "string") throw new Error("Invalid local.");
      if (options && !(options instanceof Object))
        throw new Error("Invalid options.");
      res = new Intl.DateTimeFormat(local, options);
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Return relative date formater.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat
   * @param {Intl.RelativeTimeFormatOptions} options Formater options
   * @param {String} local Local language
   * @returns
   */
  relativeDateFormater(
    options = {
      numeric: "auto",
    },
    local = "fr-FR"
  ) {
    let res;
    try {
      if (local && typeof local !== "string") throw new Error("Invalid local.");
      if (options && !(options instanceof Object))
        throw new Error("Invalid options.");
      res = new Intl.RelativeTimeFormat(local, options);
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Return date in unix seconds.
   * @param {Date} date Input date
   * @returns
   */
  dateToUnix(date) {
    let res;
    try {
      if (!(date instanceof Date)) throw new Error("Invalid date.");
      res = Math.round(Date.parse(date) / 1000);
    } catch (err) {
      return this.error(err);
    }
    return res;
  }
  /**
   * Return unix seconds in Date
   * @param {Number} unix Input unix seconds
   * @returns
   */
  unixToDate(unix) {
    let res;
    try {
      if (typeof unix !== "number") throw new Error("Invalid unix.");
      res = new Date(unix * 1000);
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Return number of days in seconds (default:7)
   * @param {Number} day Input days
   * @returns
   */
  dayToSeconds(day = 7) {
    let res;
    try {
      if (typeof day !== "number") throw new Error("Invalid day.");
      res = day * 86400;
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Return number of seconds in days
   * @param {Number} seconds Input seconds
   * @returns
   */
  secondsToDay(seconds) {
    let res;
    try {
      if (typeof seconds !== "number") throw new Error("Invalid seconds.");
      res = Math.round(seconds / 86400);
    } catch (err) {
      return this.error(err);
    }
    return res;
  }
}
export class Dom extends Base {
  constructor() {
    super();
  }

  /**
   * Select DOM element
   * @param {keyof HTMLElementTagNameMap} tag Tag of DOM element
   * @returns
   */
  select(tag) {
    let res;
    try {
      if (typeof tag !== "string") throw new Error("Invalid tag.");
      res = document.querySelector(tag);
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Select DOM elements
   * @param {keyof HTMLElementTagNameMap} tag Tag of DOM element
   * @returns
   */
  selectAll(tag) {
    let res;
    try {
      if (typeof tag !== "string") throw new Error("Invalid tag.");
      res = Array.from(document.querySelectorAll(tag));
    } catch (err) {
      return this.error(err);
    }
    return res;
  }

  /**
   * Create DOM element
   * @param {keyof HTMLElementTagNameMap} tag Tag of DOM element
   * @param {Object} attribs Attributes to set on the element
   * @returns
   */
  create(tag, attribs) {
    let elem;
    try {
      if (typeof tag !== "string") throw new Error("Invalid tag.");
      elem = document.createElement(tag);
      if (!attribs) return elem;
      if (!(attribs instanceof Object)) throw new Error("Invalid attribs.");
      for (const [attr, value] of Object.entries(attribs)) {
        elem.setAttribute(attr, value);
      }
    } catch (err) {
      return this.error(err);
    }
    return elem;
  }

  /**
   * Modify class Of DOM element
   * @param {HTMLElement} elem DOM element
   * @param {String} className Class value
   * @param {"add"|"del"|"tog"} mod Modifier
   * @returns
   */
  modClass(elem, className, mod = "add") {
    try {
      if (!(elem instanceof HTMLElement)) throw new Error("Invalid elem.");
      if (typeof className !== "string") throw new Error("Invalid className.");
      if (typeof mod !== "string") throw new Error("Invalid mod.");

      const mods = {
        add: () => elem.classList.add(className),
        del: () => elem.classList.remove(className),
        tog: () => elem.classList.toggle(className),
      };

      mods[mod]();
    } catch (err) {
      return this.error(err);
    }

    return true;
  }

  /**
   * Scroll view to selected DOM element
   * @param {HTMLElement} to Destination element
   * @param {Window | HTMLElement} from Parent element
   * @param {Number} margeX Margin Left
   * @param {Number} margeY Margin Top
   * @returns
   */
  go(to, from = window, margeX = 0, margeY = 0) {
    try {
      if (!(to instanceof HTMLElement)) throw new Error("Invalid to elem.");
      if (!(from instanceof Object)) throw new Error("Invalid from elem.");
      if (typeof margeX !== "number") throw new Error("Invalid margeX.");
      if (typeof margeY !== "number") throw new Error("Invalid margeY.");
      from.scroll(to.offsetLeft - margeX, to.offsetTop - margeY);
    } catch (err) {
      return this.error(err);
    }
    return true;
  }

  /**
   * Notify information to client
   * @param {String} content Information to display
   * @param {"success"|"error"} type Type of the information
   * @param {Number} delay Delay before deleting notification
   * @returns
   */
  notify(content, type, delay = 2) {
    try {
      if (typeof content !== "string") throw new Error("Invalid content.");
      if (typeof type !== "string") throw new Error("Invalid type.");
      if (typeof delay !== "number") throw new Error("Invalid delay.");
      const notifications = this.select("#notifications");
      if (!notifications) throw new Error("No root in DOM.");
      const p = this.create("p");
      if (type) this.modClass(p, type);
      p.textContent = content;
      notifications.append(p);
      setTimeout(() => {
        p.remove();
      }, 1000 * delay);
    } catch (err) {
      return this.error(err);
    }
    return true;
  }

  /**
   * Set navbar & sections title based on sections ids.
   * @returns
   */
  setNavPage() {
    try {
      const navPage = this.select("#nav-page ul");
      if (!navPage) throw new Error("No root in DOM.");

      this.modClass(navPage, "flex");
      const stringFn = new StringFuncs();
      const sections = this.selectAll("main > section");

      for (const sect of sections) {
        const id = sect.id.trim();
        if (!id) continue;

        const name = stringFn.formatText(id);
        const listElem = this.create("li");
        const link = this.create("a", {
          class: "link",
          href: `#${id}`,
          target: "_self",
        });
        const title = this.create("h2");

        link.textContent = name;
        title.textContent = name;
        listElem.append(link);
        navPage.append(listElem);
        sect.prepend(title);
      }
    } catch (err) {
      return this.error(err);
    }

    return true;
  }

  /**
   * Set copyright
   * @param {String} info Information
   * @param {{ref:String, text:String}} link Link
   * @returns
   */
  setCopyright(
    info = "Par ",
    link = { ref: "https://ko-fi.com/mohsd", text: "Moh. SD" }
  ) {
    try {
      if (info && typeof info !== "string") throw new Error("Invalid info.");
      if (link && !(link instanceof Object)) throw new Error("Invalid link.");

      const copyright = this.select("#copyright");
      if (!copyright) throw new Error("No root in DOM.");

      const date = new Date();

      if (!info && !link) {
        copyright.textContent = `© ${date.getFullYear()}`;
      } else if (!link) {
        copyright.append(info, ` © ${date.getFullYear()}`);
      } else {
        const anchor = this.create("a", { href: link.ref, class: "link" });
        anchor.textContent = link.text;
        copyright.append(info, anchor, ` © ${date.getFullYear()}`);
      }
    } catch (err) {
      return this.error(err);
    }

    return true;
  }

  /**
   * Manage Canvas
   * @param {HTMLCanvasElement} canvas
   * @returns
   */
  canvas(canvas) {
    let res;

    try {
      if (!(canvas instanceof HTMLCanvasElement))
        throw new Error("Invalid canvas.");

      const ctxt = canvas.getContext("2d");
      if (!ctxt) throw new Error("Invalid context");

      /**
       * Draw canvas
       * @param {Number[]} point
       * @param {Number} size
       * @param {"rect"|"arc"} shape
       * @param {Boolean} fill
       * @param {"black"|"red"|"green"|"blue"|"purple"|"yellow"} style
       */
      const draw = (
        point = [0, 0],
        size = 10,
        shape = "rect",
        fill = true,
        style = "black"
      ) => {
        try {
          if (!(point instanceof Array)) throw new Error("Invalid point.");
          if (typeof size !== "number") throw new Error("Invalid size.");
          if (typeof shape !== "string") throw new Error("Invalid shape.");
          if (typeof fill !== "boolean") throw new Error("Invalid fill.");
          if (typeof style !== "string") throw new Error("Invalid style.");

          const shapes = {
            rect: () => ctxt.rect(point[0], point[1], size, size),
            arc: () => ctxt.arc(point[0], point[1], size / 2, 0, Math.PI * 2),
          };

          if (fill) {
            ctxt.fillStyle = style;
            ctxt.beginPath();
            shapes[shape]();
            ctxt.fill();
          } else {
            ctxt.strokeStyle = style;
            ctxt.beginPath();
            shapes[shape]();
            ctxt.stroke();
          }
        } catch (err) {
          return this.error(err);
        }

        return true;
      };
      /**
       * Clear canvas
       * @param {Number[]} point
       * @param {Number} size
       */
      const clear = (
        point = [0, 0],
        size = ctxt.canvas.width > ctxt.canvas.height
          ? ctxt.canvas.width
          : ctxt.canvas.height
      ) => {
        try {
          if (!(point instanceof Array)) throw new Error("Invalid point.");
          if (typeof size !== "number") throw new Error("Invalid size.");
          ctxt.clearRect(point[0], point[1], size, size);
        } catch (err) {
          return this.error(err);
        }
        return true;
      };

      res = { ctxt, draw, clear };
    } catch (err) {
      return this.error(err);
    }

    return res;
  }
}
export class Fetch extends Base {
  constructor() {
    super();
  }

  /**
   * Get data asynchronously
   * @param {String} target Data source
   * @param {Object | null} value Datas value
   * @param {"text"|"json"} rType Return type
   * @returns
   */
  async get(target = location.pathname, value = null, rType = "json") {
    let data;

    try {
      if (value && !(value instanceof Object))
        throw new Error("Invalid value.");
      if (typeof target !== "string") throw new Error("Invalid target.");
      if (typeof rType !== "string") throw new Error("Invalid rType.");

      const request = this.objToReq(value);
      const req = await fetch(request ? `${target}?${request}` : target);

      switch (rType) {
        case "json":
          data = await req.json();
          break;
        case "text":
          data = await req.text();
          break;
      }
    } catch (err) {
      return this.error(err);
    }

    return data;
  }

  /**
   * Post data asynchronously
   * @param {String} target Data destination
   * @param {Object | null} value Datas value
   * @param {"text"|"json"} rType Return type
   * @returns
   */
  async post(target = location.pathname, value = null, rType = "json") {
    let data;

    try {
      if (value && !(value instanceof Object))
        throw new Error("Invalid value.");
      if (typeof target !== "string") throw new Error("Invalid target.");
      if (typeof rType !== "string") throw new Error("Invalid rType.");

      const request = this.objToReq(value);
      const req = await fetch(target, {
        method: "post",
        body: request,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });

      switch (rType) {
        case "json":
          data = await req.json();
          break;
        case "text":
          data = await req.text();
          break;
      }
    } catch (err) {
      return this.error(err);
    }

    return data;
  }

  /**
   * Generate url request from an object
   * @param {Object | null} value Datas value
   * @returns
   */
  objToReq(value) {
    let req = "";
    try {
      if (!value) return null;
      if (!(value instanceof Object)) throw new Error("Invalid value.");
      for (const key in value) {
        const val = `${value[key]}`.trim();
        req += `${key}=${val}&`;
      }
    } catch (err) {
      return this.error(err);
    }
    return req;
  }

  /**
   * Manage local data
   * @param {String} key
   * @returns
   */
  local(key) {
    let res;
    try {
      if (typeof key !== "string") throw new Error("Invalid key.");
      const get = () => {
        return JSON.parse(localStorage.getItem(key));
      };
      const set = (val) => {
        localStorage.setItem(key, JSON.stringify(val));
      };
      res = { get, set };
    } catch (err) {
      return this.error(err);
    }
    return res;
  }
}
