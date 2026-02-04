import mongoose from 'mongoose';

const systemLogSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      enum: ['info', 'warning', 'error', 'debug'],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    context: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    source: {
      type: String,
      enum: ['frontend', 'backend', 'system'],
      default: 'backend',
    },
    userAgent: {
      type: String,
    },
    url: {
      type: String,
    },
    stack: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
systemLogSchema.index({ level: 1, createdAt: -1 });
systemLogSchema.index({ source: 1, createdAt: -1 });

// Auto-delete logs older than 30 days
systemLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

const SystemLog = mongoose.model('SystemLog', systemLogSchema);

export default SystemLog;
