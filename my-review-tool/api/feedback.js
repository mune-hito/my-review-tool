const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

// メール送信の設定
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

router.post('/', async (req, res) => {
    try {
        const { id, action } = req.body;
        
        if (action === 'no') {
            // レビューデータの取得
            const usersPath = path.join(__dirname, '../data/users.json');
            const users = JSON.parse(await fs.readFile(usersPath, 'utf8'));
            const review = users[id];

            if (!review) {
                return res.status(404).json({ success: false, message: 'レビューが見つかりません' });
            }

            // メール送信
            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: process.env.SMTP_USER, // 管理者宛
                subject: 'レビューのフィードバック',
                text: `
                    レビューID: ${id}
                    メールアドレス: ${review.email}
                    レビュー内容: ${review.content}
                    フィードバック: 否定的なフィードバック
                `
            });

            res.json({ success: true, message: 'フィードバックが送信されました' });
        } else {
            res.status(400).json({ success: false, message: '無効なアクション' });
        }
    } catch (error) {
        console.error('Error processing feedback:', error);
        res.status(500).json({ success: false, message: 'サーバーエラー' });
    }
});

module.exports = router; 