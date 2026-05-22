const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    clinicName: { type: String, required: true },
    dealName: { type: String, required: true },
    date: { type: String, required: true }, // ฟอร์แมต YYYY-MM-DD
    time: { type: String, required: true }, // เช่น "10:00"
    price: { type: Number, required: true },
    status: { type: String, enum: ['pending_payment', 'confirmed', 'cancelled'], default: 'pending_payment' },
    paymentTransactionId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);