import * as Notifications from "expo-notifications";


// Notification display settings

Notifications.setNotificationHandler({

    handleNotification: async () => ({

        shouldShowBanner: true,

        shouldShowList: true,

        shouldPlaySound: true,

        shouldSetBadge: false,

    }),

});




// Request permission

export const requestNotificationPermission = async () => {


    const { status } =
        await Notifications.requestPermissionsAsync();



    if (status !== "granted") {

        console.log(
            "Notification permission denied"
        );

        return false;

    }


    return true;

};





// Schedule medicine reminder

export const scheduleMedicineReminder = async (

    medicine: any

) => {


    if (!medicine.reminder) {

        return;

    }



    const [time, period] =
        medicine.time.split(" ");



    let [
        hour,
        minute
    ] =
        time.split(":")
            .map(Number);



    if (period === "PM" && hour !== 12) {

        hour += 12;

    }


    if (period === "AM" && hour === 12) {

        hour = 0;

    }




    await Notifications.scheduleNotificationAsync({

        content: {


            title: "💊 Medicine Reminder",

            body:
                `Time to take ${medicine.name} (${medicine.dosage})`,


            sound: true,

        },


        trigger: {


            hour: hour,

            minute: minute,

            repeats: true,


        } as any


    });



    console.log(
        "Notification scheduled"
    );


};