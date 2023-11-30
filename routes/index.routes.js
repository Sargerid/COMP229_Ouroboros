const fs = require('fs').promises;
const express = require('express');
const router = express.Router();
const { api, Assert } = require('../utility');

router.get('/index', async (req, res, next) => {
  const html = await fs.readFile('./public/index.html');
  res.setHeader('content-type', 'text/html');
  res.send(html);
});

router.get('/test', api(async (req, res) => {
  return { hello: 'world' };
}));

router.get('/testerror', api(async (req, res) => {
  Assert.validate(() => false, "test error");
}));

module.exports = router;