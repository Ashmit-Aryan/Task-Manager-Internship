const { Command } = require('commander');
const axios = require('axios'); // npm install axios
const program = new Command();

const API_BASE = 'http://localhost:3000';

program
  .command('add <text>')
  .option('-d, --due <date>', 'Due date YYYY-MM-DD')
  .action(async (text, options) => {
    try {
      const payload = { text };
      if (options.due) payload.due = new Date(options.due);
      const res = await axios.post(`${API_BASE}/tasks`, payload);
      console.log('Added:', res.data.text);
    } catch (err) {
      console.error('Error:', err.response?.data?.error || err.message); // User-friendly errors[web:38]
    }
  });

program
  .command('list')
  .action(async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks`);
      res.data.forEach(t => console.log(`${t._id}: ${t.text} ${t.due ? '(Due ' + t.due.toDateString() + ')' : ''}`));
    } catch (err) {
      console.error('List error:', err.message);
    }
  });

program.parse();
