// import { Client } from "@stomp/stompjs";
// // import { writable } from "svelte/store";

// // const messageStore = writable('');

// // const socket = new WebSocket("ws://localhost:9090/websocket");

// const client = new Client({
//     brokerURL: 'ws://localhost:9090/websocket',
//     debug: function (message) {
//         console.log(message);
//     }
// });

// client.onConnect = (frame) => {
//     console.log("Connected", frame);
// }

// client.onStompError = (frame) => {
//     console.log("error", frame)
// }

// client.activate();
// // socket.addEventListener('open', function (event) {
// //     console.log("Client connection opne");
// // })

// // socket.addEventListener('message', function (event) {
// //     console.log("Received message: ", event)
// //     messageStore.set(event.data);
// // });

// // socket.addEventListener('close', function (event) {
// //     console.log("WebSocket connection closed", event);
// // });

// // socket.addEventListener('error', function (event) {
// //     console.log("WebSocket error:", event);
// // });

// export default {
//     // subscribe: messageStore.subscribe,
//     client
// }