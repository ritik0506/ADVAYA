import SystemLog from '../models/SystemLog.js';
import logger from '../middleware/logger.js';

const VALID_LEVELS = ['info', 'warning', 'error', 'debug'];

export const createLog = async (req, res, next) => {
  try {
    const { level, message, context } = req.body;

    if (!level || !message) {
      return res.status(400).json({
        success: false,
        message: 'Level and message are required',
      });
    }

    if (!VALID_LEVELS.includes(level)) {
      return res.status(400).json({
        success: false,
        message: `Invalid log level. Must be one of: ${VALID_LEVELS.join(', ')}`,
      });
    }

    const systemLog = await SystemLog.create({
      level,
      message,
      context: context || {},
      source: 'frontend',
    });

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

export const getAllLogs = async (req, res, next) => {
  try {
    const { level, source, limit = 100 } = req.query;
    const filter = {};
    if (level) filter.level = level;
    if (source) filter.source = source;

    const parsedLimit = Math.min(parseInt(limit) || 100, 500);

    const logs = await SystemLog.find(filter)
      .sort({ createdAt: -1 })
      .limit(parsedLimit);

    res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

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
