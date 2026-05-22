const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// ตรวจสอบคิวว่างและทำรายการจอง (ป้องกันการจองซ้ำซ้อนในเวลาเดียวกัน)
exports.createAppointment = async (req, res) => {
    try {
        const { doctorId, clinicName, dealName, date, time, price } = req.body;
        const userId = req.user.id; // ดึงมาจาก JWT Auth Middleware

        // 1. ตรวจสอบว่าแพทย์คนนี้ในวันและเวลาดังกล่าว มีนัดหมายยืนยันไปแล้วหรือยัง
        const conflictingBooking = await Appointment.findOne({
            doctorId,
            date,
            time,
            status: { $ne: 'cancelled' } // ไม่นับรายการที่ถูกยกเลิกไปแล้ว
        });

        if (conflictingBooking) {
            return res.status(400).json({ 
                success: false, 
                message: 'ขออภัยค่ะ แพทย์คิวเต็มในช่วงเวลาที่คุณเลือกแล้ว กรุณาเลือกเวลาอื่น' 
            });
        }

        // 2. ดำเนินการสร้างการนัดหมายเริ่มต้น (รอชำระเงิน)
        const newAppointment = new Appointment({
            userId,
            doctorId,
            clinicName,
            dealName,
            date,
            time,
            price,
            status: 'pending_payment'
        });

        await newAppointment.save();
        res.status(201).json({ success: true, data: newAppointment, message: 'สร้างการจองคิวสำเร็จ กรุณาดำเนินการชำระเงิน' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการจองคิว', error: error.message });
    }
};

// ตรวจสอบคิวที่ว่างอยู่ของแพทย์ตามวันที่ระบุ
exports.getAvailableSlots = async (req, res) => {
    try {
        const { doctorId, date } = req.query;
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'ไม่พบข้อมูลแพทย์' });
        }

        // ค้นหาคิวการนัดหมายที่มีการจองไว้แล้วในวันนั้น
        const bookedAppointments = await Appointment.find({
            doctorId,
            date,
            status: { $ne: 'cancelled' }
        });

        const bookedTimes = bookedAppointments.map(app => app.time);
        
        // กรองสล็อตเวลาเพื่อแสดงเฉพาะเวลาที่ยังว่างจริง
        const freeSlots = doctor.availableSlots.filter(slot => !bookedTimes.includes(slot));

        res.status(200).json({ success: true, availableSlots: freeSlots });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ดึงประวัติการจองทั้งหมดของลูกค้ารายนั้น
exports.getUserAppointments = async (req, res) => {
    try {
        const userId = req.user.id;
        const appointments = await Appointment.find({ userId }).populate('doctorId', 'name specialty image').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};