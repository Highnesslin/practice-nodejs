// // generator
// const promise = (msg, delay = 3000) =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(console.log(msg));
//     }, delay);
//   });
// const generator = function* (msg) {
//   yield promise(msg + 1);
//   yield promise(msg + 2);
//   yield promise(msg + 3);
// };
// const co = (generator) => {
//   if ((it = generator.next().value)) {
//     it.then((res) => {
//       co(generator);
//     });
//   } else {
//     return;
//   }
// };

// co(generator("gagagaa"));

// 事件驱动
const asyncEvent = () => {
  var events = require("events");
  var eventEmitter = new events.EventEmitter();

  const asyncFunc = (name) => (event) => {
    setTimeout(() => {
      console.log(name);
      event.emit("end");
    }, 1000);
    return event;
  };

  const eventList = [asyncFunc("1"), asyncFunc("2"), asyncFunc("3")];
  let i = 0;

  eventEmitter.on("end", () => {
    if (i < eventList.length) {
      eventList[i++](eventEmitter);
    }
  });
  eventEmitter.emit("end");
};
asyncEvent();
