# Mindgrow-A-Platform-for-Autism-Welfare
Web-based Autism Support System on AWS with dedicated user and doctor portals.  Enabled performance tracking, document uploads, game-based therapy, appointment scheduling, and data-driven  insights for doctors. 

📌 Features

Doctor and Parent Roles –
Separate interfaces and permissions for doctors and parents.

Doctors can recommend therapy activities, monitor progress, and schedule appointments.

Parents can view assigned therapy tasks, play quiz, and request appointments.

Therapy Management –
Doctors can create and assign therapy plans to specific patients stored in the database.

Appointment Scheduling –
Parents can create appointments. All appointments are stored in MongoDB and displayed in the UI.

Progress Tracking –
Stores quiz/game scores for each patient. Progress visualizations include Pie, Bar and Line charts using Chart.js and Recharts.

Cloud File Storage –
Prescriptions and other documents are uploaded directly to AWS S3 using Multer-S3 integration.

Patient Analytics Dashboard –
Displays demographic breakdown (gender, age) in interactive charts.

Secure Authentication –
Password hashing using bcrypt before storing in MongoDB.

Cloud Deployment –
Backend hosted on AWS EC2.

Responsive Frontend –
Developed using React.js, HTML, and CSS for seamless experience across devices.

⚙️ Installation & Setup
Prerequisites
Ensure you have installed:

Node.js (v14 or above)

npm (v6 or above)

MongoDB Atlas account

AWS account with an S3 bucket created

1. Clone the repository
git clone <your-repository-url>
cd <project-folder>

2. Backend Setup
Navigate to the backend folder:
cd backend
Install dependencies:
npm install
Create a .env file and add the following environment variables:
MONGO_URI=<your-mongodb-atlas-connection-string>
AWS_ACCESS_KEY_ID=<your-aws-access-key>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-key>
Start the backend server:
node server.js
The backend will run on http://localhost:5000 by default.

3. Frontend Setup
Navigate to the frontend folder:
cd frontend
Install dependencies:
npm install
Start the React development server:
npm start
The frontend will run on http://localhost:3000 by default.

4. AWS S3 & EC2 Deployment
AWS EC2: Deploy the Node.js backend and frontend by uploading your
files and starting with PM2 or Node.

