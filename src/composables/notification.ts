// Request notification permission
export const requestNotification = () => {
	if (['default', undefined].includes(Notification.permission)) {
		Notification.requestPermission((permission) => {
		});
	}
}

// Create new notification
export const newNotification = (
	title: string,
	message: string,
	options?: NotificationOptions
) => {
	return new Notification(title, {
		body: message,
		...options
	});
}
