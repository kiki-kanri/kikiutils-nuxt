import { format as dateFnsFormat } from 'date-fns';

export const formatDateOrTimestamp = (dateOrTimestamp: Date | number, options: { format?: string } & Parameters<typeof dateFnsFormat>[2] = {}) => {
	const { format = 'yyyy-MM-d kk:mm:ss', ...otherOptions } = options;
	return dateFnsFormat(new Date(dateOrTimestamp), format, otherOptions);
};
