// import * as Notifications from "expo-notifications";



// export async function registerNotification() {


//     const { status } =
//         await Notifications.requestPermissionsAsync();


//     if (status !== "granted") {

//         alert("Notification permission denied");

//         return false;

//     }


//     return true;

// }




// export async function scheduleMedicineReminder(
//     medicine: any
// ) {


//     await Notifications.scheduleNotificationAsync({

//         content: {

//             title: "💊 Medicine Reminder",

//             body:
//                 `${medicine.name} - ${medicine.dosage}`

//         },


//         trigger: {

//             hour:
//                 getHour(medicine.time),

//             minute:
//                 getMinute(medicine.time),

//             repeats: true

//         } as any


//     });


// }





// function getHour(time: string) {


//     const [hour, minutePeriod] = time.split(":");

//     let h = parseInt(hour);


//     if (time.includes("PM") && h !== 12) {

//         h += 12;

//     }


//     return h;

// }



// function getMinute(time: string) {


//     const minute =
//         time.split(":")[1].split(" ")[0];


//     return parseInt(minute);

// }