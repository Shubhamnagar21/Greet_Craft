const Template = require('../models/Template');

const getTemplates = async (req, res, next) => {
  try {
    const { search, category, premium } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (premium !== undefined) filter.isPremium = premium === 'true';
    if (search) filter.title = { $regex: search, $options: 'i' };

    const templates = await Template.find(filter).sort({ createdAt: -1 });
    res.json(templates);
  } catch (error) {
    next(error);
  }
};

const getTemplateById = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      res.status(404);
      throw new Error('Template not found');
    }
    res.json(template);
  } catch (error) {
    next(error);
  }
};

const getTemplatesByCategory = async (req, res, next) => {
  try {
    const templates = await Template.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.json(templates);
  } catch (error) {
    next(error);
  }
};

const createTemplate = async (req, res, next) => {
  try {
    const { title, imageUrl, category, isPremium, overlayConfig } = req.body;
    const template = await Template.create({ title, imageUrl, category, isPremium, overlayConfig });
    res.status(201).json(template);
  } catch (error) {
    next(error);
  }
};

const updateTemplate = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      res.status(404);
      throw new Error('Template not found');
    }

    const { title, imageUrl, category, isPremium, overlayConfig } = req.body;
    if (title) template.title = title;
    if (imageUrl) template.imageUrl = imageUrl;
    if (category) template.category = category;
    if (isPremium !== undefined) template.isPremium = isPremium;
    if (overlayConfig) template.overlayConfig = overlayConfig;

    const updated = await template.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteTemplate = async (req, res, next) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      res.status(404);
      throw new Error('Template not found');
    }
    await template.deleteOne();
    res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTemplates, getTemplateById, getTemplatesByCategory, createTemplate, updateTemplate, deleteTemplate };
