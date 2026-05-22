const Doctor = require('../models/Doctor');

// ดึงรายชื่อแพทย์ทั้งหมดเพื่อทำการเลือกคิวตรวจ
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({});
        res.status(200).json({ success: true, data: doctors });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// แอดมินเพิ่มแพทย์และจัดการตารางเวร
exports.addDoctor = async (req, res) => {
    try {
        const { name, specialty, availableDays, availableSlots, image } = req.body;
        const newDoctor = new Doctor({
            name,
            specialty,
            availableDays,
            availableSlots,
            image: image || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150"
        });
        await newDoctor.save();
        res.status(201).json({ success: true, data: newDoctor, message: 'เพิ่มแพทย์เข้าระบบสำเร็จ' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};