import SystemLog from '../models/SystemLog.js';
import logger from '../middleware/logger.js';

// @desc    Create a new log entry
// @route   POST /api/logs
// @access  Public
export const createLog = async (req, res, next) => {
  try {
    const { level, message, context } = req.body;

    // Validate required fields
    if (!level || !message) {
      return res.status(400).json({
        success: false,
        message: 'Level and message are required',
      });
    }

    // Create system log entry
    const systemLog = await SystemLog.create({
      level,
      message,
      context: context || {},
      source: 'frontend',
    });

    // Also log to Winston
    logger[level](message, { context });

    res.status(201).json({
      success: true,
      message: 'Log entry created',
      data: systemLog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all logs
// @route   GET /api/logs
// @access  Private/Admin
export const getAllLogs = async (req, res, next) => {
  try {
    const { level, source, limit = 100 } = req.query;

    const filter = {};
    if (level) filter.level = level;
    if (source) filter.source = source;

    const logs = await SystemLog.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get error logs
// @route   GET /api/logs/errors
// @access  Private/Admin
export const getErrorLogs = async (req, res, next) => {
  try {
    const errorLogs = await SystemLog.find({ level: 'error' })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: errorLogs.length,
      data: errorLogs,
    });
  } catch (error) {
    next(error);
  }
};
