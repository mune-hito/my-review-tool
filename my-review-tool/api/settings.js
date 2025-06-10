const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// 設定の保存
router.post('/', async (req, res) => {
    try {
        const { id, action } = req.body;
        if (action === 'yes') {
            // レビューIDを保存
            const settingsPath = path.join(__dirname, '../data/settings.json');
            const settings = JSON.parse(await fs.readFile(settingsPath, 'utf8'));
            
            if (!settings.approvedReviews) {
                settings.approvedReviews = [];
            }
            
            if (!settings.approvedReviews.includes(id)) {
                settings.approvedReviews.push(id);
                await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
            }

            res.json({ success: true, message: 'レビューが承認されました' });
        } else {
            res.status(400).json({ success: false, message: '無効なアクション' });
        }
    } catch (error) {
        console.error('Error saving settings:', error);
        res.status(500).json({ success: false, message: 'サーバーエラー' });
    }
});

// 設定の取得
router.get('/', async (req, res) => {
    try {
        const settingsPath = path.join(__dirname, '../data/settings.json');
        const settings = JSON.parse(await fs.readFile(settingsPath, 'utf8'));
        res.json(settings);
    } catch (error) {
        console.error('Error reading settings:', error);
        res.status(500).json({ success: false, message: 'サーバーエラー' });
    }
});

module.exports = router; 