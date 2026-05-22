const Appointment = require('../models/Appointment');

// ระบบตรวจสอบสลีป/สถานะการชำระเงินจำลอง
exports.verifyPayment = async (req, res) => {
    try {
        const { appointmentId, transactionId } = req.body;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'ไม่พบรายการจองนี้' });
        }

        // จำลองขั้นตอนการตรวจสอบกับระบบธนาคาร/QR Gateway
        if (!transactionId || transactionId.length < 5) {
            return res.status(400).json({ success: false, message: 'รหัสอ้างอิงธุรกรรมไม่ถูกต้อง' });
        }

        // อัปเดตสถานะนัดหมายเป็นยืนยันคิวสมบูรณ์
        appointment.status = 'confirmed';
        appointment.paymentTransactionId = transactionId;
        await appointment.save();

        res.status(200).json({ 
            success: true, 
            message: 'ยืนยันยอดชำระเงินสำเร็จ คิวของคุณได้รับการบันทึกเรียบร้อยค่ะ',
            data: appointment 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};