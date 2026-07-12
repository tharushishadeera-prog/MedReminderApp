let Notifications: any;



const getNotifications = async () => {

    if (!Notifications) {

        Notifications =
            await import("expo-notifications");

    }

    return Notifications;

};





export const requestNotificationPermission = async () => {


    const Notifications =
        await getNotifications();



    const permission =
        await Notifications.requestPermissionsAsync();



    if (permission.status !== "granted") {

        return false;

    }



    // Android Channel

    await Notifications.setNotificationChannelAsync(
        "medicine",
        {

            name: "Medicine Reminder",

            importance:
                Notifications.AndroidImportance.HIGH,

            sound: "default",

        }
    );



    return true;


};







export const scheduleMedicineReminder = async (
    medicine: any
) => {


    if (!medicine.reminder) {

        return;

    }



    const Notifications =
        await getNotifications();




    await Notifications.scheduleNotificationAsync({


        content: {

            title:
                "💊 Medicine Reminder",


            body:
                `Time to take ${medicine.name} (${medicine.dosage})`,


            sound:
                "default",


            data: {

                medicineId:
                    medicine.id

            }


        },



        trigger: {


            seconds: 10,


            channelId:
                "medicine"


        }


    });



    console.log(
        "Notification scheduled"
    );


};