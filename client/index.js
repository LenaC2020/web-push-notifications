const client = (() => {
    let serviceWorkerRegObj = undefined;
    const notificationButton = document.getElementById("btn-notify");

    const showNotificationButton = () => {
        notificationButton.style.display = "block";
        notificationButton.addEventListener("click", showNotification);
    }

    const showNotification = () => {
        const simpleTextNotification = reg => reg.showNotification("My First Notification")

        const customizedNotification = reg => {
            const options = {
                body: 'This is an important body!',
                icon: "imgs/notification.png",
                actions: [
                    {action: "search", title: "Try Searching!"},
                    {action: "close", title: "Forget it!"},
                ],
            }
            reg.showNotification('Second Notification', options)
        }
        
        navigator.serviceWorker.getRegistration()
        .then(registration => customizedNotification(registration));
    }

    const checkNotificationSupport = () => {
        if(!('Notification' in window)) {
            return Promise.reject("The browser doesn't support notifications.")
        }
        console.log("The browser support Notifications!")
        return Promise.resolve("Ok!")
    }

    const registerServiceWorker = () => {
        if(!('serviceWorker') in navigator) {
            return Promise.reject("ServiceWorker support is not available.")
        }

        return navigator.serviceWorker.register('service-worker.js')
        .then(regObj => {
            console.log("service worker is registered successfully!");
            serviceWorkerRegObj = regObj;
            showNotificationButton();
        })
    }

    const requestNotificationPermissions = () => {
        return Notification.requestPermission(status => {
            console.log("Notification Permission Status:", status);
        })
    }

    checkNotificationSupport()
        .then(registerServiceWorker)
        .then(requestNotificationPermissions)
        .catch(err => console.error(err))
})()