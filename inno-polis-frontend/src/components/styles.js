export const styles = `
        .polis-clone {
          max-width: 800px;
          margin: 0 auto;
          font-family: 'Arial', sans-serif;
          color: #333;
          background-color: #f5f5f5;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 10px;
        }

        .subtitle {
          text-align: center;
          color: #7f8c8d;
          margin-bottom: 20px;
        }

        .tabs {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .tabs button {
          flex: 1;
          padding: 10px;
          border: none;
          background-color: #ecf0f1;
          color: #2c3e50;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .tabs button:hover {
          background-color: #bdc3c7;
        }

        .tabs button.active {
          background-color: #3498db;
          color: white;
        }

        .content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h2 {
          color: #2c3e50;
          margin-bottom: 15px;
        }

        .input-group {
          display: flex;
          margin-bottom: 15px;
        }

        .input-group input,
        .input-group select {
          flex: 1;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #bdc3c7;
          border-radius: 3px;
        }

        .input-group button {
          padding: 10px 20px;
          background-color: #2ecc71;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .input-group button:hover {
          background-color: #27ae60;
        }

        .topic-card,
        .statement-card,
        .vote-card,
        .report-card {
          background-color: #ecf0f1;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 5px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .topic-card h3,
        .statement-card p {
          margin: 0;
          color: #34495e;
        }

        .topic-label {
          font-size: 14px;
          color: #7f8c8d;
          margin-top: 5px;
        }

        .vote-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        }

        .vote-buttons button {
          flex: 1;
          margin: 0 5px;
          padding: 10px;
          border: none;
          border-radius: 3px;
          color: white;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .vote-buttons button:hover {
          opacity: 0.8;
        }

        .vote-buttons .agree {
          background-color: #2ecc71;
        }

        .vote-buttons .disagree {
          background-color: #e74c3c;
        }

        .vote-buttons .skip {
          background-color: #95a5a6;
        }

        .no-statements {
          text-align: center;
          color: #7f8c8d;
        }

        .report p {
          margin: 5px 0;
        }

        .most-agreed {
          margin-top: 15px;
          padding: 10px;
          background-color: #e8f6f3;
          border-radius: 5px;
        }

        .most-agreed h4 {
          color: #16a085;
          margin-bottom: 5px;
        }
      `; 