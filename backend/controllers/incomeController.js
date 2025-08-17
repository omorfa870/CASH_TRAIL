
const User = require('../models/User');
const Income = require('../models/Income');


exports.addIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const { icon, source, amount, date } = req.body || {};

        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newIncome = await Income.create({
            userId,
            icon,
            source,
            amount,
            date: new Date(date) || new Date(),
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    }  catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.deleteIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        if (income.length === 0) {
            return res.status(404).json({ message: 'No income records found' });
        }

        // Logic to generate Excel file from income data
        // This is a placeholder, actual implementation will depend on the library used
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }));
            
        const wb = XLSX.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');
        // Send the generated Excel file as response
        res.status(200).json(excelData);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

}