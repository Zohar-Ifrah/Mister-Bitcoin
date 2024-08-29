// const taskService = require('../api/task/task.service')
// const socketService = require('../services/socket.service')

// module.exports = {
//   runWorker,
//   toggleWorker,
//   getWorkerStatus
// }

// var isWorkerOn = false;

// async function runWorker() {
//   // The isWorkerOn is toggled by the button: "Start/Stop Task Worker"
//   if (!isWorkerOn) return;
//   var delay = 5000;
//   try {
//     const task = await taskService.getNextTask()
//     if (task) {
//       try {
//         await taskService.performTask(task)
//       } catch (err) {
//         console.log(`Failed Task`, err)
//       } finally {
//         delay = 1 
//       }
//     } else {
//       console.log('Snoozing... no tasks to perform')
//     }
//   } catch (err) {
//     console.log(`Failed getting next task to execute`, err)
//   } finally {
//     setTimeout(runWorker, delay)
//   }
// }

// function getWorkerStatus() {
//   return { isRunning: isWorkerOn }
// }

// function toggleWorker() {
//   isWorkerOn = !isWorkerOn
//   socketService.setToggleWorker(getWorkerStatus())
//   if (isWorkerOn) runWorker()
// }