const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true }, // เช่น เลเซอร์ผิวพรรณ, ปรับรูปหน้า
    rating: { type: Number, default: 4.8 },
    image: { type: String }, // ลิงก์รูปโปรไฟล์แพทย์
    availableDays: [{ type: String }], // เช่น ["Monday", "Wednesday", "Friday"]
    availableSlots: [{ type: String }] // ช่วงเวลาที่เปิดตรวจ เช่น ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"]
});

module.exports = mongoose.model('Doctor', DoctorSchema);