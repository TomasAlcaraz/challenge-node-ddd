import schedule from 'node-schedule';
import Task from '../../domain/models/Task';
import User from '../../domain/models/User';
import { notifyTaskUpdate } from './notificationService';

const scheduleReminder = (taskId: string, reminderDate: Date) => {
  schedule.scheduleJob(reminderDate, async () => {
    const task = await Task.findById(taskId);
    if (task) {
      const assignedUser = await User.findById(task.assignedTo);
      if (assignedUser) {
        await notifyTaskUpdate(assignedUser.email, task.title);
      }
    }
  });
};

export { scheduleReminder };