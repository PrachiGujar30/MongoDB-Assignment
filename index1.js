const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/studentDatabase')
  .then(() => console.log('Database connected successfully'))
  .catch((e) => console.log('Failed to connect to database', e));

// Define schemas
const academicRecordsSchema = new mongoose.Schema({
    studentID: { type: String, required: true },
    name: { type: String, required: true },
    grades: [Number],
    subjects: [String],
    additionalInfo: { type: Object }
});

const coCurricularActivitiesSchema = new mongoose.Schema({
    studentID: { type: String, required: true },
    name: { type: String, required: true },
    activityType: { type: String, required: true },
    duration: { type: Number, required: true },
    achievements: [String]
});

const AcademicRecord = mongoose.model('AcademicRecord', academicRecordsSchema);
const CoCurricularActivity = mongoose.model('CoCurricularActivity', coCurricularActivitiesSchema);

// Function to create data
async function createData() {
    try {
        // Create academic record for the first student
        const academicRecord1 = new AcademicRecord({
            studentID: "12345",
            name: "Rahul Sharma", // Indian name
            grades: [85, 90, 95],
            subjects: ["Math", "Science", "English"],
            additionalInfo: { age: 20, address: "Mumbai" }
        });
        await academicRecord1.save();

        // Create academic record for the second student
        const academicRecord2 = new AcademicRecord({
            studentID: "67890",
            name: "Priya Patel", // Indian name
            grades: [90, 95, 100],
            subjects: ["Math", "Science", "English"],
            additionalInfo: { age: 22, address: "Mumbai" }
        });
        await academicRecord2.save();

        // Create co-curricular activity for the first student
        const coCurricularActivity1 = new CoCurricularActivity({
            studentID: "12345",
            name: "Rahul Sharma", // Indian name
            activityType: "Sports",
            duration: 2,
            achievements: ["Champion", "MVP"]
        });
        await coCurricularActivity1.save();

        // Create co-curricular activity for the second student
        const coCurricularActivity1 = new CoCurricularActivity({
            studentID: "12346",
            name: "Priya Patel", // Indian name
            activityType: "Dance",
            duration: 2,
            achievements: ["Champion", "MVP"]
        });
        await coCurricularActivity1.save();

        console.log("Data created successfully.");
    } catch (error) {
        console.error("Error creating data:", error);
    }
}

// Function to perform CRUD operations on academic records
async function performCRUDOperationsOnAcademicRecords() {
    try {
        // Create
        const newAcademicRecord = new AcademicRecord({
            studentID: "24680",
            name: "Arun Singh", // Indian name
            grades: [75, 80, 85],
            subjects: ["Math", "Science", "English"],
            additionalInfo: { age: 21, address: "789 Elm St, Anytown, USA" }
        });
        await newAcademicRecord.save();
        console.log("Academic record created:", newAcademicRecord);

        // Read
        const academicRecord = await AcademicRecord.findOne({ studentID: "12345" });
        console.log("Academic record found:", academicRecord);

        // Update
        academicRecord.name = "Rahul Kumar"; // Updated name
        await academicRecord.save();
        console.log("Academic record updated:", academicRecord);

        // Delete
        const deletedAcademicRecord = await AcademicRecord.findOneAndDelete({ studentID: "67890" });
        console.log("Academic record deleted:", deletedAcademicRecord);
    } catch (error) {
        console.error("Error performing CRUD operations on academic records:", error);
    }
}

// Function to perform CRUD operations on co-curricular activities
async function performCRUDOperationsOnCoCurricularActivities() {
    try {
        // Update
        const coCurricularActivity = await CoCurricularActivity.findOne({ studentID: "12345" });
        coCurricularActivity.activityType = "Music"; // Updated activity type
        await coCurricularActivity.save();
        console.log("Co-curricular activity updated:", coCurricularActivity);

        // Delete
        const deletedCoCurricularActivity = await CoCurricularActivity.findOneAndDelete({ studentID: "12345" });
        console.log("Co-curricular activity deleted:", deletedCoCurricularActivity);
    } catch (error) {
        console.error("Error performing CRUD operations on co-curricular activities:", error);
    }
}

// Call the function to create data
createData();

// Call the functions to perform CRUD operations
performCRUDOperationsOnAcademicRecords();
performCRUDOperationsOnCoCurricularActivities();
