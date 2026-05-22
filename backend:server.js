const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// โหลด Controller หลัก
const authController = require('./controllers/auth.controller');
const bookingController = require('./controllers/booking.controller');
const paymentController = require('./controllers/payment.controller');
const doctorController = require('./controllers/doctor.controller');
const Appointment = require('./models/Appointment'); // สำหรับดึงภาพรวมฝั่งแอดมิน

const app = express();
app.use(cors());
app.use(express.json());

// เชื่อมต่อฐานข้อมูล MongoDB (กรุณาแทนที่ URI ด้วยเซิร์ฟเวอร์ของคุณ)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/unni_db';
mongoose.connect(MONGO_URI)
    .then(() => console.log('