const xlsx = require('xlsx');
const Expense = require('../models/Expense');


exports.addExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const { icon, category, amount, date } = req.body || {};

        if (!category || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    }  catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.deleteExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        if (expense.length === 0) {
            return res.status(404).json({ message: 'No expense records found' });
        }

        // Logic to generate Excel file from expense data
        // This is a placeholder, actual implementation will depend on the library used
        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date
        }));
            
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expense');
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
        
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }


}