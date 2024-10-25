const ExcelJS = require('exceljs');
const EventRegistration = require('../models/eventRegistration');

const ExportExcel = async (req, res) => {
    try {
        const registrations = await EventRegistration.find();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Registrations');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Team Name', key: 'teamName', width: 20 },
            { header: 'Event ID', key: 'event', width: 20 },
            { header: 'Members', key: 'members', width: 50 }
        ];

        registrations.forEach(reg => {
            worksheet.addRow({
                name: reg.name,
                email: reg.email,
                phone: reg.phone,
                teamName: reg.teamName,
                event: reg.event.toString(),
                members: reg.members.map(member => member.memberName).join(', ')
            });
        });

        res.setHeader('Content-Disposition', 'attachment; filename=registrations.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = ExportExcel;