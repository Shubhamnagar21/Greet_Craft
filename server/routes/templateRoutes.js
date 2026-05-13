const express = require('express');
const {
  getTemplates,
  getTemplateById,
  getTemplatesByCategory,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} = require('../controllers/templateController');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', optionalAuth, getTemplates);
router.get('/:id', optionalAuth, getTemplateById);
router.get('/category/:category', optionalAuth, getTemplatesByCategory);
router.post('/', protect, createTemplate);
router.put('/:id', protect, updateTemplate);
router.delete('/:id', protect, deleteTemplate);

module.exports = router;
